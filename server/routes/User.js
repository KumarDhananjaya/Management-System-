const express = require('express')
const router = express.Router();

const db = require('../config/db')


router.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    //res.send(" welcome to backend ")
    db.query(" INSERT INTO Users (username, password) VALUES (?,?);", 
    [username,password], 
    (err, results) => {
         console.log(err.message);
        res.send(results);
    });
});

module.exports = router;