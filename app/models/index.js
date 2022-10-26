const Level = require('./level');
const Question = require('./question');
const Answer = require('./answer');
const Quiz = require('./quiz');
const User = require('./user');
const Tag = require('./tag');

// One To Many 

// Une question à un niveau 
Question.belongsTo(Level, {
    foreignKey: "level_id",
    as: "level",
});

// Un niveau a plein de question
Level.hasMany(Question, {
    foreignKey: "level_id",
    as: "questions"
});

// Question Réponse <-> One To Many + One To One

// Question à plusieurs réponses 
Question.hasMany(Answer, {
    foreignKey: "question_id",
    as: "answers"
});

// Réciproque : Une réponse appartient une question
Answer.belongsTo(Question, {
    foreignKey: "question_id",
    as: "question"
});

// Une question à UNE bonne réponse
Question.belongsTo(Answer, {
    foreignKey : "answer_id",
    as: "good_answer"
});


// Question Quiz <-> One To Many // quiz_id sur Question

// Un Quiz possède PLUSIEURS Questions
// Quiz has Many Questions
Quiz.hasMany(Question, {
    foreignKey: "quiz_id",
    as: "questions"
});

// Question belongs to Quiz
Question.belongsTo(Quiz, {
    foreignKey: "quiz_id",
    as: "quiz"
});

// User Quiz <-> One To Many // user_id sur Quiz

// UN Quiz appartient à UN User 
Quiz.belongsTo(User, {
    foreignKey: "user_id",
    as: "user"
});

// Réciproque : UN User possède PLUSIEURS Quiz
User.hasMany(Quiz, {
    foreignKey: "user_id",
    as: "quizzes"
});


// -------------------------------------------------------
// UN Quiz possède PLUSIEURS tags
Quiz.belongsToMany(Tag, {
    through: "quiz_has_tag",
    foreignKey: 'quiz_id',
    otherKey: 'tag_id',
    as: "tags",
});

// Un Tag possède PLUSIEURS Quiz ... la réciproque
Tag.belongsToMany(Quiz, {
    through: "quiz_has_tag",
    foreignKey: "tag_id",
    otherKey: "quiz_id",
    as: "quizzes"
});


module.exports = { Level, Question, Answer, Quiz, Tag, User }