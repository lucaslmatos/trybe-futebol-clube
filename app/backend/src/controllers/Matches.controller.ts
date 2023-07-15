import { Request, Response } from 'express';
import MatchService from '../services/matches.service';

export default class MatchesController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    try {
      const query = req.query.inProgress;
      if (query && typeof query === 'string') {
        const serviceResponse = await this.matchService.getAllMatchesFiltered(query);
        return res.status(200).json(serviceResponse);
      }
    } catch {
      return res.status(400).json('notfound');
    }
    const serviceResponse = await this.matchService.getAllMatches();
    return res.status(200).json(serviceResponse);
  }

  public async setMatchStatus(req: Request, res: Response) {
    const { id } = req.params;
    if (id) {
      const serviceResponse = await this.matchService.setMatchStatus(id);
      return res.status(200).json({ message: serviceResponse });
    }
  }

  public async setMatchGoals(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    if (id) {
      const serviceResponse = await this.matchService
        .setMatchGoals(id, homeTeamGoals, awayTeamGoals);
      return res.status(200).json({ message: serviceResponse });
    }
  }

  public async createNewMatch(req: Request, res: Response) {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = req.body;
    const serviceResponse = await this.matchService
      .createNewMatch(+homeTeamId, +homeTeamGoals, +awayTeamId, +awayTeamGoals);
    return res.status(201).json(serviceResponse);
  }
}
