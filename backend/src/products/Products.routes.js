const express = require('express')
const router = express.Router()
const Product = require('./Product.model')
const {postProduct, getProducts, getProduct, editProduct, deleteProduct} = require('./Product.controller')


///post 
router.post('/create-product', postProduct)


//get all products
router.get('/', getProducts)

router.get('/:id', getProduct)


router.put('/edit/:id', editProduct)

router.delete('/delete/:id', deleteProduct)

module.exports = router