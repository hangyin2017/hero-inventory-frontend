const faker = require('faker');
const fs = require('fs');
const path = require('path');

const targetFile = '../../../docs/resources/suppliers.csv';

function makeFakeRow(row) {
  const supplier = {};
  const attributes = [
    'id',
    'name',
    'email',
    'phone',
    'address',
  ];

  const cells = row.split(',');
  
  attributes.forEach((attribute, i) => supplier[attribute] = cells[i]);

  supplier.email = faker.internet.email();

  supplier.phone = faker.phone.phoneNumber('(0#) #### ####');

  supplier.address = faker.fake("{{address.streetAddress}}, {{address.stateAbbr}}");

  return cells.map((cell, i) => supplier[attributes[i]]).join(',');
}

fs.readFile(path.join(__dirname, targetFile), 'utf8', (err, data) => {
  const rows = data.trim().split('\n');
  
  fakeRows = rows.map((row) => makeFakeRow(row));

  fs.writeFileSync(targetFile, fakeRows.join('\n'));
});