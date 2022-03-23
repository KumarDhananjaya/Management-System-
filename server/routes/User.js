const express = require('express')
const router = express.Router();

const db = require('../config/db')


router.post("/registeruser", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    //res.send(" welcome to backend ")
    db.query(" INSERT INTO Users (username, password) VALUES (?,?);", 
    [username,password], 
    (err, results) => {
        if(err){
            res.send(err);
        }
        else{
            res.send({message: "User registered successfully"})
        }
    });
});




module.exports = router;