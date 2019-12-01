const routes = require('express').Router();
const products = require('./products')
const carts = require('./carts')
const users = require('./users')
const transactions = require('./transactions')
const UserController = require('../controllers/UserController')
const Authentication = require('../middlewares/authenticate')

routes.post('/register', UserController.register)
routes.post('/login', UserController.login)

routes.use('/users', users)
routes.use('/products', products)
routes.use('/carts', Authentication, carts)
routes.use('/transactions', Authentication, transactions)

routes.get('*', (req,res) => {
    res.status(404).json('Page not found')
})

module.exports = routes