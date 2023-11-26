const mongoose = require("mongoose");

const CalendarModelSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserCreatorModel",
      required: true,
    },
    events: [
      {
        title: { type: String, required: true },
        start: { type: Date, required: true },
        end: { type: Date, required: true },
      },
    ],
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model(
  "CalendarModel",
  CalendarModelSchema,
  "calendar"
);
