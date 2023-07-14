import { Request, Response } from 'express';
import TeamService from '../services/teams.service';

export default class BookController {
  constructor(
    private teamService = new TeamService(),
  ) { }

  public async getAllTeams(_req: Request, res: Response) {
    const serviceResponse = await this.teamService.getAllTeams();
    res.status(200).json(serviceResponse);
  }

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.teamService.getTeamById(+id);
    if (serviceResponse === null) res.status(404).json('Id inexistente');
    res.status(200).json(serviceResponse);
  }
}
