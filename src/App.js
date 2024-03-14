import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import SearchBar from './SearchBar';
import PlayerProfile from './PlayerProfile'


function App() {
  const [player, setPlayer] = useState(null);
  const [profileStats, setProfileStats] = useState(null);

  function fetchData(url, setState) {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setState(data);
      })
      .catch(error => {
        setState(null);
        console.error('Error fetching data:', error);
      });
  }

  function handleSearch(playerName) {
    fetchData(`https://api.chess.com/pub/player/${playerName}`, setPlayer);
    fetchData(`https://api.chess.com/pub/player/${playerName}/stats`, setProfileStats);
  }
  

  return (
    <div className="App">
      <h1> Chess Tracker </h1>
      <SearchBar handleSearch={handleSearch}/>
      {player != null && profileStats != null &&
        <PlayerProfile profile={player} stats={profileStats} />
      }
    </div>
  );
}

export default App;
