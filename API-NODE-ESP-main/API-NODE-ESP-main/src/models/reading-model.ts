import { DataTypes, Model } from "sequelize";
import { sequelize } from "../repositories/repo-config";

export class Reading extends Model {
  public id!: number;
  public deviceId!: number;
  public temperature!: number;
  public luminosity!: number;
  public gas!: number;
  public humidity!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Reading.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    deviceId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    temperature: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    luminosity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    gas: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    humidity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "readings",
  }
);
