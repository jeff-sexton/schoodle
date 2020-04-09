const express = require('express');
const router = express.Router();

   // Remove this user routes since user objects are never accessed directly by the user?

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
