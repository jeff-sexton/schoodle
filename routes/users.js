/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.getUsers()
      .then(data => {
        res.json({ data });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/:user_id", (req, res) => {
    db.getUser(req.params.user_id)
      .then(data => {
        res.json({ data });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // Put needs to be tested!!
  router.put("/:user_id", (req, res) => {
    const name = req.data.name;
    const email = req.data.email;
    db.editUser(req.params.user_id, name, email)
      .then(data => {
        res.json({ data });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
