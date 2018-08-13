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
});
