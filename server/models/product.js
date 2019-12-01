const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
const {Schema} = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        validate: [
            {
                validator: function (name) {
                    return new Promise(function (resolve, reject) {
                        Product.findOne({
                                name
                            })
                            .then(data => {
                                if (data === null) {
                                    resolve(true)
                                } else {
                                    resolve(false)
                                }
                            })
                            .catch(err => {
                                reject(err)
                            })
                    });
                },
                message: props => `Please choose different name`
            }
        ]
    },
    price: {
        type: Number,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    picture_url: {
        type: String
    }
}, {timestamps : true});

const Product = mongoose.model('Product', productSchema);

module.exports = Product