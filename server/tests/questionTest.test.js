import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
chai.should();
const userToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJvYmlAZ21haWwuY29tIiwiaWF0IjoxNTMyNjM2MjAyLCJleHAiOjE1MzI3MjI2MDJ9.mt16o3b7ZF0N__Wj7CLR7EumLUm5Eop1Ef5_JoeHxyw';
const title = Math.random().toString(36).substring(2, 15);

describe('Authentication', () => {
  describe('POST Question', () => {
    it('should post question if all inputs are provided', (done) => {
      const user = {
        title,
        questionBody: 'lorem ipsum drum grity',
        tag: 'C++'
      };
      chai.request(app)
        .post('/api/v1/question')
        .set('Authorization', userToken)
        .send(user)
        .end((error, response) => {
          response.should.have.status(201);
          response.should.be.an('object');
          response.should.have.property('message').to.equal('question successfully posted');
          done();
        });
    });
    it('should not post question if the title field is empty', (done) => {
      const user = {
        title: '',
        questionBody: 'lorem ipsum drum grity',
        tag: 'C++'
      };
      chai.request(app)
        .post('/api/v1/question')
        .set('Authorization', userToken)
        .send(user)
        .end((error, response) => {
          response.should.have.status(400);
          response.should.be.an('object');
          response.should.have.property('message').to.equal('title is required');
          done();
        });
    });
    it('should not post question if the questionBody field is empty', (done) => {
      const user = {
        title: 'lorem drum',
        questionBody: '',
        tag: 'C++'
      };
      chai.request(app)
        .post('/api/v1/question')
        .set('Authorization', userToken)
        .send(user)
        .end((error, response) => {
          response.should.have.status(400);
          response.should.be.an('object');
          response.should.have.property('message').to.equal('question body is required');
          done();
        });
    });
  });
  describe('GET ALL Question', () => {
    it('should return all questions asked', (done) => {
      chai.request(app)
        .get('/api/v1/question')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.an('object');
          response.should.have.property('message').to.equal('question successfully posted');
          done();
        });
    });
  });
  describe('GET A Question', () => {
    it('should return all a specific question', (done) => {
      chai.request(app)
        .get('/api/v1/question/3')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.an('object');
          response.should.have.property('message').to.equal('question successfully returned');
          done();
        });
    });
    it('should not return a question if Id is not a number', (done) => {
      chai.request(app)
        .get('/api/v1/question/yy')
        .end((error, response) => {
          response.should.have.status(400);
          response.should.be.an('object');
          response.should.have.property('message').to.equal('question id must be a number');
          done();
        });
    });
    it('should not return a question if Id does not exist', (done) => {
      chai.request(app)
        .get('/api/v1/question/yy')
        .end((error, response) => {
          response.should.have.status(404);
          response.should.be.an('object');
          response.should.have.property('message').to.equal('question not found');
          done();
        });
    });
  });
});
