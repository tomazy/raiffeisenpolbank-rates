const invariant = require('invariant')
const table = require('./db')
const debug = require('debug')('findRates') // eslint-disable-line no-unused-vars

function binarySearchIndex (arr, check) {
  let minIndex = 0
  let maxIndex = arr.length - 1
  let currentIndex

  while (minIndex <= maxIndex) {
    currentIndex = minIndex + (maxIndex - minIndex >> 1)
    const res = check(arr[currentIndex])

    if (res < 0.0) {
      minIndex = currentIndex + 1
    } else if (res > 0.0) {
      maxIndex = currentIndex - 1
    } else {
      return currentIndex
    }
  }

  return -1
}

function createCompare (date) {
  return function compare (obj) {
    if (obj.date > date) {
      return 1.0
    } else if (obj.date < date) {
      return -1.0
    } else {
      return 0
    }
  }
}

module.exports = function findRates (date) {
  debug('date', date)
  const compare = createCompare(date)
  const startIdx = binarySearchIndex(table, compare)

  debug('startIdx', startIdx)

  const results = []
  let idx

  if (startIdx === -1) return results

  results.push(table[startIdx])

  idx = startIdx - 1
  while (idx >= 0 && compare(table[idx]) === 0.0) {
    results.push(table[idx])
    idx--
  }

  idx = startIdx + 1
  while (idx < table.length && compare(table[idx]) === 0.0) {
    results.push(table[idx])
    idx++
  }

  results.forEach(obj => invariant(obj.date === date, `${obj.date} !== ${date}`))

  return results.sort((a, b) => a.time > b.time)
}
