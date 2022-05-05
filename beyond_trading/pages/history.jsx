import { useEffect, useState } from 'react';

export default function History() {
  const [transactions, setTransactions] = useState([]);
  const [cash, setCash] = useState('$0');
  const [totalMarketValue, setTotalMarketValue] = useState(0);

  useEffect(() => {
    fetchHistory();
  }, [totalMarketValue]);

  const fetchHistory = async () => {
    try {
      const res = await fetch(`/api/get/history`);
      const { data, cash } = await res.json();
      await setCash(cash);
      let updatedTransactions = {};
      let transactionList = [];
      let subtotal = 0;
      let marketValue = 0;

      // grabbing companyName and consolidating total shares, total cost
      data.transactions.forEach((t) => {
        if (!(t.symbol in updatedTransactions)) {
          updatedTransactions[t.symbol] = {
            shares: 0,
            name: '',
            totalCost: 0,
          };
        }
        updatedTransactions[t.symbol].name = t.companyname;
        updatedTransactions[t.symbol].shares += t.shares;
        let costPerShare = Number(t.price.replace(/[^0-9.-]+/g, ''));
        let totalCost = costPerShare * t.shares;
        updatedTransactions[t.symbol].totalCost += totalCost;
      });

      for (let key of Object.keys(updatedTransactions)) {
        if (updatedTransactions[key].shares) {
          marketValue += updatedTransactions[key].totalCost;
          transactionList.push({
            symbol: key,
            name: updatedTransactions[key].name,
            total: updatedTransactions[key].totalCost,
            shares: updatedTransactions[key].shares,
            marketPrice: 0,
          });
        }
      }

      // adding market price
      for (let entry of transactionList) {
        const marketPrice = await fetchQuote(entry.symbol);
        entry.marketPrice = marketPrice;
      }

      await setTotalMarketValue(marketValue);
      await setTransactions(transactionList);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchQuote = async (symbol) => {
    const res = await fetch(`/api/get/${symbol}`);
    const { data } = await res.json();
    const { latestPrice } = data;
    return latestPrice;
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className=" pl-10 mt-5 w-75 text-sm text-left text-gray-500 history">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Symbol
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Shares
            </th>
            <th scope="col" className="px-6 py-3">
              Cost per Share
            </th>
            <th scope="col" className="px-6 py-3">
              Total Cost
            </th>
            <th scope="col" className="px-6 py-3">
              Price per Share
            </th>
            <th scope="col" className="px-6 py-3">
              Total Value
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        {transactions.map((transaction) => (
          <tbody key={transaction.symbol}>
            <tr className="bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {transaction.symbol}
              </th>
              <td className="px-6 py-4">{transaction.name}</td>
              <td className="px-6 py-4">{transaction.shares}</td>
              <td className="px-6 py-4">
                {formatter.format(transaction.total / transaction.shares)}
              </td>
              <td className="px-6 py-4">
                {formatter.format(transaction.total)}
              </td>
              <td className="px-6 py-4">
                {formatter.format(transaction.marketPrice)}
              </td>
              <td className="px-6 py-4">
                {formatter.format(transaction.marketPrice * transaction.shares)}
              </td>
            </tr>
          </tbody>
        ))}
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3" />
            <th scope="col" className="px-6 py-3" />
            <th scope="col" className="px-6 py-3" />
            <th scope="col" className="px-6 py-3" />
            <th scope="col" className="px-6 py-3" />
            <th scope="col" className="px-6 py-3">
              Cash
            </th>
            <th scope="col" className="px-6 py-3">
              {cash}
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3" />
            <th scope="col" className="px-6 py-3" />
            <th scope="col" className="px-6 py-3" />
            <th scope="col" className="px-6 py-3" />
            <th scope="col" className="px-6 py-3" />
            <th scope="col" className="px-6 py-3">
              Total
            </th>
            <th scope="col" className="px-6 py-3">
              {formatter.format(
                Number(cash.replace(/[^0-9.-]+/g, '')) + totalMarketValue
              )}
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
      </table>
    </div>
  );
}
