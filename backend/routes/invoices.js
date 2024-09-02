const router = require("express").Router(); 
const Invoice = require ("../models/Invoice"); 

router.post("/",async(req,res)=>{ 
    
    const newInvoice =  new Invoice(req.body); 
    try {  
        const savedInvoice = await newInvoice.save(); 
        res.status(200).json(savedInvoice);  
    }
    catch(err){ 
        res.status(500).json(err); 
    }
});


router.get("/",async(req,res)=>{

    try{  
        const invoices =await Invoice.find(); 
        res.status(200).json(invoices); 
    }
    catch(err){
        res.status(500).json(err);
    }
});


router.delete('/:id',async(req,res)=>{
    const id = req.params.id    
    try{
        const invoices = await Invoice.findByIdAndRemove(id) 
        res.status(200).json(invoices)
    }
    catch(err){
        console.log(err)
    }
})


module.exports = router;