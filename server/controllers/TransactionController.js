const Transaction = require('../models/transaction')
const Cart = require('../models/cart')
const Product = require('../models/product')

class TransactionController {
    static create(req, res) {
        const {userId, productId, totalPayment} = req.body
        let trans = {}

        if(userId && productId && totalPayment) {
            Transaction
            .create({
                userId,
                productId,
                totalPayment
            })
            .then(transaction => {
                trans = transaction

                return Cart
                .find({userId: req.decoded.id})
            })
            .then(carts => {
                carts.forEach(cart => {
                    return Product
                    .findOne({_id: cart.productId})
                    .then(product => {
                        product.stock-=cart.quantity

                        return product.save({ validateBeforeSave: false })
                    })
                })
            })
            .then(resultUpdate => {
                return Cart
                .deleteMany({userId:req.decoded.id})
            })
            .then(cart=> {
                res.status(201).json(trans)
            })
            .catch(err => {
                res.status(500).json(err)
            })
        }else{
            res.status(401).json('Invalid input data')
        }
    }

    static findBelongs(req, res) {
        Transaction
        .find({
            userId: req.decoded.id
        })
        .populate('productId')
        .then(transactions=>{
            res.status(200).json(transactions)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static list(req, res) {
        Transaction
        .find()
        .sort({createdAt: -1})
        .populate('productId')
        .populate('userId')
        .then(transactions=>{
            res.status(200).json(transactions)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static changeStatus(req, res) {
        const status = req.params.status
        const {transactionId} = req.body

        Transaction
        .findOneAndUpdate({
            _id: transactionId,
            userId: req.decoded.id
        }, {
            status
        }, {new:true})
        .then(transaction=>{
            res.status(200).json(transaction)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = TransactionController
