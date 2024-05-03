import React from 'react';
import axios from 'axios';
import  { useEffect, useState } from 'react';
import './App.css'
const data = [
 ];




const sendDataToBackend = async () => {
  try {
    const response = await fetch('http://localhost:8000/sendData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = await response.json();
    const existingData = responseData;
  const newData = data.filter(item => !existingData.some(existingItem => existingItem.teamName === item.teamName));

    console.log('Data sent successfully');
  } catch (error) {
    console.error('Oops:', error);
  }
};



  
const enterr = async () => {
  try {
    const response = await fetch('http://localhost:8000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    console.log('yayyyyy');
  } catch (error) {
    console.error('oopppss:', error);
  }
};

const App = () => {
  const [teamData, setTeamData] = useState([]);
  useEffect(() => {
    sendDataToBackend(); 
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/getData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        const sortedData = data.sort((a, b) => b.score - a.score);
        setTeamData(sortedData);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <div>
  <h1>Team Data</h1>
  <table>
    <thead>
      <tr>
        <th>Rank</th>
        <th>Team</th>
        <th>Total Games Played</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
  {teamData.map((team, index) => (
    <tr key={index}>
      <td>
        {index < 3 ? ( // Check if index is less than 3
          <img src='https://cdn3.vectorstock.com/i/1000x1000/12/42/winner-gold-cup-on-white-background-vector-3381242.jpg'  className="circular-image" />
        ) : (
          // Display rank number for ranks 4 and above
          index + 1
        )}
      </td>
      <td>
        <div className="team-info">
          <img src={team.image} alt={team.teamName} className="circular-image" />
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{team.teamName}</span>
        </div>
      </td>
      <td>{team.totalGamesPlayed}</td>
      <td>{team.score}</td>
    </tr>
  ))}
</tbody>

  </table>
</div>
      );
};

export default App;
