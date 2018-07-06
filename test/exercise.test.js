var exercise = require('../models/exercise');
var user = require('../models/user');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

var testExercise = {
  userID: '',
  description: 'Foo bar',
  duration: '10',
  date: '2018-01-01'
};

chai.use(chaiHttp);

describe('Exercise', () => {
  beforeEach((done) => {
    exercise.remove({}, (err) => {
      user.remove({}, (err) => {
        user.create({ username: 'foo' }, (err, data) => {
          testExercise.userID = data['_id'];
          done();
        });
      });
    });
  });

  describe('/POST exercise', () => {
    it('it should be created', (done) => {
      chai.request(server)
        .post('/api/exercise/add')
        .send(testExercise)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('userID');
          res.body.should.have.property('description');
          res.body.should.have.property('duration');
          res.body.should.have.property('date');
          res.body.should.have.property('description').eql(testExercise.description)
          done();
        });
    });

  });
});