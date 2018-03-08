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

  // Get route for retrieving a single user
  // app.get("/api/posts/:username", function(req, res) {
  //   db.Login.findOne({
  //     where: {
  //       username: req.params.username
  //     }
  //   })
  //   .then(function(dbPost) {
  //     res.json(dbPost);
  //   });
  // });

  app.get("/api/:language?/:difficulty?", function(req, res) {
    let difficulty = req.params.difficulty;

    let language = req.params.language;
    language = language[0].toUpperCase() + language.slice(1);
    console.log(language);

    if(difficulty) {
      if(difficulty === "easy") {
        db[language].findAll({
          where: {
            id: {
              $between: [1, 100]
            }
          }
        }).then(function(dbWord) {
          res.json(dbWord);
        });
      }
      else if(difficulty === "medium") {
        db[language].findAll({
          where: {
            id: {
              $between: [101, 300]
            }
          }
        }).then(function(dbWord) {
          res.json(dbWord);
        });
      }
      else if(difficulty === "hard") {
        db[language].findAll({
          where: {
            id: {
              $between: [301, 600]
            }
          }
        }).then(function(dbWord) {
          res.json(dbWord);
        });
      }
      else {
        // TODO: 404 page
      }
    }
    else {
      db[language].findAll({}).then(function(dbWord) {
        res.json(dbWord);
      });
    }
  });

  // POST route for saving a new user
  // app.post("/api/posts", function(req, res) {
  //   console.log(req.body);
  //   db.Login.create({
  //     username: req.body.username,
  //     password: req.body.password,
  //   })
  //   .then(function(dbPost) {
  //     res.json(dbPost);
  //   });
  // });

};
