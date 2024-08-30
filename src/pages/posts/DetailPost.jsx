
import placeImage from "../../assets/images/place.jpeg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

export const DetailPost = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex gap-4 mb-6">
        <button 
        className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md shadow-md hover:bg-gray-400 transition duration-300 flex items-center"
        onClick={() => navigate(-1)}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Go Back
        </button>
        <button 
        className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition duration-300 flex items-center"
        onClick={() => navigate("/post/update-post")}
        >
          <FontAwesomeIcon icon={faEdit} className="mr-2" />
          Update Post
        </button>
        <button className="bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-700 transition duration-300 flex items-center">
          <FontAwesomeIcon icon={faTrash} className="mr-2" />
          Delete Post
        </button>
      </div>

      <div className="bg-white p-8 rounded-md shadow-lg">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">Post Title</h2>
        <h5 className="text-lg font-medium text-gray-600 mb-2">Category: Category 1</h5>
        <h5 className="text-lg font-medium text-gray-600 mb-2">Created at: 2023-10-01 14:43:52</h5>
        <h5 className="text-lg font-medium text-gray-600 mb-4">Updated at: 2023-10-01 14:43:52</h5>
        <p className="text-gray-700 leading-relaxed mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi magnam,
          vel molestias accusamus mollitia non nostrum aliquid officiis ad
          necessitatibus, vitae dicta aperiam voluptates sint et laboriosam!
          Blanditiis fugit quidem minus vero! Tempore obcaecati saepe ex velit,
          aperiam eos sed necessitatibus cum sunt magni unde ipsam eius enim,
          similique placeat.
        </p>
        <img src={placeImage} alt="Post" className="w-full h-auto rounded-md shadow-md" />
      </div>
    </div>
  );
};


