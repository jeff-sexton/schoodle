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

<<<<<<< HEAD
    // post
    //  generateUrl() - returns url string - localhost:999/events/   = url
=======

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
>>>>>>> ac5170e7af25e6412e1d86a154a7d0ea6cfe6bc4



    return router;
  };
