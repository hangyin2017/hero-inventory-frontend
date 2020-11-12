'use strict'

const fs = require('fs');
const path = require('path');
const START_COLUMN = 0;
const TARGET_DIRECTORY = '../../docs/resources/';
const FILE_NAME = 'items3';

function rowToSqlQuery(row, startColumn) {
  let query = '(';

  const cells = row.trim().split(',');

  for (let i = startColumn; i < cells.length; i++) {
    if (cells[i].length === 0) {
      query += 'null';
    } else {
      query += `'${stringSanitiser(cells[i])}'`;
    }
    
    if (i !== cells.length - 1)
      query += ',';
  }
  query += ')';

  return query;
}

function stringSanitiser(string) {
  return string.replace('"', '').replace('"', '').replace('\'', '\'\'').trim();
}

const inputUrl = path.join(__dirname, TARGET_DIRECTORY, FILE_NAME + '.csv');
const outputUrl = path.join(__dirname, TARGET_DIRECTORY, FILE_NAME + '.sql');

const data = fs.readFileSync(inputUrl, 'utf8').trim();

const sqlQuerys = data
    .split('\n')
    .map((row) => rowToSqlQuery(row, START_COLUMN))
    .join(',\n');

fs.writeFileSync(outputUrl, sqlQuerys, 'utf8');