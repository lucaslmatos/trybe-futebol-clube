import TeamsTable from '../database/models/Teams';
import { teamsAllResponse } from './types';

export default class TeamService {
  private teamModel = TeamsTable;
  public async getAllTeams(): Promise<Array<teamsAllResponse>> {
    const allTeams = await this.teamModel.findAll();
    return allTeams;
  }

  public async getTeamById(id:number): Promise<teamsAllResponse | null> {
    const allTeams = await this.teamModel.findByPk(id);
    return allTeams;
  }
}
