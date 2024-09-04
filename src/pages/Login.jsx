import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../utils/AxiosInstances";
import { LoginValidator } from "../validator/LoginValidator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { LoadingPage } from "../components/Loading/LoadingPage";
const initialFormData = {email: "", password: ""};
const initialFormError = {  email: "", password: ""};

export const Login = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, isValid } = LoginValidator(formData);

    setFormError(errors);

    if (isValid) {
      setLoading(true);
      try {
        const response = await axios.post("/auth/signin", formData);
        const data = response.data;
        window.localStorage.setItem("BlogData", JSON.stringify(data.data))
        toast.success(data.message, {
          position: toast.TOP_RIGHT,
          autoClose: 2000,
        });
        setFormData(initialFormData);
        navigate("/")
        
      } catch (error) {
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: toast.TOP_RIGHT,
          autoClose: 2000,
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
<div className="min-h-screen flex items-center justify-center bg-[url('/background1.jpg')] bg-cover backdrop-blur-lg">
  {loading && <LoadingPage />}
  <form className="bg-gray-600 mx-4 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-100 p-8 shadow-lg w-full max-w-md border-opacity-30" onSubmit={handleSubmit}>
    <h2 className="text-3xl font-bold text-white mb-6 text-center">Masuk</h2>

    <div className="mb-4">
      <label className="block text-white font-medium mb-1">Email</label>
      {formError.email && <p className="text-red-500 text-xs mb-1">{formError.email}</p>}
      <input
        className={`w-full p-3 text-sm border ${formError.email ? "border-red-500" : "border-white border-opacity-50"} rounded-lg focus:outline-none focus:border-indigo-500 bg-transparent text-white`}
        type="email"
        name="email"
        placeholder="Exmp: example@gmail.com"
        onChange={handleChange}
        value={formData.email}
      />
    </div>

    <div className="mb-4 relative">
      <label className="block text-white font-medium mb-1">Password</label>
      {formError.password && <p className="text-red-500 text-xs mb-1">{formError.password}</p>}
      <div className="relative">
        <input
          className={`w-full p-3 text-sm border ${formError.password ? "border-red-500" : "border-white border-opacity-50"} rounded-lg focus:outline-none focus:border-indigo-500 bg-transparent text-white`}
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="******"
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
      <Link 
        className="text-white hover:text-blue-300 hover:underline font-medium mt-2 block" 
        to="/forgot-password"
      >
        Lupa Password?
      </Link>
    </div>

    <div className="flex items-center mb-4">
      <input
        type="checkbox"
        id="rememberMe"
        className="h-4 w-4 text-indigo-600 bg-gray-700 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
      />
      <label htmlFor="rememberMe" className="ml-2 block text-sm text-white">
        Remember Me
      </label>
    </div>

    <button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out" disabled={loading}>
      {loading ? "Masuk..." : "Masuk"}
    </button>

    <p className="text-center text-white mt-4">
      Tidak punya akun?{" "}
      <Link 
        className="text-blue-300 hover:text-blue-500 hover:underline font-medium" 
        to="/signup"
      >
        Daftar disini
      </Link>
    </p>
  </form>
</div>

  

  );
};
