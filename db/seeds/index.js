const sq = require('../../config/connection');
const seedItem = require('./itemData');

const item = require('../../models/item')


async function seedAll(){
    await sq.sync({force: true});

    await seedItem();

    process.exit(0);
}

seedAll();