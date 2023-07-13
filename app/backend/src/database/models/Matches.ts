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
  modelName: 'matches',
  underscored: true,
  timestamps: false,
});

TeamsTable.belongsTo(MatchesTable, { foreignKey: 'home_team_id', as: 'id' });
TeamsTable.belongsTo(MatchesTable, { foreignKey: 'away_team_id', as: 'id' });
MatchesTable.hasMany(TeamsTable, { foreignKey: 'awayTeamId', as: 'id' });
MatchesTable.hasMany(TeamsTable, { foreignKey: 'homeTeamId', as: 'id' });

export default MatchesTable;
