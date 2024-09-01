import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export const Setting = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <button
        className="absolute top-4 left-4 flex items-center text-blue-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        onClick={() => navigate(-1)}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Go Back
      </button>

      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mt-10">
        <div className="flex flex-col items-center mb-6">
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600">
            Verify User
          </button>
        </div>

        <form className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Change Password
          </h2>

          <div className="relative flex flex-col space-y-2">
            <label className="text-gray-700 font-semibold">Old Password</label>
            <div className="flex items-center">
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 pr-10"
                type={showOldPassword ? 'text' : 'password'}
                name="oldPassword"
                placeholder="***********"
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
            <label className="text-gray-700 font-semibold">New Password</label>
            <div className="flex items-center">
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 pr-10"
                type={showNewPassword ? 'text' : 'password'}
                name="newPassword"
                placeholder="***********"
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
              value="Change"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
