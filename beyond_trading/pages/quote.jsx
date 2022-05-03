import Button from '../components/Button';

export default function Quote() {
  const a = 'a';

  return (
    <form>
      <div className="flex flex-col items-center justify-center mt-20 pt-10 lg:justify-start">
        <div className="mb-6">
          <input
            type="text"
            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleFormControlInput2"
            placeholder="Symbol"
          />
        </div>
        <Button btnName="quote" />
      </div>
    </form>
  );
}
