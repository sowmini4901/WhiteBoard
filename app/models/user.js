module.exports = (sequelize, Sequelize) => {
    return sequelize.define("user", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: Sequelize.STRING,
    });
  };