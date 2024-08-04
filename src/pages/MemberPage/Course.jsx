import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Course = () => {
  const { token } = useSelector((state) => state.auth.auth);
  const [courses, setCourses] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const examTimerRef = useRef(null);
  const intervalRef = useRef(null);
  const [loading2, setLoading2] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/member/getCourse', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
          },
        });

        const data = await response.json();
        setCourses(data.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [token]);

  const handleExamClick = (exam) => {
    if (exam.questions.length === 0) {
      toast.warning('No questions available for this exam.');
      return;
    }

    const confirmStart = window.confirm('Click OK to start the exam');
    if (confirmStart) {
      setSelectedExam(exam);
      setUserAnswers({});
      startExamTimer(exam.duration);
    }
  };

  const startExamTimer = (duration) => {
    if (examTimerRef.current) {
      clearTimeout(examTimerRef.current);
    }

    setTimeLeft(duration * 60); // Set time left in seconds

    examTimerRef.current = setTimeout(() => {
      handleSubmitExam(true);
    }, duration * 60 * 1000); // duration in minutes

    // Update time left every second
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleAnswerChange = (questionId, optionId) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionId,
    }));
  };

  const handleSubmitExam = async (isAutoSubmit = false) => {
    if (!selectedExam) return;

    if (examTimerRef.current) {
      clearTimeout(examTimerRef.current);
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    let score = 0;
    selectedExam.questions.forEach((question) => {
      const userAnswer = userAnswers[question._id];
      const correctAnswer = question.options.find(option => option.isCorrect)._id;
      if (userAnswer === correctAnswer) {
        score += 1;
      }
    });

    const passOrFail = score >= selectedExam.passMarks ? 'pass' : 'fail';

    try {
      setLoading2(true);
      const response = await fetch(`http://localhost:8080/member/submitScore`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify({
          examname: selectedExam.examname,
          score,
          result: passOrFail === 'pass',
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(`Result: ${passOrFail}\nExam: ${selectedExam.examname}\nScore: ${score}${isAutoSubmit ? '\n(Submitted Automatically)' : ''}`);
      } else {
        toast.error("You have already attempted");
      }
    } catch (error) {
      console.error('Error submitting score:', error);
      toast.error('An error occurred while submitting the score.');
    } finally {
      setLoading2(false);
    }

    setSelectedExam(null);
    setTimeLeft(null);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <>
      {loading ? (
        <h3 className='mt-3'>Loading...</h3>
      ) : (
        <div className="flex flex-col md:flex-row items-start min-h-full p-4">
          <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md mb-6 md:mb-0">
            <h1 className="text-2xl font-bold mb-4 text-center">Courses and Exams</h1>
            {courses.map((course) => (
              <div key={course._id} className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Course: {course.courseName.substring(0, 10)}{course.courseName.length > 10 ? '...' : ''}</h2>
                <p className="text-sm text-gray-600 mb-4">Desc: {course.description.substring(0, 10)}{course.description.length > 10 ? '...' : ''}</p>
                <div className="space-y-4">
                  {course.exams.map((exam) => (
                    <div
                      key={exam._id}
                      className={`p-4 border rounded-md cursor-pointer ${selectedExam?._id === exam._id ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-300'}`}
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
              <>
                <div className="text-center mb-4">
                  <h2 className="text-xl font-semibold">Time Left: {formatTime(timeLeft)}</h2>
                </div>
                <div className="h-96 overflow-y-scroll">
                  {selectedExam.questions.length > 0 ? (
                    <>
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
                        onClick={() => handleSubmitExam(false)}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                      >
                        {loading2 ? "Submitting..." : "Submit Exam"}
                      </button>
                    </>
                  ) : (
                    <p className="text-center text-gray-600">No questions available for this exam</p>
                  )}
                </div>
              </>
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
