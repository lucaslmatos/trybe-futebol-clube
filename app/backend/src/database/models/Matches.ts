module.exports = (sequelize:any, DataTypes:any) => {
  const MatchesTable = sequelize.define('Match', {
    id: { type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true },
    homeTeamId: DataTypes.INTEGER,
    homeTeamGoals: DataTypes.INTEGER,
    awayTeamId: DataTypes.INTEGER,
    awayTeamGoals: DataTypes.INTEGER,
    inProgress: DataTypes.BOOLEAN,
  }, { tableName: 'matches', underscored: true, timestamps: false });
  MatchesTable.associate = ({ Teams }:any) => {
    MatchesTable.belongsTo(Teams, {
      foreignKey: 'home_team_id', as: 'team', targetKey: 'id',
    }); MatchesTable.belongsTo(Teams, {
      foreignKey: 'away_team_id', as: 'team', targetKey: 'id',
    });
  }; return MatchesTable;
};
