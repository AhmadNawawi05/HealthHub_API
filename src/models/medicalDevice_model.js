module.exports = (sequelize, Sequelize) => {
  const medicalDevices = sequelize.define("medical_devices", {
    id_device: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    device_name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    price: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    description: {
      allowNull: false,
      type: Sequelize.TEXT
    },
    manufacture: {
      allowNull: false,
      type: Sequelize.STRING
    },
    stock: {
      allowNull: false,
      type: Sequelize.INTEGER
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

  return medicalDevices;
};
