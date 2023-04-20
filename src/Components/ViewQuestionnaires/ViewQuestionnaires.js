import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewQuestionnaires({ itemName }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/questionnaire/detail/${itemName}`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [itemName]);

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.question}</p>
    </div>
  );
}

export default ViewQuestionnaires;
