'use strict'

const fs = require('fs');
const path = require('path');

const targetDir = '../../../docs/resources/';

exports.makeFakeData = (targetFile, fakeDataMaker) => {
  const data = fs.readFileSync(path.join(__dirname, targetDir, targetFile), 'utf8').trim();

  const fakeData = data
    .split('\n')
    .map((row) => Object.values(fakeDataMaker(row.split(','))).join(','))
    .join('\n');
  
  fs.writeFileSync(path.join(__dirname, targetDir, targetFile), fakeData);
};