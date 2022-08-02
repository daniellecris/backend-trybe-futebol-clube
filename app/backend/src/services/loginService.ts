import { compare } from 'bcryptjs';
import HttpException from '../shared/HttpException';
import User from '../database/models/User';
import TokenGenerator from '../shared/TokenGenerator';
import IUser from '../interfaces/IUser';


class LoginService {
  public authMiddleware = async (email: string, password: string) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new HttpException(401, 'Incorrect email or password');
    }

    const userNew:IUser = { 
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email };
    const isPassword = await compare(password, user.password);
    if (!isPassword) {
      throw new HttpException(401, 'Incorrect email or password');
    }
    const tokenGenerate = new TokenGenerator();
    const token = tokenGenerate.generateJWTToken(userNew);
    return token;
  };
}

export default LoginService;
