import { Router } from 'express';
import MatchesController from '../controllers/Matches.controller';
import Validations from '../middlewares/Validations';

const authRouter = Router();

const matchController = new MatchesController();

authRouter.patch(
  '/:id/finish',
  Validations.validateToken,
  (req, res) => matchController.setMatchStatus(req, res),
);

authRouter.get(
  '/',
  (req, res) => matchController.getAllMatches(req, res),
);

export default authRouter;
