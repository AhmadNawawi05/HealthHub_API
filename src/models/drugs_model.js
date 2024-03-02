module.exports = (sequelize, Sequelize) => {
  const drugs = sequelize.define("drugs", {
    id_drugs: {
      allowNull : false,
      autoIncrement : true,
      primaryKey : true,
      type : Sequelize.INTEGER
    },
    drugs_name : {
      allowNull : false,
      type : Sequelize.STRING
    },
    price : {
      allowNull : false,
      type : Sequelize.INTEGER
    },
    description : {
      allowNull : false,
      type: Sequelize.TEXT
    },
    indication : {
      allowNull : false,
      type: Sequelize.STRING
    },
    compisition : {
      allowNull : false,
      type: Sequelize.STRING
    },
    dosage : {
      allowNull : false,
      type : Sequelize.STRING
    },
    usage_guideline : {
      allowNull : false,
      type: Sequelize.STRING
    },
    warning : {
      allowNull : false,
      type: Sequelize.TEXT
    },
    contra_indication : {
      allowNull : false,
      type: Sequelize.STRING
    },
    side_effect : {
      allowNull : false,
      type: Sequelize.STRING
    },
    product_class : {
      allowNull : false,
      type : Sequelize.STRING
    },
    manufacture : {
      allowNull : false,
      type : Sequelize.STRING
    },
    regist_code : {
      allowNull : false,
      type : Sequelize.STRING
    },
    stock : {
      allowNull : false,
      type : Sequelize.INTEGER
    },
    image_url1: {
      allowNull : false,
      type: Sequelize.STRING
    },
    image_url2: {
      allowNull : false,
      type: Sequelize.STRING
    },
    image_url3: {
      allowNull : false,
      type: Sequelize.STRING
    },
    image_url4: {
      allowNull : false,
      type: Sequelize.STRING
    },
    category_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: "categories",
        key: "id_category"
      }
    }
  });
  return drugs;
};