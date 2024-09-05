import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../utils/AxiosInstances";
import { SignupValidator } from "../validator/SignUpValidator";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { LoadingPage } from "../components/Loading/LoadingPage";

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
    const { errors, isValid } = SignupValidator(formData);

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
<div className=" min-h-screen flex items-center justify-center bg-[url('/background1.jpg')] bg-cover mt-16">
  <form className="bg-gray-600 mx-4 my-5 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-100 border-opacity-30 p-8 shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
  {loading && <LoadingPage />}
    <h2 className="text-3xl font-bold text-white mb-6 text-center">Daftar</h2>

    <div className="mb-4">
      <label className="block text-white font-medium mb-1">Nama</label>
      {formError.name && <p className="text-red-500 text-xs mb-1">{formError.name}</p>}
      <input
        className={`w-full p-3 text-sm border ${formError.name ? "border-red-500" : "border-white"} rounded-lg focus:outline-none focus:border-indigo-500 bg-transparent text-white`}
        type="text"
        name="name"
        placeholder="John Doe"
        onChange={handleChange}
        value={formData.name}
      />
    </div>

    <div className="mb-4">
      <label className="block text-white font-medium mb-1">Email</label>
      {formError.email && <p className="text-red-500 text-xs mb-1">{formError.email}</p>}
      <input
        className={`w-full p-3 text-sm border ${formError.email ? "border-red-500" : "border-white"} rounded-lg focus:outline-none focus:border-indigo-500 bg-transparent text-white`}
        type="email"
        name="email"
        placeholder="Exmp: doe@gmail.com"
        onChange={handleChange}
        value={formData.email}
      />
    </div>

    <div className="mb-4 relative">
      <label className="block text-white font-medium mb-1">Password</label>
      {formError.password && <p className="text-red-500 text-xs mb-1">{formError.password}</p>}
      <div className="relative">
        <input
          className={`w-full p-3 text-sm border ${formError.password ? "border-red-500" : "border-white"} rounded-lg focus:outline-none focus:border-indigo-500 bg-transparent text-white`}
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="***********"
          onChange={handleChange}
          value={formData.password}
        />
        <span
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-white"
          onClick={() => setShowPassword(!showPassword)}
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </span>
      </div>
    </div>

    <div className="mb-6 relative">
      <label className="block text-white font-medium mb-1">Confirm Password</label>
      {formError.confirmPassword && <p className="text-red-500 text-xs mb-1">{formError.confirmPassword}</p>}
      <div className="relative">
        <input
          className={`w-full p-3 text-sm border ${formError.confirmPassword ? "border-red-500" : "border-white"} rounded-lg focus:outline-none focus:border-indigo-500 bg-transparent text-white`}
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="***********"
          onChange={handleChange}
          value={formData.confirmPassword}
        />
        <span
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-white"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
        </span>
      </div>
    </div>

    <div className="mb-4 flex items-center">
      <input
        type="checkbox"
        id="terms"
        className="h-4 w-4 text-indigo-600 bg-gray-700 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
        required
      />
      <label htmlFor="terms" className="ml-2 text-sm text-white">
        I agree to the{" "}
        <a href="/terms" className="text-blue-300 hover:text-blue-500 hover:underline">
          terms and conditions
        </a>
      </label>
    </div>

    <button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out" disabled={loading}>
      {loading ? "Mendaftar..." : "Daftar"}
    </button>
  </form>
</div>



  );
};
