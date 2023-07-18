import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import {app} from '../app';
import loginMock from './mocks/login.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login ', async function () { 
  beforeEach(function () { sinon.restore(); });
    it('Login com sucesso ', async function () {
      // Arrange
      const httpRequestBody = loginMock.validBody
      // Act
      const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);
      // Assert
      expect(httpResponse.status).to.be.deep.equal(200);
      expect(httpResponse.body).to.have.key('token');
    });
});

describe('GET /login/role ', async function () { 
  beforeEach(function () { sinon.restore(); });
    it('Role com sucesso ', async function () {
      // Arrange
      const httpRequestBody = loginMock.validBody
      const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);
      // Act
      const httpResponse2 = await chai.request(app).get('/login/role').set('Authorization', `Bearer ${httpResponse.body.token}`).send();
      // Assert
      expect(httpResponse2.status).to.be.deep.equal(200);
      expect(httpResponse2.body).to.have.key('role');
    });
});