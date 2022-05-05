import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';

export default function Sell() {
  const [symbol, setSymbol] = useState('');
  const [symbolList, setSymbolList] = useState([]);
  const [shares, setShares] = useState('');
  const [price, setPrice] = useState(null);
  const [querySymbol, setQuerySymbol] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [submittedQuote, setSubmittedQuote] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchHistory();
  }, []);

  // pull existing list of available stock
  const fetchHistory = async () => {
    try {
      const res = await fetch(`/api/get/history`);
      const { data } = await res.json();
      let updatedTransactions = {};
      let tempSymbolList = [];
      // grabbing companyName
      data.transactions.forEach((t) => {
        if (!(t.symbol in updatedTransactions)) {
          updatedTransactions[t.symbol] = 0;
        }
        updatedTransactions[t.symbol] += t.shares;
      });
      for (let key of Object.keys(updatedTransactions)) {
        if (updatedTransactions[key]) {
          tempSymbolList.push(key);
        }
      }
      await setSymbolList(tempSymbolList);
    } catch (err) {
      console.log(err);
    }
  };

  const sellStock = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symbol, shares }),
    };
    const res = await fetch(`/api/post/sell`, requestOptions);
    const { data } = await res.json();
    const { companyName, latestPrice } = data;
    const currentSymbol = data.symbol;
    setPrice(latestPrice);
    setCompanyName(companyName);
    setQuerySymbol(currentSymbol);
    setSubmittedQuote(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sellStock();
    router.push('/history');
  };

  const handleSymbolChange = (e) => {
    setSymbol(e.target.value);
  };
  const handleShareChange = (e) => {
    setShares(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center justify-center mt-20 pt-10 lg:justify-start">
        <div className="mb-6">
          <select
            type="text"
            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleFormControlInput2"
            placeholder="Symbol"
            value={symbol}
            onChange={handleSymbolChange}
          >
            <option selected diabled>
              Choose Symbol
            </option>
            {symbolList.map((symbol) => (
              <option key={symbol}>{symbol}</option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <input
            type="number"
            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleFormControlInput2"
            value={shares}
            onChange={handleShareChange}
            min="1"
          />
        </div>
        <Button>Sell</Button>
      </div>
    </form>
  );
}
