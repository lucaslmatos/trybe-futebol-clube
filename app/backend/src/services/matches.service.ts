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

  public async getAllMatchesFiltered(boolean:string) {
    const matchesList = await this.getAllMatches();
    const test = boolean === 'true';
    const matchesListFiltered = matchesList
      .filter((match) => +match.inProgress === +test);
    return matchesListFiltered;
  }

  public async setMatchStatus(id:string) {
    const thisMatch = await this.matchModel.findByPk(+id);
    await thisMatch?.update({ inProgress: false }, { where: { inProgress: true } });
    return 'Finished';
  }

  public async setMatchGoals(id:string, homeTeamGoals:number, awayTeamGoals:number) {
    const thisMatch = await this.matchModel.findByPk(+id);
    await thisMatch?.update({ homeTeamGoals, awayTeamGoals });
    return 'Finished updating Match Goals';
  }
}
