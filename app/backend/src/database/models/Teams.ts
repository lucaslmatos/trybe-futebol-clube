import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class TeamsTable extends Model<InferAttributes<TeamsTable>,
InferCreationAttributes<TeamsTable>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

TeamsTable.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  tableName: 'teams',
  modelName: 'teams',
  underscored: true,
  timestamps: false,
});

export default TeamsTable;
