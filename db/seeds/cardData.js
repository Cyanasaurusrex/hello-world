const Card = require('../../models/card')
const cardArray = require('./cardArrays/cardArray.json')

let cardData = []

for (let i = 0; i<cardArray.length; i++) {
    cardData.push(
        {
            card_id: cardArray[i].id,
            name: cardArray[i].name,
            cmc: cardArray[i].cmc,
            set: cardArray[i].set_name,
            type: cardArray[i].type_line,
        }
    )
}

const seedCard = () => Card.bulkCreate(cardData)

module.exports = seedCard
