import { SignOptions, sign, verify } from 'jsonwebtoken';
import HttpException from './HttpException';

const SECRET = process.env.JWT_SECRET || 'senha_secreta';

const jwtDefaultConfig: SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

class TokenGenerator {
  constructor(private jwtConfig?: SignOptions) {
    if (!jwtConfig) {
      // eslint-disable-next-line no-param-reassign
      jwtConfig = jwtDefaultConfig;
    }
  }

  public async generateJWTToken(payload: object) {
    return sign(payload, SECRET, this.jwtConfig);
  }

  public async authenticateToken(token: string) {
    if (!token) {
      throw new HttpException(401, 'Sem Token');
    }

    try {
      const introspection = await verify(token, SECRET, this.jwtConfig);

      return introspection;
    } catch (e) {
      throw new HttpException(401, 'token inválido');
    }
  }
}

export default TokenGenerator;
