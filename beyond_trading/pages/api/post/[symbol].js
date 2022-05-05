import axios from 'axios';
import models from '../../../lib/models.js'

export default async (req, res) => {
  const {
    upperCaseSymbol,
    shares
  } = req.body
  const symbol = upperCaseSymbol;
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


  res.status(200).json({
    data: response.data
  })

}