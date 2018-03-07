// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/config.json");

// Creates a "Login" model that matches up with DB
// var word = sequelize.define("french", {
//   username: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     validate: {
//       len: [1]
//     }
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     validate: {
//       len: [5]
//     }
//   }
// });

// Syncs with DB
// Login.sync();

// Makes the Chirp Model available for other files (will also create a table)
// module.exports = Login;
