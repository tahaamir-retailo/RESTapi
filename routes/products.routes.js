const { Router } = require('express');
//const { register,sign_in,loginRequired } = require('../controllers/userController');
const router = Router();
const { findAllProducts, addProduct, updateProduct, searchForProduct }  = require('../controllers/products.controller');

router.get('/', findAllProducts);
router.get('/search', searchForProduct);
router.post('/', addProduct);
router.patch('/', updateProduct);


module.exports = router;