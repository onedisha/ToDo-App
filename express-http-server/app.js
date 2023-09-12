// imports
const express = require('express');
const cors = require('cors');

// server config
const app = express();
app.use(express.json());
app.use(cors());
const port = 4000;

// start server
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

// server - answers
app.get('/', (req, res) => {
    res.send("This is a successful GET request");
});

// route get add
app.get('/add',(req,res)=>{
    let ans = req.query.num1+req.query.num2;
    res.json(ans);
})

// route post add
app.post('/add',(req,res)=>{
    let body = req.body;
    res.json(body.n1*body.n2);
})
