const fs = require('fs')
const path = require('path')

const CSV_FILE = path.resolve(__dirname, '../db.csv')

function loadCSV (string) {
  return string.split('\n')
    .map(row => row.split(','))
}

function objectify (row) {
  const [date, time, buy, sell] = row
  return {
    date,
    time,
    buy,
    sell
  }
}

function readFile (filename) {
  return fs.readFileSync(filename, { encoding: 'utf-8' })
}

const table = loadCSV(readFile(CSV_FILE))
  .map(objectify)

module.exports = table
