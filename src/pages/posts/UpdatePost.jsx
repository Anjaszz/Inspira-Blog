
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export const UpdatePost = () => {
  const navigate = useNavigate()
  return (
    <div className="max-w-4xl mx-auto p-4">
      <button 
      className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md shadow-md hover:bg-gray-400 transition duration-300 flex items-center mb-6"
      onClick={() => navigate(-1)}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Go Back
      </button>

      <div className="bg-white p-8 rounded-md shadow-lg">
        <form className="space-y-6">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Update Post</h2>

          <div className="form-group">
            <label className="block text-gray-700 font-semibold mb-2">Title</label>
            <input
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="text"
              name="title"
              placeholder="React blog post"
            />
          </div>

          <div className="form-group">
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              name="desc"
              placeholder="Lorem ipsum"
            ></textarea>
          </div>

          <div className="form-group">
            <label className="block text-gray-700 font-semibold mb-2">Select an image</label>
            <input
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="file"
              name="file"
            />
          </div>

          <div className="form-group">
            <label className="block text-gray-700 font-semibold mb-2">Select a category</label>
            <select
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              name="category"
            >
              <option value="Category 1">Category 1</option>
              <option value="Category 2">Category 2</option>
              <option value="Category 3">Category 3</option>
            </select>
          </div>

          <div className="form-group">
            <input
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
              type="submit"
              value="Update"
            />
          </div>
        </form>
      </div>
    </div>
  );
};


