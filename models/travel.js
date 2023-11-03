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
         enum: ['Yes', 'No', 'Undecided'],
         required: true,
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
     userName:{
      type: String,
     },
     userAvatar:{
      type: String,
     },
     country: {
      type: String,
      required: true
     },
     city: {
      type: String,
      required: true
     },
     dateVisited: {
      type: Date,
      required: true
     },
     dateReturned: {
      type: Date,
      required: true
     },
     memorableMoments: {
      type: String,
      required: true
     },
     lessonsLearned:{
      type: String,
      required: true
     },
     advice: {
      type: String,
      required: true
     },
     noChildren: {
      type: Number,
      required: true
     },
     ageChildren: {
      type: String,
      required: true
     },
     kidFriendlyRating: {
        type: String,
        enum: ['G', 'PG', 'PG-13', 'R'],
        required: true
     },
     comments: [commentSchema],
   });

module.exports = mongoose.model("Travel", travelSchema);
