// why don't we write just mongoose since we already declared this variable?
const mongoose = require("mongoose");

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
        type: Number,
        min: 1,
        max: 5
     }
   });

module.exports = mongoose.model("Travel", travelSchema);
