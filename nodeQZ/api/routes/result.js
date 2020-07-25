const express = require('express')
const router = express.Router();
// const mongoose= require('mongoose');
const Result = require('../controllers/result');
const Quiz = require('../controllers/quiz');
const agnipariksha = require('../middleware/authentication');

router.post('/organizeQuiz', agnipariksha.validateToken, Result.organizeQuiz);
router.post('/submitQuiz', agnipariksha.validateToken, Result.submitQuiz);
router.get('/allResults', agnipariksha.validateToken ,Result.getAllResults);
router.post('/getAllUserQuizzes', agnipariksha.validateToken ,Result.getAllUserQuizzes);
router.post('/getAllLeadQuizzes', agnipariksha.validateToken ,Result.getAllLeadQuizzes);
router.post('/selectResult', agnipariksha.validateToken ,Result.selectResult);
// router.patch('/updateQuiz', agnipariksha.validateToken,Result.updateQuiz);
router.delete('/deleteResult', agnipariksha.validateToken,Result.deleteResult);



module.exports = router; 