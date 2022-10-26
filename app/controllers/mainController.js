const { Quiz } = require("../models");

const mainController = {

    homePage: async (req, res) => {
        const quizzes = await Quiz.findAll({
            include: ["user"]
        });

        res.render('home', {quizzes});
    }

}

module.exports = mainController;