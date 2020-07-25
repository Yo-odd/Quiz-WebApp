const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

const quizContentSchema = mongoose.Schema(
    {
        question: {
            questionContent:String,
            questionOrder:Number
        },
        answers: [{
            answerContent:String
        }],
        quizAns: {
            type: String,
        }
    }
);

const quizSchema = mongoose.Schema({
    // quizIndex: {
    //     type: Number,
    //     required: [true, 'quiz Id is required'],
    //     unique: [true]
    // },
    quizTitle: {
        type: String,
        required: [true, 'Quiz Title is required'],
        unique: [true, 'Quiz Title already exist, try another combination ;)']
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    quizExp: {
        type: Date,
        default: () => Date.now() + 7 * 24 * 60 * 60 * 1000
    },
    quizTime: {
        type: String,
    },
    quizData: {
        type: [quizContentSchema],
        default: undefined
    }
}, {
    timestamps: true
});

// quizContentSchema.plugin(AutoIncrement, { inc_field: 'qIndx' });

module.exports = mongoose.model('quizContent', quizContentSchema);
module.exports = mongoose.model('quiz', quizSchema);