const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
const {Schema } = mongoose;

const cartSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    userId : { type: Schema.Types.ObjectId, ref: 'User' },
    quantity: { type: Number },
    totalPrice: { type: Number }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart