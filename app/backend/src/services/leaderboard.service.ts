import { getReturn } from '../Types/LeaderBoard';
import MatchesTable from '../database/models/Matches';
import TeamsTable from '../database/models/Teams';

export default class LeaderBoardService {
  private teamModel = TeamsTable;
  private matchModel = MatchesTable;

  public async leaderBoardHome(): Promise<getReturn[]> {
    const allTeams = await this.teamModel.findAll();
    const allMatches = await this.matchModel.findAll();

    const resultPromises = allTeams.map(async (t) => {
      const thisTeamMatches = allMatches.filter((match) => t.dataValues.id
      === match.dataValues.homeTeamId && match.dataValues.inProgress === false);

      const result = await LeaderBoardService.getReturn(t, thisTeamMatches, 'home');

      return result;
    });
    const results = await Promise.all(resultPromises);
    const resultsSorted = await LeaderBoardService.setSort(results);
    return resultsSorted;
  }

  public async leaderBoardAway(): Promise<getReturn[]> {
    const allTeams = await this.teamModel.findAll();
    const allMatches = await this.matchModel.findAll();

    const resultPromises = allTeams.map(async (t) => {
      const thisTeamMatches = allMatches.filter((match) => t.dataValues.id
      === match.dataValues.awayTeamId && match.dataValues.inProgress === false);

      const result = await LeaderBoardService.getReturn(t, thisTeamMatches, 'away');

      return result;
    });
    const results = await Promise.all(resultPromises);
    const resultsSorted = await LeaderBoardService.setSort(results);
    return resultsSorted;
  }

  static async getReturn(team:TeamsTable, matches:MatchesTable[], place:string):Promise<getReturn> {
    const totalPoints = await LeaderBoardService.getTotalPoints(matches, place);
    const totalGames = await LeaderBoardService.getTotalGames(matches);
    const goalsFavor = await LeaderBoardService.getGoalsFavor(matches, place);
    const goalsOwn = await LeaderBoardService.getGoalsOwn(matches, place);

    return { name: team.dataValues.teamName,
      totalPoints,
      totalGames,
      totalVictories: await LeaderBoardService.getTotalVicories(matches, place),
      totalDraws: await LeaderBoardService.getTotalDraws(matches),
      totalLosses: await LeaderBoardService.getTotalLosses(matches, place),
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: ((totalPoints / (totalGames * 3)) * 100).toFixed(2),
    };
  }

  static async getTotalPoints(matches:MatchesTable[], place:string):Promise<number> {
    let points = 0;
    matches.forEach((match:MatchesTable) => {
      if (place === 'home') {
        if (match.homeTeamGoals > match.awayTeamGoals) points += 3;
        if (match.homeTeamGoals === match.awayTeamGoals) points += 1;
      } else {
        if (match.homeTeamGoals < match.awayTeamGoals) points += 3;
        if (match.homeTeamGoals === match.awayTeamGoals) points += 1;
      }
    });
    return points;
  }

  static async getTotalGames(matches:MatchesTable[]):Promise<number> { return matches.length; }

  static async getTotalVicories(matches:MatchesTable[], place:string):Promise<number> {
    let victories = 0;
    matches.forEach((match:MatchesTable) => {
      if (place === 'home') {
        if (match.homeTeamGoals > match.awayTeamGoals) victories += 1;
      } else if (match.homeTeamGoals < match.awayTeamGoals) victories += 1;
    });
    return victories;
  }

  static async getTotalDraws(matches:MatchesTable[]):Promise<number> {
    let draws = 0;
    matches.forEach((match:MatchesTable) => {
      if (match.homeTeamGoals === match.awayTeamGoals) {
        draws += 1;
      }
    });
    return draws;
  }

  static async getTotalLosses(matches:MatchesTable[], place:string):Promise<number> {
    let losses = 0;
    matches.forEach((match:MatchesTable) => {
      if (place === 'home') {
        if (match.homeTeamGoals < match.awayTeamGoals) losses += 1;
      } else if (match.homeTeamGoals > match.awayTeamGoals) losses += 1;
    });
    return losses;
  }

  static async getGoalsFavor(matches:MatchesTable[], place:string):Promise<number> {
    let Goals = 0;
    matches.forEach((match:MatchesTable) => {
      if (place === 'home') {
        Goals += match.homeTeamGoals;
      } else { Goals += match.awayTeamGoals; }
    });
    return Goals;
  }

  static async getGoalsOwn(matches:MatchesTable[], place:string):Promise<number> {
    let Goals = 0;
    matches.forEach((match:MatchesTable) => {
      if (place === 'home') {
        Goals += match.awayTeamGoals;
      } else { Goals += match.homeTeamGoals; }
    });
    return Goals;
  }

  static async setSort(matches:getReturn[]):Promise<getReturn[]> {
    const sorted = matches.sort((a, b) => {
      if (+b.totalPoints !== +a.totalPoints) {
        return +b.totalPoints - +a.totalPoints;
      }
      if (b.goalsBalance !== a.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }
      if (b.goalsFavor !== a.goalsFavor) {
        return b.goalsFavor - a.goalsFavor;
      }
      return parseFloat(b.efficiency) - parseFloat(a.efficiency);
    });
    return sorted;
  }
}
