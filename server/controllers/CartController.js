const Cart = require('../models/cart')

class CartController {
    static create(req, res) {
        const {productId, totalPrice, quantity, userId} = req.body

        if(productId && totalPrice && quantity && userId) {
            Cart
            .findOne({productId})
            .populate('productId')
            .then(cart => {
                if(cart) {
                    cart.quantity+=quantity
                    cart.totalPrice=cart.quantity * cart.productId.price

                    return cart.save()
                    .then(cart=> {
                        res.status(201).json(cart)
                    })
                    .catch(err=> {
                        res.status(500).json({msg: err})
                    })
                }else{
                    Cart
                    .create({
                        productId,
                        userId,
                        quantity,
                        totalPrice
                    })
                    .then(cart=> {
                        res.status(201).json(cart)
                    })
                    .catch(err=> {
                        res.status(500).json({msg: err})
                    })
                }
            })
        }else{
            res.status(401).json('Invalid input data')
        }
    }

    static findAll(req, res) {
        Cart
        .find({
            userId: req.decoded.id
        })
        .populate('userId', 'name')
        .populate('productId')
        .then(cart=> {
            res.status(200).json(cart)
        })
        .catch(err=> {
            res.status(400).json({msg: err})
        })
    }

    static delete(req, res) {
        const id = req.params.id

        Cart
        .findByIdAndDelete(id)
        .then(cart=> {
            res.status(202).json(cart)
        })
        .catch(err => {
            res.status(500).json({msg: err})
        })
    }

    static deleteByUser(req, res) {
        Cart
        .deleteMany({userId:req.decoded.id})
        .then(cart=> {
            res.status(202).json(cart)
        })
        .catch(err => {
            res.status(500).json({msg: err})
        })
    }
}

module.exports = CartController
