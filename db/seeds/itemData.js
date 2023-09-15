const Item = require('../../models/item')

const itemData = [
    {
        name: "camera",
        price: 249.99
    },
    {
        name: "radio",
        price: 10.99
    }
]

const seedItem = () => Item.bulkCreate(itemData)

module.exports = seedItem
