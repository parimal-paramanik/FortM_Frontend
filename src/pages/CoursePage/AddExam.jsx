// src/pages/AddExam.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddExam = () => {
  const { token } = useSelector((state) => state.auth.auth);

  const [formData, setFormData] = useState({
    examname: '',
    totalMarks: '',
    passMarks: '',
    duration: '',
  });
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/member/getCourse', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
          },
        });
        const fetchedData = response.data.data;
        setCourses(fetchedData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [token]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCourseSelect = (courseId) => {
    setSelectedCourse(courseId);
    alert(courseId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!selectedCourse) {
      setError('Please select a course');
      return;
    }

    const { examname, totalMarks, passMarks, duration } = formData;

    if (!examname || !totalMarks || !passMarks || !duration) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading2(true);
      const response = await axios.post(
        `http://localhost:8080/createExam?courseId=${selectedCourse}`,
        {
          examname,
          totalMarks,
          passMarks,
          duration,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
          },
        }
      );
      setSuccess(response.data.message);
      // console.log("res", response.data.message);
      // if (response.status === 200) {
      //   // Set the success state and display the toast
      //   // toast.success("Exam created successfully");
      //   // alert("Exam created successfully")
      // }
    } catch (error) {
      const e = error.response?.data?.error || 'An unexpected error occurred.';
      setError(e);
      console.error('Error creating exam:', error);
    } finally {
      setLoading2(false);
    }
  };

  const handleNext = () => {
    navigate('/exams/addquestion');
  };

  return (
    <div className="flex items-center min-h-screen relative gap-10">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Select Course</h1>
        {loading ? (
          <div className="text-center">Fetching data...</div>
        ) : courses.length === 0 ? (
          <p className="text-center">No courses available</p>
        ) : (
          <div className="space-y-4">
            {courses.map((course) => (
              <div
                key={course._id}
                className={`p-4 border rounded-md cursor-pointer ${
                  selectedCourse === course._id ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-300'
                }`}
                onClick={() => handleCourseSelect(course._id)}
              >
                <h2 className="text-lg font-semibold">{course.courseName}</h2>
                <p>{course.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Add Exam</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Exam Name</label>
            <input
              type="text"
              name="examname"
              value={formData.examname}
              onChange={handleChange}
              className="block w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Total Marks</label>
            <input
              type="number"
              name="totalMarks"
              value={formData.totalMarks}
              onChange={handleChange}
              className="block w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Pass Marks</label>
            <input
              type="number"
              name="passMarks"
              value={formData.passMarks}
              onChange={handleChange}
              className="block w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Duration (in minutes)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="block w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading2 ? "Adding..." : "Add Exam"}
          </button>
        </form>
      </div>
      <button
        onClick={handleNext}
        className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Next
      </button>
    </div>
  );
};

export default AddExam;
