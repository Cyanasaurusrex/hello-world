const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection');
class Card extends Model { }

Card.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
    }
)

module.exports = Card