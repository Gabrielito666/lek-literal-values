const Sqlite_express = require('sqlite-express');
const path = require('path');

const db_session = new Sqlite_express(path.resolve(process.cwd(), 'node_modules/lek-literal-values/modules'));
db_session.defaultOptions.set({
    route : '../winery/winery.db',
    db : 'winery',
    key : 'winery',
    table : 'items',
    columns : { key : 'text', value : 'text', type : 'text' },
    processColumns : false,
    processRows : false,
    logQuery : false
});

db_session.createDB();
db_session.createTable();

module.exports = db_session;