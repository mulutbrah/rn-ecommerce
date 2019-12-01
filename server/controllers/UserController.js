const User = require('../models/user')
const Helper = require('../helpers/helper')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID);
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'lutfii.dev@gmail.com',
           pass: '1412Dev!'
    }
});

class UserController {
    static register(req, res) {
        const {email, password, name} = req.body

        let role = req.body.role === 'administrator' ? 'administrator' : 'customer'

        if(email && password && name && role) {
            User.create({
                name, email, password, role
            })
            .then(user=> {
                const mailOptions = {
                    from: 'lutfii.dev@gmail.com',
                    to: `${user.email}`,
                    subject: 'Welcome to GameStation!',
                    html: `
                    <div>
                        <p>Hello ${user.name}!</p>
                        <p>
                            You have succesfully registered in our community.
                        </p>
                    </div>
                    `
                };

                transporter.sendMail(mailOptions, function (err, info) {
                if(err) throw err
                });


                res.status(201).json(user)
            })
            .catch(err => {
                if (err.errors.email) {
                    res.status(409).json({ err: err.errors.email.reason });
                } else if(err.errors.password) {
                    res.status(409).json({ err: err.errors.password.message });
                } else {
                    res.status(500).json(err);
                }
            })
        }else{
            res.status(401).json('Invalid input data')
        }
    }

    static list(req, res) {
        User.find({})
        .then(user=> {
            if(user) {
                res.status(200).json(user)
            }else{
                res.status(400).json('User not found')
            }
        })
        .catch(err => {
            res.status(500).json({msg:err})
        })
    }

    static findOne(req, res) {
        User.findById(req.params.id)
        .then(user=> {
            if(user) {
                res.status(200).json(user)
            }else{
                res.status(400).json('User not found')
            }
        })
        .catch(err => {
            res.status(500).json({msg:err})
        })
    }

    static login(req, res) {
        const {email, password} = req.body

        if( email && password ) {
            User.findOne({
                email
            })
            .then(user => {
                if(!user) {
                    res.status(401).json('Username/password wrong')
                } else {
                    if( Helper.comparePassword(password, user.password) ) {
                        let token = Helper.generateJWT({
                            email: user.email,
                            name: user.name,
                            id: user._id
                        });

                        let finalToken = {
                            token,
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role
                        };

                        res.status(200).json(finalToken)
                    }else{
                        res.status(401).json('Username/password wrong')
                    }
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
        }else{
            res.status(401).json('Invalid input data')
        }
    }

    static loginGoogle(req, res) {
        let newEmail = ''
        let newName = ''

        client.verifyIdToken({
            idToken: req.headers.token,
            audience: process.env.CLIENT_ID
        })
        .then(function(ticket) {
            newEmail = ticket.getPayload().email
            newName = ticket.getPayload().name
            return User.findOne({
                email: newEmail
            })
        })
        .then(function(userLogin) {
            if (!userLogin) {
                return User.create({
                    name: newName,
                    email: newEmail,
                    password: 'password'
                })
            } else {
                return userLogin
            }
        })
        .then(function(newUser) {
            let token = Helper.generateJWT({
                email: newUser.email,
                name: newUser.name,
                id: newUser._id
            });

            let obj = {
                token,
                id: newUser._id,
                name: newUser.name
            }
            res.status(200).json(obj)
        })
        .catch(function(err) {
            res.status(500).json(err)
        })
    }

    static update(req, res) {
        let obj = {}
        for(let key in req.body) {
            obj[key] = req.body[key]
        }

        User.findOneAndUpdate({_id: req.params.id}, obj, {new:true})
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = UserController
