import React, { useState, useEffect } from 'react';

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/member/getCourse', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2YWU5Y2ZjOWU3ZDFhOWEzMzVlYTZhOCIsIm5hbWUiOiJtZW1iZXIxIiwiZW1haWwiOiJtMUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQwOCRLWjRWYlQxVFdsRmpUL0p4R0FRcFcucnNRN3V4bnZTd09VNmZnZ0JPb3NtcUhnT3hWNVhBaSIsIm1vYmlsZSI6IjEyMzQ1Njc4OTAiLCJyb2xlIjoibWVtYmVyIiwiY291cnNlIjpbIjY2YWU5ZDMxOWU3ZDFhOWEzMzVlYTZhZCJdfSwiaWF0IjoxNzIyNzE5NzI4LCJleHAiOjE3MjUzMTE3Mjh9.cCxJrmdJGoeVuL0niz-2QEiFNali5JA9uoxtxE8FMyQ`,
          },
        });

        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }

        const data = await response.json();
        setCourses(data.data);
        console.log("data is ", data.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleExamClick = (exam) => {
    const confirmStart = window.confirm('Do you want to start the exam?');
    if (confirmStart) {
      setSelectedExam(exam);
      setUserAnswers({});
    }
  };

  const handleAnswerChange = (questionId, optionId) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionId,
    }));
  };

  const handleSubmitExam = () => {
    if (!selectedExam) return;

    let score = 0;
    selectedExam.questions.forEach((question) => {
      const userAnswer = userAnswers[question._id];
      const correctAnswer = question.options.find(option => option.isCorrect)._id;
      if (userAnswer === correctAnswer) {
        score += 1;
      }
    });

    const passOrFail = score >= (selectedExam.questions.length / 2) ? 'Pass' : 'Fail';
    alert(`Result: ${passOrFail}\nExam: ${selectedExam.examname}\nScore: ${score}`);
  };

  return (
    <>
      {loading ? (
        <h3 className='mt-3'>Loading...</h3>
      ) : (
        <div className="flex flex-col md:flex-row items-start min-h-screen p-4">
          <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md mb-6 md:mb-0">
            <h1 className="text-2xl font-bold mb-4 text-center">Courses and Exams</h1>
            {courses.map((course) => (
              <div key={course._id} className="mb-6">
                <h2 className="text-xl font-semibold mb-2">{course.courseName}</h2>
                <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                <div className="space-y-4">
                  {course.exams.map((exam) => (
                    <div
                      key={exam._id}
                      className={`p-4 border rounded-md cursor-pointer ${
                        selectedExam?._id === exam._id ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-300'
                      }`}
                      onClick={() => handleExamClick(exam)}
                    >
                      <div className='flex flex-row'>
                        <h3 className="text-lg font-semibold">{exam.examname}</h3>
                        <h3 className="text-lg font-semibold ml-4">Total Marks: {exam.totalMarks}</h3>
                        <h3 className="text-lg font-semibold ml-4">Duration: {exam.duration} min</h3>
                      </div>
                      <p className="text-sm text-gray-500">ID: {exam._id}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md ml-5">
            <h1 className="text-2xl font-bold mb-4 text-center">Questions and Options</h1>
            {selectedExam ? (
              <div className="h-96 overflow-y-scroll">
                {selectedExam.questions.map((question) => (
                  <div key={question._id} className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">{question.questionText}</h2>
                    <div className="space-y-2">
                      {question.options.map((option) => (
                        <div key={option._id} className="flex items-center">
                          <input
                            type="radio"
                            name={`question-${question._id}`}
                            value={option._id}
                            checked={userAnswers[question._id] === option._id}
                            onChange={() => handleAnswerChange(question._id, option._id)}
                            className="mr-2"
                          />
                          <label>{option.text}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <button
                  onClick={handleSubmitExam}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Submit Exam
                </button>
              </div>
            ) : (
              <p className="text-center text-gray-600">Select an exam to view its questions</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Course;
