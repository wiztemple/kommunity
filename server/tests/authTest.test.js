import chai from 'chai';
// import chaiHttp from 'chai-http';
import request from 'supertest';
import app from '../../app';

const { expect } = chai;

describe('User Account Creation', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send({
        username: 'wiztemple',
        email: 'wiztemple@gmail.com',
        password: 'lastdays',
      })
      .expect(201);
    expect(response.body).to.have.a.property('message');
    expect(response.body).to.be.an('object');
    expect(response.body.message).to.equal('User successfully created');
    expect(response.body.data).to.have.a.property('username');
    expect(response.body.data).to.have.a.property('email');
    expect(response.body.data).to.have.a.property('token');
  });
  it('should not create account if the user already exists', async () => {
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send({
        username: 'wiztemple',
        email: 'wiztemple@gmail.com',
        password: 'lastdays',
      })
      .expect(409);
    expect(response.body).to.have.a.property('message');
    expect(response.body).to.be.an('object');
    expect(response.body.message).to.equal('user already exists');
  });
  it('should not create account if the email format is invalid', async () => {
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send({
        username: 'katlyn',
        email: 'tarveremail.com',
        password: 'thescript',
      })
      .expect(400);
    expect(response.body).to.have.a.property('message');
    expect(response.body).to.have.a.property('status');
    expect(response.body.status).to.equal('fail');
    expect(response.body).to.be.an('object');
    expect(response.body.message).to.equal('email format is invalid');
  });
  it('should not create account if the the provided password is not greater than 5', async () => {
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send({
        username: 'katlyn2',
        email: 'tarver2@gmail.com',
        password: 'drop',
      })
      .expect(400);
    expect(response.body).to.have.a.property('message');
    expect(response.body).to.have.a.property('status');
    expect(response.body.status).to.equal('fail');
    expect(response.body).to.be.an('object');
    expect(response.body.message).to.equal('password must be greater than 5');
  });
  it('should not create account if username field is empty', async () => {
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send({
        username: '',
        email: 'tarver2@gmail.com',
        password: 'drop',
      })
      .expect(400);
    expect(response.body).to.have.a.property('message');
    expect(response.body).to.have.a.property('status');
    expect(response.body.status).to.equal('fail');
    expect(response.body).to.be.an('object');
    expect(response.body.message).to.equal('username is required');
  });
  it('should not create account if username contains special character', async () => {
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send({
        username: 'sullivan#',
        email: 'tarver2@gmail.com',
        password: 'drop',
      })
      .expect(400);
    expect(response.body).to.have.a.property('message');
    expect(response.body).to.have.a.property('status');
    expect(response.body.status).to.equal('fail');
    expect(response.body).to.be.an('object');
    expect(response.body.message).to.equal('username cannot contain special character');
  });
  it('should not create account if the email is empty', async () => {
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send({
        username: 'sullivan',
        email: '',
        password: 'drop',
      })
      .expect(400);
    expect(response.body).to.have.a.property('message');
    expect(response.body).to.have.a.property('status');
    expect(response.body.status).to.equal('fail');
    expect(response.body).to.be.an('object');
    expect(response.body.message).to.equal('email is required');
  });
  it('should not create account if the password field is empty', async () => {
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send({
        username: 'sullivan',
        email: 'wizt@yahoo.com',
        password: '',
      })
      .expect(400);
    expect(response.body).to.have.a.property('message');
    expect(response.body).to.have.a.property('status');
    expect(response.body.status).to.equal('fail');
    expect(response.body).to.be.an('object');
    expect(response.body.message).to.equal('password is required');
  });
  it('should not sign in an unregistered user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send({
        username: 'sullivan',
        password: 'daughtry',
      })
      .expect(400);
    expect(response.body).to.have.a.property('message');
    expect(response.body).to.have.a.property('status');
    expect(response.body.status).to.equal('fail');
    expect(response.body).to.be.an('object');
    expect(response.body.message).to.equal('Invalid username or password');
  });
  it('should not sign in a user with a wrong password', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send({
        username: 'wiztemple',
        password: 'lastdayssss',
      })
      .expect(400);
    expect(response.body).to.have.a.property('message');
    expect(response.body).to.have.a.property('status');
    expect(response.body.status).to.equal('fail');
    expect(response.body).to.be.an('object');
    expect(response.body.message).to.equal('password mismatch');
  });
  it('should sign in a user if the right fields are provided', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send({
        username: 'wiztemple',
        password: 'lastdays',
      })
      .expect(200);
    expect(response.body).to.have.a.property('message');
    expect(response.body).to.have.a.property('status');
    expect(response.body.status).to.equal('success');
    expect(response.body).to.be.an('object');
    expect(response.body.message).to.equal('login successful');
  });
});
