const express = require('express');
const app=express();
const port =5000;
const mongoose=require('mongoose');
require('dotenv').config();
const authrouter=require("./routes/auth");
const userRouter=require("./routes/users");
const postRouter=require("./routes/posts");
const catRouter=require("./routes/categories");
const path=require("path");
const multer =  require('multer');
const cors = require("cors");


app.use(cors());



app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("is connected")
})

.catch((err)=>{
    console.log(err);
    process.exit(1);
});


const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images");
    },

    filename:(req,file,cb)=>{
        cb(null,req.body.name);
    }
});

const upload= multer({storage:storage});

app.post("/api/upload" , upload.single("file") , (req , res)=>{
    res.status(201).json("uploaded")
});

app.use("/api/auth" , authrouter);
app.use("/api/users" , userRouter);
app.use("/api/posts" , postRouter);
app.use("/api/categories" , catRouter);
app.use("/images", express.static(path.join(__dirname+"/images")));
app.get("/",  (req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.listen(port , ()=>{
    console.log(`http://localhost:${port}`);
})