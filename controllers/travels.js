const Travel = require('../models/travel');
const User = require("../models/user");

// ^ MovieModel can perform CRUD On our DB
// https://mongoosejs.com/docs/api/model.html <-- All the methods are listed here
module.exports = {
    index,
    create,
    delete:deleteTravel,
    edit,
    update,
    new: newTravels,
    show,
};

async function show(req, res) {
  // we want to replace all of the id's of the performers in movieDocuments cast array
  // with the actual performer docs!
  // .populate takes name of the key on the model that contains the id's
  try {
    console.log(req.params.id);
    const travelDocument = await Travel.findById(req.params.id).populate(
      "user"
    );
    console.log(travelDocument);
    res.render("travels/show", { travel: travelDocument });
  } catch (err) {
    res.send(err);
  }
}

async function index(req, res) {
  // find all the movies and render an movies/index.ejs page
  try {
    console.log("REQ USER", req.user);
    const travelDocuments = await Travel.find({}).populate("user"); // <- empty object says find all the movies!
    console.log(travelDocuments);
    res.render("travels/index", { travelDocs: travelDocuments });
  } catch (err) {
    res.send(err);
  }
}

async function edit(req, res) {
  try {
    const travel = await Travel.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    //Render a view template and send the resulting HTML to the browser.
    res.render("travels/edit", { travel });
  } catch (err) {
    res.send(err);
  }
}

async function update(req, res) {
  try {
    console.log("REQ.PARAMS.ID", req.params.id);
    console.log("REQ.USER.ID", req.user._id);
    const updatedTravel = await Travel.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    return res.redirect(`/travels/${updatedTravel._id}`);
  } catch (err) {
    res.send(err);
  }
}

async function create(req, res) {
  // Assign the logged in user's id
  try {
    req.body.user = req.user._id;
    const travel = await Travel.create(req.body);
    // put it in the database, then respond client
    // Await is saying, wait for this line of code to finish,
    // before run the code afterwards
    res.redirect(`/travels/${travel._id}`);
  } catch (err) {
    console.log(err);
    // Probably want to go back to new
    res.redirect(`/travels/new`);
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

// the evolution of handling asynchrounous code!
// async code is lines of code that take awhile run
// so like our model having to send a message all the way to
// our database in another stater and come back!
