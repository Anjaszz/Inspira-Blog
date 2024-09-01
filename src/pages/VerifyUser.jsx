import { useNavigate } from "react-router-dom";
import  axios from "../utils/AxiosInstances";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UseAuth } from "../context/AuthContext";


export const VerifyUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [code, setCode] = useState()
  const [errorCode, setErrorCode] = useState(null)
  const [timer, setTimer] = useState(0);
  const auth = UseAuth()
 
 const handleSendCode = async (e) => {
  e.preventDefault();
    try {
      setLoading(true);
      setTimer(30); 
      const response = await axios.post("/auth/send-verification-email", {email: auth.email});
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
      setTimeout(() => {
        setLoading(false);
      }, 30000);
      const response = error.response;
      const data = response.data;
      toast.error(data.message, {
        position: toast.TOP_RIGHT,
        autoClose: true,
      });
    }
 }

 const handleSubmit = async (e) => {
  e.preventDefault();
 if (code){
  try {
    setLoading2(true);
    const response = await axios.post("/auth/verify-user", {email: auth.email, code});
    const data = response.data;
    toast.success(data.message, {
      position: toast.TOP_RIGHT,
      autoClose: true,
    });
    setErrorCode("")
    setCode("")
    window.localStorage.removeItem('BlogData')
    navigate('/login')
  } catch (error) {
    setLoading2(false)
    setErrorCode("")
    setCode("")
    const response = error.response;
    const data = response.data;
    toast.error(data.message, {
      position: toast.TOP_RIGHT,
      autoClose: true,
    });
  }
 }else{
  setErrorCode("code tidak valid")
 }};

  return (
    <div className="relative min-h-screen bg-gray-50 p-6">
    <button 
      className="absolute top-6 left-6 py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      onClick={() => navigate(-1)}
      >
      Go Back
    </button>
  
    {/* Form Container */}
    <div className="flex justify-center items-center h-full mt-12">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-gray-700 text-center">Verify User</h2>
  
          <div className="space-y-2">
            <label className="block text-gray-600">Confirmation code</label>
            {errorCode && <p className="text-red-500 text-xs mb-1">{errorCode}</p>}
            <input
              className="w-full py-3 px-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              type="text"
              name="code"
              placeholder="789654"
              onChange={(e) => setCode(e.target.value)}
              value={code}
            />
          </div>
  
          <div className="flex justify-between items-center space-x-2">
            <input
              className="w-3/4 py-3 px-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 cursor-pointer"
              type="submit"
              value={loading2 ? "Verify..." : "Verify"}
            />
           <button
        type="submit"
        onClick={handleSendCode}
        disabled={loading}
        className={`py-3 px-4 text-white rounded-lg shadow-md transition duration-300 ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? `Kirim lagi (${timer}s)` : 'Kirim Code'}
      </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  

  );
};

