import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const CatList = () => {
  const navigate = useNavigate();
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-4 flex justify-between items-center">
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition flex items-center"
          onClick={() => navigate("new-category")}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add New Category
        </button>
        <input
          className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="search"
          placeholder="Search here"
        />
      </div>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Category List</h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6">Title</th>
              <th className="py-3 px-6">Description</th>
              <th className="py-3 px-6">Created At</th>
              <th className="py-3 px-6">Updated At</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {[
              'Category 1',
              'Category 2',
              'Category 3',
              'Category 4',
              'Category 5',
              'Category 6',
              'Category 7',
              'Category 8',
              'Category 9',
              'Category 10',
            ].map((category, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6">{category}</td>
                <td className="py-3 px-6">Test Description</td>
                <td className="py-3 px-6">2023-10-01 14:43:52</td>
                <td className="py-3 px-6">2023-10-01 14:43:52</td>
                <td className="py-3 px-6 flex space-x-2">
                  <button
                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition flex items-center"
                    onClick={() => navigate("update-category")}
                  >
                    <FontAwesomeIcon icon={faEdit} className="mr-1" />
                    Update
                  </button>
                  <button className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition flex items-center">
                    <FontAwesomeIcon icon={faTrash} className="mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        <button className="bg-gray-200 text-gray-600 py-2 px-4 rounded hover:bg-gray-300 transition flex items-center">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-1" />
          Prev
        </button>
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">1</button>
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">2</button>
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">3</button>
        <button className="bg-gray-200 text-gray-600 py-2 px-4 rounded hover:bg-gray-300 transition flex items-center">
          Next
          <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
        </button>
      </div>
    </div>
  );
}
