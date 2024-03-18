import { useState } from 'react';
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
      if (gameArchives && gameArchives.archives.length > 0) {
        fetchData(gameArchives.archives[gameArchives.archives.length - 1])
        .then(lastArchive => {
          setPlayerData(prevData => ({
            ...prevData,
            profile: profile,
            stats: stats,
            gameArhives: gameArchives.archives,
            lastArchive: lastArchive
          }));
        });
      }
      else {
        setPlayerData(prevData=> ({
          ...prevData,
          profile: null,
          stats: null,
          gameArchives: null,
          lastArchive: null
        }));
      }
    });
  }

  return (
    <div className="App">
      <h1 className="title"> Chess Tracker </h1>
      <SearchBar handleSearch={handleSearch}/>
      {playerData.profile != null &&
        <PlayerProfile 
          profile={playerData.profile} 
          stats={playerData.stats} 
          gameArchives={playerData.gameArchives}
          lastArchive={playerData.lastArchive} />
      }
    </div>
  );
}

export default App;
