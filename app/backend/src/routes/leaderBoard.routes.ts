import { Router } from 'express';
import LeaderBoardsController from '../controllers/leaderBoard.controller';

const authRouter = Router();

const leaderBoardController = new LeaderBoardsController();

authRouter.get(
  '/home',
  (req, res) => leaderBoardController.leaderBoardHomes(req, res),
);

export default authRouter;
