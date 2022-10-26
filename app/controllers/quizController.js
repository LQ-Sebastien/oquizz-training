const errorHandler = require("../errorHandler");
const { Quiz, Tag } = require("../models")


const quizController = {
    getOne: async (req, res) => {
        const id = Number(req.params.id);

        const quiz = await Quiz.findByPk(id, {
            include: [
                'user',
                'tags', 
                {
                    association: 'questions',
                    include: ['answers', 'level']
                }
            ]
        });

        if(quiz) {
            res.render('quizz', { quiz });
        } else {
            errorHandler.handleError(res, 404, { message: "Quiz not found"});
        }
    },

    getByTags: async (req, res) => {
        const tagId = Number(req.params.tagId);

        const tag = await Tag.findByPk(tagId, {
            include: [ { 
                association: 'quizzes',
                include: ['user']
            }]
        });
        res.render('tag', { tag });
    }

}

module.exports = quizController;