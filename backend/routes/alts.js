const router = require("express").Router(); 
const Alt = require ("../models/Alt"); 

router.post("/",async(req,res)=>{ 
    
    const newAlt =  new Alt(req.body); 
    try {  
        const savedAlt = await newAlt.save(); 
        res.status(200).json(savedAlt);  
    }
    catch(err){ 
        res.status(500).json(err); 
    }
});


router.get("/",async(req,res)=>{

    try{  
        const alts =await Alt.find(); 
        res.status(200).json(alts); 
    }
    catch(err){
        res.status(500).json(err);
    }
});


router.delete('/:id',async(req,res)=>{
    const id = req.params.id    
    try{
        const alts = await Alt.findByIdAndRemove(id) 
        res.status(200).json(alts)
    }
    catch(err){
        console.log(err)
    }
})


module.exports = router;