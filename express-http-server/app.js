// imports
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieparser = require('cookie-parser');
const path = require('path');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;

// server config
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieparser());
const port = 4000;

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);
const database = client.db('ToDoApp');
const tododata = database.collection('ToDoData');
const userdata = database.collection('UsersData');

// start server
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

app.get('/all', verify, async (req, res) => {
    console.log(req.user);
    const ret = await tododata.find({email: req.user.email}).toArray();
    res.json(ret);
})

app.post('/create', verify, async (req, res) => {
    const todo = req.body;
    todo.email = req.user.email;
    const ret= await tododata.insertOne(req.body);
    res.json(ret);
})

app.post('/delete', verify, async (req, res) => {
    const objectId= new ObjectId(req.body.id);
    const query = {_id: objectId};
    await tododata.deleteOne(query);
    const ret= await tododata.find({}).toArray();
    res.json(ret);
})

app.post('/edit', verify, async (req, res) => {
    const objectId= new ObjectId(req.body.id);
    await tododata.updateOne({_id: objectId}, {$set:{checked: req.body.checked}});
    const ret= await tododata.find({}).toArray();
    res.json(ret);
})

//AUTH
app.post('/signup', async (req, res) => {
    try {
        //get data from body
        const {firstname, lastname, email, password} = req.body;

        //all data should exist
        if(!(firstname && lastname && email && password)){
            console.log(req.body);
            res.status(400).json({message: "Fill all fields"});
        }
        else{
            //check if user already exists
            const existingUser = await userdata.findOne({"email" : email});
            if(existingUser){
                res.status(401).json('User already exists');
            }
            else{
                //encrypt the password
                const encPassword = await bcrypt.hash(password, 10);

                //save user in db
                const user = await userdata.insertOne({firstname, lastname, email, password: encPassword}); 

                //generate token for user and send it
                const token = jwt.sign(
                    {id: user._id, email}, 
                    secretKey, {
                        expiresIn: "2h"
                    }
                );
                user.token = token;
                user.password = undefined; 
                user.success = true;

                 //cookie
                 const options = {
                    expires: new Date(Date.now() + 10*24*60*60*1000),
                    httpOnly: true,
                    sameSite: true
                }; 

                res.status(200).cookie("token",token, options).json({
                    success: true,
                    token,
                    user
                }) 
            }  
        }
    }
     catch (error) {
        console.log(error);
    }
})

app.post('/login', async (req, res) => {
    try {
        //get data
        const {email, password} = req.body;

        //validation
        if(!(email && password)) res.status(400).json('Fill all fields');

        //find user in DB
        else{
            const user = await userdata.findOne({email});

            //if present and password matches, assign jwt
            if(user && (await bcrypt.compare(password, user.password))){
                const token = jwt.sign(
                    {id: user._id, email}, 
                    secretKey, {
                    expiresIn: "24h"
                    }
                );
                user.token = token;
                user.password = undefined;
                 
                //cookie
                const options = {
                    expires: new Date(Date.now() + 10*24*60*60*1000),
                    httpOnly: true,
                    sameSite: true
                }; 

                res.status(200).cookie("token",token, options).json({
                    success: true,
                    token,
                    user
                }) 
            }
    
            else{
                res.json("wrong credentials");
            }
        }
    } 
    catch (error) {
        console.log(error);
    }
})

app.post('/logout', async (req, res) => {
    const options = {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: true
    }; 
    res.cookie("token", "", options).json("logout successful");
})

function verify(req, res, next){
    let arr = ['/auth.html', '/authscript.js', '/styles.css', '/images/sun.png', '/images/moon.png'];
    if(arr.includes(req.url)){
        next();
        return;
    }
    const cookie = req.cookies;
    const token = cookie.token;
    if (token == null){
        res.redirect("/auth.html");
        return;
    }
    const payload = jwt.verify(token, secretKey);
    if (payload){
        req.user= payload;
        next();
    }
    else{
        res.redirect("error404.html");
        return;
    }
}

app.use('/', verify, express.static(path.join(__dirname, './../')));

//signing process: secret + payload = token
//verify process: token + secret = payload