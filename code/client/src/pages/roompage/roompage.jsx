import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import {Container, Row, Col} from "react-bootstrap"
import PlayerInfoComponent from "./components/playerInfoComponent";
import ChatboxComponent from "./components/chatboxComponent";
import GameSettingsComponent from "./components/gameSettingsComponent";
import GameViewComponent from "./components/gameView/gameViewComponent";
import "./roompage.css";

window.gameData = null;

const RoomPagePropTypes = {
    socket: PropTypes.object.isRequired,
}

const RoomPage = ({ socket }) => {
    const [gameStarted, setGameStarted] = useState(!!window.gameData);
    const [gameData, setGameData] = useState({});
    const [playerInfo, setPlayerInfo] = useState({});
    const roomID = useParams().roomID;

    const createTempPlayers = (clientInfo) => {
        // create a temporary, "fake" player info
        let tempPlayerInfo = {};
        clientInfo.forEach(client => {
            tempPlayerInfo[client.id] = {
                id: client.id,
                nickName: client.nickname,
                color: client.color,
                isImposter: false,
                hasEmergency: true,
            }
        })
        setPlayerInfo(tempPlayerInfo);
    }

    useEffect(() => {
        if (window.gameData == null) {
            socket.emit("getConnectedClients", roomID, createTempPlayers);
        } else {
            setPlayerInfo(window.gameData.players);
        }
    },[])

    socket.on("connectClient", createTempPlayers);

    // Reference: https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
    const copyRoomId = () => {
        var copyCode = document.getElementById("roomId");
        copyCode.select();
        navigator.clipboard.writeText(copyCode.value);

        alert("Copied Room Id: " + copyCode.value);
    }
  
    socket.on("gameStarted", (gameData) => {
        console.log(`GameStarted gameData:`);
        console.log(gameData);
        window.gameData = gameData;
        setGameStarted(true);
    })

    socket.on("gameDataUpdated", (gameData) => {
        window.gameData = gameData;
    });

    const ShowComponent = () => {
        if (gameStarted) {
            return (
                <GameViewComponent
                    socket={socket}
                />
            )
        } else {
            return (
                <GameSettingsComponent
                    socket={socket}
                    roomID={roomID}
                />
            )
        }
    }

    return (
        <div className="room-page">
            <div className="piece piece-1"></div>
            <div className="piece piece-2"></div>
            <div className="piece piece-3"></div>
            <div className="piece piece-4"></div>
            <div className="piece piece-5"></div>
            <div className="piece piece-6"></div>
            <div className="piece piece-7"></div>
            <div className="piece piece-8"></div>
            <div className="piece piece-9"></div>
            <div className="piece piece-10"></div>
            <div>
                <p className="h1 text-danger font-weight-bold font-italic text-center ">Treacherous Tetris</p>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <Link to={"/help"} type="button" className=" help-button"><i className="bi bi-question-circle fa-lg"></i></Link>          
            </div>
            <div className="room-code">
                <span className="h2 text-dark font-weight-bold text-center ">Room:</span>
                <span type="text" value="room id" id="roomId" className="h2 text-dark font-weight-bold text-center">{roomID}</span>
                <button onClick={copyRoomId} className="copy-button"><i className="bi bi-clipboard fa-lg"></i></button>
            </div>
                
            <div className="room-components">
                <div className="room-sections-left">
                    <div className="room-box-left">
                            <PlayerInfoComponent playerInfo={playerInfo} />
                    </div>
                    <div className="room-box-left">
                            <ChatboxComponent socket={socket}/>
                    </div>
                </div>
                <div className="room-sections-right">
                    <div className="room-box-right">      
                            <ShowComponent />
                    </div>
                </div>
            </div>
        </div>
    )
}

RoomPage.propTypes = RoomPagePropTypes;

export default RoomPage;