import { GenericReturn, UserLog } from '../Types/Login';
import UsersTable from '../database/models/Users';
import jwt from './jwt';

export default class LoginService {
  private userModel = UsersTable;
  public async login(user:UserLog): Promise<GenericReturn> {
    const thisUser = await this.userModel.findOne({ where: { email: user.email } });
    const { id, email, password }:any = thisUser;
    const newToken = jwt.signJwt({ id, email, password });
    return { responseMessage: newToken, statusCode: 200 };
  }
}
