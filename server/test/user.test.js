const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
const User = require('../models/user');

chai.use(chaiHttp);

const lutfi = {
    name: 'lutfi',
    email: 'lutfi@email.com',
    role: 'administrator',
    password: '1234'
}

const lutfiCustomer = {
    name: 'lutfi',
    email: 'lutfi_2@email.com',
    role: 'customer',
    password: '1234'
}
let lutfiCustomerId = ''

after(done => {
    User
     .deleteMany({}, () => {
       done();
     })
})

describe('User Test', function() {
    describe('POST /register', function() {
        it("should return status code 201 with response body registered user with role administrator", function (done) {
            chai
            .request(app)
            .post("/register")
            .send(lutfi)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body).to.be.an("object")
                expect(res.body).to.have.keys(["__v", "_id", "email","name", "role","password", "picture_url", "address", "phone", "createdAt", "updatedAt"]);
                expect(res.body.name).to.equal("lutfi")
                expect(res.body.email).to.equal("lutfi@email.com")
                expect(res.body.role).to.equal("administrator")

                done()
            });
        });

        it("should return status code 201 with response body registered user with role 'customer'", function (done) {
            chai
            .request(app)
            .post("/register")
            .send(lutfiCustomer)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body).to.be.an("object")
                expect(res.body).to.have.keys(["__v", "_id", "email","name", "role","password", "picture_url", "address", "phone", "createdAt", "updatedAt"]);
                expect(res.body.name).to.equal("lutfi")
                expect(res.body.email).to.equal("lutfi_2@email.com")
                expect(res.body.role).to.equal("customer")
                lutfiCustomer.picture_url = res.body.picture_url
                lutfiCustomer.address = res.body.address
                lutfiCustomer.phone = res.body.phone
                lutfiCustomerId = res.body._id

                done()
            });
        });

        it("should return status code 201 with response password hashed", function (done) {
            const odin = {
                name: 'odin',
                email: 'odin@email.com',
                role: 'customer',
                password: '1234'
            }

            chai
            .request(app)
            .post("/register")
            .send(odin)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body.name).to.equal(odin.name)
                expect(res.body.email).to.equal(odin.email)
                expect(res.body.password).not.to.equal(odin.password)
                done()
            });
        });

        it("should return status code 409 with response body 'Email has been used' registering same email", function (done) {
            const sameEmail = {
                name: 'lutfi',
                email: 'lutfi@email.com',
                role: 'administrator',
                password: '1234'
            }

            chai
            .request(app)
            .post("/register")
            .send(sameEmail)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(409);
                expect(res.body.err).to.equal('Email has been used')

                done()
            });
        });

        it("should return status code 409 with response body 'Invalid email format' because wrong email format", function (done) {
            const wrongEmail = {
                name: 'lutfi',
                email: 'lutfi@email..com',
                role: 'administrator',
                password: '1234'
            }

            chai
            .request(app)
            .post("/register")
            .send(wrongEmail)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(409);
                expect(res.body.err).to.equal('Invalid email format')

                done()
            });
        });

        it("should return status code 409 with response body 'Invalid email format' because name data type is number", function (done) {
            const wrongEmail = {
                name: 'lutfi',
                email: 'lutfi@email..com',
                role: 'administrator',
                password: '1234'
            }

            chai
            .request(app)
            .post("/register")
            .send(wrongEmail)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(409);
                expect(res.body.err).to.equal('Invalid email format')

                done()
            });
        });

        it("should return status code 401 with response body 'Invalid input data' because all value is null", function (done) {
            const wrongUser = {
                name: null,
                email: null,
                role: null,
                password: null
            }

            chai
            .request(app)
            .post("/register")
            .send(wrongUser)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(401);
                expect(res.text).to.equal('"Invalid input data"')
                
                done()
            });
        });

        it("should return status code 401 with response body 'Invalid input data' because name value is null", function (done) {
            const wrongUser = {
                name: null,
                email: 'harrypotter@mail.com',
                role: 'administrator',
                password: '123456'
            }

            chai
            .request(app)
            .post("/register")
            .send(wrongUser)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(401);
                expect(res.text).to.equal('"Invalid input data"')
                
                done()
            });
        });

        it("should return status code 401 with response body 'Invalid input data' because email value is null", function (done) {
            const wrongUser = {
                name: 'harrypotter',
                email: null,
                role: 'administrator',
                password: '123456'
            }

            chai
            .request(app)
            .post("/register")
            .send(wrongUser)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(401);
                expect(res.text).to.equal('"Invalid input data"')
                
                done()
            });
        });

        it("should return status code 401 with response body 'Invalid input data' because password value is null", function (done) {
            const wrongUser = {
                name: 'harrypotter',
                email: 'harrypotter@mail.com',
                role: 'administrator',
                password: null
            }

            chai
            .request(app)
            .post("/register")
            .send(wrongUser)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(401);
                expect(res.text).to.equal('"Invalid input data"')
                
                done()
            });
        });

        it("should return status code 401 with response body 'Invalid input data' because name & email value is null", function (done) {
            const wrongUser = {
                name: null,
                email: null,
                role: 'administrator',
                password: '123456'
            }

            chai
            .request(app)
            .post("/register")
            .send(wrongUser)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(401);
                expect(res.text).to.equal('"Invalid input data"')
                
                done()
            });
        });

        it("should return status code 401 with response body 'Invalid input data' because name & password value is null", function (done) {
            const wrongUser = {
                name: null,
                email: 'harrypotter@mail.com',
                role: 'administrator',
                password: null
            }

            chai
            .request(app)
            .post("/register")
            .send(wrongUser)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(401);
                expect(res.text).to.equal('"Invalid input data"')
                
                done()
            });
        });

        it("should return status code 401 with response body 'Invalid input data' because name & password value is null", function (done) {
            const wrongUser = {
                name: null,
                email: 'harrypotter@mail.com',
                role: 'administrator',
                password: null
            }

            chai
            .request(app)
            .post("/register")
            .send(wrongUser)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(401);
                expect(res.text).to.equal('"Invalid input data"')
                
                done()
            });
        });
    })

    describe('POST /login', function() {
        it('should send an object of user loggedin user with 200 status code', function(done) {
            chai
                .request(app)
                .post('/login')
                .send({
                    email: lutfi.email,
                    password: lutfi.password
                })
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('token');
                    expect(res.body).to.have.property('name');
                    expect(res.body.name).to.equal(`${lutfi.name}`);
                    expect(res.body.email).to.equal(`${lutfi.email}`);
                    done();
                });
        })

        it("should return code 401 with response 'Username/password wrong' because wrong key", function(done){
            chai
            .request(app)
            .post("/login")
            .send({
                emailsdss: 'lutfi@mail.com',
                password: 'error'
            })
            .end(function(err, res){
                expect(err).to.be.null;
                expect(res).to.have.status(401)
                expect(res.body).to.equal('Invalid input data')
                done()
            })
        });

        it("should return code 401 with response 'Username/password wrong' because wrong key", function(done){
            chai
            .request(app)
            .post("/login")
            .send({
                email: 'lutfi@mail.com',
                pswd: '1234'
            })
            .end(function(err, res){
                expect(err).to.be.null;
                expect(res).to.have.status(401)
                expect(res.body).to.equal('Invalid input data')
                done()
            })
        });

        it("should return code 401 with response 'Username/password wrong' because wrong value", function(done){
            chai
            .request(app)
            .post("/login")
            .send({
                email: 'lutfi@mail.com',
                password: 'error'
            })
            .end(function(err, res){
                expect(err).to.be.null;
                expect(res).to.have.status(401)
                expect(res.text).to.equal('"Username/password wrong"')
                done()
            })
        });

        it("should return code 401 with response 'Invalid input data' because email empty", function(done){
            chai
            .request(app)
            .post("/login")
            .send({
                email: '',
                password: '1234'
            })
            .end(function(err, res){
                expect(err).to.be.null;
                expect(res).to.have.status(401)
                expect(res.body).to.equal('Invalid input data')
                done()
            })
        });

        it("should return code 401 with response 'Invalid input data' because password empty", function(done){
            chai
            .request(app)
            .post("/login")
            .send({
                email: 'lutfi@mail.com',
                password: ''
            })
            .end(function(err, res){
                expect(err).to.be.null;
                expect(res).to.have.status(401)
                expect(res.body).to.equal('Invalid input data')

                done()
            })
        });

        it("should return code 401 with response 'Invalid input data' because email & password empty", function(done){
            chai
            .request(app)
            .post("/login")
            .send({
                email: '',
                password: ''
            })
            .end(function(err, res){
                expect(err).to.be.null;
                expect(res).to.have.status(401)
                expect(res.body).to.equal('Invalid input data')

                done()
            })
        });

        it("should return code 401 with response 'Invalid input data' because value email null", function(done){
            chai
            .request(app)
            .post("/login")
            .send({
                email: null,
                password: '1234'
            })
            .end(function(err, res){
                expect(err).to.be.null;
                expect(res).to.have.status(401)
                expect(res.body).to.equal('Invalid input data')
                done()
            })
        });

        it("should return code 401 with response 'Invalid input data' because value password null", function(done){
            chai
            .request(app)
            .post("/login")
            .send({
                email: 'lutfi@mail.com',
                password: null
            })
            .end(function(err, res){
                expect(err).to.be.null;
                expect(res).to.have.status(401)
                expect(res.body).to.equal('Invalid input data')
                done()
            })
        });

        it("should return code 401 with response 'Username/password wrong' because wrong email format", function(done){
            chai
            .request(app)
            .post("/login")
            .send({
                email: 'lutfi@mail..com',
                password: '1234'
            })
            .end(function(err, res){
                expect(err).to.be.null;
                expect(res).to.have.status(401)
                expect(res.body).to.equal('Username/password wrong')
                done()
            })
        });
    })

    describe('PUT /:id', function() {
        describe('Update address', function() {
            it("should return code 200 with address updated", function(done){
                chai
                .request(app)
                .put(`/users/${lutfiCustomerId}`)
                .send({
                    address: 'Ubud Bali'
                })
                .end(function(err, res){
                    expect(err).to.be.null;
                    expect(res).to.have.status(200)
                    expect(res.body.name).to.equal(lutfiCustomer.name)
                    expect(res.body.email).to.equal(lutfiCustomer.email)
                    expect(res.body.role).to.equal(lutfiCustomer.role)
                    expect(res.body.phone).to.equal(lutfiCustomer.phone)
                    expect(res.body.address).to.equal('Ubud Bali')
                    lutfiCustomer.address = res.body.address

                    done()
                })
            });
        });

        describe('Update phone', function() {
            it("should return code 200 with phone updated", function(done){
                chai
                .request(app)
                .put(`/users/${lutfiCustomerId}`)
                .send({
                    phone: '0851312313882'
                })
                .end(function(err, res){
                    expect(err).to.be.null;
                    expect(res).to.have.status(200)
                    expect(res.body.name).to.equal(lutfiCustomer.name)
                    expect(res.body.email).to.equal(lutfiCustomer.email)
                    expect(res.body.role).to.equal(lutfiCustomer.role)
                    expect(res.body.address).to.equal(lutfiCustomer.address)
                    expect(res.body.phone).to.equal('0851312313882')
                    lutfiCustomer.phone = res.body.phone

                    done()
                })
            });
        });
    })
})