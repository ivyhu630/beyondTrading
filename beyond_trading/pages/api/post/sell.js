import axios from 'axios';
import models from '../../../lib/models.js'

export default async (req, res) => {
  let {
    symbol,
    shares
  } = req.body
  const URL = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${process.env.IEX_API_TOKEN}`
  console.log(URL)
  try {
    const response = await axios.get(URL);
    const {
      companyName,
      latestPrice
    } = response.data;
    console.log(latestPrice, companyName)
    shares = -shares;
    models.sellTransaction({
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
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }


}