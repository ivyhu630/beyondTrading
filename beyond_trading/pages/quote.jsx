import Button from '../components/Button';
import { useEffect, useState } from 'react';

export default function Quote() {
  const [quote, setQuote] = useState('');
  const [symbol, setSymbol] = useState('');

  // useEffect(() => {}, [quote]);

  const fetchQuote = async () => {
    const params = { symbol };
    const options = {
      method: 'POST',
      body: JSON.stringify(params),
    };
    fetch('/api/getQuote', options);

    const res = await fetch('/api/getQuote', options);
    const { data } = await res.json();
    console.log('data is ', data);
    setQuote(data.companyName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('fetching');
    fetchQuote();
  };
  const handleChange = (e) => {
    setSymbol(e.target.value);
  };
  console.log(quote);
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
            onChange={handleChange}
          />
        </div>
        <button>click</button>
        <Button btnName="quote" />
      </div>
      <div>{quote}</div>
    </form>
  );
}
