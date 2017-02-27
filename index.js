const qs = require('qs')
const url = require('url')
const findRate = require('./src/findRate')

module.exports = (req, res) => {
  const query = qs.parse(url.parse(req.url).query)
  const { date, type } = query
  return findRate(date, type)
}
