const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");
const Room = require("../../models/Room");

// @route     POST api/rooms
// @desc      Create a room
// @access    Private
router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newRoom = new Room({
        name: req.body.name,
        color: req.body.color,
        texture: req.body.texture,
        width: req.body.width,
        length: req.body.length,
        furniture: req.body.furniture,
        user: req.user.id,
      });

      const room = await newRoom.save();

      res.json(room);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error.");
    }
  }
);

// @route     GET api/rooms
// @desc      get all rooms
// @access    Private
router.get("/", auth, async (req, res) => {
  try {
    const rooms = await Room.find({ user: req.user.id }).sort({
      lastViewed: -1,
    });

    res.json(rooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

// @route     PUT api/rooms/id
// @desc      update room
// @access    Private
router.put("/:id", auth, async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;
    console.log(body);
    const room = await Room.findByIdAndUpdate(id, body, {
      new: true,
    });

    res.send(room);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
