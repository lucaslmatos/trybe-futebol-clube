import TeamsTable from '../database/models/Teams';
import MatchesTable from '../database/models/Matches';

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
}
