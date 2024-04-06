import Game from './Game';

function PlayerProfile({ profile, stats, gameArchives, lastArchive }) {

    const userName = profile.username;
    const avatar = profile.avatar;
    const rapidRating = stats.chess_rapid.last.rating;
    const blitzRating = stats.chess_blitz.last.rating;
    const bulletRating = stats.chess_bullet.last.rating;
    const dailyRating = stats.chess_daily.last.rating;
    const lastGame = lastArchive.games[lastArchive.games.length - 1];

    return (
        <div className="PlayerProfile">
            <div className="profileMain">
                <div className="profileHeader">
                    <img className="ProfilePic" src={avatar} width="120" height="120"></img>
                    <h2 className="userName">{userName}</h2>
                </div>
                <div className="stats">
                    <div className="statSection">
                        <h2>Rapid</h2>
                        <h3>{rapidRating}</h3>
                    </div>
                    <div className="statSection">
                        <h2>Blitz</h2>
                        <h3>{blitzRating}</h3>
                    </div>
                    <div className="statSection">
                        <h2>Bullet</h2>
                        <h3>{bulletRating}</h3>
                    </div>
                    <div className="statSection">
                        <h2>Daily</h2>
                        <h3>{dailyRating}</h3>
                    </div>
                </div>
            </div>
            <Game lastGame={lastGame} userName={userName}/>
        </div>
    );
}

export default PlayerProfile;