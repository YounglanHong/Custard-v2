"use strict";

//! 카테고리 추가 및 이름 변경을 위해 새로 카테고리 테이블을 만들었습니다

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
  
    {
      category: {
        field: "category",
        unique: true,
        type: DataTypes.STRING(255),
        allowNull: false
      },

      //! user 와 연결할 유저 id 
      user_id: {
        field: "user_id",
        type: DataTypes.INTEGER,
        allowNull: false // * false면 Null이 허용 안됨 (무조건 데이터가 들어가야한다.) 기본값은 true
      },
    },
    {
      charset: "utf8",
      collate: "utf8_unicode_ci",
      underscored: true,
      freezeTableName: true,
      tableName: "category",
      timestamps: false
    }
  );

  Category.associate = function(models) {
    Category.belongsTo(models.User, {
      foreignKey: "user_id",
      onDelete: "cascade"
    });

    Category.hasMany(models.Deck, {
      onDelete: "cascade",
      onUpdate: "cascade"
    });
  };
  
  return Category;
};