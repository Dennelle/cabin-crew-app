const express = require('express');
const router = express.Router();
const travelsCtrl = require('../controllers/travels')

router.get('/travels', travelsCtrl.index);
router.post('/travels', travelsCtrl.create);
router.delete('/travels/:id', travelsCtrl.delete);
router.get('/travels/new', travelsCtrl.new);
router.get('/travels/:id', travelsCtrl.show);
router.get('/travels/:id/edit', travelsCtrl.edit);
router.put('/travels/:id', travelsCtrl.update);

module.exports = router;
