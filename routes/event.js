/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = () => {
  router.get("/:eventID", (req, res) => {
    let userData = {
      name: req.session.user_id,
      email: "knowsnth@gmail.com",
      event: req.params.eventID
    };
    res.render("viewEvent", userData);
  });

  router.get("*", (req, res) => {
    res.send("Event ID required or not found.");
  })
  return router;
};
