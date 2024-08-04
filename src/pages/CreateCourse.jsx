// src/pages/AddCourse.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CreateCourse = () => {
  const { token } = useSelector((state) => state.auth.auth);
  const [formData, setFormData] = useState({
    courseName: '',
    description: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();

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
    
    const { courseName, description } = formData;

    if (!courseName || !description) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true)
      const response = await axios.post(`http://localhost:8080/createCourse`, formData, {
        headers: { Authorization: `${token}` },
      });
      console.log("response", response)

      if(response.status === 200){
        setSuccess(response.data.message);
      }
    } catch (error) {
      console.log("error",error)
      setError(error.response.data.error);
    }
    finally{
      setLoading(false)
    }
  };

  const handleNext = () => {
    navigate('/course/addExam'); 
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md relative">
        <h1 className="text-2xl font-bold mb-4 text-center">Add Course</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Course Name</label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              className="block w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="block w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? "loading..": "Add Course"}
          </button>
        </form>
        <button
        onClick={handleNext}
        className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Next
      </button>
      </div>
    </div>
  );
};

export default CreateCourse;
