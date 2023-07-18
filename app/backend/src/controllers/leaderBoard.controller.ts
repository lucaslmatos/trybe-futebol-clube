import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderboard.service';

export default class LeaderBoardController {
  constructor(
    private leaderBoardService = new LeaderBoardService(),
  ) { }

  public async leaderBoard(_req: Request, res: Response) {
    const serviceResponse = await this.leaderBoardService.leaderBoard();
    return res.status(200).json(serviceResponse);
  }

  public async leaderBoardHome(_req: Request, res: Response) {
    const serviceResponse = await this.leaderBoardService.leaderBoardHome('sorted');
    return res.status(200).json(serviceResponse);
  }

  public async leaderBoardAway(_req: Request, res: Response) {
    const serviceResponse = await this.leaderBoardService.leaderBoardAway('sorted');
    return res.status(200).json(serviceResponse);
  }
}
