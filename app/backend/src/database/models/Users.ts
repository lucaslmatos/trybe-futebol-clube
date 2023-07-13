module.exports = (sequelize:any, DataTypes:any) => {
  const UsersTable = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    teamname: DataTypes.STRING,
    role: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    tableName: 'users',
    underscored: true,
    timestamps: false,
  });
  return UsersTable;
};
