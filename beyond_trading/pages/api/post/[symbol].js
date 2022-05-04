import axios from 'axios';
import models from '../../../lib/models.js'

export default async (req, res) => {
  const {
    symbol,
    shares
  } = req.body
  const URL = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${process.env.IEX_API_TOKEN}`
  const response = await axios.get(URL);
  const {
    companyName,
    latestPrice
  } = response.data;

  models.addTransaction({
      companyName,
      latestPrice,
      shares,
      symbol,
    })
    .then(({
      id
    }) => {
      console.log('inserted as transaction id: ', id)
    })

  res.status(200).json({
    data: response.data
  })

}