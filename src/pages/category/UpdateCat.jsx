import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const UpdateCategory = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 relative">
      <button
        className="absolute top-4 left-4 flex items-center text-blue-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        onClick={() => navigate(-1)}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Go Back
      </button>
      <div className="bg-white shadow-md rounded-lg w-full max-w-lg p-6">
        <form className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Update Category</h2>
          <div className="space-y-2">
            <label className="block text-gray-700">Title</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              name="title"
              placeholder="Technology"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Description</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="desc"
              placeholder="Lorem ipsum"
            ></textarea>
          </div>

          <div>
            <input
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="submit"
              value="Update"
            />
          </div>
        </form>
      </div>
    </div>
  );
};


