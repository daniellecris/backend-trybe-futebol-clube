import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

let token:string;

describe('Seu teste a rota "/login"', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */
  const mockUser = {
    id: 1, 
    username: 'User', 
    email: 'user@user.com', 
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
    role:'user',
  };
    
   let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(mockUser as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Verifica se login é realizado com sucesso', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({ email: 'user@user.com', password: 'secret_user' });
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.have.property('token')
    token = chaiHttpResponse.body.token;
  });

  it('Verifica se login não é realizado com sucesso', async() => {
    chaiHttpResponse = await chai.request(app).post('/login').send({ email: 'user@user.com', password: 'xablau' });
    expect(chaiHttpResponse).to.have.status(401);
  });

  it('Verifica se login não é realizado com sucesso, porque o email não existe', async() => {
    chaiHttpResponse = await chai.request(app).post('/login').send({ email: 'xablau@user.com', password: 'secret_user' });
    expect(chaiHttpResponse).to.have.status(401);
  });

  it('Quando o login não é realizado com sucesso, porque o email não é enviado', async() => {
    chaiHttpResponse = await chai.request(app).post('/login').send({ email: '', password: 'secret_user' });
    expect(chaiHttpResponse).to.have.status(400);
  });

  it('Quando o login não é realizado com sucesso, porque o password não é enviado', async() => {
    chaiHttpResponse = await chai.request(app).post('/login').send({ email: 'user@user.com', password: '' });
    expect(chaiHttpResponse).to.have.status(400);
  });

  it('Verifise se ao acessar a rota "/login/validate" com token correto, retorna o role do usuário', async() => {
    chaiHttpResponse = await chai.request(app).get('/login/validate').set({ authorization: token });
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body.role).to.be.equal('admin');
  });

});