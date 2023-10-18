const Card = require('../../models/card')
const cardArray = require('./cardArrays/allCards.json')

let cardData = []

for (let i = 0; i<cardArray.length; i++) {
    let placeholderSM = null
    let placeholderNM = null
    let placeholderLG = null
    let placeholderPNG = null
    let placeholderAC = null
    let placeholderBC = null
    try {
        placeholderSM = cardArray[i].image_uris.small
        placeholderNM = cardArray[i].image_uris.normal
        placeholderLG = cardArray[i].image_uris.large
        placeholderPNG = cardArray[i].image_uris.png
        placeholderAC = cardArray[i].image_uris.art_crop
        placeholderBC = cardArray[i].image_uris.border_crop
    } catch {

    }
    
    
    
    cardData.push(
        {
            card_id: cardArray[i].id,
            name: cardArray[i].name,
            cmc: cardArray[i].cmc,
            set: cardArray[i].set_name,
            type: cardArray[i].type_line,
            img_small: placeholderSM,
            img_normal: placeholderNM,
            img_large: placeholderLG,
            img_png: placeholderPNG,
            img_art_crop: placeholderAC,
            img_border_crop: placeholderBC
        }
    )
}

const seedCard = () => Card.bulkCreate(cardData)

module.exports = seedCard
