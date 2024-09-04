import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../utils/AxiosInstances";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ChangePass } from '../validator/ChangePassVal';
import { UseAuth } from '../context/AuthContext';

const initialFormData = {oldPassword: "", newPassword: ""};
const initialFormError = {oldPassword: "", newPassword: ""};

export const Setting = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const auth = UseAuth()
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, isValid } = ChangePass(formData);
    setFormError(errors);

    if (isValid) {
      setLoading(true);
      try {
        const response = await axios.put("/auth/change-password", formData);
        const data = response.data;
      
        toast.success(data.message, {
          position: toast.TOP_RIGHT,
          autoClose: true,
        });
        setFormData(initialFormData);
        navigate('/login')
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
    <div className="flex flex-col min-h-screen bg-gray-100">
    <div className="flex flex-grow flex-col p-6">
      <div className="flex items-start">
        <button
          className="bg-blue-500 flex items-center text-white hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-4 py-2 transition-transform transform hover:scale-105 active:scale-75 rounded-lg shadow-md hover:shadow-lg"
          onClick={() => navigate(-1)}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Go Back
        </button>
      </div>

      <div className="flex-grow flex items-center justify-center mt-16">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Ganti Password
            </h2>

            <div className="relative flex flex-col space-y-2">
              <label className="text-gray-700 font-semibold">Password Lama</label>
              {formError.oldPassword && <p className="text-red-500 text-xs mb-1">{formError.oldPassword}</p>}
              <div className="flex items-center">
                <input
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 pr-10"
                  type={showOldPassword ? 'text' : 'password'}
                  name="oldPassword"
                  placeholder="***********"
                  onChange={handleChange}
                  value={formData.oldPassword}
                />
                <button
                  type="button"
                  className="absolute right-3 text-gray-500 hover:text-gray-700"
                  aria-label="Toggle password visibility"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  <FontAwesomeIcon icon={showOldPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            <div className="relative flex flex-col space-y-2">
              <label className="text-gray-700 font-semibold">Password Baru</label>
              {formError.newPassword && <p className="text-red-500 text-xs mb-1">{formError.newPassword}</p>}
              <div className="flex items-center">
                <input
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 pr-10"
                  type={showNewPassword ? 'text' : 'password'}
                  name="newPassword"
                  placeholder="***********"
                  onChange={handleChange}
                  value={formData.newPassword}
                />
                <button
                  type="button"
                  className="absolute right-3 text-gray-500 hover:text-gray-700"
                  aria-label="Toggle password visibility"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <input
                className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 cursor-pointer"
                type="submit"
                value={loading ? "Menyimpan.." : "Ubah"}
              />
            </div>

            <div className="flex flex-col items-center mt-6">
              {!auth.isVerified && (
                <div className="text-center mb-4 p-4 bg-yellow-100 text-yellow-800 rounded-md shadow-md">
                  <p className="text-sm font-medium">
                    Akun Anda belum terverifikasi. Harap periksa email Anda dan verifikasi akun Anda.
                  </p>
                </div>
              )}
              {!auth.isVerified && (
                <button 
                  className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300"
                  onClick={() => navigate('/verify-user')}
                >
                  Verifikasi Akun
                </button>
              )}
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>
  );
};
