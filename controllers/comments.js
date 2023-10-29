const Travel = require('../models/travel');

module.exports = {
    create,
    deleteReview
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

  async function deleteReview(req, res){
    try{
        const travelDoc = await Travel.findByIdAndRemove(id, _id)
        const commentDoc = travelDoc.comments.id(req.params.id)
        await travelDoc.save()
        res.redirect(`/travels/${travelDoc._id}`)

        // const travelDoc = await Travel.findOne({
        //     "comments._id": req.params.id,  //<< searching the reviews array for a matching id!
        //     "comments.user": req.user._id
        //   });
        //   console.log(movieDoc)
        //   travelDoc.comments.remove(req.params.id);
        //   // if you wanted to find a review
        //   const reviewDoc = movieDoc.reviews.id(req.params.id)
        //   await movieDoc.save()
        //   res.redirect(`/movies/${movieDoc._id}`)

    } catch (err) {
        res.send(err)
    }
  }
