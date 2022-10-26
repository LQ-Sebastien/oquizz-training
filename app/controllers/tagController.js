const errorHandler = require("../errorHandler");
const { Tag } = require("../models");

const tagController = {
    getAll: async (req, res) => {
        try {
            const tags = await Tag.findAll();
    
            res.render('tags', { tags });
        } catch(err) {
            errorHandler.handleError(res, 500, err);
        }
    }
}

module.exports = tagController;