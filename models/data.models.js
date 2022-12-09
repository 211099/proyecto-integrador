import { getData } from "../config/connection.config.js";
import { DataTypes, UUIDV4 } from "sequelize";

const Data = getData.sequelizeClient.define(
  "cat_data",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    lluvia: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    temperatura: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    humedad:{
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    presionA: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    metros: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    rayosUv: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fotoResistencia: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  },
  {
    tableName: "cat_data",
    freezeTableName: true,
  }
);

export const getDatas = { Data };