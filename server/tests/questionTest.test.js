import chai from 'chai';
// import chaiHttp from 'chai-http';
import request from 'supertest';
import app from '../../app';

const { expect } = chai;
let userToken;
// let userToken2;

describe('Question Controller', () => {
  // before(async () => {
  //   const user = {
  //     username: 'wisdom',
  //     email: 'wisdom@gmail.com',
  //     password: 'lastdays'
  //   };
  //   const response = await request(app)
  //     .post('/api/v1/auth/signup')
  //     .set('Accept', 'application/json')
  //     .send(user);
  //   userToken2 = response.body.data.token;
  // });
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
  });
  describe('POST /api/v1/question', () => {
    it('should post a question if the required fields are provided', async () => {
      const question = {
        title: 'what is var',
        questionBody: 'lorem ipsum drum grity',
        tag: 'Reebok'
      };
      const response = await request(app)
        .post('/api/v1/question')
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
        .post('/api/v1/question')
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
        .post('/api/v1/question')
        .set('Authorization', `Bearer ${userToken}`)
        .send(question)
        .expect(400);
      expect(response.body.status).to.equal('fail');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('question body is required');
    });
  });
  describe('GET User Question /api/v1/question/auth', () => {
    it('should return all user questions', async () => {
      const response = await request(app)
        .get('/api/v1/question/auth')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);
      expect(response.body).to.be.an('object');
      expect(response.body.status).to.equal('success');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('user questions successfully retrieved');
    });
  });
  // describe('POST Answer /api/v1/users/question/answer', () => {
  //   it('should return all questions', async () => {
  //     const answer = {
  //       answerBody: 'If you have a minute, Id like to tell you about the power and the potential of the movement that Mozilla is fueling',
  //     };
  //     const response = await request(app)
  //       .post('/api/v1/users/question/1/answer')
  //       .set('Authorization', `Bearer ${userToken2}`)
  //       .send(answer)
  //       .expect(201);
  //     expect(response.body.status).to.equal('success');
  //     expect(response.body).to.have.property('message');
  //     expect(response.body.message).to.equal('Answer has been posted successfully');
  //   });
  // });
  describe('DELETE /api/v1/users/question', () => {
    it('should delete a question with a specified id', async () => {
      const response = await request(app)
        .delete('/api/v1/question/1')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('question successfully deleted');
    });
    it('should return not found if an id does not exist', async () => {
      const response = await request(app)
        .delete('/api/v1/question/2')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(404);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('question id not found');
    });
    it('should not delete if id is not a number', async () => {
      const response = await request(app)
        .delete('/api/v1/question/y')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(400);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('question id must be a number');
    });
  });
  describe('GET /api/v1/question', () => {
    it('should return all questions', async () => {
      const response = await request(app)
        .get('/api/v1/question')
        .set('Accept', 'application/json')
        .expect(200);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('all questions');
    });
  });
});
