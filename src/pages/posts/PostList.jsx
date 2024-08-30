
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import placeimg from '../../assets/images/place.jpeg'

export const PostList = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto p-4 ">
<div className="flex justify-between items-center mb-6">
  <h2 className="text-2xl font-semibold text-gray-800">Post List</h2>
  <button
    className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition duration-300 flex items-center"
    onClick={() => navigate("new-post")}
  >
    <FontAwesomeIcon icon={faPlus} className="mr-2" />
    Add New Post
  </button>
</div>

<div className="mb-6 flex items-center border rounded-md">
  <FontAwesomeIcon
    icon={faSearch}
    className="text-gray-400 mx-3"
  />
  <input
    className="w-full p-2 pl-0 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
    type="text"
    name="search"
    placeholder="Search here"
  />
</div>



      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" onClick={() => navigate("detail-post")}>
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-300"
          >
            <h4 className="text-xl font-semibold mb-2 text-gray-800">Post {index + 1}</h4>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam et hic quae
              fugit sint architecto, libero aperiam ut tempore voluptatum.
            </p>
            <img src={placeimg} alt="" />
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-8 space-x-2">
        <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300">
          prev
        </button>
        {[1, 2, 3].map((page) => (
          <button
            key={page}
            className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
          >
            {page}
          </button>
        ))}
        <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300">
          next
        </button>
      </div>
    </div>
  );
};

