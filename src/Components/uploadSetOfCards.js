const fs = require('fs');
const axios = require('axios');

const cardsData = JSON.parse(fs.readFileSync('./tdmCardList.json', 'utf-8'));

let cardCounter = 0;
let setOfCards = [];

function createCardObjectsFromJSON(cards) {
    for (let card of cards) {
        const formattedCard = {
            name: card.name,
            rarity: card.rarity,
            cardNumber: parseInt(card.collector_number, 10),
            colors: card.colors,
            manaValue: card.cmc,
            imageUri: card.image_uris.normal,
            setCode: "tdm"
        };

        setOfCards.push(formattedCard);
    }
}

createCardObjectsFromJSON(cardsData);
/* console.log(setOfCards); */

async function uploadSet (cardList){
    try {
        const response = await axios.post('https://hovel-backend-648542156002.us-central1.run.app/api/cards/addSet', cardList);
        console.log(`Cards uploaded successfully!`);
    } catch (error) {
        console.error(`Error uploading cards:`, error.message);
    } 
}

uploadSet(setOfCards);