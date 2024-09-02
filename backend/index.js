const dotenv = require("dotenv"); 
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

//import routes
const userRoute = require("./routes/users");               
const invoiceRoute = require("./routes/invoices");
const altRoute = require("./routes/alts");

dotenv.config();


const app = express();
app.use (express.json());  


mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{console.log("mongoose connected");}).catch((err)=>{console.log(err)});
app.use(cors());

//api endpoints creation
app.use ("/api/users",userRoute);
app.use ("/api/invoices",invoiceRoute);
app.use ("/api/alts",altRoute);

app.get("/", (req,res)=>{
    res.status(200).send({
        "success": true,
        "msg": "Node Server Running"
    })
})


const PORT = process.env.PORT || 8394;
app.listen (PORT, ()=>{
    console.log ("server running");
}) 
