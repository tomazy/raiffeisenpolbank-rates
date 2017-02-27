/* global jest, test, expect, beforeEach */

jest.mock('./findRates')

const findRate = require('./findRate')

const findRates = require('./findRates')

beforeEach(() => {
  findRates.mockClear()
})

test('null if no results', () => {
  findRates.mockImplementation(() => [])
  expect(findRate('2001-01-01', 'buy')).toBe(null)
})

test('get buy rate', () => {
  findRates.mockImplementation(() => [
    { buy: '123', sell: '321' }
  ])
  expect(findRate('2001-09-04', 'buy')).toBe('123')
})

test('get sell rate', () => {
  findRates.mockImplementation(() => [
    { buy: '123', sell: '321' }
  ])
  expect(findRate('2001-09-04', 'sell')).toBe('321')
})

test('returns the last one', () => {
  findRates
    .mockImplementation(() => [
      { buy: '123', sell: '321' },
      { buy: '223', sell: '321' },
      { buy: '323', sell: '321' }
    ])
  expect(findRate('2001-09-04', 'buy')).toBe('323')
})

test('find previous if no match', () => {
  findRates
    .mockImplementationOnce(() => [])
    .mockImplementationOnce(() => [{ buy: '123', sell: '321' }])

  expect(findRate('2001-09-04', 'buy')).toBe('123')

  expect(findRates).toHaveBeenCalledTimes(2)
  expect(findRates).toBeCalledWith('2001-09-04')
  expect(findRates).toBeCalledWith('2001-09-03')
})

test('stops searching if no match is found for a few dates', () => {
  findRates
    .mockImplementationOnce(() => []) // 1
    .mockImplementationOnce(() => []) // 2
    .mockImplementationOnce(() => []) // 3
    .mockImplementationOnce(() => []) // 4
    .mockImplementationOnce(() => []) // 5
    .mockImplementationOnce(() => [{ buy: '123', sell: '321' }])

  expect(findRate('2001-09-04', 'buy')).toBe(null)

  expect(findRates).toHaveBeenCalledTimes(5)
  expect(findRates).toBeCalledWith('2001-09-04') // Tu
  expect(findRates).toBeCalledWith('2001-09-03') // Mo
  // expect(findRates).toBeCalledWith('2001-09-02') // Su
  // expect(findRates).toBeCalledWith('2001-09-01') // Sa
  expect(findRates).toBeCalledWith('2001-08-31') // Fr
  expect(findRates).toBeCalledWith('2001-08-30') // Fr
  expect(findRates).toBeCalledWith('2001-08-29') // Fr
})
