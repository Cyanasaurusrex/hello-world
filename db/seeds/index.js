const sq = require('../../config/connection');
const seedCard = require('./cardData')

async function seedAll(){
    await sq.sync({force: true});
    await seedCard()

    process.exit(0);
}

seedAll();