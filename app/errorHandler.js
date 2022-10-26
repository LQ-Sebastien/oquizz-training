const errorHandler = {
    handleLoginError: (res) => {
        res.status(401);
        res.render('login', { error: true });
    },

    handleError: (res, code, err) => {
        res.status(code);
        try {
            res.render(`errors/${code}`, { err }); 
        } catch(e) {
            res.render('errors/general', { err });
        }
    }
    
}

module.exports = errorHandler;