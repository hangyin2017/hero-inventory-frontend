'use strict'

const fs = require('fs');
const START_COLUMN = 1;

function rowToSqlQuery(row, startColumn) {
  let query = '(';

  const cells = row.split(',');

  for (let i = startColumn; i < cells.length; i++) {
    query += `'${cells[i]}'`;
    if (i !== cells.length - 1)
      query += ',';
  }
  query += ')';

  return query;
}

fs.readFile('suppliers.csv', 'utf8', (err, data) => {
  const rows = data.trim().split('\r\n');

  const sqlQuerys = rows.map((row) => rowToSqlQuery(row, START_COLUMN));

  fs.writeFileSync('suppliers.sql', sqlQuerys.join(',\n'));
});