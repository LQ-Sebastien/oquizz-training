const client = require('./database');
const Level = require('./models/level');

const dataMapper = {
    getAllLevels: async () => {
        try {
            const result = await client.query('SELECT * FROM level');
            const levels = [];

            for(let obj of result.rows ) {
                const l = new Level(obj);
                levels.push(l);
            }

            return levels;
        } catch(err) {
            console.error(err);
            return null;
        }
    },

    getOneLevel: async (id) => {
        try {
            const result = await client.query(`SELECT * FROM "level" WHERE id=$1`,[id]);
            const level = new Level(result.rows[0]);

            return level;
        } catch(err) {
            //TODO !!
        }
    }
}

module.exports = dataMapper;