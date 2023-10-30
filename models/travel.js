// why don't we write just mongoose since we already declared this variable?
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
   {
     content: {
       type: String,
       required: true,
     },
     futureVisit: {
         type: String,
         enum: ['Yes', 'No', 'Maybe']
      },
     user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
     userName: String,
     userAvatar: String // <- store the things on the review you'll display,
     // so you don't populate everytime!
   },
   {
     timestamps: true,
   }
 );

const travelSchema = new mongoose.Schema(
    {
     user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
     userName: String,
     userAvatar: String,
     country: String,
     city: String,
     dateVisited: Date,
     dateReturned: Date,
     memorableMoments: String,
     lessonsLearned: String,
     advice: String,
     noChildren: Number,
     ageChildren: String,
     kidFriendlyRating: {
        type: String,
        enum: ['G', 'PG', 'PG-13', 'R']
     },
     comments: [commentSchema],
   });

module.exports = mongoose.model("Travel", travelSchema);
