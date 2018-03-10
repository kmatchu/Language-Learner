// Dependencies
// =============================================================

module.exports = function(sequelize, Sequelize) {

// Creates a "Login" model that matches up with DB
var Login = sequelize.define("Login", {
  // email: {
  //   type: Sequelize.STRING,
  //   allowNull: false,
  // },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [1]
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [1]
    }
  }
}, {
    timestamps: false
});


return Login;
}

