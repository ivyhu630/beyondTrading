import axios from 'axios';
import Button from '../components/Button';
import Input from '../components/Input';
import { useEffect, useState } from 'react';

export default function Buy() {
  const [symbol, setSymbol] = useState('');
  const [shares, setShares] = useState(null);
  const [price, setPrice] = useState(null);
  const [querySymbol, setQuerySymbol] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [submittedQuote, setSubmittedQuote] = useState(false);

  useEffect(() => {}, [companyName]);

  const fetchQuote = async (symbol) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symbol, shares }),
    };
    const res = await fetch(`/api/post/${symbol}`, requestOptions);
    const { data } = await res.json();
    const { companyName, latestPrice } = data;
    console.log(' received ', companyName, latestPrice);
    const currentSymbol = data.symbol;
    setPrice(latestPrice);
    setCompanyName(companyName);
    setQuerySymbol(currentSymbol);
    setSubmittedQuote(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('fetching');
    fetchQuote(symbol);
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
          <input
            type="text"
            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleFormControlInput2"
            placeholder="Symbol"
            value={symbol}
            onChange={handleSymbolChange}
          />
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
        <Button>Buy</Button>
      </div>
    </form>
  );
}
