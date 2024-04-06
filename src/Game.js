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
            <div className="gameViewPort">
                <div className="gameTop">
                    {orientation == "white" &&
                        <h4>{lastGame.black.username}</h4>
                    }
                    {orientation == "black" && 
                        <h4>{lastGame.white.username}</h4>
                    }
                </div>
                <Chessboard 
                    id="gameBoard"
                    arePiecesDraggable={false}
                    boardWidth={300}
                    boardOrientation={orientation}
                    position={game.fen()}
                    animationDuration={300}
                />
                <div className="gameBottom">
                    {orientation == "white" && 
                        <h4>{lastGame.white.username}</h4>
                    }
                    {orientation == "black" &&
                        <h4>{lastGame.black.username}</h4>
                    }
                    <div className="gameButtons">
                        <button onClick={previousMove}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                            </svg>
                        </button>
                        <button onClick={nextMove}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Game;