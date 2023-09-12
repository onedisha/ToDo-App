const express = require('express');
const app = express();
const port = 4000;

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.send("This is a successful GET request");
    console.log("hi");
});

