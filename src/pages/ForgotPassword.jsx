import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../utils/AxiosInstances";
import { sendCodeVal } from "../validator/SendCodeVal";
import { recoverPass } from "../validator/RecoverPass";
import { useNavigate } from "react-router-dom";

const initialFormData = {
  email: "",
  code: "",
  password: "",
};

const initialFormError = {
  code: "",
  password: "",
};

const ForgotPassword = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [hasEmail, setHasEmail] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSendCode = async (e) => {
    e.preventDefault();

    const errors = sendCodeVal({ email: formData.email });

    if (errors.email) {
      setEmailError(errors.email);
    } else {
      try {
        setLoading(true);
        // api request

        const response = await axios.post("/auth/forgot-password-code", {
          email: formData.email,
        });
        const data = response.data;
        setHasEmail(true);

        toast.success(data.message, {
          position: toast.TOP_RIGHT,
          autoClose: 2000,
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: toast.TOP_RIGHT,
          autoClose: 2000,
        });
      }
    }
  };

  const handleRecoverPassword = async (e) => {
    e.preventDefault();

    const errors = recoverPass({
      code: formData.code,
      password: formData.password,
    });

    if (errors.code || errors.password) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);
        // api request
        const response = await axios.post("/auth/recover-password", formData);
        const data = response.data;

        toast.success(data.message, {
          position: toast.TOP_RIGHT,
          autoClose: 2000,
        });
        setFormData(initialFormData);
        setFormError(initialFormError);
        setLoading(false);
        navigate("/login");
      } catch (error) {
        setLoading(false);
        setFormError(initialFormError);
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: toast.TOP_RIGHT,
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
    <form
      className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
      onSubmit={!hasEmail ? handleSendCode : handleRecoverPassword}
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        {!hasEmail ? "Recover Password" : "New Password"}
      </h2>
  
      {!hasEmail ? (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="email"
            placeholder="doe@gmail.com"
            value={formData.email}
            onChange={handleChange}
          />
          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
        </div>
      ) : (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Code
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="code"
              placeholder="123456"
              value={formData.code}
              onChange={handleChange}
            />
            {formError.code && <p className="text-red-500 text-sm mt-1">{formError.code}</p>}
          </div>
  
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              name="password"
              placeholder="***********"
              value={formData.password}
              onChange={handleChange}
            />
            {formError.password && (
              <p className="text-red-500 text-sm mt-1">{formError.password}</p>
            )}
          </div>
        </>
      )}
  
      <div className="mt-6">
        <input
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out cursor-pointer"
          type="submit"
          value={`${loading ? "Sending..." : "Send"}`}
        />
      </div>
    </form>
  </div>
  
  );
};

export default ForgotPassword;