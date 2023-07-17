import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderboard.service';

export default class LeaderBoardController {
  constructor(
    private leaderBoardService = new LeaderBoardService(),
  ) { }

  public async leaderBoardHomes(_req: Request, res: Response) {
    const serviceResponse = await this.leaderBoardService.leaderBoardHome();
    return res.status(200).json(serviceResponse);
  }
}
