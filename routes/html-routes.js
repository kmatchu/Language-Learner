// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var express = require("express");
var app = express();
var localStorage = require("store");

// Routes
// =============================================================
module.exports = function (app) {


  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/home", function (req, res) {
    console.log("user:", localStorage.get("user"));
    if (localStorage.get("user") !== undefined) {
      res.sendFile(path.join(__dirname, "../public/home.html"));
    }
    else {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    }
  });

  app.get("/jumble", function (req, res) {
    if (localStorage.get("user") !== undefined) {
      res.sendFile(path.join(__dirname, "../public/jumble.html"));
    }
    else {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    }
  });

  app.get("/wordsearch", function (req, res) {
    if (localStorage.get("user") !== undefined) {
      res.sendFile(path.join(__dirname, "../public/wordsearch.html"));
    }
    else {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    }
  });

  app.get("/hangman", function (req, res) {
    if (localStorage.get("user") !== undefined) {
      res.sendFile(path.join(__dirname, "../public/hangman.html"));
    }
    else {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    }
  });

  // If no matching route is found default to home


  app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
