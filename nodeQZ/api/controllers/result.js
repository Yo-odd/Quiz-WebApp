const express = require('express');
const mongoose = require('mongoose');
const Result = require('../models/result');
const Quiz = require('../models/quiz');
const User = require('../models/user');
// const e = require('express');
const router = express.Router();

// mongoose.set('useFindAndModify', true);

// --------------------Organize Result ------------------------
router.organizeQuiz = (async (req, res) => {
    try {

        // console.log(req.body);
        // bulk_result_req=req.body;
        // console.log(bulk_result_req);
        // Result.insertMany(req.body);
        // let p_list = await Result.find({
        //     pending_quiz_id: req.body.pending_quiz_id
        // });

        if (!await Result.exists({ user_id: req.body.user_id })) {
            let result_skeleton = new Result({
                user_id: req.body.user_id,
                quiz_attendee: req.body.quiz_attendee,
                role: req.body.role,
                pending_quiz_id: req.body.pending_quiz_id,
                assigned_quiz_id: req.body.pending_quiz_id,
                attempted_quiz: req.body.attempted_quiz,
            });
            // let user = new user({
            //     _id: req.body.user_id,
            //     role:req.body.role
            // })
            const result = await result_skeleton.save();
            const role = await User.updateOne({
                _id: req.body.user_id
            }, {
                $set: { role: req.body.role }
            });
            res.send({
                message: 'Result Created in successfully',
                status: 201,
                payload: {
                    result,
                }
            });
            console.log(result);
        }
        else {

            const result = await Result.updateOne({
                user_id: req.body.user_id
            }, {
                $set: { role: req.body.role },
                $addToSet: {
                    pending_quiz_id: req.body.pending_quiz_id,
                    assigned_quiz_id: req.body.pending_quiz_id,
                }
            });
            res.send({
                message: 'Result Updated in successfully',
                status: 201,
                payload: {
                    result,
                }
            });
            console.log(result);

        };




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
// --------------------Submit Result ------------------------
router.submitQuiz = (async (req, res) => {
    try {

        console.log(req.body);
        // bulk_result_req=req.body;
        // console.log(bulk_result_req);
        // Result.insertMany(req.body);
        // let p_list = await Result.find({
        //     pending_quiz_id: req.body.pending_quiz_id
        // });

        if (!await Result.exists({ user_id: req.body.user_id })) {
            let result_skeleton = new Result({
                user_id: req.body.user_id,
                quiz_attendee: req.body.quiz_attendee,
                role: req.body.role,
                pending_quiz_id: req.body.pending_quiz_id,
                attempted_quiz: req.body.attempted_quiz,
            })
            const result = await result_skeleton.save();
            res.send({
                message: 'Result Created in successfully',
                status: 201,
                payload: {
                    result,
                }
            });
            console.log(result);
        }
        else {

            const result = await Result.updateOne({
                user_id: req.body.user_id
            }, {
                $set: {
                    pending_quiz_id: req.body.pending_quiz_id,
                    attempted_quiz: req.body.attempted_quiz
                },
                // $addToSet: { attempted_quiz: req.body.attempted_quiz }
            });
            res.send({
                message: 'Result Updated in successfully',
                status: 201,
                payload: {
                    result,
                }
            });
            console.log(result);

        };




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


// --------------------Update User------------------------

// router.updateQuiz = (async (req, res) => {
//     try {
//         const result_skeleton = {
//             creator: req.body.creator
//         };
//         if (req.body.newquizTitle) {
//             result_skeleton.quizTitle = req.body.newquizTitle;
//         }
//         if (req.body.quizExp) {
//             result_skeleton.quizExp = req.body.quizExp;
//         }
//         if (req.body.quizTime) {
//             result_skeleton.quizTime = req.body.quizTime;
//         }
//         if (req.body.quizData) {
//             result_skeleton.quizData = req.body.quizData;
//         }
//         const result = await Result.findOneAndUpdate({
//             quizTitle: req.body.quizTitle
//         },
//             {
//                 $set: result_skeleton
//             }
//             , { new: true });
//         res.json({
//             message: 'Result Updated in successfully',
//             status: 201,
//             payload: {
//                 result,
//             }
//         })
//     } catch (e) {
//         console.log(e);
//         res.json({
//             message: 'Bad Request',
//             status: 400,
//             payload: {
//                 ...e
//             }
//         })
//     }
// });



// --------------------Select result Details------------------------
router.selectResult = (async (req, res) => {
    try {
        const result_skeleton = new Result({
            user_id: req.body.user_id
        });
        const result = await Result.find({
            user_id: result_skeleton.user_id
        });
        console.log(req.body);

        res.json({
            message: 'Result Details',
            status: 200,
            payload: {
                result
            }
        })
    } catch (e) {
        console.log(e);
        res.json({
            message: 'Bad Request:Something went wrong fetching Result details',
            status: 400,
            payload: {
                ...e
            }
        })
    }
});


// --------------------Get All Result as creator------------------------
router.getAllResults = (async (req, res) => {
    try {
        const result_skeleton = new Result({
            creator: req.body.creator
        });
        const result = await Result.find({
        });
        // console.log(result);
        res.json({
            message: 'Result Details',
            status: 200,
            payload: {
                result
            }
        })
    } catch (e) {
        console.log(e);
        res.json({
            message: 'Bad Request:Something went wrong fetching All Result details',
            status: 400,
            payload: {
                ...e
            }
        })
    }
});
// --------------------Get All Result as User------------------------
router.getAllUserQuizzes = (async (req, res) => {
    try {

        var result = {
            user_id: req.body.user_id,
            pl_id: req.body.pending_quiz_id,
        };
        result = await Result.find({
            user_id: result.user_id
        });
        const newLocal = 'pending_quiz_id';
        // console.log(result[0].pending_quiz_id);
        // console.log(result[0]['pending_quiz_id']);

        // if (result.pl_id.length>0) {
        //     result.pl_id.forEach(async element => {
        //         tmp= await Quiz.find({
        //             _id: element
        //         }).select({ "_id": 0, "quizTitle": 1});
        //     });
        //     console.log(tmp);
        result['pl_Title'] = await Quiz.find().where('_id').in(result[0]['pending_quiz_id']).select({ "_id": 1, "quizTitle": 1, "creator": 1, "quizExp": 1, "quizTime": 1 });
        // }
        console.log(result);

        // result[0]['pl_Title']=pl_title;
        res.json({
            message: 'Result Details',
            status: 200,
            payload: {
                ...result,
            }
        })
    } catch (e) {
        console.log(e);
        res.json({
            message: 'Bad Request:Something went wrong fetching All Result details',
            status: 400,
            payload: {
                ...e
            }
        })
    }
});
// --------------------Get All Result as Lead------------------------
router.getAllLeadQuizzes = (async (req, res) => {
    try {
        console.log(req.body);
        var lead_det = {
            user_id: req.body.user_id,
            pl_id: req.body.pending_quiz_id,
        };
        result = await Result.find({
            user_id: lead_det.user_id
        });
        // const newLocal = 'pending_quiz_id';
        var final_result_Bulk=[];
        // console.log(result);
        // console.log(result[0]['pending_quiz_id']);

        // if (result.pl_id.length>0) {
        //     result.pl_id.forEach(async element => {
        //         tmp= await Quiz.find({
        //             _id: element
        //         }).select({ "_id": 0, "quizTitle": 1});
        //     });
        if (req.body.role =='admin') {
            result['spectate'] = await Result.find().where('assigned_quiz_id').in(result[0]['assigned_quiz_id']).select({ "user_id": 1, "quiz_attendee": 1, "attempted_quiz": 1 });
            
            res.json({
                message: 'Result Details',
                status: 200,
                payload: {
                    ...result,
                }
            })
        }
        tmp_resultBulk = await Result.find().where('assigned_quiz_id').in(result[0]['assigned_quiz_id']).select({ "user_id": 1, "quiz_attendee": 1, "attempted_quiz": 1 });

        // }
        tmp_resultBulk.forEach(element => {
            var tmp_user_qz={
                user_id:element.user_id,
                quiz_attendee:element.quiz_attendee,
                attempted_quiz:[]        
            }
            element.attempted_quiz.forEach(tmp_result => {
                // console.log('user: ',tmp_result.quiz_id);
                result[0]['pending_quiz_id'].forEach(lead_qz_id => {
                    if(lead_qz_id.toString() == tmp_result.quiz_id.toString()){
                        tmp_user_qz.attempted_quiz.push(tmp_result);
                        // console.log(tmp_user_qz);
                        final_result_Bulk.push(tmp_user_qz);
                    }
                });
            });
        });
        result['spectate']=final_result_Bulk;
        // console.log(final_result_Bulk);
        // console.log('result bulk:',tmp_resultBulk[0].attempted_quiz[0]['quiz_id']);
        // console.log(result);

        // result[0]['pl_Title']=pl_title;
        res.json({
            message: 'Result Details',
            status: 200,
            payload: {
                ...result,
            }
        })
    } catch (e) {
        console.log(e);
        res.json({
            message: 'Bad Request:Something went wrong fetching All Result details',
            status: 400,
            payload: {
                ...e
            }
        })
    }
});

//-----------------Delete Result-----------------------
router.deleteResult = (async (req, res) => {
    try {
        const result_skeleton = new Result({
            quizTitle: req.body.quizTitle
        });
        console.log(result_skeleton);

        const result = await Result.findOneAndDelete({
            quizTitle: result_skeleton.quizTitle
        });
        console.log(result);

        res.json({
            message: 'Result Deleted in successfully',
            status: 200,
            payload: {
                result
            }
        })
    } catch (e) {
        console.log(e);
        res.json({
            message: 'Bad Request:Something went wrong deleting result_skeleton',
            status: 400,
            payload: {
                e
            }
        })
    }
});


module.exports = router;