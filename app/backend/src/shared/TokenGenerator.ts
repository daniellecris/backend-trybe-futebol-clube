import * as jwt from 'jsonwebtoken';
import IUser from '../interfaces/IUser';
import HttpException from './HttpException';

const SECRET = process.env.JWT_SECRET || 'jwt_secret';

const jwtDefaultConfig: jwt.SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

class TokenGenerator {
  constructor(private jwtConfig: jwt.SignOptions = jwtDefaultConfig) {}

  public async generateJWTToken(payload: IUser) {
    return jwt.sign(payload, SECRET, this.jwtConfig);
  }

  public async authenticateToken(token: string) {
    if (!token) {
      throw new HttpException(401, 'Sem Token');
    }

    try {
      const introspection = await jwt.verify(token, SECRET, this.jwtConfig);

      return introspection;
    } catch (e) {
      throw new HttpException(401, 'token inválido');
    }
  }
}

export default TokenGenerator;
