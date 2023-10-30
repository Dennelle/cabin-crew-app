const express = require('express');
const router = express.Router();
const travelsCtrl = require('../controllers/travels')

router.get('/', travelsCtrl.index);
router.post('/', travelsCtrl.create);
router.get('/new', travelsCtrl.new);
router.get('/:id', travelsCtrl.show);
router.get('/comments/:id/edit', travelsCtrl.edit);

module.exports = router;
