const router = require("express").Router();
const Post = require("../models/Post");


//create
router.post("/" , async (req , res)=>{

 const newPost = new Post(req.body);

 try {
    const savepost=await newPost.save();
    res.status(200).json(savepost);
 } catch (error) {
    res.status(500).json(error)
 }
});




//update
router.put("/:id" , async (req , res)=>{

    try {
       const post=await Post.findById(req.params.id);
       
     

            if(post.username === req.body.username){
                try {
                    const updatedpost=await Post.findByIdAndUpdate(req.params.id, {
                        $set:req.body,
                    },
                    {new:true});
                    res.status(200).json(updatedpost);
                } catch (error) {
                    res.status(500).json(error)
                }
            }
            else{
                res.status(401).json("you can update only your post")
            }
    } catch (error) {
       res.status(500).json(error)
    }
   });
   
   


//delete
   
router.delete("/:id" , async (req , res)=>{

    try {
       const post=await Post.findById(req.params.id);
       
            if(post.username === req.body.username){
                try {
                    await post.delete();
                    
                    res.status(200).json("deleted");
                } catch (error) {
                    res.status(500).json(error)
                }
            }
            else{
                res.status(401).json("you can update only your post")
            }
    } catch (error) {
       res.status(500).json(error)
    }
   });
   
// get one
   router.get("/:id" ,async (req ,res)=>{


    try {
        const post = await Post.findById(req.params.id);
    res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
    

   });

//get all

router.get("/",async (req ,res)=>{
    const username= req.query.user;
    const catName=req.query.cat;

    try {
        let posts;
        if(username){
            posts= await Post.find({username});
        }else if(catName){
            posts=await Post.find({categories:{
                $in:[catName]
            }})
        }else {
            posts= await Post.find();
        }
        res.status(201).json(posts);

    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports=router;