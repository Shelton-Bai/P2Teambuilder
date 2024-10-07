const axios = require('axios');
const { Items } = require('./data/items');
const { ItemsText } = require('./data/item_text');

const API_URL = 'http://localhost:8080/p2api/items';

const filterStandardItems = (items) => {
    const result = {};
    for (const [alias, item] of Object.entries(items)) {
        if (!item.isNonstandard) {
            result[alias] = item;
        }
    }
    return result;
};

const formatItem = (alias, item, itemText) => {
    return {
        alias,
        name: itemText.name || item.name,
        desc: itemText.description || '',
        shortDesc: itemText.shortDesc || itemText.description || '',
        user: item.itemUser ? item.itemUser.join(', ') : '',
        isNonstandard: item.isNonstandard || null,
    };
};

const processItems = async () => {
    const standardItems = filterStandardItems(Items);

    for (const [alias, item] of Object.entries(standardItems)) {
        const itemText = ItemsText[alias] || {};
        const formattedItem = formatItem(alias, item, itemText);

        try {
            await axios.put(API_URL, formattedItem);
            console.log(`Successfully saved item ${alias}`);
        } catch (error) {
            console.error(`Error saving item ${alias}: ${error}`);
        }
    }
};

processItems().then(() => {
    console.log('All items processed.');
}).catch(error => {
    console.error('An error occurred:', error);
});
