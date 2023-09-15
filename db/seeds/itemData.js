const Item = require('../../models/item')

const itemData = [
    {
        name: "camera",
        price: 249.99
    },
    {
        name: "radio",
        price: 10.99
    },
    {
        name: "book",
        price: 8.99
    },
    {
        name: "speaker",
        price: 39.99
    },
    {
        name: "headphones",
        price: 12.99
    },
    {
        name: "table",
        price: 189.99
    },
    {
        name: "television",
        price: 899.99
    },
    {
        name: "computer",
        price: 1099.99
    },
    {
        name: "printer",
        price: 169.99
    }
]

const seedItem = () => Item.bulkCreate(itemData)

module.exports = seedItem
