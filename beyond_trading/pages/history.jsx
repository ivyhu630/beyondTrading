export default function Purchased() {
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class=" mt-5 mx-5 w-full text-sm text-left text-gray-500 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">
              Symbol
            </th>
            <th scope="col" class="px-6 py-3">
              Name
            </th>
            <th scope="col" class="px-6 py-3">
              Shares
            </th>
            <th scope="col" class="px-6 py-3">
              Price
            </th>
            <th scope="col" class="px-6 py-3">
              Total
            </th>
            <th scope="col" class="px-6 py-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              Apple MacBook Pro 17"
            </th>
            <td class="px-6 py-4">Sliver</td>
            <td class="px-6 py-4">Laptop</td>
            <td class="px-6 py-4">$2999</td>
          </tr>
        </tbody>
        <tbody>
          <tr class="bg-white border-b ">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              Apple MacBook Pro 17"
            </th>
            <td class="px-6 py-4">Sliver</td>
            <td class="px-6 py-4">Laptop</td>
            <td class="px-6 py-4">$2999</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
