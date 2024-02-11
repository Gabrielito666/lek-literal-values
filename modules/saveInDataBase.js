const db_session = require('./data');

const saveInDataBase = async (props) => {

    await Promise.all(
        Object.keys(props).map(async key => {

            const type = Array.isArray(props[key]) ? 'array' : typeof props[key];
            const where = { key };
            const value = typeToString(type, props[key]);
        
            const exist = await db_session.exist({ where })
            if(exist) await db_session.update({ where, update : { value, type } });
            else await db_session.insert({ row : { key, value, type } });
        })
    )
};


const typeToString = (type, value) =>{
    if(type === 'string') return value;
    else if(type === 'function' || type === 'boolean' || type === 'number') return value.toString();
    else if(type === 'object' || type === 'array') return JSON.stringify(stringedObject(value).value);
}

const stringedObject = (obj, key) => {

    const type = Array.isArray(obj) ? 'array' : 'object';

    const iterable = type === 'array' ? obj : Object.keys(obj);

    const value = iterable.map(p => {

        const thing = type === 'array' ? p : obj[p];

        if(typeof thing === 'string')
        {
            return { key : p, value : thing, type : 'string' };
        }
        else if(typeof thing === 'number' || typeof thing === 'boolean' || typeof thing === 'function')
        {
            return { key : p, value : thing.toString(), type : typeof thing };
        }
        else if(typeof thing === 'object')
        {
            return stringedObject(thing, p);
        }
    });

    return { key, type, value }
};

module.exports = saveInDataBase;