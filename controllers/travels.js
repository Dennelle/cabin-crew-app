const Travel = require('../models/travel');

module.exports = {
    index,
    create,
    new: newTravels,
    show
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
    try{
        const travelDocs = await Travel.create(req.body);
        res.direct('/travels');
    } catch (err) {
        res.send(err)
    }
};

function newTravels(req, res) {
    res.render('travels/new');
  }
