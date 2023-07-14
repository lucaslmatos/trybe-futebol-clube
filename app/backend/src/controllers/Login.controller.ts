import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  constructor(
    private loginService = new LoginService(),
  ) { }

  public async login(req: Request, res: Response) {
    const user = req.body;
    const { responseMessage, statusCode } = await this.loginService.login(user);
    res.status(statusCode).json(responseMessage);
  }
}
