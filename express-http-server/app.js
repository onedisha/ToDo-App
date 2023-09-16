// imports
const express = require('express');
const cors = require('cors');
const { MongoClient } = require("mongodb");
const { ObjectId } = require('mongodb');

// server config
const app = express();
app.use(express.json());
app.use(cors());
const port = 4000;

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
const database = client.db('ToDoApp');
const tododata = database.collection('ToDoData');

// start server
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.send("This is a successful GET request");
});

app.get('/all', async (req, res) => {
    const ret = await tododata.find({}).toArray();
    res.json(ret);
})

app.post('/create', async (req, res) => {
    const ret= await tododata.insertOne(req.body);
    res.json(ret);
})

app.post('/delete', async (req, res) => {
    const objectId= new ObjectId(req.body.id);
    const query = {_id: objectId};
    await tododata.deleteOne(query);
    const ret= await tododata.find({}).toArray();
    res.json(ret);
})

app.post('/edit', async (req, res) => {
    const objectId= new ObjectId(req.body.id);
    await tododata.updateOne({_id: objectId}, {$set:{checked: req.body.checked}});
    const ret= await tododata.find({}).toArray();
    res.json(ret);
})
