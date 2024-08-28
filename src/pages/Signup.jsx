import { useState } from "react"

const initialFormdata ={name: "",email:"",password:"",confirmPassword:""}
const initialFormError ={name: "",email:"",password:"",confirmPassword:""}

export const Signup = () => {
    const [formdata,setFormdata] = useState(initialFormdata);
    const [formErorr,setFormError] = useState(initialFormError)

    const handleChange = (e) =>{
        setFormdata((prev) =>({...prev,[e.target.name]:e.target.value}))
    }

    const handleSubmit =(e) =>{
        e.preventDefault();
        console.log(formdata)
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Signup Form</h2>
  
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Name</label>
        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          type="text"
          name="name"
          placeholder="Jhon Doe"
          onChange={handleChange}
          value={formdata.name}
        />
      </div>
  
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Email</label>
        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          type="email"
          name="email"
          placeholder="doe@gmail.com"
          onChange={handleChange}
          value={formdata.email}
        />
      </div>
  
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Password</label>
        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          type="password"
          name="password"
          placeholder="***********"
          onChange={handleChange}
          value={formdata.password}
        />
      </div>
  
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          type="password"
          name="confirmPassword"
          placeholder="***********"
          onChange={handleChange}
          value={formdata.confirmPassword}
        />
      </div>
  
      <button
        type="submit"
        className="w-full bg-indigo-500 text-white font-medium py-3 rounded-lg hover:bg-indigo-600 transition duration-300"
      >
        Signup
      </button>
    </form>
  </div>
  
  )
}
