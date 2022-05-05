import models from '../../../lib/models.js'

export default async (req, res) => {

  models.listTransactions()
    .then((data) => {
      console.log('transactions are: ', data)
      res.status(200).json({
        data
      })
    })
}