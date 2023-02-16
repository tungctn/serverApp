const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/database");

class Word extends Model {}
Word.init(
  {
    word: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    pronounce: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
  },
  {
    sequelize,
    modelName: "word",
    timestamps: true,
  }
);

module.exports = Word;
