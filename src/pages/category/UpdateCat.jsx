import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import  axios from "../../utils/AxiosInstances";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AddCatValidator } from "../../validator/AddCatValidator";

const initialFormData = {title:"", desc:""};
const initialFormError = {title:""};

export const UpdateCategory = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const categoryId = params.id;


  useEffect(() =>{
    if(categoryId){
      const GetCategory = async () =>{
        try{
         
          const response = await axios.get(`/category/${categoryId}`);
          const data = response.data.data;
         
          setFormData({title : data.category.title, desc : data.category.desc})
          
          }
          catch(error){
            setLoading(false)
            const response = error.response;
          const data = response.data;
          toast.error(data.message, {
            position: toast.TOP_RIGHT,
            autoClose: true,
          });
          }
      }
      GetCategory()
    }
  },[categoryId]);

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    const { errors, isValid } = AddCatValidator(formData);
    setFormError(errors);

    if (isValid) {
      setLoading(true);
      try {
        const response = await axios.put(`/category/${categoryId}`, formData);
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

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-gray-800">Update Category</h2>
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
              value={`${loading ? "Menyimpan..." : "Update"}`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};


