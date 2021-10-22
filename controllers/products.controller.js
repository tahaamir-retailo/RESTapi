// Start of file
const product = require('../models/product');

const findAllProducts = async (req, res) => {
    const products = await product.find();
    res.json(products);
}

const searchForProduct = async (req, res) => {
    const searchCriteria = req.query._id;
    console.log('search params', searchCriteria);
    const products = await product.find({_id: searchCriteria});
    res.json(products);
}

const addProduct = async (req, res) => {
    const { name, stock, type } = req.body;
    const newProduct = new product({name, stock, type});
    const savedObject = await newProduct.save();
    res.json(savedObject);
}

const updateProduct = async (req, res) => {
    const { _id, name, stock, type } = req.body;
    const updateProduct = await product.updateOne({_id}, {name , stock, type});
    res.json(updateProduct);
}

module.exports = {
    findAllProducts,
    searchForProduct,
    addProduct,
    updateProduct
}
