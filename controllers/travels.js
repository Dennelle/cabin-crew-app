// ============ require models =============
const Travel = require("../models/travel");
const User = require("../models/user");

// ============ export functions ===============
//new and delete are reserved words but it can have an object property
module.exports = {
  index,
  create,
  delete: deleteTravel,
  edit,
  update,
  new: newTravels,
  show,
};

// ========= FUNCTIONS ===========
async function show(req, res) {
  try {
    console.log(req.params.id);
    const travelDocument = await Travel.findById(req.params.id).populate(
      "user"
    );
    // .populate takes name of the key on the model that contains the id's
    console.log(travelDocument);
    res.render("travels/show", { travel: travelDocument });
  } catch (err) {
    res.send(err);
  }
}

//this function will find all the travel entries and render it on the travels/index.ejs page.
async function index(req, res) {
  try {
    console.log("REQ USER", req.user);
    const travelDocuments = await Travel.find({}).populate("user");
    // the empty {} says find all the movies.
    console.log(travelDocuments);
    //the travelDocs is a key that used in the travels/index.ejs page.
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
    res.redirect(`/travels/${travel._id}`);
  } catch (err) {
    console.log(err);
    //a redirect because the data changed
    res.redirect(`/travels/new`);
  }
}

function newTravels(req, res) {
  res.render("travels/new");
}

async function deleteTravel(req, res) {
  await Travel.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  res.redirect("/travels");
}
