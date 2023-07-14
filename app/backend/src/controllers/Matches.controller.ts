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
}
