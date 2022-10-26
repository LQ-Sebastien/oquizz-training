const { User } = require("../models");

const connectMiddleware = (req, res, next) => {
    if(req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}


module.exports = connectMiddleware;
