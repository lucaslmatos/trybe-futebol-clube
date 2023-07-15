import { NextFunction, Request, Response } from 'express';
import { compareSync } from 'bcryptjs';
import UsersTable from '../database/models/Users';
import TeamsTable from '../database/models/Teams';
import { verifyJwt } from '../services/jwt';

class Validations {
  static validateLoginFields(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    const rg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!rg.test(email) || password.length <= 5) {
      return res.status(401).json({ message: 'Invalid email or password' });
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

  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      verifyJwt(authorization.split(' ')[1]);
    } catch {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  }

  static async validateNewMatch(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }

    const checkHomeTeam = await TeamsTable.findByPk(homeTeamId);
    const checkAwayTeam = await TeamsTable.findByPk(homeTeamId);

    if (checkHomeTeam === null || checkAwayTeam === null) {
      return res.status(404).json({
        message: 'There is no team with such id!',
      });
    }
    next();
  }
}

export default Validations;
