const errorHandler = require('../errorHandler');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const userController = {
    signupPage: (req, res) => {
        res.render('signup');
    },
    signupAction: async (req, res) => {
        // TODO !!!
        // ETAPE 1) Verifier si l'email n'est pas déjà pris

        // ETAPE 2) Est-ce que le format d'email est valide ? 
        // --> package npm email-validation : https://www.npmjs.com/package/email-validation
        // ETAPE 3) Est-ce que MDP et la confirmation correspondent 
        // ETAPE 4 - Si on était courageux, on verifie que le MDP correspond au recommandations de la CNIL ou L'UE (RGPD)
        // ETAPE 5 - Tout est bon, j'hash le mdp 
        const encryptedPwd = await bcrypt.hash(req.body.password, 10);
        // TODO !!!
        // ETAPE 6 - Je crée le user (new User({ ... }))
        // ETAPE 7 - redirigé vers /login

    },
    loginPage: (req, res) => {
        res.render('login');
    },
    loginAction: async (req, res) => {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });


        if(user) {
            const isMatch = await bcrypt.compare(req.body.password, user.password);

            if(isMatch) {
                 req.session.user = user;

                 delete req.session.user.password;

                 return res.redirect('/');
            } else {
                errorHandler.handleLoginError(res);
            }
        } else {
            errorHandler.handleLoginError(res);
        }
    },
    all: async (req, res) => {
        const users = await User.findAll();

        res.send(users);
    },
    get: async (req, res) => {
        const id = Number(req.params.id);

        if(!isNaN(id)) {
            const user = await User.findByPk(id);

            res.send(user);

            return;
        }


        res.status(404);
        res.send("Not found");
    },
    create: async (req, res) => {
         const body = req.body;

        try {
            const user = await User.create(body);

            res.send(user);
        } catch(err) {
            res.send(err);
        }
    },
    update: async (req, res) => {
        const body = req.body;
        const id = Number(req.params.id);


        if(!isNaN(id)) {
            const user = await User.update(body, { where: { id }});
            res.send(user);
            return;
        } 

        res.status(404);
        res.send("Not found");

    },
    delete: async (req, res) => {
          const id = Number(req.params.id);

          if(!isNaN(id)) {
              const user = await User.findByPk(id);
              user.destroy();
              res.send("He's gone");
              return;
          } 
  
          res.status(404);
          res.send("Not found");
    },
    
}

module.exports = userController;