import axios from "axios";

export default async (req, res) => {
  const {
    symbol
  } = JSON.parse(req.body);
  const URL = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${process.env.IEX_API_TOKEN}`
  const response = await axios.get(URL);
  res.status(200).json({
    data: response.data
  })
}