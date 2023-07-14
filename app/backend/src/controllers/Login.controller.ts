import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  constructor(
    private loginService = new LoginService(),
  ) { }

  public async login(req: Request, res: Response) {
    const user = req.body;
    const { responseMessage, statusCode } = await this.loginService.login(user);
    return res.status(statusCode).json(responseMessage);
  }

  public async getRole(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (authorization) {
      const { responseMessage, statusCode } = await this.loginService.getRole(authorization);
      return res.status(statusCode).json(responseMessage);
    }
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}
