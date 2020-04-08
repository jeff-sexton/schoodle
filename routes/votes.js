const express = require('express');
const router = express.Router();


module.exports = (db) => {
  // - Read votes
  // - attaced to event get

  // - Edit votes
  // - POST /votes/:id

  // - Add votes
  // - POST /votes

  // Add event - also updates user(if needed) and adds event times from create page
  router.post('/', (req, res) => {

    // console.log(req.body);

    db.processVotesForm(req.body, req.user);

    // update user details (if necessary)


    // check for new votes


    // create new votes


    // update existing votes



    // db.createEventFromForm(req.body, req.user)
    //   .then((data) => {

    //     // data = {user, event, times} from event creation in the db

    //     // redirect to event url
    //     res.json(data); //can't respond with a res.redirect() for an ajax post !!!!
    //   });
  });


  return router;
};
