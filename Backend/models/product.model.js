import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true,
    },
    image:{
        type: String,
        required: true,
    }
},{
    timestamps:true // this will automatically create a timestamp for when the product was created.
});

const Product= mongoose.model('Product', productSchema); // Mongoose automatically write name of the table as products, it expects developers to write here as "Product" and it will automatically convert it to plural and lowercase.
export default Product;