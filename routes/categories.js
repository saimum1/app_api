const router = require("express").Router();
const category = require("../models/Category");

router.post("/"  ,async (req , res)=>{

    const newcat= new category(req.body);
    try {
        const savecat= await newcat.save();
        res.status(201).json(savecat);
    } catch (error) {
        res.status(500).json(error);
    }
});


router.get("/"  ,async (req , res)=>{
    
    try {
        const newcat= await category.find();
        res.status(201).json(newcat);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports=router;