"use strict";
var express = require("express");
//express를 모듈을 가지고 온다.
var app = express();
app.use(express.static("public"));

var express = require("express");
var app = express();
app.use(express.static("public"));
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        field: "email",
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      username: {
        field: "username",
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      password: {
        field: "password",
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        field: "image",
        type: DataTypes.STRING(1024),
        defaultValue: "/account.png",
        allowNull: true,
      },

      created_at: {
        field: "created_at",
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_unicode_ci",
      underscored: true,
      freezeTableName: true,
      tableName: "user",
      timestamps: false,
    }
  );

  User.associate = function(models) {
    User.hasMany(models.Like, {
      onDelete: "cascade",
    });

    User.hasMany(models.Deck, {
      onDelete: "cascade",
    });
  };

  return User;
};
