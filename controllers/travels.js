const Travel = require('../models/travel');

module.exports = {
    index,
    create,
    delete:deleteTravel,
    edit,
    update,
    new: newTravels,
    show,
};

async function show(req, res){
    try {
    console.log(req.params.id)
    const travelDocument = await Travel.findById(req.params.id)
    console.log(travelDocument)
    res.render("travels/show", {travel: travelDocument});
    } catch(err){
    res.send(err)
    }
};

async function index(req, res){
    try{
        console.log("REQ USER", req.user )
        const travelDocuments = await Travel.find({});
        console.log(travelDocuments)
        res.render('travels/index', { travelDocs: travelDocuments });
    } catch (err) {
        res.send(err);
    }
};

async function edit(req, res) {
    const travel = await Travel.findOne({_id: req.params.id, user: req.user._id});
    res.render('travels/edit', { travel });
  }

  async function update(req, res) {
    try {
      const updateTravel = await Travel.findOneAndUpdate(
        {_id: req.params.id, user: req.user._id},
        // update object with updated properties
        req.body,
        // options object {new: true} returns updated doc
        {new: true}
      );
      return res.redirect(`/travels/${updateTravel._id}`);
    } catch (e) {
      console.log(e.message);
      return res.redirect('/travels');
    }
  }

async function create(req, res) {

    // Assign the logged in user's id
    try {
      req.body.user = req.user._id;
      const travel = await Travel.create(req.body);
      // Probably want to go to newly added book's show view
      res.redirect(`/travels/${travel._id}`);
    } catch (e) {
      console.log(e.message);
      // Probably want to go back to new
      res.redirect(`/books/new`);
    }
  }

function newTravels(req, res) {
    res.render('travels/new');
  }

async function deleteTravel(req, res) {
   await Travel.findOneAndDelete(
    {_id: req.params.id, user: req.user._id}
   );
   res.redirect('/travels');
}

// async function allTravels(req, res) {
//     let travelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
//     const travels = await Travel.find(travelQuery);
//     // Why not reuse the books/index template?
//     res.render('travels/index', {
//       travels,
//       nameSearch: req.query.name  // use to set content of search form
//     });
//   }
