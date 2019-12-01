const Product = require('../models/product')

class ProductController {
    static list(req, res) {
        Product
        .find()
        .then((products) => {
            res.status(200).json(products);
        })
        .catch((err) => {
            res.status(500).json({
                message: 'Internal server error',
                err
            });
        });
    }

    static findOne(req, res) {
        const id = req.params.id

        Product
        .findById(id)
        .then(product => {
            res.status(200).json(product)
        })
        .catch(err => {
            res.status(500).json({
                message: 'Internal server error',
                err
            });
        })
    }

    static findOneAndNext(req, res, next) {
        const id = req.params.id

        Product
        .findById(id)
        .then(product => {
            if(product) {
                req.headers.picture_url = product.picture_url
                next()
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Internal server error',
                err
            });
        })
    }

    static findByCategory(req,res) {
        const categories = ['action', 'rpg', 'puzzle', 'fps', 'casual', 'voucher']

        if(categories.includes(req.query.category)) {
            Product
            .find({
                category: req.query.category
            })
            .then(product => {
                res.status(200).json(product)
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Internal server error',
                    err
                });
            })
        }else{
            res.status(401).json('Invalid category')
        }
    }

    static search(req, res) {
        const query = req.query ? req.query.q : ''

        Product.find({'name': new RegExp(query, 'i')})
        .then(products => {
            res.status(200).json(products)
        })
        .catch(err => {
            res.status(500).json({msg: 'Internal server error'})
        })
    }

    static create(req, res) {
        const { name, price, stock, category, detail } = req.body
        const picture_url = req.file ? req.file.cloudStoragePublicUrl : ''
        const categories = ['action', 'rpg', 'puzzle', 'fps', 'casual', 'voucher']

        if(categories.includes(category)) {
            Product
            .create({
                name,
                price,
                detail,
                stock,
                category,
                picture_url
            })
            .then(function (product) {
                res.status(201).json(product);
            })
            .catch(function (err) {
                res.status(500).json({
                    message: 'Internal server error',
                    err
                });
            });
        }else{
            res.status(401).json('Invalid category')
        }
    }

    static update(req, res) {
        let obj = {}

        for(let key in req.body) {
            obj[key] = req.body[key]
        }

        if(req.file) {
            obj.picture_url=req.file.cloudStoragePublicUrl
        }

        Product
        .findByIdAndUpdate(req.params.id, obj, {new:true})
        .then(function (product) {
            res.status(200).json(product);
        })
        .catch(function (err) {
            res.status(500).json({
                message: 'Internal server error',
                err
            });
        });
    }

    static delete(req, res) {
        Product
        .findByIdAndDelete(req.params.id)
        .then(function (product) {
            if(product) {
                res.status(200).json(product);
            }else{
                res.status(401).json('Product not found');
            }
        })
        .catch(function (err) {
            res.status(500).json({
                message: 'Internal server error',
                err
            });
        });
    }
}

module.exports = ProductController
