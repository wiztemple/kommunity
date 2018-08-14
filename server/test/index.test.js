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
  describe('create a question', () => {
    it('it should create a question', (done) => {
      chai.request(app)
        .post('/api/v1/questions')
        .send({
          userId: 30,
          topic: 'Pound',
          questionBody: 'third studio album',
        })
        .end((error, response) => {
          response.should.have.status(201);
          response.should.be.an('object');
          response.body.should.have.property('message').to.equal('new question added');
          done();
        });
    });
    it('it should not recreate an already existing question', (done) => {
      chai.request(app)
        .post('/api/v1/questions')
        .send({
          userId: 30,
          topic: 'Pound',
          questionBody: 'third studio album',
        })
        .end((error, response) => {
          response.should.have.status(409);
          response.should.be.an('object');
          response.body.should.have.property('message').to.equal('question already exists');
          done();
        });
    });
    it('it should not create question if user Id is not available', (done) => {
      chai.request(app)
        .post('/api/v1/questions')
        .send({
          userId: '',
          topic: 'Pound',
          questionBody: 'third studio album',
        })
        .end((error, response) => {
          response.should.have.status(400);
          response.should.be.an('object');
          response.body.should.have.property('message').to.equal('userId must be provided');
          done();
        });
    });
    it('it should not create question if topic contains special character', (done) => {
      chai.request(app)
        .post('/api/v1/questions')
        .send({
          userId: 20,
          topic: '$$$ Pound',
          questionBody: 'third studio album',
        })
        .end((error, response) => {
          response.should.have.status(400);
          response.should.be.an('object');
          response.body.should.have.property('message').to.equal('topic cannot contain special character');
          done();
        });
    });
    it('it should not create question if topic is missing', (done) => {
      chai.request(app)
        .post('/api/v1/questions')
        .send({
          userId: 20,
          topic: '',
          questionBody: 'third studio album',
        })
        .end((error, response) => {
          response.should.have.status(400);
          response.should.be.an('object');
          response.body.should.have.property('message').to.equal('topic must be provided');
          done();
        });
    });
    it('it should not create question if question Body is missing', (done) => {
      chai.request(app)
        .post('/api/v1/questions')
        .send({
          userId: 20,
          topic: 'CSS',
          questionBody: '',
        })
        .end((error, response) => {
          response.should.have.status(400);
          response.should.be.an('object');
          response.body.should.have.property('message').to.equal('question body must be available');
          done();
        });
    });
  });
});
