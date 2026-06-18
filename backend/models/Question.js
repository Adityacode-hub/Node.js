const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "myPerson",
        required: true
    },

    title: {
        type: String,
        required: true,
        maxlength: 200
    },

    body: {
        type: String,
        required: true
    },

    tags: {
        type: [String],
        required: true
    },

    votes: {
        upvotes: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: "myPerson"
                }
            }
        ],
        downvotes: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: "myPerson"
                }
            }
        ]
    },

    views: {
        type: Number,
        default: 0
    },

    answers: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "myPerson"
            },

            answerBody: {
                type: String,
                required: true
            },

            votes: {
                type: Number,
                default: 0
            },

            isAccepted: {
                type: Boolean,
                default: false
            },

            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],

    acceptedAnswer: {
        type: Schema.Types.ObjectId,
        default: null
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Question", QuestionSchema);