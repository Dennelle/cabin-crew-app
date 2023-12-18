const Travel = require('../models/travel');

module.exports = {
    create,
    deleteComment
  };

  async function create(req, res) {
    try {
      const travelDoc = await Travel.findById(req.params.id);
      console.log(travelDoc);
      console.log("CONTENTS OF FORM ----->", req.body);
      // push the subdocs (conents of the form)
      // into the moviews reviews array
      // before you create the review and the users information
      // from req.user (passport)
      // to req.body the contents of the form which represents
      // the review!
      req.body.user = req.user._id;
      req.body.userName = req.user.name;
      req.body.userAvatar = req.user.avatar;

      travelDoc.comments.push(req.body);

      await travelDoc.save();
      res.redirect(`/travels/${travelDoc._id}`);
    } catch (err) {
      res.send(err);
    }
  }

  // In order to delete a comment
  // we need to find the travel entry that has
  // that comment
  async function deleteComment(req, res) {
    try {
      const travelDoc = await Travel.findOne({
        "comments._id": req.params.id, //<< searching the reviews array for a matching id!
        "comments.user": req.user._id,
      });

      travelDoc.comments.remove(req.params.id);

      // if you wanted to find a review
      const commentDoc = travelDoc.comments.id(req.params.id);

      await travelDoc.save();
      //Tell the browser to issue another GET request.
      res.redirect(`/travels/${travelDoc._id}`);
      // once you find the movieDoc
      // then you can use the .remove method on the reviews array and accepts the id of the review
      // then save to the db
      // then respond to the client!
    } catch (err) {
      res.send(err);
    }
  };
