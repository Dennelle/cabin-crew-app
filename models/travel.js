const mongoose = require("mongoose");

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

    // One to many relationship to the user,
    // One user has many reviews (always put relationship on the side )
    // that isn't the user!

    // A review belongs to a user!
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userName: String,
    userAvatar: String, // <- store the things on the review you'll display,
    // so you don't populate everytime!

    // <- store the things on the review you'll display,
    // so you don't populate everytime!
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
  // One Travel entry (travelSchema) has many comments, a comment belongs to a travel entry (travelSchema)
  // embedding comments into a travel entry, we use embedding when the resource will only be shown with
  // another resource, never on its own
  //many-to-many relationships uses referencing
  comments: [commentSchema],
});
// THEN WE COMPILE THE SCHEMA INTO THE MODEL AND EXPORT IT to be used in the controllers!
module.exports = mongoose.model("Travel", travelSchema);
//< the result of that line of code is the model, and we are exporting it
// // // this creates a movies collection on your mongodbatlas database
// const ticketSchema = new mongoose.Schema({
//   // One to Many Relationship from the many side!
//   // One Flight has many tickets
//     flight: {type: mongoose.Schema.Types.ObjectId, ref: 'Flight'}
//   },
//   {
//     timestamps: true,
//   }
// );



// // // Finding all the tickets (many tickets) for the One flight

// const ticketDocs = await Ticket.find({flight: flightDoc._id})

// // ONe to many relationshipß
// const userSchema = new mongoose.Schema({
//   username: String,
//   birth: Date,
//   address: Location,
//   photoUrl: String,
//   accounts: [],
//   dateJoined: Date,
// })


// const postSchema = new mongoose.Schema({
//   // One User has many Posts
//   // relationship on the post
//   user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
//   photoUrl: String,
//   likes: [likeSchema],
//   comments: [commentSchema],
//   username: String
// })

// const postDocs = await Post.find({user: user._id})
