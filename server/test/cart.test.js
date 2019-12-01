const chai      = require('chai'),
      chaiHttp  = require('chai-http'),
      expect    = chai.expect,
      app       = require('../app'),
      Helper    = require('../helpers/helper'),
      User      = require('../models/user'),
      Product   = require('../models/product'),
      Cart      = require('../models/cart')

chai.use(chaiHttp);

let squidwardToken = ''
let squidwardId = ''

let godOfWar = {
    name: 'God Of War',
    price: 1000000000,
    detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit a, impedit recusandae expedita sunt ratione temporibus, repudiandae tempora distinctio possimus est quibusdam, excepturi molestias quos! Sequi quam laborum aliquam ex.',
    stock: 2,
    category: 'action',
    userId: null
};
let firstBuy = 2

before(function(done) {
    const squidward = {
        name: 'squidward',
        email: 'squidward@mail.com',
        role: 'customer',
        password: '1234'
    }

    User
    .create(squidward)
    .then(user => {
        let signUser = {
            email: user.email,
            password: user.password
        };
        
        squidwardId = user._id
        squidwardToken = Helper.generateJWT(signUser)
        
        return Product
        .create(godOfWar)
    })
    .then(product => {
        godOfWar.userId = squidwardId
        godOfWar.productId = product._id
        done()
    })
});

after(function(done) {
    Promise.all([Product.deleteMany({}), Cart.deleteMany({}), User.deleteMany({})]).then(() => done())
});

describe('Cart Test', function() {
    describe('POST /cart', function() {
        it('should send an object of cart', function(done) {
            firstBuy = 2
            const squidwardBuyGodOfWar = {
                productId: godOfWar.productId,
                userId: squidwardId,
                quantity: firstBuy,
                totalPrice: godOfWar.price * firstBuy
            }
            
            chai
                .request(app)
                .post(`/carts`)
                .set('token', squidwardToken)
                .send(squidwardBuyGodOfWar)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('productId');
                    expect(res.body).to.have.property('userId');
                    expect(res.body).to.have.property('quantity');
                    expect(res.body).to.have.property('totalPrice');
                    expect(res.body.productId.toString()).to.equal(squidwardBuyGodOfWar.productId.toString());
                    expect(res.body.userId.toString()).to.equal(squidwardBuyGodOfWar.userId.toString());
                    expect(res.body.quantity).to.equal(squidwardBuyGodOfWar.quantity);

                    done();
                });
        })

        it('should calculate price quantity of 5 + 2 product', function(done) {
            let quantityBuy = 5

            const squidwardBuyGodOfWar_5 = {
                productId: godOfWar.productId,
                userId: squidwardId,
                quantity: quantityBuy,
                totalPrice: godOfWar.price * quantityBuy
            }
            
            chai
                .request(app)
                .post(`/carts`)
                .set('token', squidwardToken)
                .send(squidwardBuyGodOfWar_5)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body.totalPrice).to.equal(godOfWar.price * quantityBuy + godOfWar.price*firstBuy);

                    done();
                });
        })

        it('should give error message because invalid type of quantityBuy', function(done) {
            let quantityBuy = 'three'

            const squidwardBuyGodOfWar_error = {
                productId: godOfWar.productId,
                userId: squidwardId,
                quantity: quantityBuy,
                totalPrice: godOfWar.price * quantityBuy
            }
            
            chai
                .request(app)
                .post(`/carts`)
                .set('token', squidwardToken)
                .send(squidwardBuyGodOfWar_error)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401);
                    expect(res.body).to.equal('Invalid input data');

                    done();
                });
        })
    })
})