const express = require("express");
const router = express.Router();

// @route     GET api/furniture
// @desc      Furniture route
// @access    Public
router.get("/", (req, res) => {
  res.send("user route");
});

module.exports = router;
