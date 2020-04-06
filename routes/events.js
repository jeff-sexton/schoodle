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
          db.getDataForEvent(event, user)
            .then(data => {
              console.log('\n***** Promise all result ****** > \n', data, '\n');
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

  //post to events '/'

  // POST to events needs to be tested


  router.post('/', (req, res) => {

    const event = {
      title: req.body.title,
      description: req.body.description,
      owner_id: req.user.id
    };

    const user = {
      id: req.user.id,
      name: req.body.name,
      email: req.body.email
    };
    const times = [];

    console.log('\n***** req\n', req.body, '\n');
    console.log('\n***** eventDetails\n', event, '\n');
    console.log('\n***** user\n', user, '\n');

    // db.addEvent(eventDetails)
    //   .then(event => {
    //     res.redirect(`/events/${event.url}`);
    //   });

  });
  return router;
};
