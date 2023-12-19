const mongoose = require("mongoose");


// the commentScheme has a one to many relationship to the travelSchema. One travel entry will have many reviews. a comment belongs to one user.
const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    futureVisit: {
      type: String,
      enum: ["Yes", "No", "Undecided"],
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userName: String,
    userAvatar: String,
  },
  {
    timestamps: true,
  }
);

const travelSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userName: {
    type: String,
  },
  userAvatar: {
    type: String,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  dateVisited: {
    type: Date,
    required: true,
  },
  dateReturned: {
    type: Date,
    required: true,
  },
  memorableMoments: {
    type: String,
    required: true,
  },
  lessonsLearned: {
    type: String,
    required: true,
  },
  advice: {
    type: String,
    required: true,
  },
  noChildren: {
    type: Number,
    required: true,
  },
  ageChildren: {
    type: String,
    required: true,
  },
  kidFriendlyRating: {
    type: String,
    enum: ["G", "PG", "PG-13", "R"],
    required: true,
  },
  comments: [commentSchema],
});
  // One Travel entry (travelSchema) has many comments, a comment belongs to a travel entry (travelSchema). Embedding comments into a travel entry, use embedding when the resource will only be shown with another resource, never on its own keep in mind that many-to-many relationships uses referencing



//the travelSchema is compiled into the model and exported to be used in the controller module. Upon exporting, it creates a travel collection in the mongodbatlasdb
module.exports = mongoose.model("Travel", travelSchema);
