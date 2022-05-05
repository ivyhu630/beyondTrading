import models from '../../../lib/models.js'

export default async (req, res) => {

  models.listTransactions()
    .then((data) => {
      models.getUserCash()
        .then((cash) => {
          console.log(cash)
          res.status(200).json({
            data,
            cash
          })
        })

    })
}