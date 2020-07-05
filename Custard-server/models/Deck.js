"use strict";
module.exports = (sequelize, DataTypes) => {
  const Deck = sequelize.define(
    "Deck",
    {
      author: {
        field: "author",
        type: DataTypes.STRING
        //allowNull:false, //TODO: author 서버에서 처리 + 이름 말고 Google Id로 할지 고민
      },
      title: {
        field: "title",
        type: DataTypes.STRING,
        allowNull: false
      },
    
      is_public: {
        field: "is_public",
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      is_paid: {
        field: "is_paid",
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      created_at: {
        field: "created_at",
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("now()")
      },
      last_updated_at: {
        field: "last_updated_at",
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("now()"),
        allowNull: false
      },
      user_id: {
        field: "user_id",
        type: DataTypes.INTEGER,
        allowNull: false // * false면 Null이 허용 안됨 (무조건 데이터가 들어가야한다.) 기본값은 true
      },

      //! 카테고리 수정을 위해서 만들어둔 필드입니다. 신경쓰지 않으셔도 됩니다.
      //?기능이 아직 작동 안하는 필드
      category_id: {
        field: "category_id",
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      charset: "utf8",
      collate: "utf8_unicode_ci",
      underscored: true,
      freezeTableName: true,
      tableName: "deck",
      timestamps: false
    }
  );
  Deck.associate = function(models) {
    Deck.hasMany(models.Card, {
      onDelete: "cascade"
    });
    Deck.hasMany(models.Like, {
      onDelete: "cascade"
    });
    Deck.belongsTo(models.User, {
      foreignKey: "user_id",
       onDelete: "cascade"
    });
    Deck.belongsTo(models.Category, {
      foreignKey: "category_id",
       onUpdate: "cascade",
       onDelete: "cascade"
    });
   // Deck.belongsTo(models.Deck, {
    //  foreignKey: "deck_id",
   // });
  };
  return Deck;
};