const express = require('express');
const router = express.Router();
// require the controller that exports travels CRUD functions
const travelsCtrl = require('../controllers/travels')
const isLoggedIn = require('../config/auth')

router.get('/travels', isLoggedIn, travelsCtrl.index);
router.post('/travels', isLoggedIn, travelsCtrl.create);
router.delete('/travels/:id', isLoggedIn, travelsCtrl.delete);
router.get('/travels/new', isLoggedIn, travelsCtrl.new);
router.get('/travels/:id', isLoggedIn, travelsCtrl.show);
router.get('/travels/:id/edit', isLoggedIn, travelsCtrl.edit);
router.put('/travels/:id', isLoggedIn, travelsCtrl.update);

module.exports = router;
