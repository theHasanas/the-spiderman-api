"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class University extends Model {
    static associate(models) {
      // define association here
    }
  }
  University.init(
    {
      name: DataTypes.STRING,
      country: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "University",
    }
  );
  return University;
};
