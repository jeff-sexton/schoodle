const express = require("express");
const router = express.Router();

module.exports = () => {
  router.get("/", (req, res) => {
    const data = { user: req.user };

    res.render("createEvent", data);
    // res.json(user); // to check data representation
  });

  return router;
};
