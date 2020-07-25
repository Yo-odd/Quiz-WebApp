const express = require('express')
const router = express.Router();
// const mongoose= require('mongoose');
const Quiz = require('../controllers/quiz');
const agnipariksha = require('../middleware/authentication');

router.post('/addQuiz', agnipariksha.validateToken, Quiz.addQuiz);
router.get('/allQuiz', agnipariksha.validateToken ,Quiz.getAllQuiz);
// router.post('/getUserQuizzes', agnipariksha.validateToken ,Quiz.getUserQuizzes);
router.post('/selectQuiz', agnipariksha.validateToken ,Quiz.getQuiz);
router.post('/getQuizTitle',Quiz.getQuizTitle);
router.patch('/updateQuiz', agnipariksha.validateToken,Quiz.updateQuiz);
router.delete('/deleteQuiz', agnipariksha.validateToken,Quiz.deleteQuiz);



module.exports = router; 