import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import TeamsTable from './Teams';

class MatchesTable extends Model<InferAttributes<MatchesTable>,
InferCreationAttributes<MatchesTable>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchesTable.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  tableName: 'matches',
  underscored: true,
  timestamps: false,
});

TeamsTable.hasMany(MatchesTable, { foreignKey: 'home_team_id', as: 'homeMatches' });
TeamsTable.hasMany(MatchesTable, { foreignKey: 'away_team_id', as: 'awayMatches' });
MatchesTable.belongsTo(TeamsTable, { foreignKey: 'home_team_id', as: 'homeTeam' });
MatchesTable.belongsTo(TeamsTable, { foreignKey: 'away_team_id', as: 'awayTeam' });

export default MatchesTable;
