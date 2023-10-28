const Travel = require('../models/travel');

module.exports = {
    index,
    create
};

async function index(req, res){
    try{
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
