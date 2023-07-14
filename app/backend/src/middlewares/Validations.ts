import { NextFunction, Request, Response } from 'express';
import { compareSync } from 'bcryptjs';
import UsersTable from '../database/models/Users';

class Validations {
  static validateLoginFields(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: 'All fields must be filled',
      });
    }
    next();
  }

  static async validateLoginDb(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    const { email, password } = req.body;
    const thisUser = await UsersTable.findOne({ where: { email } });
    if (!(thisUser && compareSync(password, thisUser.dataValues.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }
}

export default Validations;
