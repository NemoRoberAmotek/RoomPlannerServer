const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  name: { type: String, default: "My First Room" },
  width: { type: Number, default: 400 },
  length: { type: Number, default: 600 },
  color: { type: String, default: "#FFFFFF" },
  texture: { type: String, default: "none" },
  furniture: [
    {
      placement_id: String,
      color: String,
      icon: String,
      length: Number,
      width: Number,
      name: String,
      position: {
        posX: Number,
        posY: Number,
      },
      rotate: Boolean,
      texture: String,
      zIndex: Number,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastSave: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Room = mongoose.model("room", RoomSchema);
