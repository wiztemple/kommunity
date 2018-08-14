import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
chai.should();

describe('Questions', () => {
  describe('get all questions', () => {
    it('it should get all questions asked', (done) => {
      chai.request(app)
        .get('/api/v1/questions')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.an('object');
          response.body.should.have.property('message').to.equal('all questions');
          done();
        });
    });
  });
  describe('get a single question', () => {
    it('it should get a single question', (done) => {
      chai.request(app)
        .get('/api/v1/questions/1')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.an('object');
          response.body.should.have.property('message').to.equal('question successfully retrieved');
          done();
        });
    });
    it('it should get a question with no valid id', (done) => {
      chai.request(app)
        .get('/api/v1/questions/10')
        .end((error, response) => {
          response.should.have.status(404);
          response.should.be.an('object');
          response.body.should.have.property('message').to.equal('no question with such id');
          done();
        });
    });
  });
});
