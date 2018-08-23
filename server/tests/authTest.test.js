import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
chai.should();

const email = Math.random().toString(36).substring(2, 15);
const username = Math.random().toString(36).substring(2, 15);

describe('Authentication', () => {
  describe('User Account Creation', () => {
    it('should create account if the required fields are provided', (done) => {
      const user = {
        username: `${username}`,
        email: `${email}@gmail.com`,
        password: 'lastmanstanding'
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((error, response) => {
          response.should.have.status(201);
          response.should.be.an('object');
          response.should.have.property('message').to.equal('User successfully created');
          done();
        });
    });
    it('should not create account if the user already exists', (done) => {
      const user = {
        username: 'Sullivan',
        email: 'wiztemple@gmail.com',
        password: 'lastmanstanding',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((error, response) => {
          response.should.have.status(409);
          response.should.be.an('object');
          response.should.have.property('message').to.equal('user already exists');
          done();
        });
    });
    it('should not create account if the email format is invalid', (done) => {
      const user = {
        username: 'Sullivan',
        email: 'wiztemgmail.com',
        password: 'lastdass'
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((error, response) => {
          response.should.have.status(400);
          response.should.have.property('message').to.equal('invalid email');
          done();
        });
    });
    it('should not create account if the the provided password is not greater than 5', (done) => {
      const user = {
        username: 'Sullivan',
        email: 'wiztemple@gmail.com',
        password: 'las',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((error, response) => {
          response.should.have.status(400);
          response.should.have.property('message').to.equal('password must be greater than 5');
          done();
        });
    });
    it('should not create account if username field is empty', (done) => {
      const user = {
        username: '',
        email: 'wiztemple@gmail.com',
        password: 'last',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((error, response) => {
          response.should.have.status(400);
          response.should.have.property('message').to.equal('username is required');
          done();
        });
    });
    it('should not create account if username fcontains special character', (done) => {
      const user = {
        username: 'lets###',
        email: 'wiztemple@gmail.com',
        password: 'last',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((error, response) => {
          response.should.have.status(400);
          response.should.have.property('message').to.equal('username is required');
          done();
        });
    });
    it('should not create account if the email is empty', (done) => {
      const user = {
        username: 'wizly',
        email: '',
        password: 'last',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((error, response) => {
          response.should.have.status(400);
          response.should.have.property('message').to.equal('email is required');
          done();
        });
    });
    it('should not create account if the password field is empty', (done) => {
      const user = {
        username: 'wizly',
        email: 'gmail@gmail.com',
        password: '',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((error, response) => {
          response.should.have.status(400);
          response.should.have.property('message').to.equal('password is required');
          done();
        });
    });
  });
});
