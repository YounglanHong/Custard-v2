"use strict";
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    "Like",
    {
      deck_id: {
        field: "deck_id",
        type: DataTypes.INTEGER,
        allowNull: false
      },
      user_id: {
        field: "user_id",
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      charset: "utf8",
      collate: "utf8_unicode_ci",
      underscored: true,
      freezeTableName: true,
      tableName: "like",
      timestamps: false
    }
  );

  Like.associate = function(models) {
    Like.belongsTo(models.User, {
      foreignKey: "user_id",
      onDelete: "cascade"
    });

    Like.belongsTo(models.Deck, {
      foreignKey: "deck_id",
      onDelete: "cascade"
    });
  };
  return Like;
};
