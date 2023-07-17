import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderboard.service';

export default class LeaderBoardController {
  constructor(
    private leaderBoardService = new LeaderBoardService(),
  ) { }

  public async leaderBoardHome(_req: Request, res: Response) {
    const serviceResponse = await this.leaderBoardService.leaderBoardHome();
    return res.status(200).json(serviceResponse.sort((a, b) => {
      if (+b.totalPoints !== +a.totalPoints) {
        return +b.totalPoints - +a.totalPoints;
      }
      const efficiencyA = parseFloat(a.efficiency);
      const efficiencyB = parseFloat(b.efficiency);
      if (efficiencyB !== efficiencyA) {
        return efficiencyB - efficiencyA;
      }
      if (b.goalsFavor !== a.goalsFavor) {
        return b.goalsFavor - a.goalsFavor;
      }
      return b.goalsBalance - a.goalsBalance;
    }));
  }

  public async leaderBoardAway(_req: Request, res: Response) {
    const serviceResponse = await this.leaderBoardService.leaderBoardAway();
    return res.status(200).json(serviceResponse);
  }
}
