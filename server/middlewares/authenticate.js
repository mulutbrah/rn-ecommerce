const Helper = require('../helpers/helper')
const User = require('../models/user')

module.exports = (req, res, next) => {
    let token = req.headers.token;

    if (!token) {
        res.status(401).json({ error: 'Authentication failed' });
    } else {
        try {
            const decoded = Helper.verifyJWT(token);

            User.findOne({email: decoded.email})
            .then(user => {
                req.decoded = decoded
                req.decoded.id = user._id
                req.decoded.role = user.role
                next()
            })
            .catch(err => {
                res.status(401).json({error: 'Authentication failed'})
            })
        } catch (err) {
            res.status(500).json(err)
        }
    }
}