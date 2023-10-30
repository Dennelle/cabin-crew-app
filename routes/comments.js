const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');

router.post('/travels/:id/comments', commentsCtrl.create)
router.delete('/comments/:id', commentsCtrl.deleteComment)

module.exports = router;
