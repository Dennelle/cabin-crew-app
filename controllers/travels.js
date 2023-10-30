const Travel = require('../models/travel');

module.exports = {
    index,
    create,
    new: newTravels,
    show,
    edit
};

async function show(req, res){
    try {
    const travelDocument = await Travel.findById(req.params.id)
    .populate()
    .exec();
    res.render("travels/show", {travel: travelDocument});
    } catch(err){
    res.send(err)
    }
};

async function index(req, res){
    try{
        console.log("REQ USER", req.user )
        const travelDocuments = await Travel.find({});
        res.render('travels/index', { travelDocs: travelDocuments });
    } catch (err) {
        res.send(err);
    }
};

async function create(req, res, next) {
    console.log("REQ USER", req.user)
    try{
        const travelDoc = await Travel.create(req.body);
        console.log(travelDoc, "TRAVEL DOCUMENT")
        res.redirect('/travels');
    } catch (err) {
        res.send(err)
    }
};

function newTravels(req, res) {
    res.render('travels/new');
  }

async function edit(req, res) {
    try {const travelDoc = await Use.findById(req.params.id)
    .populate()
    .exec();
    res.render("travels/show", {travel: travelDocument});
    } catch (err){
    res.send(err)
    }
};
