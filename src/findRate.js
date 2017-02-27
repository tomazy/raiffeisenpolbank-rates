const invariant = require('invariant')
const findRates = require('./findRates')

const { decDay, formatDate, isWeekend } = require('./utils')

const MAX_DATES_TO_CHECK = 5

function previousDay (dateStr) {
  const d = decDay(new Date(dateStr))
  return formatDate(d)
}

function findRate (dateStr, type, counter = 0) {
  invariant(/^\d{4}-\d{2}-\d{2}$/.test(dateStr), 'date format should match YYYY-MM-DD')

  if (counter >= MAX_DATES_TO_CHECK) return null

  while (isWeekend(dateStr)) {
    dateStr = previousDay(dateStr)
  }

  const rate = findRates(dateStr).slice(-1)[0]

  if (!rate) return findRate(previousDay(dateStr), type, counter + 1)

  const { buy, sell } = rate
  return type === 'buy' ? buy : sell
}

module.exports = findRate


