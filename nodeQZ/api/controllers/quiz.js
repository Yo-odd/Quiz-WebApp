const express = require('express');
const mongoose = require('mongoose');
const Quiz = require('../models/quiz');
const Result = require('../models/result');
const e = require('express');
const router = express.Router();

// mongoose.set('useFindAndModify', true);

// --------------------Create Quiz ------------------------
router.addQuiz = (async (req, res) => {
    try {

        console.log(req.body.quizData);


        const quiz = new Quiz({
            quizTitle: req.body.quizTitle,
            creator: req.body.creator,
            quizExp: req.body.quizExp,
            quizTime: req.body.quizTime,
            quizData: req.body.quizData,
        })
        const result = await quiz.save();
        // res.json(result);
        res.json({
            message: 'Quiz Created in successfully',
            status: 201,
            payload: {
                result
            }
        })
    } catch (e) {
        if (e.code === 11000) {
            res.json({
                message: 'Duplicate record',
                status: 409,
                payload: {
                    ...e
                }
            })
        }
        console.log(e);
        res.json({
            message: 'Bad request',
            status: 400,
            payload: {
                ...e
            }
        })
    }
});


// --------------------Update Quiz------------------------

router.updateQuiz = (async (req, res) => {
    try {
        // const updateOps = {};
        // for(const ops of req.body){
        //     updateOps[ops.propName]=ops.value;
        // }
        const quiz = {
            creator: req.body.creator
        };
        if (req.body.newquizTitle) {
            quiz.quizTitle = req.body.newquizTitle;
        }
        // if(req.body.creator){
        //     quiz.creator = req.body.creator;
        // }
        if (req.body.quizExp) {
            quiz.quizExp = req.body.quizExp;
        }
        if (req.body.quizTime) {
            quiz.quizTime = req.body.quizTime;
        }
        if (req.body.quizData) {
            quiz.quizData = req.body.quizData;
        }
        // const quiz ={
        //     quizTitle: req.body.newquizTitle,
        //     creator: req.body.creator,
        //     quizExp: req.body.quizExp,
        //     quizTime: req.body.quizTime,
        //     quizData: req.body.quizData,
        // };
        const result = await Quiz.findOneAndUpdate({
            quizTitle: req.body.quizTitle
        },
            {
                $set: quiz
            }
            // {
            //     userName: user.new_userName
            // }
            , { new: true });
        res.json({
            message: 'Quiz Updated in successfully',
            status: 201,
            payload: {
                result,
            }
        })
        // res.json(op);
    } catch (e) {
        console.log(e);
        res.json({
            message: 'Bad Request',
            status: 400,
            payload: {
                ...e
            }
        })
    }
});



// --------------------Get Quiz Details------------------------
router.getQuiz = (async (req, res) => {
    try {
        const quiz = new Quiz({
            quizTitle: req.body.quizTitle,
            _id: req.body._id
        });
        if (quiz.quizTitle=='') {
            const result = await Quiz.find({
                _id: quiz._id
            });
            response=result.pop();
            // console.log(response);
            res.json({
                message: 'Quiz Details',
                status: 200,
                payload: {
                    response
                }
            })
        }else{
            const result = await Quiz.find({
                quizTitle: quiz.quizTitle
            });
            // console.log(result);
    
            res.json({
                message: 'Quiz Details',
                status: 200,
                payload: {
                    result
                }
            })
        }
        
    } catch (e) {
        console.log(e);
        res.json({
            message: 'Bad Request:Something went wrong fetching Quiz details',
            status: 400,
            payload: {
                ...e
            }
        })
    }
});
// --------------------Get Quiz Title------------------------
router.getQuizTitle = (async (req, res) => {
    try {
        // console.log('req body :',req.body);
        // const user = new User()

        const quiz = new Quiz({
            _id: req.body._id
        });
        const result = await Quiz.find({
            _id: quiz._id
        }).select({ "_id": 0, "quizTitle": 1 ,"creator":1});
        // console.log(result[0]);

        res.json(result)
    } catch (e) {
        console.log(e);
        res.json({
            message: 'Bad Request:Something went wrong fetching Quiz details',
            status: 400,
            payload: {
                ...e
            }
        })
    }
});


// --------------------Get All Quiz as creator------------------------
router.getAllQuiz = (async (req, res) => {
    try {
        const quiz = new Quiz({
            creator: req.body.creator
        });
        const result = await Quiz.find({
            creator: quiz.creator
        }).select({ "_id": 1, "quizTitle": 1 });
        console.log(result);
        res.json({
            message: 'Quiz Details',
            status: 200,
            payload: {
                result
            }
        })
    } catch (e) {
        console.log(e);
        res.json({
            message: 'Bad Request:Something went wrong fetching All Quiz details',
            status: 400,
            payload: {
                ...e
            }
        })
    }
});
// --------------------Get All Quiz as User------------------------
router.getUserQuizzes = (async (req, res) => {
    try {
        const quiz = new Quiz({
            creator: req.body.creator
        });
        const result = await Quiz.find({
            creator: quiz.creator
        }).select({ "_id": 1, "quizTitle": 1 });
        console.log(result);
        res.json({
            message: 'Quiz Details',
            status: 200,
            payload: {
                result
            }
        })
    } catch (e) {
        console.log(e);
        res.json({
            message: 'Bad Request:Something went wrong fetching All Quiz details',
            status: 400,
            payload: {
                ...e
            }
        })
    }
});

//-----------------Delete Quiz-----------------------
router.deleteQuiz = (async (req, res) => {
    try {
        const quiz = new Quiz({
            quizTitle: req.body.quizTitle
        });
        console.log(quiz);

        const result = await Quiz.findOneAndDelete({
            quizTitle: quiz.quizTitle
        });
        console.log(result);

        res.json({
            message: 'Quiz Deleted in successfully',
            status: 200,
            payload: {
                result
            }
        })
    } catch (e) {
        console.log(e);
        res.json({
            message: 'Bad Request:Something went wrong deleting quiz',
            status: 400,
            payload: {
                e
            }
        })
    }
});


module.exports = router;