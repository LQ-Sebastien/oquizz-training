const dotenv = require('dotenv');
dotenv.config();


const { Level, Question } = require('./app/models/index');

(async () => {
    const l = await Level.findByPk(1, {
        include: ["questions"]
    });
    // console.log(l);
})();

// A l'inverse
(async () => {
    const q = await Question.findByPk(20, {
        include: [
            "level",
            "answers",
            "good_answer",
            { 
                association: "quiz", 
                include: ["user", "tags"]
            }]
    });
    console.log(`La première question est "${q.question}"et son niveau est ${q.level.name}`);

    console.log(`Les réponses possible sont : `);

    q.answers.forEach((answer) => console.log(`- ${answer.description}`));
    
    console.log("-----------------------------");
    console.log(`La bonne réponse est : ${q.good_answer.description}`);

    console.log("..................................")
    console.log(`Cette question appartient au Quiz : ${q.quiz.title} écrit par ${q.quiz.user.firstname}`)
    console.log("---------------- TAGSSSS -----------------------");
    
    q.quiz.tags.forEach(tag => console.log(`- ${tag.name}`));
})();
