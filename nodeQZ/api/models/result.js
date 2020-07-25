const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

const quizSubmission = mongoose.Schema(
    {
        quiz_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'quiz',
        },
        attemptDate: {
            type: Date
        },
        question: [{
            questionContent: String,
            questionOrder: Number,
            submittedAns: String,
            correct: Boolean
        }]
    }, {
    timestamps: true
});

const resultSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            unique: true
        },
        quiz_attendee:{
            type:String
        },
        role:{
            type:String
        },
        assigned_quiz_id:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'quiz',
        }],
        pending_quiz_id:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'quiz',
        }],
        attempted_quiz: {
            type: [quizSubmission]
        }
    }, {
        timestamps: true
    });


// resultSchema.plugin(AutoIncrement, { inc_field: 'qIndx' });

module.exports = mongoose.model('Result', resultSchema);
// module.exports = mongoose.model('quizSubmission', quizSubmission);