import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Data = () => {
  const { token } = useSelector((state) => state.auth.auth);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {

      try {
        setLoading2(true)
        const response = await axios.get('http://localhost:8080/Analytics',{
          headers:{
            Authorization: `${token}`
          }
        });
        console.log("response",response)
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
      finally{
        setLoading2(false)
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>
      <div className="flex flex-col items-center">
        {loading ? (
          <p className="text-lg">Loading...</p>
        ) : (
          <div className="w-full md:w-3/4">
            {data.length > 0 ? (
              data.map((member, index) => (
                <div
                  key={index}
                  className={`border rounded-lg mb-4 p-4 cursor-pointer transition-transform duration-300 ${expandedCard === index ? 'bg-blue-100' : 'bg-white'}`}
                  onClick={() => handleCardClick(index)}
                >
                  <h2 className="text-md font-semibold mb-2">Member Name: <span className="text-xl font-semibold mb-2 text-blue-700">{member.memberName}</span></h2>
                  {expandedCard === index && (
                    <div className="mt-2">
                      {member.scores.length > 0 ? (
                        member.scores.map((score, i) => (
                          <div key={i} className="mb-4">
                            <p className="text-lg">Exam Name: <span className="text-xl font-semibold mb-2 text-blue-700">{score.examName}</span></p>
                            <p className="text-lg">Score: <span className="text-xl font-semibold mb-2 text-blue-700">{score.score}</span></p>
                            <p className="text-lg">Result: <span className={`text-xl font-semibold mb-2 ${score.result === 'Pass' ? 'text-green-500' : 'text-red-500'}`}>{score.result}</span></p>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-gray-600">No scores available</p>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No Data found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Data;
