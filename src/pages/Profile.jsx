import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../utils/AxiosInstances";
import { ProfileValidator } from "../validator/ProfileValidator";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const initialFormData = { name: "", email: ""};
const initialFormError = { name: "", email: "" };

export const Profile = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const [OldEmail, setOldEmail] = useState(null)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, isValid } = ProfileValidator(formData);

    setFormError(errors);

    if (isValid) {
      setLoading(true);
      try {
        const response = await axios.put("/auth/update-profile", formData);
        const data = response.data;
        toast.success(data.message, {
          position: toast.TOP_RIGHT,
          autoClose: true,
        });
        setFormData(initialFormData);
        if(OldEmail !== formData.email){
          window.localStorage.removeItem("BlogData")
        }
        navigate("/login")
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

  useEffect(() =>{
   
      const GetUser = async () =>{
        try{
         
          const response = await axios.get(`/auth/current-user`);
          const data = response.data.data;
          setFormData({name: data.user.name, email: data.user.email })
          setOldEmail(data.user.email)
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
      GetUser()
    }
  ,[]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 ">
     <button
      className="absolute bg-blue-500 top-20 left-4 flex items-center text-white hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-4 py-2 transition-transform transform hover:scale-105 active:scale-75 rounded-lg shadow-md hover:shadow-lg"
      onClick={() => navigate(-1)}
    >
      <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
      Go Back
    </button>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Update Profile</h2>

          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-600">Name</label>
            {formError.name && <p className="text-red-500 text-xs mb-1">{formError.name}</p>}
            <input
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              type="text"
              name="name"
              placeholder="John Doe"
              onChange={handleChange}
              value={formData.name}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-600">Email</label>
            {formError.email && <p className="text-red-500 text-xs mb-1">{formError.email}</p>}
            <input
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              type="email"
              name="email"
              placeholder="doe@gmail.com"
              onChange={handleChange}
              value={formData.email}
            />
          </div>

          <div className="flex justify-center">
            <input
              className="w-full p-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 cursor-pointer"
              type="submit"
              value={loading ? "Saving..." : "Update"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

