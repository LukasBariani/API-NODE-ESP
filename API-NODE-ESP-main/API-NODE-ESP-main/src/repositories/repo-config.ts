import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "esp_banco",   
  "root",        
  "",          
  {
    host: "localhost", 
    dialect: "mysql",
    logging: false
  }
);
