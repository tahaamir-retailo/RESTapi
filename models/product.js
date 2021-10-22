const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    name: String,
    stock: Number,
    type: String
});

module.exports = model('Product', productSchema);
