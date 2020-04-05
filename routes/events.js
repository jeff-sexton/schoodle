/* eslint-disable camelcase */
/*
 * All routes for Events are defined here
 * Since this file is loaded in server.js into /Events,
 *   these routes are mounted onto /Events
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/:event_url", (req, res) => {
    const user = req.user;



    db.getEventByUrl(req.params.event_url)
      .then(event => {
        if (event) {
          db.getTimesForEvent(event.id)
            .then(times => {
              db.getVotesForEvent(event.id)
                .then(votes => {
                  const templateVars = {
                    user,
                    event,
                    times,
                    votes,
                  };

                  res.render("viewEvent", templateVars);
                });
            });

        } else {
          res.send("Event ID required or not found.");
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });



  //post to events '/'

  // POST to events needs to be tested

  router.post('/', (req, res) => {


    const eventDetails = {
      title: 'req.body?',
      description: 'req.body?',
      owner_id: req.user.id
    };

    db.addEvent(eventDetails)
      .then(event => {
        res.redirect(`/events/${event.url}`);
      });

  });



  return router;
};
