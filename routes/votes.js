const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Add votes for an event or update if needed - also updates user (if needed)
  router.post("/", (req, res) => {
    db.processVotesForm(req.body, req.user)
      .then((data) => {
        res
          .status(200)
          // is this the right status code?
          .send();
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
