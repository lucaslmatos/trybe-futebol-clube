import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import {app} from '../app';
import loginMock from './mocks/login.mock';
import UsersModel from '../database/models/Users';

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