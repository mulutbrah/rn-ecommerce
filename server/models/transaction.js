const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
const {Schema } = mongoose;

const transactionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    productId:[{
        type: Schema.Types.ObjectId, 
        ref: 'Product'
    }],
    totalPayment: { 
        type: Number,
        required: [true, 'Total payment is required']
    },
    status: { type: String }
}, {timestamps: true});

transactionSchema.pre('save', function(next, done) {
    this.status = 'paid'
    next()
})

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction