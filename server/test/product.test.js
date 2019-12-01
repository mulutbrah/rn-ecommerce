const chai      = require('chai'),
      chaiHttp  = require('chai-http'),
      expect    = chai.expect,
      app       = require('../app'),
      Helper    = require('../helpers/helper'),
      User    = require('../models/user'),
      Product    = require('../models/product')

let productId = '';
let category = 'action';
let lutfiToken = ''
let lutfiId = ''
let customerToken = ''
let customerId = ''

chai.use(chaiHttp);

before(function(done) {
    const admin = {
        name: 'lutfi',
        email: 'lutfi@mail.com',
        role: 'administrator',
        password: '1234'
    }

    const customer = {
        name: 'customer',
        email: 'customer@mail.com',
        role: 'customer',
        password: '1234'
    }

    User
    .create(admin)
    .then(user => {
        let signUser = {
            email: user.email,
            password: user.password
        };
        
        lutfiId = user._id
        lutfiToken = Helper.generateJWT(signUser)
    })

    User
    .create(customer)
    .then(user => {
        let signUser = {
            email: user.email,
            password: user.password
        };
        
        customerId = user._id
        customerToken = Helper.generateJWT(signUser)
        done()
    })
});

after(function(done) {
    Promise.all([Product.deleteMany({}), User.deleteMany({})]).then(() => done())
});

describe('Product tests', function() {
    describe('GET /products', function() {
        it('should send list of array of product with 200 status code', function(done) {
        chai
            .request(app)
            .get('/products')
            .set('token', lutfiToken)
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
        });
    });

    describe('GET /products/category?category= ', function() {
        it('should send an array with 200 status code', function(done) {
        chai
            .request(app)
            .get(`/products/category?category=${category}`)
            .set('token', lutfiToken)
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
        });
    });

    describe('POST /products', function() {
        it('should send an object of inserted product with 201 status code', function(done) {
            const counterStrike = {
                name: 'Counter Strike',
                price: 1000000000,
                detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit a, impedit recusandae expedita sunt ratione temporibus, repudiandae tempora distinctio possimus est quibusdam, excepturi molestias quos! Sequi quam laborum aliquam ex.',
                stock: 2,
                category: 'fps'
            };

            chai
                .request(app)
                .post('/products')
                .send(counterStrike)
                .set('token', lutfiToken)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('price');
                    expect(res.body).to.have.property('stock');
                    expect(res.body).to.have.property('detail');
                    expect(res.body).to.have.property('category');
                    expect(res.body.name).to.equal(counterStrike.name);
                    expect(res.body.price).to.equal(counterStrike.price);
                    expect(res.body.detail).to.equal(counterStrike.detail);
                    expect(res.body.stock).to.equal(counterStrike.stock);
                    expect(res.body.category).to.equal(counterStrike.category);
                    productId = res.body._id
                    done();
            });
        });

        it('should send error status 403 "Not authorize"', function(done) {
            const counterStrike2 = {
                name: 'Counter Strike 2',
                price: 1000000000,
                detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit a, impedit recusandae expedita sunt ratione temporibus, repudiandae tempora distinctio possimus est quibusdam, excepturi molestias quos! Sequi quam laborum aliquam ex.',
                stock: 2,
                category: 'fps'
            };

            chai
                .request(app)
                .post('/products')
                .send(counterStrike2)
                .set('token', customerToken)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(403);
                    expect(res.body.err).to.equal('Not authorize');

                    done();
            });
        });

        it('should send error status 401 "Not authorize"', function(done) {
            const counterStrike2 = {
                name: 'Counter Strike 2',
                price: 1000000000,
                detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit a, impedit recusandae expedita sunt ratione temporibus, repudiandae tempora distinctio possimus est quibusdam, excepturi molestias quos! Sequi quam laborum aliquam ex.',
                stock: 2,
                category: 'fps'
            };

            chai
                .request(app)
                .post('/products')
                .send(counterStrike2)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401);
                    expect(res.body.error).to.equal('Authentication failed');

                    done();
            });
        });

        it('should send error status 401 "Not authorize"', function(done) {
            const counterStrike3 = {
                name: 'Counter Strike 3',
                price: 1000000000,
                detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit a, impedit recusandae expedita sunt ratione temporibus, repudiandae tempora distinctio possimus est quibusdam, excepturi molestias quos! Sequi quam laborum aliquam ex.',
                stock: 2,
                category: 'fps'
            };

            chai
                .request(app)
                .put(`/products/${productId}`)
                .send(counterStrike3)
                .set('token', customerToken)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(403);
                    expect(res.body.err).to.equal('Not authorize');

                    done();
            });
        });

        it('should send error status 401 "Not authorize"', function(done) {
            const counterStrike4 = {
                name: 'Counter Strike 3',
                price: 1000000000,
                detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit a, impedit recusandae expedita sunt ratione temporibus, repudiandae tempora distinctio possimus est quibusdam, excepturi molestias quos! Sequi quam laborum aliquam ex.',
                stock: 2,
                category: 'fps'
            };

            chai
                .request(app)
                .put(`/products/${productId}`)
                .send(counterStrike4)
                .set('token', customerToken)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(403);
                    expect(res.body.err).to.equal('Not authorize');

                    done();
            });
        });
    });

    describe(`PUT /products/:id`, function() {
        it('should send an object of updated product with 201 status code', function(done) {

        const ragnarokOnline = {
            name: 'Ragnarok Online',
            price: 70000000,
            detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit a, impedit recusandae expedita sunt ratione temporibus, repudiandae tempora distinctio possimus est quibusdam, excepturi molestias quos! Sequi quam laborum aliquam ex.',
            stock: 5,
            category: 'rpg',
            picture_url: ''
        };

        chai
            .request(app)
            .put(`/products/${productId}`)
            .send(ragnarokOnline)
            .set('token', lutfiToken)
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('price');
                expect(res.body).to.have.property('stock');
                expect(res.body).to.have.property('detail');
                expect(res.body).to.have.property('category');
                expect(res.body.name).to.equal(ragnarokOnline.name);
                expect(res.body.price).to.equal(ragnarokOnline.price);
                expect(res.body.detail).to.equal(ragnarokOnline.detail);
                expect(res.body.stock).to.equal(ragnarokOnline.stock);
                expect(res.body.category).to.equal(ragnarokOnline.category);

                done();
            });
        });

        it("failed update when token is invalid", function(done){
            const sealOnline = {
                name: 'Seal Online',
                price: 70000000,
                detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit a, impedit recusandae expedita sunt ratione temporibus, repudiandae tempora distinctio possimus est quibusdam, excepturi molestias quos! Sequi quam laborum aliquam ex.',
                stock: 5,
                category: 'rpg',
                picture_url: ''
            };

            chai
            .request(app)
            .put(`/products/${productId}`)
            .send(sealOnline)
            .set('token', 'alknfalknasdfalkfn2131111331131232aleknf')
            .end(function(err,res){
                expect(res).to.have.status(500);
                expect(res.body.name).to.equal('JsonWebTokenError');
                done()
            })
        })

        it("failed update when user not logged in with status code 401", function(done){
            const sealOnline = {
                name: 'Seal Online',
                price: 70000000,
                detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit a, impedit recusandae expedita sunt ratione temporibus, repudiandae tempora distinctio possimus est quibusdam, excepturi molestias quos! Sequi quam laborum aliquam ex.',
                stock: 5,
                category: 'rpg',
                picture_url: ''
            };

            chai
            .request(app)
            .put(`/products/${productId}`)
            .send(sealOnline)
            .end(function(err,res){
                expect(res).to.have.status(401);
                expect(res.body.error).to.equal('Authentication failed');
                done()
            })
        })
    });

    describe('DELETE /products/:id', function() {
        it("should failed delete product because id invalid with status 401 and message 'Product not found'", function(done){
            chai
            .request(app)
            .delete(`/products/${lutfiId}`)
            .set('token', lutfiToken)
            .end(function(err,res){
                expect(res).to.have.status(401)
                expect(res.body).to.equal('Product not found');
                done()
            })
        })

        it("failed delete when token is invalid", function(done){
            chai
            .request(app)
            .delete(`/products/${productId}`)
            .set('token', "alknfalknasdfalkfn2131111331131232aleknf")
            .end(function(err,res){
                expect(res).to.have.status(500)
                done()
            })
        })

        it("failed delete when token is invalid/user not logged in with status code 401", function(done){
            chai
            .request(app)
            .delete(`/products/${productId}`)
            .end(function(err,res){
                expect(res).to.have.status(401)
                expect(res.body.error).to.equal('Authentication failed');

                done()
            })
        })

        it('should send an object of deleted product with 200 status code', function(done) {
            chai
            .request(app)
            .delete(`/products/${productId}`)
            .set('token', lutfiToken)
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('price');
                expect(res.body).to.have.property('stock');
                expect(res.body).to.have.property('detail');
                expect(res.body._id).to.equal(`${productId}`);
                done();
            });
        });
    });
});
