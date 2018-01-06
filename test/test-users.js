const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, closeServer, runServer} = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('Users', function() {
  
  before(function() {
    return runServer();
  });

 
  after(function() {
    return closeServer();
  });

  it('should list users on GET', function() {
    return chai.request(app)
      .get('/users')
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
      })
      .catch(function(err) {
      	console.log('server-error', err)
      })
  });
});