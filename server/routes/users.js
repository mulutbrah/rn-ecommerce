const routes = require('express').Router();
const UserController = require('../controllers/UserController')

routes.get('/', UserController.list)
routes.get('/:id', UserController.findOne)
routes.put('/:id', UserController.update)

module.exports = routes