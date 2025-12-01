import { DataTypes, Model } from "sequelize";
import { sequelize } from "../repositories/repo-config";
import { User } from "./user-model";

export class Device extends Model {
  public id!: number;
  public name!: string;
  public apiKey!: string;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Device.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    apiKey: { type: DataTypes.STRING, allowNull: false, unique: true },
    userId: { 
      type: DataTypes.INTEGER, 
      allowNull: true,
    }
  },
  {
    sequelize,
    tableName: "devices"
  }
);

