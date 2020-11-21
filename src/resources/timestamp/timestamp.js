import { Router } from 'express'

export const timestampRouter = Router()

timestampRouter.route('/:timestamp').get((req, res) => {
  const { timestamp } = req.params
  let date = new Date(timestamp)

  if (!isNaN(date)) {
    return res.json({
      utc: date.toUTCString(),
      unix: date.getTime(),
    })
  }

  const number = parseInt(timestamp)

  if (!isNaN(number)) {
    date = new Date(number * 1000)

    res.json({
      utc: date.toUTCString(),
      unix: number,
    })
  } else {
    res.status(400).end()
  }
})

function isDate(dateStr) {
  return !isNaN(new Date(dateStr).getDate())
}
