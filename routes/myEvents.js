const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const data = { user: req.user };

    db.getMyEvents(data.user.id).then((events) => {
      data.events = events;
      db.getMyVotedOnEvents(data.user.id).then((votedEvents) => {
        data.votedEvents = votedEvents;
        res.render("myEvents", data);
      });
    });
  });

  return router;
};
