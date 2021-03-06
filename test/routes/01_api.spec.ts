import chai from 'chai';
import 'mocha';
import app from '../../src/app';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const expect = chai.expect;

describe('baseRoute', () => {
  it('should respond with HTTP 200 status', async () => {
    return chai
      .request(app)
      .get('/api')
      .then(res => {
        expect(res.status).to.be.equal(200);
      });
  });

  it('should respond with success message', async () => {
    return chai
      .request(app)
      .get('/api')
      .then(res => {
        expect(res.body.title).to.be.equal('Get api Order');
      });
  });
});
