// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// console.log(db);

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the logins
  app.get("/api/login", function (req, res) {
    db.Login.findAll({}).then(function (results) {
      res.json(results);
    });
  });

  app.get("/api/:language?/:difficulty?", function(req, res) {
    let difficulty = req.params.difficulty;

    let language = req.params.language;
    language = language[0].toUpperCase() + language.slice(1);
    console.log(language);

    if(difficulty) {
      if(difficulty === "easy") {
        db[language].findAll({
          limit: 100,
          order: [['FREQUENCY', 'DESC']]
        }).then(function(dbWord) {
          res.json(dbWord);
        });
      }
      else if(difficulty === "medium") {
        db[language].findAll({
          limit: 100,
          offset: 100,
          order: [['FREQUENCY', 'DESC']]
        }).then(function(dbWord) {
          res.json(dbWord);
        });
      }
      else if(difficulty === "hard") {
        db[language].findAll({
          limit: 100,
          offset: 200,
          order: [['FREQUENCY', 'DESC']]
        }).then(function(dbWord) {
          res.json(dbWord);
        });
      }
      else {
        // TODO: 404 page
      }
    }
    else {
      db[language].findAll({order: [['FREQUENCY', 'DESC']]}).then(function(dbWord) {
        res.json(dbWord);
      });
    }
  });

  // POST route for saving a new user
  app.post("/api/login", function(req, res) {
    console.log(req.body);
    db.Login.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    }).then(function(dbLogin) {
      res.json(dbLogin);
    });
  });
};
