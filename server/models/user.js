const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
const {Schema} = mongoose;
const Helper = require('../helpers/helper')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [
            {
                validator: function(value) {
                    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                        throw 'Invalid email format'
                    }
                },
            },
            {
                validator: function(value) {
                  return User.find({
                        _id: { $ne: this._id },
                        email: value
                     })
                    .then( data => {
                        if(data.length !== 0) {
                            throw 'Email has been used';
                        }
                    })
                    .catch(err => {
                        throw err;
                    });
                }
            }
        ]
    },
    role: {
        type: String,
        required: [true, 'Role is required']
    },
    password: {
        type: String,
        required: [ true, 'Password is required' ],
        minlength: [4, 'Password min length is 4'],
    },
    picture_url: {
        type: String,
        default: ''
    },
    address : {
        type: String,
        default: ''
    },
    phone : {
        type: String,
        default: '',
        min: [10, 'Phone length 10-13'],
        max: [13, 'Phone length 10-13']
    }
}, {timestamps: true});

userSchema.pre('save', function(next, done) {
    this.password = Helper.hashPassword(this.password)
    next()
});

const User = mongoose.model('User', userSchema);

module.exports = User