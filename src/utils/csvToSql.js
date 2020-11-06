'use strict'

const fs = require('fs');
const START_COLUMN = 1;
const fileDirectory = '../../docs/resource/';
const fileName = 'brands';

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

const inputUrl = fileDirectory + fileName + '.csv';
const outputUrl = fileDirectory + fileName + '.sql';

fs.readFile(inputUrl, 'utf8', (err, data) => {
  const rows = data.trim().split('\n');

  const sqlQuerys = rows.map((row) => rowToSqlQuery(row, START_COLUMN));

  fs.writeFileSync(outputUrl, sqlQuerys.join(',\n'));
});