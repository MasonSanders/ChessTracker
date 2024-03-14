function PlayerProfile({ profile, stats }) {
    const userName = profile.username;
    const avatar = profile.avatar;
    const rapidRating = stats.chess_rapid.last.rating;

    return (
        <div className="PlayerProfile">
            <img src={avatar}></img>
            <h1>{userName}</h1>
            <h2>{rapidRating}</h2>
        </div>
    );
}

export default PlayerProfile;