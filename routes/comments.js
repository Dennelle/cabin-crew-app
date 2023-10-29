const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');

router.post('/travels/:id/comments', commentsCtrl.create)
router.delete('/reviews/:id', commentsCtrl.deleteReview)

module.exports = router;
