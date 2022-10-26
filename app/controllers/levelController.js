const Level = require("../models/level");

const levelController = {
    all: async (req, res) => {

        const levels = await Level.findAll();
            
        res.render('levels/all', { levels });

    },

    get: async (req, res) => {
        const id = Number(req.params.id);

        if(!isNaN(id)) {
            const level = await Level.findByPk(id);
            res.send(level);
            return;
        } 
        res.status(404);
        res.send("Not found");
    },

    getCreate: async (req, res) => {
        res.render('levels/upsert', { level: false });
    },

    doCreate: async (req, res) => {
        const formData = req.body;
        const level = await Level.create(formData);

        res.redirect('/levels');
    }, 

    getUpdate: async(req, res) => {        
        const id = Number(req.params.id);

        if(!isNaN(id)) {

            const level = await Level.findByPk(id);

            res.render('levels/upsert', { level });
            return;
        }
        res.status(404);
        res.send("Not found");
    },

    doUpdate: async(req, res) => {
        const id = Number(req.params.id);
        const body = req.body; 

        try {
            await Level.update(body, { where: { id }});

            res.redirect('/levels');
        } catch(err) {
            res.status(500);
            res.send("Something went wrong");
            console.error(err);
        }
    },

    getDelete: async (req, res) => {
        res.render('levels/delete');
    },

    doDelete: async(req, res) => {
          const id = Number(req.params.id);

          if(!isNaN(id)) {
              const level = await Level.findByPk(id);
              level.destroy();
              res.redirect('/levels');
              return;
          } 
          res.status(404);
          res.send("Not found");
    }
}

module.exports = levelController;