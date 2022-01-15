const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json())


const userRoute = require('./routes/User');
app.use("/user", userRoute)

//To confirm weather the backend server is running or not 
app.listen(3001, (req, res) => {
    console.log("server is running")
});