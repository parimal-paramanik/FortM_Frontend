// src/pages/AssignCourse.jsx
import React, { useState, useEffect } from 'react';

const AllApps = () => {
  const [courses, setCourses] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Dummy courses and members data
    const dummyCourses = [
      { _id: '1', courseName: 'Course 1' },
      { _id: '2', courseName: 'Course 2' },
      { _id: '3', courseName: 'Course 3' },
    ];
    const dummyMembers = [
      { _id: '1', name: 'Member 1' },
      { _id: '2', name: 'Member 2' },
      { _id: '3', name: 'Member 3' },
    ];
    setCourses(dummyCourses);
    setMembers(dummyMembers);
  }, []);

  const handleCourseSelection = (courseId) => {
    setSelectedCourseId(courseId);
  };

  const handleMemberSelection = (memberId) => {
    setSelectedMemberId(memberId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!selectedCourseId || !selectedMemberId) {
      setError('Please select a course and a member');
      return;
    }

    try {
      // Simulate a successful response
      setSuccess('Course assigned to member successfully!');
    } catch (error) {
      setError('Error assigning course to member');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[80%] mt-10 ">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Assign Course to Member</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        
        <div className="flex justify-between">
          <div className="w-1/2 p-4">
            <h2 className="text-xl font-semibold mb-4">Courses</h2>
            <div className="space-y-4">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className={`p-4 border rounded-md cursor-pointer ${selectedCourseId === course._id ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-300'}`}
                  onClick={() => handleCourseSelection(course._id)}
                >
                  <h3 className="text-lg font-semibold">{course.courseName}</h3>
                  <p className="text-sm text-gray-500">ID: {course._id}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-1/2 p-4">
            <h2 className="text-xl font-semibold mb-4">Members</h2>
            <div className="space-y-4">
              {members.map((member) => (
                <div
                  key={member._id}
                  className={`p-4 border rounded-md cursor-pointer ${selectedMemberId === member._id ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-300'}`}
                  onClick={() => handleMemberSelection(member._id)}
                >
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-500">ID: {member._id}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Assign Course
        </button>
      </div>
    </div>
  );
};

export default AllApps;
