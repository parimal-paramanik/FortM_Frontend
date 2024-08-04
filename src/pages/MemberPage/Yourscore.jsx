import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Scores = () => {
  const { token } = useSelector((state) => state.auth.auth);
  const [scores, setScores] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null); // Track the expanded card
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const fetchScores = async () => {
      try {
        setLoading(true)
        const response = await axios.get('http://localhost:8080/member/getYourscore', {
          headers: {
            'Authorization': `${token}`,
          },
        });

        console.log("data.data", response)
        
        setScores(response.data.data);
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
      finally{
        setLoading(false)
      }
    };

    fetchScores();
  }, [token]);

  const handleCardClick = (id) => {
    setExpandedCard(expandedCard === id ? null : id); // Toggle the expanded card
  };

  return (
    <div className="flex flex-col items-center min-h-full p-4">
      <h1 className="text-2xl font-bold mb-4">Your Performance and score</h1>
      <h1 className="text-sm font-bold mb-4 text-blue-500">Expand Exam to see more details</h1>
      {
        loading ? "loading..." : (<div className="w-full md:w-3/4">
            {scores.length > 0  ? (
              scores.map((score) => (
                <div
                  key={score._id}
                  className={`border rounded-lg mb-4 p-4 cursor-pointer transition-transform duration-300 ${expandedCard === score._id ? 'bg-blue-100' : 'bg-white'}`}
                  onClick={() => handleCardClick(score._id)}
                >
                  <h2 className="text-md font-semibold mb-2">ExamName : <span className='text-xl font-semibold mb-2 text-blue-700'>{score.examname}</span></h2>
                  {expandedCard === score._id && (
                    <div className="mt-2">
                      <p className="text-lg">Score: <span className='text-xl font-semibold mb-2 text-blue-700'>{score.score}</span></p>
                      <p className="text-lg">Result: <span className='text-xl font-semibold mb-2 text-blue-700'>{score.result ? 'Pass' : 'Fail'}</span> </p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No scores available</p>
            )}
          </div>)
      }
    </div>
  );
};

export default Scores;
