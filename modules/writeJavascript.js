const fs = require('fs');
const path = require('path');
const FS_ERR_MSG = 'An error occurred when writing the modules in lek-literal-values. The error is related to the file system.';

const filename = path.join(__dirname, '../winery/winery.js');
const db_session = require('./data');

const writeJavascript = async () => {

    let promiseResolve;
    const promise = new Promise(resolve => { promiseResolve = resolve });

    const items = await db_session.select();
    const declarations =
        items.map(item => `const ${item.key} = ${ formatValue(item, 0) };\n`).join('');
    ;
    
    const exports = `module.exports = {${items.map(({key}) => '\n\t' + key).join(',')}\n}`;
    const fileContent = [ declarations, exports ].join('\n');

    fs.writeFile(filename, fileContent, (err) => {
        if (err) throw new Error(FS_ERR_MSG);
        else promiseResolve(filename);
    });

    return promise
}
module.exports = writeJavascript;

const formatValue = (item, tabs) => {
    const { type, value } = item;

    if(type === 'string') return `"${ value }"`;
    else if(type === 'boolean' || type === 'number') return value;
    else if(type === 'function') return funcTabs(value, tabs);
    else if(type === 'object') return getObject(item, tabs);
    else if(type === 'array') return getArray(item, tabs);
}

const getTabs = tabs => Array(tabs).fill('\t').join('');

const getObject = (thing, tabs) => {
    const value = typeof thing.value === 'string' ? JSON.parse(thing.value) : thing.value;
    const tbs = getTabs(tabs);
    return `{\n${value.map(ch => getProp(ch, (tabs + 1))).join(',\n')}\n${tbs}}`;
};

getProp = (ch, tabs) => `${getTabs(tabs)}${ch.key} : ${formatValue(ch, tabs)}`;

const getArray = (thing, tabs) => {
    const value = typeof thing.value === 'string' ? JSON.parse(thing.value) : thing.value;
    const tbs_0 = getTabs(tabs);
    const tbs_1 = (getTabs(tabs + 1));

    return `[\n${value.map(item => tbs_1 + formatValue(item, (tabs + 1))).join(',\n')}\n${tbs_0}]`;
}

const funcTabs = (funcString, tabs) => funcString.replace(/(\t| {4}|\n)+/g, (match) => match + "\t".repeat(tabs));