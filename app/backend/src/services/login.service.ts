import { GenericReturn, GetRoleReturn, UserLog } from '../Types/Login';
import UsersTable from '../database/models/Users';
import { signJwt, verifyJwt } from './jwt';

export default class LoginService {
  private userModel = UsersTable;
  public async login(user:UserLog): Promise<GenericReturn> {
    const thisUser = await this.userModel.findOne({ where: { email: user.email } });
    if (thisUser) {
      const { id, email, password } = thisUser;
      const payload = { id, email, password };
      const newToken = signJwt(payload);
      return { responseMessage: { token: newToken }, statusCode: 200 };
    }
    return { responseMessage: 'Invalid email or password', statusCode: 401 };
  }

  public async getRole(authorization:string): Promise<GetRoleReturn> {
    try {
      const thisUser = verifyJwt(authorization.split(' ')[1]);
      if (typeof thisUser !== 'string') {
        const { email } = thisUser;
        const user = await this.userModel.findOne({ where: { email } });
        if (user) {
          return { responseMessage: { role: user.role }, statusCode: 200 };
        }
      }
      return { responseMessage: { role: 'invalid' }, statusCode: 401 };
    } catch {
      return { responseMessage: { role: 'invalid' }, statusCode: 401 };
    }
  }
}
