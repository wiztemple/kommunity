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
  describe('delete question', () => {
    it('it delete any question with a specified id', (done) => {
      chai.request(app)
        .delete('/api/v1/questions/1')
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.have.property('message').to.equal('question was successfully deleted');
          done();
        });
    });
    it('it not delete if the id is unknown', (done) => {
      chai.request(app)
        .delete('/api/v1/questions/10')
        .end((error, response) => {
          response.should.have.status(404);
          response.body.should.have.property('message').to.equal('question not found');
          done();
        });
    });
  });
  describe('edit a question', () => {
    it('it should edit/update a specific question', (done) => {
      chai.request(app)
        .put('/api/v1/questions/4')
        .send({
          userId: 30,
          topic: 'Pound cake by Drake and Jayz',
          questionBody: 'lets get its started',
        })
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.an('object');
          response.body.should.have.property('message').to.equal('question was successfully edited');
          done();
        });
    });
  });
});
