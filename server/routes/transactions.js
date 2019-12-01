const routes = require('express').Router();
const {isAdmin} = require('../middlewares/authorize')
const TransactionController = require('../controllers/TransactionController')

routes.get('/', isAdmin, TransactionController.list)
routes.get('/user-transaction', TransactionController.findBelongs)
routes.post('/', TransactionController.create)
routes.patch('/change/:status', TransactionController.changeStatus)

module.exports = routes