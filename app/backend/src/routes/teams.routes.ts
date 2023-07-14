import { Router } from 'express';
import TeamsController from '../controllers/Teams.controller';

const authRouter = Router();

const teamController = new TeamsController();

authRouter.get('/', (req, res) => teamController.getAllTeams(req, res));
authRouter.get('/:id', (req, res) => teamController.getTeamById(req, res));

export default authRouter;
