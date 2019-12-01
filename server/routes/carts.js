const express = require('express');
const routes = express.Router();
const CartController = require('../controllers/CartController')
const {CartAutherization} = require('../middlewares/authorize')

routes.get('/', CartController.findAll)
routes.post('/', CartController.create)
// routes.put('/:id', Autherization, ProductController.update)
// routes.patch('/:id', Autherization, ProductController.update)
routes.delete('/:id', CartAutherization, CartController.delete)
routes.delete('/belongs/:id', CartController.deleteByUser)

module.exports = routes