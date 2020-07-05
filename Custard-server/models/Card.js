"use strict";
module.exports = function(sequelize, DataTypes) {
  //! sequelize.define("객체이름", 스키마정의, 테이블설정)
  const Card = sequelize.define(
    "Card",
    {
      cardtype: {
        field: "cardtype",
        type: DataTypes.STRING(255),
        allowNull: false
      },
      question: {
        field: "question",
        type: DataTypes.TEXT,
        allowNull: false
      },
      answer: {
        field: "answer",
        type: DataTypes.TEXT,
        allowNull: false
      },
      answer_target: {
        field: "answer_target",
        type: DataTypes.TEXT,
        allowNull: false
      },
      hint: {
        field: "hint",
        type: DataTypes.TEXT,
        allowNull: false
      },
      covered: {
        field: "covered",
        defaultValue: 0,
        type: DataTypes.INTEGER,
        allowNull: false
      },
      //TODO: card도 created_at 필요
      created_at: {
        field: "created_at",
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("now()"),
        allowNull: false
      },

      last_studied: {
        field: "last_studied",
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("now()"),
        allowNull: false
      },

      correct: {
        field: "correct",
        defaultValue: 0,
        type: DataTypes.INTEGER,
        allowNull: false
      },
      wrong: {
        field: "wrong",
        defaultValue: 0,
        type: DataTypes.INTEGER,
        allowNull: false
      },
      hinted: {
        field: "hinted",
        defaultValue: 0,
        type: DataTypes.INTEGER,
        allowNull: false
      },
      marked: {
        field: "marked",
        defaultValue: false,
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      deck_id: {
        field: "deck_id",
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      charset: "utf8",
      collate: "utf8_unicode_ci",
      //! charset과 collate를 해줘야 한글이 저장
      underscored: true, // ? 칼럼이름을 camalCase가 아닌 underscore방식
      freezeTableName: true, //? tablename을 자동 변환하지 않도록
      tableName: "card", // ?실제 테이블 이름 정의
      timestamps: false
    }
  );
  Card.associate = function(models) {
    Card.belongsTo(models.Deck, {
      foreignKey: "deck_id",
      onDelete: "cascade"
    });
  };
  return Card;
};
