import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class UsersTable extends Model<InferAttributes<UsersTable>,
InferCreationAttributes<UsersTable>> {
  declare id: CreationOptional<number>;
  declare teamname: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

UsersTable.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  teamname: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  role: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  password: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  tableName: 'users',
  modelName: 'users',
  underscored: true,
  timestamps: false,
});

export default UsersTable;
