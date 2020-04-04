/* eslint-disable camelcase */
/*
 * All routes for Events are defined here
 * Since this file is loaded in server.js into /Events,
 *   these routes are mounted onto /Events
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = () => {
  router.get("/:event_url", (req, res) => {
    const user = req.user;

    // const user = {
    //   id: 18,
    //   name: null,
    //   email: null
    // };

    // const event = getEventByUrl(req.params.event_url);
    const event = {
      id: 1,
      title: 'Party Time',
      description: 'Event Description',
      url: 'aaaaaaa',
      owner_id: 1001
    };

    if (event) {

      // call getTimesForEvent() - return array of times associated with event id from db
      const times = [
        {
          id: 1,
          event_id: 1,
          start_time: '',
          end_time: '',
          total_votes: 1
        },
        {
          id: 2,
          event_id: 1,
          start_time: '',
          end_time: '',
          total_votes: 0
        },
        {
          id: 3,
          event_id: 1,
          start_time: '',
          end_time: '',
          total_votes: 0
        }
      ];
      // caLL getVotesForEvent() - return
      const votes = [
        {
          id: 1,
          time_id: 1,
          user_id: 1001,
          vote: true
        },
        {
          id: 2,
          time_id: 1,
          user_id: 1002,
          vote: false
        },
        {
          id: 3,
          time_id: 1,
          user_id: 1003,
          vote: null
        },
      ];

      const templateVars = {
        user,
        event,
        times,
        votes
      };
      res.render("viewEvent", templateVars);
    } else {
      res.send("Event ID required or not found.");
    }

  });

  router.get("*", (req, res) => {
    res.send("Event ID required or not found.");
  });


  //post to events '/'


  // post
  //  generateUrl() - returns url string - localhost:999/events/   = url

  router.post('/', (req, res) => {

  });



  return router;
};
