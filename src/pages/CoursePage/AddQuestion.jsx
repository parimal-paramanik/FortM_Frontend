// src/pages/AddQuestion.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const AddQuestion = () => {
  const { token } = useSelector((state) => state.auth.auth);
  const [formData, setFormData] = useState({
    questionText: '',
    options: [{ text: '', isCorrect: false }],
  });
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

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
        const allExams = fetchedData.flatMap(course => course.exams);
        setExams(allExams);
        console.log(allExams)
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOptionChange = (index, e) => {
    const newOptions = formData.options.map((option, i) =>
      i === index ? { ...option, [e.target.name]: e.target.value } : option
    );
    setFormData({
      ...formData,
      options: newOptions,
    });
  };

  const handleOptionCorrectChange = (index) => {
    const newOptions = formData.options.map((option, i) =>
      i === index ? { ...option, isCorrect: true } : { ...option, isCorrect: false }
    );
    setFormData({
      ...formData,
      options: newOptions,
    });
  };

  const addOption = () => {
    setFormData({
      ...formData,
      options: [...formData.options, { text: '', isCorrect: false }],
    });
  };

  const removeOption = (index) => {
    setFormData({
      ...formData,
      options: formData.options.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!selectedExam) {
      setError('Please select an exam');
      return;
    }

    const { questionText, options } = formData;

    if (!questionText || options.length < 2 || options.every(option => !option.text)) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading2(true)
      const response = await axios.post(
        `http://localhost:8080/createQuestion?examId=${selectedExam}`,
        {
          questionText,
          options,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
          },
        }
      );
      console.log(response)
      // if (response.status === 200) {
        setSuccess('Question created successfully!');
      // }
      setFormData({
        questionText: '',
        options: [{ text: '', isCorrect: false }],
      });
    } catch (error) {
      const e = error.response?.data?.error || 'An unexpected error occurred.';
      setError(e);
      console.error('Error creating question:', error);
    }
    finally{
      setLoading2(false)
    }
  };

  return (
    <div className="flex items-center min-h-screen relative gap-10">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Select Exam</h1>
        {loading ? (
          <div className="text-center">Fetching data...</div>
        ) : exams.length === 0 ? (
          <p className="text-center">No exams available</p>
        ) : (
          <div className="space-y-4">
            {exams.map((exam) => (
              <div
                key={exam._id}
                className={`p-4 border rounded-md cursor-pointer ${
                  selectedExam === exam._id ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-300'
                }`}
                onClick={() => setSelectedExam(exam._id)}
              >
                <h2 className="text-lg font-semibold">{exam.examname}</h2>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Add Question</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Question Text</label>
            <input
              type="text"
              name="questionText"
              value={formData.questionText}
              onChange={handleChange}
              className="block w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Options</label>
            {formData.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-4 mb-2">
                <input
                  type="text"
                  name="text"
                  value={option.text}
                  onChange={(e) => handleOptionChange(index, e)}
                  className="block w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  placeholder={`Option ${index + 1}`}
                />
                <input
                  type="radio"
                  checked={option.isCorrect}
                  onChange={() => handleOptionCorrectChange(index)}
                  className="form-radio"
                />
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="text-blue-500"
            >
              Add Option
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading2 ? "adding" :"Add Question"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;
