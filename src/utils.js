const invariant = require('invariant')

function incDay (date) {
  invariant(date instanceof Date, 'arg should be a Date')

  const result = new Date(date)
  result.setDate(date.getDate() + 1)
  return result
}

function decDay (date) {
  invariant(date instanceof Date, 'arg should be a Date')

  const result = new Date(date)
  result.setDate(date.getDate() - 1)
  return result
}

function zeroPad (number) {
  return (number < 10) ? `0${number}` : number + ''
}

function formatDate (d) {
  return [
    d.getFullYear(),
    zeroPad(d.getMonth() + 1),
    zeroPad(d.getDate())
  ].join('-')
}

function isWeekend (date) {
  return (date instanceof Date)
    ? date.getDay() === 6 || date.getDay() === 0
    : isWeekend(new Date(date))
}

module.exports = {
  incDay,
  decDay,
  formatDate,
  isWeekend
}
