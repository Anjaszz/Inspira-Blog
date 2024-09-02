import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../utils/AxiosInstances";
import { LoginValidator } from "../validator/LoginValidator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Masuk</h2>

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
      <div className="relative">
        <input
          className={`w-full p-3 text-sm border ${formError.password ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:border-indigo-500 pl-10`}
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="***********"
          onChange={handleChange}
          value={formData.password}
        />
        <span
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </span>
      </div>
      <Link className="forgot-password" to="/forgot-password">
          Forgot Password
        </Link>
    </div>

    <button type="submit" className="w-full bg-indigo-500 text-white font-medium py-3 rounded-lg hover:bg-indigo-600 transition duration-300" disabled={loading}>
      {loading ? "Masuk..." : "Masuk"}
    </button>
  </form>
</div>

  );
};
