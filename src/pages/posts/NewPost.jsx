
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import  axios from "../../utils/AxiosInstances";
import { AddPostValidator } from '../../validator/AddPostValidator';

const initialFormData = {title:"", category:""};
const initialFormError = {title:"",category:""};

export const NewPost = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const [categories,setCategoris] = useState([]);
  const [FileId,setFileId] =useState(null)
  const [isDisable, setIsDisable] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    const { errors, isValid } = AddPostValidator(formData);
    setFormError(errors);

    if (isValid) {
      setLoading(true);
      let input = formData;
      if(FileId){
        input = {...input,file: FileId}
      }
      try {
        const response = await axios.post("/posts", input);
        const data = response.data;
        toast.success(data.message, {
          position: toast.TOP_RIGHT,
          autoClose: true,
        });
        setFormData(initialFormData);
        navigate(-1)
        
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

  useEffect( () => {
    const getCategories = async () =>{
     
      try{
        
        const response = await axios.get(`/category?size=1000`);
        const data = response.data.data;
        setCategoris(data.categories)
        
        }
        catch(error){
         
          const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: toast.TOP_RIGHT,
          autoClose: true,
        });
        }
      }
      getCategories()
  },[]);

  const handleFile = async (e) => {
    const formInput = new FormData();
    formInput.append("image",e.target.files[0])
    try {
      setIsDisable(true)
      const response = await axios.post("/file/upload", formInput);
      const data = response.data;
      setFileId(data.data._id)
      toast.success(data.message, {
        position: toast.TOP_RIGHT,
        autoClose: 2000,
      });
      setIsDisable(false)
    } catch (error) {
      setIsDisable(false)
      const response = error.response;
      const data = response.data;
      toast.error(data.message, {
        position: toast.TOP_RIGHT,
        autoClose: true,
      });
    }
  }


  return (
    <div className="max-w-4xl mx-auto p-4 ">
      <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md shadow-md hover:bg-gray-400 transition duration-300 flex items-center mb-6" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2"  />
        Go Back
      </button>

      <div className="bg-white p-8 rounded-md shadow-lg">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">New Post</h2>

          <div className="form-group">
            <label className="block text-gray-700 font-semibold mb-2">Title</label>
            {formError.title && <p className="text-red-500 text-xs mb-1">{formError.title}</p>}
            <input
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="text"
              name="title"
              placeholder="React blog post"
              onChange={handleChange}
              value={formData.title}
            />
          </div>

          <div className="form-group">
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              name="desc"
              placeholder="Lorem ipsum"
              onChange={handleChange}
              value={formData.desc}
            ></textarea>
          </div>

          <div className="form-group">
            <label className="block text-gray-700 font-semibold mb-2">Select an image</label>
            <input
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="file"
              name="file"
              accept="image/*"
              onChange={handleFile}
            />
          </div>

          <div className="form-group">
            <label className="block text-gray-700 font-semibold mb-2">Pilih kategori</label>
            {formError.category && <p className="text-red-500 text-xs mb-1">{formError.category}</p>}
            <select
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              name="category"
              onChange={handleChange}
              value={formData.category}
            >
              <option value="">Pilih Kategori</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>{category.title}</option>
              ))}
            
            </select>
          </div>

          <div className="form-group">
            <input
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              type="submit"
              disabled={isDisable}
              value={loading ? "Menyimpan..." : "Tambah"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

