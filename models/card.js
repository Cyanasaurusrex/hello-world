const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection');
class Card extends Model { }

Card.init(
    {
        card_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cmc: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        set: {
            type: DataTypes.STRING,
            allowNull: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
    }
)

module.exports = Card