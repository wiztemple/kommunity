import chai from 'chai';
// import chaiHttp from 'chai-http';
import request from 'supertest';
import app from '../../app';

const { expect } = chai;
let userToken;

describe('Question Controller', () => {
  before(async () => {
    const user = {
      username: 'wiztemple',
      password: 'lastdays'
    };
    const response = await request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send(user);
    userToken = response.body.data.token;
    console.log(userToken);
  });
  describe('POST /api/v1/users/question', () => {
    it('should post a question if the required fields are provided', async () => {
      const question = {
        title: 'what is var',
        questionBody: 'lorem ipsum drum grity',
        tag: 'Reebok'
      };
      const response = await request(app)
        .post('/api/v1/users/question')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userToken}`)
        .send(question)
        .expect(201);
      expect(response.body).to.be.an('object');
      expect(response.body.status).to.equal('success');
      expect(response.body).to.have.property('questionObj');
      expect(response.body.questionObj).to.have.property('id');
      expect(response.body.questionObj).to.have.property('title');
      expect(response.body.questionObj).to.have.property('questionBody');
      expect(response.body.questionObj).to.have.property('tag');
      expect(response.body.questionObj).to.have.property('userId');
      expect(response.body.questionObj).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('question successfully posted');
    });
    it('should not post a question if the title is empty', async () => {
      const question = {
        title: '',
        questionBody: 'lorem ipsum drum grity',
        tag: 'Adidas'
      };
      const response = await request(app)
        .post('/api/v1/users/question')
        .set('Authorization', `Bearer ${userToken}`)
        .send(question)
        .expect(400);
      expect(response.body.status).to.equal('fail');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('title is required');
    });
    it('should not post a question if the question body is empty', async () => {
      const question = {
        title: 'lorem drum sum',
        questionBody: '',
        tag: 'Erlang'
      };
      const response = await request(app)
        .post('/api/v1/users/question')
        .set('Authorization', `Bearer ${userToken}`)
        .send(question)
        .expect(400);
      expect(response.body.status).to.equal('fail');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('question body is required');
    });
  });
});
