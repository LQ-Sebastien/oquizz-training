
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Level extends Model {}

Level.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
},{
    sequelize,
    tableName: 'level'
});

module.exports = Level;