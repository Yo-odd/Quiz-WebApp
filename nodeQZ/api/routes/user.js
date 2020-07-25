const express = require('express')
const router = express.Router();
// const mongoose= require('mongoose');
const User = require('../controllers/user');
const agnipariksha = require('../middleware/authentication');

router.post('/verify_token', agnipariksha.validateToken ,User.verify_token);
router.post('/addUser',User.addUser);
router.post('/login',User.login);
router.get('/allUser', agnipariksha.validateToken ,User.getUser);
router.post('/allAdmin', agnipariksha.validateToken ,User.allAdmin);
// router.post('/mydetails',User.getUserDetails);
router.post('/mydetails', agnipariksha.validateToken ,User.getUserDetails);
router.post('/getUserBasicDetails', agnipariksha.validateToken ,User.getUserBasicDetails);
router.patch('/updateUser',User.updateUser);
router.patch('/updatemail',User.updatemail);
router.patch('/updatepassword',User.updatepassword);
router.delete('/deleteUser',User.deleteUser);

// router.get('/', agnipariksha.validateToken ,Quiz.getQuiz);


module.exports = router; 