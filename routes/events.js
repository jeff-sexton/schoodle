/* eslint-disable camelcase */
/*
 * All routes for Events are defined here
 * Since this file is loaded in server.js into /Events,
 *   these routes are mounted onto /Events
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const moment = require('moment');

module.exports = (db) => {
  router.get("/:event_url", (req, res) => {
    const user = req.user;

    db.getEventByUrl(req.params.event_url)
      .then(event => {
        if (event) {
          db.getDataForEvent(event, user)
            .then(data => {
              // make moment available in .ejs
              data.moment = moment;

              res.render("viewEvent", data);
              // res.json(data); // to check data representation
            })
            .catch(err => {
              res
                .status(500)
                .json({ error: err.message });
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

  // Add event - also updates user(if needed) and adds event times from create page
  router.post('/', (req, res) => {

    db.createEventFromForm(req.body, req.user)
      .then((data) => {

        // data = {user, event, times} from event creation in the db

        // redirect to event url
        res.json(data); //can't respond with a res.redirect() for an ajax post !!!!
      });
  });

  return router;
};
