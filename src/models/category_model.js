module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("categories", {
    id_category : {
      allowNull : false,
      autoIncrement : true,
      primaryKey : true,
      type : Sequelize.INTEGER
    },
    category_name : {
      allowNull : false,
      type : Sequelize.STRING
    },
    parent_category_id : {
      type : Sequelize.INTEGER,
      references : {
        model : "categories",
        key : "id_category"
      }
    }
  });

  return Category;
};