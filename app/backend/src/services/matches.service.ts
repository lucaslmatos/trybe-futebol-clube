import TeamsTable from '../database/models/Teams';
import MatchesTable from '../database/models/Matches';
import { query } from 'express';

export default class MatchesService {
  private teamModel = TeamsTable;
  private matchModel = MatchesTable;
  public async getAllMatches() {
    const matchesList = await this.matchModel.findAll({
      include: [
        { model: this.teamModel,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: this.teamModel,
          as: 'awayTeam',
          attributes: ['teamName'],
        }],
      raw: true,
      nest: true,
    });
    return matchesList;
  }

  public async getAllMatchesFiltered(boolean:string) {
    const matchesList = await this.getAllMatches();
    const test = boolean === 'true';
    const matchesListFiltered = matchesList
      .filter((match) => +match.inProgress === +test);
    return matchesListFiltered;
  }
}
