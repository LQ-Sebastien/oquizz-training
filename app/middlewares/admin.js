const errorHandler = require("../errorHandler");

const adminMiddleware = (req, res, next) => {
    if(req.session.user) {
            if(req.session.user.role === "admin") {
                next();
            } else {
                errorHandler.handleError(res, 403, { message: "Vous n'êtes pas autorisé à voir cette page" })
            }
    } else {
        res.redirect('/login');
    }
}


module.exports = adminMiddleware;
