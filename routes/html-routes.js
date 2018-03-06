// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {


  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/home", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  app.get("/jumble", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/jumble.html"));
  });

  app.get("/wordsearch", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/wordsearch.html"));
  });

  app.get("/hangman", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/hangman.html"));
  });

};
