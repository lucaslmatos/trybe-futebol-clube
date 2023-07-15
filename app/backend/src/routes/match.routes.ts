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

authRouter.patch(
  '/:id',
  Validations.validateToken,
  (req, res) => matchController.setMatchGoals(req, res),
);

authRouter.get(
  '/',
  (req, res) => matchController.getAllMatches(req, res),
);

authRouter.post(
  '/',
  Validations.validateToken,
  Validations.validateNewMatch,
  (req, res) => matchController.createNewMatch(req, res),
);

export default authRouter;
