// src/pages/AddMember.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const CreteMember = () => {
  const { token } = useSelector((state) => state.auth.auth);
  // console.log("token",token)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
const [loading,setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    const { name, email, password, mobile } = formData;

    if (!name || !email || !password || !mobile) {
      setError('Please fill in all fields');
      return;
    }

    const nameRegex = /^[A-Za-z\s]{4,}$/; // Minimum 4 letters in the name
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[A-Z]).{8,16}$/;
    const mobileregx = /^(\+\d{1,3}[- ]?)?\d{10}$/;

    if (!nameRegex.test(name)) {
      return toast.error("Require Minimum 4 letters in the name (NO NUMBERS)");
    }
    if (!emailRegex.test(email)) {
      return toast.error("Invalid email format!");
    }
    if (!mobileregx.test(mobile)) {
      return toast.error("Invalid mobile format!");
    }
    if (!passwordRegex.test(password)) {
      return toast.error("Password must be 8-16 characters, contain at least one special character, one number, and one uppercase letter!");
    }

    try {
      setLoading(true)
      const response = await axios.post(`http://localhost:8080/createMember`, formData, {
        // headers: { Authorization: `${token}` },
        headers: { Authorization: `${token}` },
      });
      console.log("response",response)
      if(response.status === 200){
        setSuccess(response.data.message);
      }
    } catch (error) {
      console.log("errr",error)
      setError(error.response.data.error);
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Add Member</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="block w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? "adding member" :"Add Member"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreteMember;
