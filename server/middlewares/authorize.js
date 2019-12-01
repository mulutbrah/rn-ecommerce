const Product = require('../models/product')
const Cart = require('../models/cart')

module.exports = {
    isAdmin: (req, res, next) => {
        if(req.headers.hasOwnProperty('token')) {
            if(req.decoded.role==='administrator') {
                next()
            }else{
                res.status(403).json({ err: 'Not authorize' });
            }
        }else {
            res.status(403).json({'err': 'Not authorize'})
        }
    },
    ProductAutherization:(req, res, next) =>{
        if(req.headers.hasOwnProperty('token')) {
            Product.findById(req.params.id)
            .then((product) => {
                if(product.userId.toString()==req.decoded.id) {
                    next()
                }else{
                    res.status(403).json({ err: 'Not authorize' });
                }
            })
            .catch(err => {
                res.status(500).json({'msg': 'Request error'})
            })
        }else {
            res.status(403).json({'err': 'Not authorize'})
        }
    },
    CartAutherization:(req, res, next) => {
        if(req.headers.hasOwnProperty('token')) {
            Cart.findById(req.params.id)
            .then((cart) => {
                if(cart.userId.toString()==req.decoded.id) {
                    next()
                }else{
                    res.status(403).json({ err: 'Not authorize' });
                }
            })
            .catch(err => {
                res.status(500).json({'msg': 'Request error'})
            })
        }else {
            res.status(403).json({'err': 'Not authorize'})
        }
    }
}
