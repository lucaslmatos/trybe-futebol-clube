import { Router } from 'express';
import MatchesController from '../controllers/Matches.controller';

const authRouter = Router();

const matchController = new MatchesController();

authRouter.get(
  '/',
  (req, res) => matchController.getAllMatches(req, res),
);

export default authRouter;
