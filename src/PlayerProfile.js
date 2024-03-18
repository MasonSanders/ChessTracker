import Game from './Game';

function PlayerProfile({ profile, stats, gameArchives, lastArchive }) {

    const userName = profile.username;
    const avatar = profile.avatar;
    const rapidRating = stats.chess_rapid.last.rating;
    const blitzRating = stats.chess_blitz.last.rating;
    const bulletRating = stats.chess_bullet.last.rating;
    const lastGame = lastArchive.games[lastArchive.games.length - 1];

    return (
        <div className="PlayerProfile">
            <div className="stats">
                <img className="ProfilePic" src={avatar} width="150" height="150"></img>
                <h2>{userName}</h2>
                <h3>Rapid Rating: {rapidRating}</h3>
                <h3>Blitz Rating: {blitzRating}</h3>
                <h3>Bullet Rating: {bulletRating}</h3>
            </div>
            <Game lastGame={lastGame} userName={userName}/>
        </div>
    );
}

export default PlayerProfile;