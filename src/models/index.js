const config = require("../config/db_config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorAliases: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load models

db.user = require("../models/user_model")(sequelize, Sequelize);
db.role = require("../models/role_model")(sequelize, Sequelize);
db.categories = require("../models/category_model")(sequelize, Sequelize);
db.drugs = require("../models/drugs_model")(sequelize, Sequelize);
db.medicalDevice = require("../models/medicalDevice_model")(
  sequelize,
  Sequelize
);

// Define relationships

db.categories.hasMany(db.drugs, { foreignKey: "category_id" });
db.categories.hasMany(db.medicalDevice, { foreignKey: "category_id" });
db.drugs.belongsTo(db.categories, { foreignKey: "category_id" });
db.medicalDevice.belongsTo(db.categories, { foreignKey: "category_id" });

db.role.belongsToMany(db.user, {
  through: "user_roles",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
});

db.ROLES = ["user", "doctor", "admin"];

module.exports = db;
