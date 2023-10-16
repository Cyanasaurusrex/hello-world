const Card = require('../../models/card')
const cardArray = require('./cardArrays/cardArray.json')

let cardData = []

for (let i = 0; i<cardArray.length; i++) {
    cardData.push(
        {
            name: cardArray[i]
        }
    )
}

const seedCard = () => Card.bulkCreate(cardData)

module.exports = seedCard
