const path = require('path');
const wineryPath = path.resolve(__dirname, './winery/winery.js');
const saveInDataBase = require('./modules/saveInDataBase');
const writeJavascript = require('./modules/writeJavascript');
const removeInDataBase = require('./modules/removeInDataBase');


const set = (key, value) => new Promise(resolve => {
    const params = {};
    if(typeof key === 'string') params[key] = value;
    else Object.assign(params, key);
    saveInDataBase(params).then(() => {
        writeJavascript().then(() => {
            delete require.cache[wineryPath];
            resolve();
        });
    })
});

const get = (key) => {
    if(key === undefined) return require('./winery/winery');
    else if(typeof key === 'string') return require('./winery/winery')[key];
    else if(Array.isArray(key)) 
    {
        return key.reduce((acc, k) => ({ ...acc, [k] : require('./winery/winery')[k]}), {});
    }
    else throw new Error('the get method of lek-literal-values only admits an array, a string or undefined as a property.')
};

const remove = (key) => new Promise(resolve => {
    removeInDataBase(key).then(() => {
        writeJavascript().then(() => {
            delete require.cache[wineryPath];
            resolve();
        });
    })
});


module.exports = { set, get, remove };