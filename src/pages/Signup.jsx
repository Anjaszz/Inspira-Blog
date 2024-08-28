import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../utils/AxiosInstances";
import { formValidator } from "../validator/SignUpValidator";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const initialFormData = { name: "", email: "", password: "", confirmPassword: "" };
const initialFormError = { name: "", email: "", password: "", confirmPassword: "" };

export const Signup = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, isValid } = formValidator(formData);

    setFormError(errors);

    if (isValid) {
      setLoading(true);
      try {
        const response = await axios.post("/auth/signup", formData);
        const data = response.data;
        toast.success(data.message, {
          position: toast.TOP_RIGHT,
          autoClose: true,
        });
        setFormData(initialFormData);
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Daftar</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Nama</label>
          {formError.name && <p className="text-red-500 text-xs mb-1">{formError.name}</p>}
          <input
            className={`w-full p-3 text-sm border ${formError.name ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:border-indigo-500`}
            type="text"
            name="name"
            placeholder="Jhon Doe"
            onChange={handleChange}
            value={formData.name}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          {formError.email && <p className="text-red-500 text-xs mb-1">{formError.email}</p>}
          <input
            className={`w-full p-3 text-sm border ${formError.email ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:border-indigo-500`}
            type="email"
            name="email"
            placeholder="Exmp: doe@gmail.com"
            onChange={handleChange}
            value={formData.email}
          />
        </div>

        <div className="mb-4 relative">
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          {formError.password && <p className="text-red-500 text-xs mb-1">{formError.password}</p>}
          <input
            className={`w-full p-3 text-sm border ${formError.password ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:border-indigo-500 pl-10`}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="***********"
            onChange={handleChange}
            value={formData.password}
          />
          <span
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer mt-6"
            onClick={() => setShowPassword(!showPassword)}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
        </div>

        <div className="mb-6 relative">
          <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
          {formError.confirmPassword && <p className="text-red-500 text-xs mb-1">{formError.confirmPassword}</p>}
          <input
            className={`w-full p-3 text-sm border ${formError.confirmPassword ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:border-indigo-500 pl-10`}
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="***********"
            onChange={handleChange}
            value={formData.confirmPassword}
          />
          <span
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer mt-6"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
          </span>
        </div>

        <button type="submit" className="w-full bg-indigo-500 text-white font-medium py-3 rounded-lg hover:bg-indigo-600 transition duration-300" disabled={loading}>
          {loading ? "Mendaftar..." : "Daftar"}
        </button>
      </form>
    </div>
  );
};
