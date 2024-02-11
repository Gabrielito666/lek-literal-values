const Sqlite_express = require('sqlite-express');

const db_session = new Sqlite_express(__dirname);
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