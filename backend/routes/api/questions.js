const express=require("express");
const router=express.Router();
const passport = require("passport");
const Question = require("../../models/Question");



//@type POST
//@route /api/question/create
//@desc route to create question
//@access PROCTED

router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const newQuestion = new Question({
                user: req.user.id,
                title: req.body.title,
                body: req.body.body,
                tags: req.body.tags.split(",")
            });

            const savedQuestion = await newQuestion.save();
            res.json(savedQuestion);

        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Server Error" });
        }
    }
);
//GET ALL THE ROUTES

router.get("/all", async (req, res) => {
    try {
        const questions = await Question.find()
            .sort({ createdAt: -1 });

        res.json(questions);

    } catch (err) {
        res.status(500).json({
            error: "Cannot fetch questions"
        });
    }
});

//GETIING QUESTION BY ID 

router.get("/:id", async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).json({
                error: "Question not found"
            });
        }

        question.views += 1;
        await question.save();

        res.json(question);

    } catch (err) {
        res.status(500).json({
            error: "Invalid ID"
        });
    }
});

//UPDATE QUESTION BY ID

router.put(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const question = await Question.findById(req.params.id);

            if (!question) {
                return res.status(404).json({
                    error: "Question not found"
                });
            }

            if (question.user.toString() !== req.user.id) {
                return res.status(401).json({
                    error: "Unauthorized"
                });
            }

            if (req.body.title) question.title = req.body.title;
            if (req.body.body) question.body = req.body.body;
            if (req.body.tags) {
                question.tags = req.body.tags.split(",");
            }

            await question.save();

            res.json(question);

        } catch (err) {
            res.status(500).json({
                error: "Server Error"
            });
        }
    }
);
//DELETING THE QUESTION
router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const question = await Question.findById(req.params.id);

            if (!question) {
                return res.status(404).json({
                    error: "Question not found"
                });
            }

            if (question.user.toString() !== req.user.id) {
                return res.status(401).json({
                    error: "Unauthorized"
                });
            }

            await Question.findByIdAndDelete(req.params.id);

            res.json({
                success: "Question deleted"
            });

        } catch (err) {
            res.status(500).json({
                error: "Server Error"
            });
        }
    }
);
//ANSWER ADDING ROUTE

router.post(
    "/answer/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const question = await Question.findById(req.params.id);

            if (!question) {
                return res.status(404).json({
                    error: "Question not found"
                });
            }

            const newAnswer = {
                user: req.user.id,
                answerBody: req.body.answerBody
            };

            question.answers.unshift(newAnswer);

            await question.save();

            res.json(question);

        } catch (err) {
            res.status(500).json({
                error: "Server Error"
            });
        }
    }
);

//DELETING THE ANSWER 
router.delete(
    "/answer/:questionId/:answerId",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const question = await Question.findById(
                req.params.questionId
            );

            question.answers = question.answers.filter(
                ans => ans.id !== req.params.answerId
            );

            await question.save();

            res.json(question);

        } catch (err) {
            res.status(500).json({
                error: "Server Error"
            });
        }
    }
);
//UPVOTE THE QUESTION

router.post(
    "/upvote/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const question = await Question.findById(req.params.id);

            const alreadyVoted = question.votes.upvotes.some(
                vote => vote.user.toString() === req.user.id
            );

            if (alreadyVoted) {
                return res.status(400).json({
                    error: "Already upvoted"
                });
            }

            question.votes.upvotes.push({
                user: req.user.id
            });

            await question.save();

            res.json(question);

        } catch (err) {
            res.status(500).json({
                error: "Server Error"
            });
        }
    }
);
router.get("/",(req,res)=>{
    res.json({test:"questions is success"})
});
module.exports=router;
  