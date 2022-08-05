import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;
const teams = [
	{
		id: 1,
		teamName: "Avaí/Kindermann"
	},
	{
		id: 2,
		teamName: "Bahia"
	},
	{
		id: 3,
		teamName: "Botafogo"
	},
	{
		id: 4,
		teamName: "Corinthians"
	},
	{
		id: 5,
		teamName: "Cruzeiro"
	},
	{
		id: 6,
		teamName: "Ferroviária"
	},
	{
		id: 7,
		teamName: "Flamengo"
	},
	{
		id: 8,
		teamName: "Grêmio"
	},
	{
		id: 9,
		teamName: "Internacional"
	},
	{
		id: 10,
		teamName: "Minas Brasília"
	},
	{
		id: 11,
		teamName: "Napoli-SC"
	},
	{
		id: 12,
		teamName: "Palmeiras"
	},
	{
		id: 13,
		teamName: "Real Brasília"
	},
	{
		id: 14,
		teamName: "Santos"
	},
	{
		id: 15,
		teamName: "São José-SP"
	},
	{
		id: 16,
		teamName: "São Paulo"
	}
];

const teamCruzeiro = teams[4];

describe('Testa a rota /teams', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(teams as any );
  });

  after(()=>{
    (Team.findAll as sinon.SinonStub).restore();
  })

  it('Espera retornar todos os times', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams')

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(teams);
  });
});

describe('Testa a rota /teams:id com id válido', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findByPk")
      .resolves(teamCruzeiro as any );
  });

  after(()=>{
    (Team.findByPk as sinon.SinonStub).restore();
  })

  it('Retorna objeto contendo apenas um time', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams/5')

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(teams[4]);
  });
});

describe('Testa a rota /teams com id inválido', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findByPk")
      .resolves(null as any );
  });

  after(()=>{
    (Team.findByPk as sinon.SinonStub).restore();
  })

  it('Retorna codigo 404 quando o time não é encontrado', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams/40')

    expect(chaiHttpResponse).to.have.status(404);
  });
}); 