module.exports = function(sequelize, Sequelize) {
    // var Sequelize = require("sequelize");
    // // sequelize (lowercase) references our connection to the DB.
    // var sequelize = require("../config/config.json");
    
    // Creates a "Login" model that matches up with DB
    var Word = sequelize.define("Italian", {
      Word: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Frequency: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    }, {
        timestamps: false
    });
    
    // Syncs with DB
    // Login.sync();
    
    return Word;
    }
    