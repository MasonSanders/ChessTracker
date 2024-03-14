import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import SearchBar from './SearchBar';
import PlayerProfile from './PlayerProfile'


function App() {
  const [playerData, setPlayerData] = useState({
    profile: null,
    stats: null,
    gameArchives: null,
    lastArchive: null
  });
  
  function fetchData(url) {
    return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      return null;
    });
  }

  function handleSearch(playerName) {
    Promise.all([
      fetchData(`https://api.chess.com/pub/player/${playerName}`),
      fetchData(`https://api.chess.com/pub/player/${playerName}/stats`),
      fetchData(`https://api.chess.com/pub/player/${playerName}/games/archives`)
    ])
    .then(([profile, stats, gameArchives]) => {
      if (gameArchives && gameArchives.length > 0) {
        return [profile, stats, gameArchives, fetchData(gameArchives[gameArchives.length - 1])];
      }
      else {
        return [profile, stats, gameArchives, null];
      }

    })
    .then(([profile, stats, gameArchives, lastArchive]) => {
      setPlayerData(prevData => ({
        ...prevData,
        profile: profile,
        stats: stats,
        gameArchives: gameArchives,
        lastArchive: lastArchive
      }));
    });
  }

  return (
    <div className="App">
      <h1> Chess Tracker </h1>
      <SearchBar handleSearch={handleSearch}/>
      {playerData.profile != null &&
        <PlayerProfile profile={playerData.profile} stats={playerData.stats} />
      }
    </div>
  );
}

export default App;
