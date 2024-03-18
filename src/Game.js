import { Chess, DEFAULT_POSITION } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { useState, useEffect } from 'react';

function Game({ lastGame, userName }) {

    const [game, setGame] = useState(new Chess());
    const [moveStack, setMoveStack] = useState([]);
    const orientation = lastGame.white.username.toLowerCase() == userName ? "white" : "black";

    useEffect(() => {
        const gameCopy = new Chess();
        gameCopy.loadPgn(lastGame.pgn);
        gameCopy.deleteComments();
        setGame(gameCopy);
    }, [lastGame.pgn]);

    function nextMove() {
        const gameCopy = new Chess();
        if (game.fen() != DEFAULT_POSITION) {
            gameCopy.loadPgn(game.pgn());
        }
        if (moveStack.length > 0) {
            gameCopy.move(moveStack[moveStack.length - 1]);
            setMoveStack(prevData => prevData.slice(0, -1));
            setGame(gameCopy);
        }
    }

    function previousMove() {
        const gameCopy = new Chess();
        if (game.fen() != DEFAULT_POSITION) {
            gameCopy.loadPgn(game.pgn());
        }
        let move = gameCopy.undo();
        if (move != null) {
            setMoveStack(prevData => [...prevData, move.san]);
            setGame(gameCopy);
        }
        
    }
    
    return (
        <div className="Game">
            <h2>Most Recent Game</h2>
            <Chessboard 
                id="gameBoard"
                arePiecesDraggable={false}
                boardWidth={300}
                boardOrientation={orientation}
                position={game.fen()}
                animationDuration={300}
            />
            <button onClick={previousMove}>Back</button>
            <button onClick={nextMove}>Next</button>
        </div>
    );
}

export default Game;