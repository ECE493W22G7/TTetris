import { useRef, useEffect, useState } from "react";
import GameButtonsComponent from "./gameButtonsComponent";
import GameVotingComponent from "./gameVotingComponent";
import { ResponsiveGameCanvasComponent } from "./responsiveGameCanvasComponent";
import "./gameview.css";

const GameViewComponent = ({ socket }) => {
    const gameDivRef = useRef(null);
    const [isVoting, setVoting] = useState(false);

    useEffect(() => {
        const gameDiv = gameDivRef.current;
        window.addEventListener("keydown", handleKeyDown, false);
        return () => {
            window.removeEventListener("keydown", handleKeyDown, false);
        };
    }, []);

    socket.on("votesUpdated", (votes) => {
        let _isVoting = !!votes;
        if (_isVoting != isVoting) {
            setVoting(_isVoting);
        }
    });

    // FRMARKER: FR20:Send.Inputs.Server
    const handleKeyDown = (e) => {
        switch (e.key) {
            case "ArrowRight":
                socket.emit("game_input", "right");
                break;
            case "ArrowLeft":
                socket.emit("game_input", "left");
                break;
            case "ArrowUp":
                socket.emit("game_input", "rotate");
                break;
            case "ArrowDown":
                socket.emit("game_input", "down");
                break;
            case " ":
                socket.emit("game_input", "drop");
                e.preventDefault();
                break;
        }
    };

    return (
        <div className="GameViewComponent">
            <div className="GameViewCol1">
                <GameButtonsComponent socket={socket} />
                { /* FRMARKER: FR13: Display.Game.Settings */ }
                <div className="game-level">
                    <p>Speed:{window.gameData.speed}</p>
                </div>
                {isVoting ? <GameVotingComponent socket={socket} /> : null}
            </div>
            <div className="GameViewCol2" ref={gameDivRef} tabindex="0">
                <ResponsiveGameCanvasComponent />
            </div>
        </div>
    );
};

export default GameViewComponent;
