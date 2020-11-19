'use strict'

const faker = require('faker');
const { makeFakeData } = require('./makeFakeData');

const targetFile = 'suppliers.csv';

function fakeSupplierMaker(cells) {
  return {
    id: cells[0],
    name: cells[1],
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber('(0#) #### ####'),
    address: faker.fake("{{address.streetAddress}}, {{address.stateAbbr}}"),
  };
}

makeFakeData(targetFile, fakeSupplierMaker);