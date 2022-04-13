const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json())

const db = require('./config/db');


//  Police registration backend
app.post("/registerpolice", (req, res) => {
    
    const username = req.body.username;
    const area = req.body.area;
    const city = req.body.city;
    const phone = req.body.phone;
    const password = req.body.password;

    console.log(username);

    //res.send(" welcome to backend ")

    db.query(" INSERT INTO Police (username,area,city,phone,password) VALUES (?,?,?,?,?)", 
    [username,area,city,phone,password], 
    (err, results) => {
        if(err){
            console.log(err)
            res.send({message: "Police not registered"})
        }else{
            res.send({message: "Police Registered Successfully"})
        }
    });
});

// Lawyer registration backend
app.post("/registerlawyer", (req, res) => {
    const type = req.body.type;
    const username = req.body.username;
    const city = req.body.city;
    const phone = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;

    //res.send(" welcome to backend ")

    db.query(" INSERT INTO Lawyers (type,username,city,phone,email,password) VALUES (?,?,?,?,?,?)", 
    [type,username,city,phone,email,password], 
    (err, results) => {
        if(err){
            res.send({message: "User Not Registered"})
        }else{
            res.send({message: "Lawyer Registered successfully"})
        }
    });
});

//Adding complaint from user
app.post("/addcomplaint", (req, res) => {
    const name = req.body.name;
    const title = req.body.title;
    const type = req.body.type;
    const description = req.body.description;
    const date = req.body.date;
    const location = req.body.location;


    //res.send(" welcome to backend ")

    db.query(" INSERT INTO Complaint (name,title,type,description,date,location) VALUES (?,?,?,?,?,?)", 
    [name,title,type,description,date,location], 
    (err, result) => {
        if(err){
            console.log(err);
        }
        
        if(result.length > 0) {
            res.send(result)
        }else{
            res.send({message: "Complaint Not Added "})
        }
    });
});

const userRoute = require('./routes/User');
app.use("/user", userRoute)

const loginRoute = require('./routes/Loginuser');
app.use("/login", loginRoute)


//user login backend
app.post('/loginuser', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    //res.send(" welcome to backend ")

    db.query("SELECT * FROM Users WHERE username = ? AND password = ?", 
    [username,password], 
    (err, result) => {
        if (err) {
            res.send({err: err})
        }

        if(result.length > 0) {
            res.send(result)
        }else{
            res.send({message: "Invalid username or password"})
        }
    });
})

//police login backend
app.post('/loginpolice', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    //res.send(" welcome to backend ")

    db.query("SELECT `username`, `password` FROM Police WHERE username = ? AND password = ?", 
    [username,password], 
    (err, result) => {
        if (err) {
            res.send({err: err})
        }

        if(result.length > 0) {
            res.send(result)
        }else{
            res.send({message: "Invalid username or password"})
        }
    });
})


//lawyer login backend
app.post('/loginlawyer', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    //res.send(" welcome to backend ")

    db.query("SELECT `username`, `password` FROM Lawyers WHERE username = ? AND password = ?", 
    [username,password], 
    (err, result) => {
        if (err) {
            res.send({err: err})
        }

        if(result.length > 0) {
            res.send(result)
        }else{
            res.send({message: "Invalid username or password"})
        }
    });
})
// Categories of lawyers

//retrieve the lawyers details at user login
app.get('/getlawyers', (req, res) => {
    db.query("SELECT `type`,`username`, `city`, `phone`, `email` FROM Lawyers", 
    (err, result) => {
        if(err){
            console.log(err)    
        }else{
            res.send(result);    
        }
})
})

//
app.get('/Criminal', (req, res) => {
    db.query("SELECT `type`,`username`, `city`, `phone`, `email` FROM Lawyers WHERE type = 'Criminal'", 
    (err, result) => {
        if(err){
            console.log(err)    
        }else{
            res.send(result);    
        }
})
})

app.get('/Personal', (req, res) => {
    db.query("SELECT `type`,`username`, `city`, `phone`, `email` FROM Lawyers WHERE type = 'Personal'", 
    (err, result) => {
        if(err){
            console.log(err)    
        }else{
            res.send(result);    
        }
})
})

app.get('/Intellectual', (req, res) => {
    db.query("SELECT `type`,`username`, `city`, `phone`, `email` FROM Lawyers WHERE type = 'Intellectual'", 
    (err, result) => {
        if(err){
            console.log(err)    
        }else{
            res.send(result);    
        }
})
})

app.get('/Employment', (req, res) => {
    db.query("SELECT `type`,`username`, `city`, `phone`, `email` FROM Lawyers WHERE type = 'Employment'", 
    (err, result) => {
        if(err){
            console.log(err)    
        }else{
            res.send(result);    
        }
})
})

app.get('/Digital', (req, res) => {
    db.query("SELECT `type`,`username`, `city`, `phone`, `email` FROM Lawyers WHERE type = 'Digital'", 
    (err, result) => {
        if(err){
            console.log(err)    
        }else{
            res.send(result);    
        }
})
})
//retrieve all the cases available in the Database
app.get('/getcomplaints', (req, res) => {
    db.query("SELECT `name`, `title`, `type`, `description`,`date`,`location` FROM Complaint", 
    (err, result) => {
        if(err){
            console.log(err)    
        }else{
            res.send(result);    
        }
})
})

//retrieve the police details at user login
app.get('/getpolice', (req, res) => {
    db.query("SELECT `username`, `area`, `city`, `phone` FROM Police", 
    (err, result) => {
        if(err){
            console.log(err)    
        }else{
            res.send(result);    
        }
})
})

//retrieve total No of complaints present in database
app.get('/TNComp', (req, res) => {
    db.query("SELECT `TNComp` FROM TNComp", 
    (err, result) => {
        if(err){
            console.log(err)    
        }else{
            res.send(result);    
        }
})
})

app.post("/addrule", (req, res) => {
    const slno = req.body.slno;
    const title = req.body.title;
    const doc = req.body.doc;


    //res.send(" welcome to backend ")

    db.query(" INSERT INTO Rules (slno,title,doc) VALUES (?,?,?)", 
    [slno,title,doc], 
    (err, result) => {
        if(err){
            console.log(err);
        }
        
        if(result.length > 0) {
            res.send(result)
        }else{
            res.send({message: "Complaint Not Added "})
        }
    });
});




//To confirm weather the backend server is running or not 
app.listen(3001, (req, res) => {
    console.log("server is running")
});