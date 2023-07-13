module.exports = (sequelize:any, DataTypes:any) => {
  const TeamsTable = sequelize.define('Team', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    teamName: DataTypes.STRING,
  }, {
    tableName: 'teams',
    underscored: true,
    timestamps: false,
  });
  TeamsTable.associate = ({ Matches }:any) => {
    TeamsTable.hasMany(Matches, {
      foreignKey: 'id', as: 'Matches',
    });
  }; return TeamsTable;
};
