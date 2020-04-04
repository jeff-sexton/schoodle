/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = () => {
  router.get("/", (req, res) => {
    let data = {
      name: "john snow",
      email: "knowsnth@gmail.com"
    };
    res.render("createEvent", data);
  });
  return router;
};
