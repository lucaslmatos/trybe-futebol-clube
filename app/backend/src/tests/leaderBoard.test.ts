import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import loginMock from './mocks/login.mock';

import {app} from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /leaderboard ', async function () { 
  beforeEach(function () { sinon.restore(); });
    it('Carreagar tabela total ', async function () {
      // Arrange
      // Act
      const httpResponse = await chai.request(app).get('/leaderboard').send();
      // Assert
      expect(httpResponse.status).to.be.deep.equal(200);
    });
});

describe('GET /leaderboard/home ', async function () { 
  beforeEach(function () { sinon.restore(); });
    it('Carreagar tabela home ', async function () {
      // Arrange
      // Act
      const httpResponse = await chai.request(app).get('/leaderboard/home').send();
      // Assert
      expect(httpResponse.status).to.be.deep.equal(200);
    });
});

describe('GET /leaderboard/away ', async function () { 
  beforeEach(function () { sinon.restore(); });
    it('Carreagar tabela away ', async function () {
      // Arrange
      // Act
      const httpResponse = await chai.request(app).get('/leaderboard/away').send();
      // Assert
      expect(httpResponse.status).to.be.deep.equal(200);
    });
});
