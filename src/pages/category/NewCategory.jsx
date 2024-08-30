import { useNavigate } from "react-router-dom";
import  axios from "../../utils/AxiosInstances";
import { useState } from "react";
import { toast } from "react-toastify";
import { AddCatValidator } from "../../validator/AddCatValidator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const initialFormData = {title:"", desc:""};
const initialFormError = {title:""};

export const NewCategory = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    const { errors, isValid } = AddCatValidator(formData);
    setFormError(errors);

    if (isValid) {
      setLoading(true);
      try {
        const response = await axios.post("/category", formData);
        const data = response.data;
        toast.success(data.message, {
          position: toast.TOP_RIGHT,
          autoClose: true,
        });
        setFormData(initialFormData);
        navigate("/categories")
        
      } catch (error) {
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: toast.TOP_RIGHT,
          autoClose: true,
        });
        if (error.response && error.response.data) {
          setFormError(error.response.data.errors || initialFormError);
        } else {
          console.error("An error occurred:", error);
        }
      } finally {
        setLoading(false);
      }
    }
  };

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
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-gray-800">New Category</h2>
          <div className="space-y-2">
            <label className="block text-gray-700">Title</label>
            {formError.title && <p className="text-red-500 text-xs mb-1">{formError.title}</p>}
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              name="title"
              placeholder="Technology"
              onChange={handleChange}
              value={formData.title}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Description</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="desc"
              placeholder="Lorem ipsum"
              onChange={handleChange}
              value={formData.desc}
            ></textarea>
          </div>

          <div>
            <input
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="submit"
              value={`${loading ? "Menyimpan..." : "Tambah"}`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};