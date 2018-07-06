var user = require('../models/user');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('User', () => {
  beforeEach((done) => {
    user.remove({}, (err) => {
      user.create({ username: 'foo' }, (err) => {
        done();
      });
    });
  });

  describe('/POST user', () => {
    it('it should require a username', (done) => {
      var user = {
      }
      chai.request(server)
        .post('/api/exercise/new-user')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.be.eql('Username missing.');
          done();
        });
    });

    it('it should create a user', (done) => {
      var user = {
        username: 'Marius'
      }
      chai.request(server)
        .post('/api/exercise/new-user')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('username');
          res.body.should.have.property('username').eql(user.username)
          res.body.should.have.property('id');
          done();
        });
    });

    it('it should not allow duplicates', (done) => {
      var user = {
        username: 'foo'
      }
      chai.request(server)
        .post('/api/exercise/new-user')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.be.eql('username already taken');
          done();
        });
    });
    
  });
});