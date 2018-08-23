import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
chai.should();
const userToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJvYmlAZ21haWwuY29tIiwiaWF0IjoxNTMyNjM2MjAyLCJleHAiOjE1MzI3MjI2MDJ9.mt16o3b7ZF0N__Wj7CLR7EumLUm5Eop1Ef5_JoeHxyw';

describe('Authentication', () => {
  describe('POST Answer', () => {
    it('should post question if anser is provided', (done) => {
      const user = {
        answerBody: 'How Lazio’s ultras must wish they had the cash reserves of Man City',
      };
      chai.request(app)
        .post('/api/v1/question/:questionId/answer')
        .set('Authorization', userToken)
        .send(user)
        .end((error, response) => {
          response.should.have.status(201);
          response.should.be.an('object');
          response.should.have.property('message').to.equal('question successfully posted');
          done();
        });
    });

    it('should not post question if the questionBody field is empty', (done) => {
      const user = {
        questionBody: '',
      };
      chai.request(app)
        .post('/api/v1/question/:questionId/answer')
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
});
