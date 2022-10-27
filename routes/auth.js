const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');


router.post("/register" , async (req , res)=>{

    try {
        const salt= await bcrypt.genSalt(10);
        const hashedPass= await bcrypt.hash(req.body.password, salt);

        const newUser= new User( {

            username:req.body.username,
            email:req.body.email,
            password:hashedPass,

        });

        const user= await newUser.save();
        res.status(201).json(user);


    } catch (error) {
        res.status(500).json("error")
    }
});



router.post("/login" , async (req , res)=>{
    try {
        const user= await User.findOne({username : req.body.username})
        !user && res.status(400).json("wrong credentials!");

        const validate=await bcrypt.compare(req.body.password , user.password);
        !validate && res.status(400).json("wrong credentials!");
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json("error")
    }
})

module.exports=router;