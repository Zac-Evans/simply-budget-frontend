"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class budget_categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  budget_categories.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      category_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      category_budget: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },

      budget_remaining: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "budget_categories",
    }
  );
  return budget_categories;
};
