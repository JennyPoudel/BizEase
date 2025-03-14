import express from 'express';
import Product from '../models/product.model.js';
import mongoose from 'mongoose';

const router= express.Router();

router.post('/',async(req,res) => {
    const product= req.body;
    if (!product.name || !product.price || !product.image){
        res.status(400).json({message: 'All fields are required'});
    }
    const newProduct= new Product (product);
 
    try{await newProduct.save();
     res.status(201).json(newProduct);
    }catch(error){
       console.error(" Error to create prodct: ${error}");
       res.status(500).json({message:'Server Error'});
 }
 
 });
 
 router.delete('/:id',async(req, res)=> {
     const {id} = req.params;
     console.log("id:",id);
     try{
         await Product.findByIdAndDelete(id);
         res.status(200).json({message: 'Product deleted successfully'});
     }catch(error){
         console.error("Error to delete product: ${error}");
         res.status(404).json({message: 'Product not found'});
     }
 });
 
 router.get('/',async(req,res)=>{
     try{
         const products= await Product.find({});
         res.status(200).json(products);
     }catch(error){
         console.error("Error to get products: ${error}");
         res.status(500).json({message: 'Server Error'});
     }
 })
 
 router.put('/:id',async(req, res)=>{
     const {id}=req.params;
     const product= req.body;
     if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(404).send('No product with that id');
     }
     
     try{
         const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true});
         res.status(200).json(updatedProduct
         )
     }catch(error){
         console.error("Error to update product: ${error}");
         res.status(500).json({message:'Server Error'});
     }
 })
 
 

export default router;
