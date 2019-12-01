const chai        = require('chai'),
      chaiHttp    = require('chai-http'),
      expect      = chai.expect,
      app         = require('../app'),
      Helper      = require('../helpers/helper'),
      User        = require('../models/user'),
      Product     = require('../models/product'),
      Cart        = require('../models/cart'),
      Transaction = require('../models/transaction')

chai.use(chaiHttp);

let buyerToken = ''
let buyerId = ''

let bishiBashi = {
    name: 'Bishi Bashi',
    price: 1000000000,
    detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit a, impedit recusandae expedita sunt ratione temporibus, repudiandae tempora distinctio possimus est quibusdam, excepturi molestias quos! Sequi quam laborum aliquam ex.',
    stock: 2,
    category: 'action'
};

let bishiBashiProductId = ''

before(function(done) {
    const buyer = {
        name: 'buyer',
        email: 'buyer@mail.com',
        password: '1234',
        role: 'customer',
        address: 'Bandung',
        phone: 081987654321
    }

    User
    .create(buyer)
    .then(user => {
        let signUser = {
            email: user.email,
            password: user.password
        };
        
        buyerId = user._id
        buyerToken = Helper.generateJWT(signUser)
        
        return Product
        .create(bishiBashi)
    })
    .then(product => {
        bishiBashiProductId = product._id

        let newCart = {
            productId: product._id,
            userId: buyerId,
            quantity: 10,
            totalPrice: 10 * bishiBashi.price
        }

        return Cart
        .create(newCart)
    })
    .then(cart => {
        myCart = cart

        done()
    })
});

after(function(done) {
    Promise.all([Product.deleteMany({}), User.deleteMany({}), Cart.deleteMany({}),Transaction.deleteMany({})]).then(() => done())
});

describe('Transaction Test', function() {
    describe('POST /transactions', function() {
        it('should send an object of transaction', function(done) {
            let quantityBuy = 2
            const customerBuyBishiBashi = {
                userId: buyerId,
                productId: bishiBashiProductId,
                quantity: quantityBuy,
                totalPayment: bishiBashi.price * quantityBuy
            }
            
            chai
                .request(app)
                .post(`/transactions`)
                .set('token', buyerToken)
                .send(customerBuyBishiBashi)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('productId');
                    expect(res.body).to.have.property('userId');
                    expect(res.body).to.have.property('totalPayment');
                    expect(res.body.productId.toString()).to.equal(customerBuyBishiBashi.productId.toString());
                    expect(res.body.userId.toString()).to.equal(customerBuyBishiBashi.userId.toString());
                    expect(res.body.totalPayment).to.equal(customerBuyBishiBashi.totalPayment);

                    done();
                });
        })

        it('should calculate price quantity of 5 product', function(done) {
            let quantityBuy = 5

            const customerBuyBishiBashi_5 = {
                userId: buyerId,
                productId: bishiBashiProductId,
                quantity: quantityBuy,
                totalPayment: bishiBashi.price * quantityBuy
            }
            
            chai
                .request(app)
                .post(`/transactions`)
                .set('token', buyerToken)
                .send(customerBuyBishiBashi_5)
                .end(function(err, res) {
                    (customerBuyBishiBashi_5);
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('productId');
                    expect(res.body).to.have.property('userId');
                    expect(res.body).to.have.property('totalPayment');
                    expect(res.body.productId.toString()).to.equal(customerBuyBishiBashi_5.productId.toString());
                    expect(res.body.userId.toString()).to.equal(customerBuyBishiBashi_5.userId.toString());
                    expect(res.body.totalPayment).to.equal(customerBuyBishiBashi_5.totalPayment);

                    done();
                });
        })

        it('should give error message because invalid type of quantityBuy', function(done) {
            let quantityBuy = 'three'

            const customerBuyBishiBashi_error = {
                userId: buyerId,
                productId: bishiBashiProductId,
                quantity: quantityBuy,
                totalPayment: bishiBashi.price * quantityBuy
            }
            
            chai
                .request(app)
                .post(`/transactions`)
                .set('token', buyerToken)
                .send(customerBuyBishiBashi_error)
                .end(function(err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.equal('Invalid input data');

                    done();
                });
        })

        it('should failed because token is invalid', function(done) {
            let quantityBuy = 5

            const customerBuyBishiBashi_5 = {
                userId: buyerId,
                productId: bishiBashiProductId,
                quantity: quantityBuy,
                totalPayment: bishiBashi.price * quantityBuy
            }
            
            chai
                .request(app)
                .post(`/transactions`)
                .set('token', '234567890sdfghj')
                .send(customerBuyBishiBashi_5)
                .end(function(err, res) {
                    expect(res).to.have.status(500);
                    expect(res.body.name).to.equal('JsonWebTokenError');

                    done();
                });
        })

        it('should failed because userId empty', function(done) {
            let quantityBuy = 5

            const customerBuyBishiBashi_5 = {
                userId: '',
                productId: bishiBashiProductId,
                quantity: quantityBuy,
                totalPayment: bishiBashi.price * quantityBuy
            }
            
            chai
                .request(app)
                .post(`/transactions`)
                .set('token', buyerToken)
                .send(customerBuyBishiBashi_5)
                .end(function(err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.equal('Invalid input data');

                    done();
                });
        })

        it('should failed because userId & productId empty', function(done) {
            let quantityBuy = 5

            const customerBuyBishiBashi_5 = {
                userId: '',
                productId: '',
                quantity: quantityBuy,
                totalPayment: bishiBashi.price * quantityBuy
            }
            
            chai
                .request(app)
                .post(`/transactions`)
                .set('token', buyerToken)
                .send(customerBuyBishiBashi_5)
                .end(function(err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.equal('Invalid input data');

                    done();
                });
        })

        it('should failed because userId, productId and quantity is empty', function(done) {
            let quantityBuy = 5

            const customerBuyBishiBashi_5 = {
                userId: '',
                productId: '',
                quantity: '',
                totalPayment: bishiBashi.price * quantityBuy
            }
            
            chai
                .request(app)
                .post(`/transactions`)
                .set('token', buyerToken)
                .send(customerBuyBishiBashi_5)
                .end(function(err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.equal('Invalid input data');

                    done();
                });
        })

        it('should failed because all props are empty', function(done) {
            let quantityBuy = 5

            const customerBuyBishiBashi_5 = {
                userId: '',
                productId: '',
                quantity: '',
                totalPayment: ''
            }
            
            chai
                .request(app)
                .post(`/transactions`)
                .set('token', buyerToken)
                .send(customerBuyBishiBashi_5)
                .end(function(err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.equal('Invalid input data');

                    done();
                });
        })

        it('should failed because token is empty', function(done) {
            let quantityBuy = 5

            const customerBuyBishiBashi_5 = {
                userId: '',
                productId: bishiBashiProductId,
                quantity: quantityBuy,
                totalPayment: bishiBashi.price * quantityBuy
            }
            
            chai
                .request(app)
                .post(`/transactions`)
                .send(customerBuyBishiBashi_5)
                .end(function(err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body.error).to.equal('Authentication failed');

                    done();
                });
        })
    })
})