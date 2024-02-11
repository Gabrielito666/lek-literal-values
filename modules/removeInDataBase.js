const db_session = require('./data');
const removeInDataBase = async key => { 
    
    if(key === undefined) await db_session.delete();
    else if(typeof key === 'string') await db_session.delete({ where : { key } });
    else if(Array.isArray(key)){
        await Promise.all(key.map(async k => { db_session.delete({ where : { key : k } }) }));
    }
    else throw new Error('the remove method of lek-literal-values only admits an array, a string or undefined as a property.')
};

module.exports = removeInDataBase;