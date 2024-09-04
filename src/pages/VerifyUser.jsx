import { useNavigate } from "react-router-dom";
import axios from "../utils/AxiosInstances";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { UseAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export const VerifyUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [code, setCode] = useState(""); // Initialize as empty string
  const [errorCode, setErrorCode] = useState(null);
  const [timer, setTimer] = useState(0);
  const auth = UseAuth();

  // Refs for the input elements
  const inputRefs = useRef([]);

  const handleSendCode = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setTimer(30);
      const response = await axios.post("/auth/send-verification-email", { email: auth.email });
      const data = response.data;
      toast.success(data.message, {
        position: toast.TOP_RIGHT,
        autoClose: true,
      });
      const countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 1) {
            return prevTimer - 1;
          } else {
            clearInterval(countdown);
            setLoading(false);
            return 0;
          }
        });
      }, 1000);
    } catch (error) {
      setLoading(false);
      const response = error.response;
      const data = response.data;
      toast.error(data.message, {
        position: toast.TOP_RIGHT,
        autoClose: true,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code.length === 4) { // Check if code length is 4
      try {
        setLoading2(true);
        const response = await axios.post("/auth/verify-user", { email: auth.email, code });
        const data = response.data;
        toast.success(data.message, {
          position: toast.TOP_RIGHT,
          autoClose: true,
        });
        setErrorCode(null);
        setCode("");
        window.localStorage.removeItem('BlogData');
        navigate('/login');
      } catch (error) {
        setLoading2(false);
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: toast.TOP_RIGHT,
          autoClose: true,
        });
        setErrorCode(data.message || "Verification failed.");
      }
    } else {
      setErrorCode("Code must be 4 digits long.");
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    const newCode = code.split('');
    newCode[index] = value;
    setCode(newCode.join(''));

    if (value && index < 3) {
      // Move focus to the next input if the current one is filled and it's not the last input
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-6">
       <button
          className="absolute top-20 left-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-transform transform hover:scale-105 active:scale-75"
          onClick={() => navigate(-1)}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Go Back
        </button>

      {/* Form Container */}
      <div className="max-w-xl mx-auto border mt-20 rounded">
        <form className="shadow-md px-4 py-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Verifikasi Akun</h2>

          <div className="flex justify-center gap-8 mb-6 mx-6">
            {[...Array(4)].map((_, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                className={`w-12 h-12 text-center border rounded-md shadow-sm ${
                  errorCode ? 'border-red-500' : 'focus:border-blue-500 focus:ring-blue-500'
                }`}
                type="text"
                maxLength="1"
                pattern="[0-9]"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={code[index] || ''}
                onChange={(e) => handleChange(e, index)}
                required
              />
            ))}
          </div>

          {errorCode && (
            <p className="text-red-500 text-xs mb-4 text-center">{errorCode}</p>
          )}

          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
              type="submit"
              disabled={loading2}
            >
              {loading2 ? "Verifying..." : "Verify"}
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 ml-4"
              href="#"
              onClick={handleSendCode}
            >
              {loading ? `Resend OTP (${timer}s)` : 'Send OTP'}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
