const Travel = require('../models/travel');

module.exports = {
    create,
    deleteComment
  };

  async function create(req, res) {
    try {
        const travelDoc = await Travel.findById(req.params.id);
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;

        travelDoc.comments.push(req.body);

        await travelDoc.save();
        res.redirect(`/travels/${travelDoc._id}`);
    } catch (err) {
        res.send(err)
    }
  };

  async function deleteComment(req, res) {
    try {
        const travelDoc = await Travel.findOne({
          "comments._id": req.params.id,
          "comments.user": req.user._id
        });

        travelDoc.comments.remove(req.params.id)

        const commentDoc = travelDoc.comments.id(req.params.id)

        await travelDoc.save()

        res.redirect(`/travel/${travelDoc._id}`)

    } catch (err) {
      res.send(err)
    }
  };
