// Dependencies
// =============================================================

module.exports = function(sequelize, Sequelize) {

// Creates a "Login" model that matches up with DB
var Login = sequelize.define("Login", {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },

  username: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [3],
      isAlphanumeric: true
    }
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    }
  },
  
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [3]
    }
  },

  firstname: {
    type: Sequelize.STRING
  },

  lastname: {
    type: Sequelize.STRING
  },

  progress: {
    type: Sequelize.STRING
  },

  profilepic: {
    type: Sequelize.STRING
  },

  resettoken: {
    type: Sequelize.STRING
  }
}, {
    timestamps: false
});


return Login;
}

