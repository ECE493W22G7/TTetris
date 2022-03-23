import React, { Component, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './homepage.css';
import PropTypes from "prop-types";

const HomePagePropTypes = {
    socket: PropTypes.object.isRequired,
}

const HomePage = (props) => {
    const [roomID, setRoomID] = useState();
    const {socket} = props;
    const navigate = useNavigate();

    const onCreateButtonClicked = () => {
        socket.emit("create_room", (_roomID, clientID) => {
            window.clientID = clientID;
            let path = `/room/${_roomID}`;
            navigate(path)
        })
    }

    const onJoinButtonClicked = () => {
        requestJoinRoom(roomID);
    }

    const requestJoinRoom = (roomID) => {
        socket.emit("join_room", roomID, (roomExists, clientID) => {
            if (!roomExists) {
                alert("The room does not exist")
                return;
            }
            window.clientID = clientID;
            let path = `/room/${roomID}`;
            navigate(path);
        })
    }

    return (   
            <div className="home-page">
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
                <p className="h1 text-danger font-weight-bold font-italic text-center title-margin ">Treacherous Tetris</p>
                <div className="d-flex justify-content-center align-items-start">
                    <button onClick={onCreateButtonClicked} type="button" className="btn btn-secondary btn-lg btn-block text-dark font-weight-bold font-italic text-center btn-space">
                        Create Room
                    </button>
                </div>
                <div className="d-flex justify-content-center align-items-start">
                    <div className='input-group mb-3 text-center btn-space'>
                        <input onChange={(event) => {
                            setRoomID(event.target.value)
                        }} type="text" 
                        className='form-control'
                        placeholder='Enter RoomID'
                        aria-label='Room ID'
                        aria-describedby='basic-addon2'></input>
                        
                        <div className='input-group-append'>
                            <button onClick={onJoinButtonClicked} type="button" className="btn btn-secondary btn-lg btn-block text-dark font-weight-bold font-italic">
                                Join Room
                            </button>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center align-items-start">
                    <Link to={"/help"} type="button" className="btn btn-secondary btn-lg btn-block text-dark font-weight-bold font-italic text-center btn-space">
                        Help
                    </Link>
                </div>
            </div>
    );
}
 
HomePage.propTypes = HomePagePropTypes;

export default HomePage;