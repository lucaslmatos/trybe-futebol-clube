import { GenericReturn, UserLog } from '../Types/Login';
import UsersTable from '../database/models/Users';
import jwt from './jwt';

export default class LoginService {
  private userModel = UsersTable;
  public async login(user:UserLog): Promise<GenericReturn> {
    const thisUser = await this.userModel.findOne({ where: { email: user.email } });
    if (thisUser) {
      const { id, email, password } = thisUser;
      const payload = { id, email, password };
      const newToken = jwt.signJwt(payload);
      return { responseMessage: newToken, statusCode: 200 };
    }
    return { responseMessage: 'Invalid email or password', statusCode: 401 };
  }
}
