const sequelize = require('../database');
const { Model, DataTypes } = require('sequelize');

class User extends Model {
    getFullName() {
        return `${this.firstname} ${this.lastname}`;
    }
}

User.init({
    firstname: DataTypes.TEXT,
    lastname: DataTypes.TEXT,
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
        allowNull: false,
    }
}, {
    sequelize,
    tableName: "user"
});


module.exports = User;