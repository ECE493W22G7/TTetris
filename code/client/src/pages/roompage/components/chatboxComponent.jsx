import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./chatboxComponent.css";
import MessageBoxComponent from "./messageBoxComponent";

const ChatboxComponent = (props) => {
    const { socket } = props;
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const roomID = useParams().roomID;
    const sendButtonRef = useRef(null);

    useEffect(() => {
        socket.emit("getMessage", roomID, (chatHistory) => {
            setChatHistory(chatHistory);
        });
    }, []);

    socket.on("sendMessageAll", (chatHistory) => {
        setChatHistory(chatHistory);
    });

    const onMessageChanged = (event) => {
        setMessage(event.target.value);
    };

    const onMessageSendClicked = () => {
        if (message.length) {
            socket.emit("sendMessage", roomID, message, window.clientID, () => {
                setMessage("");
            });
        }
        sendButtonRef.current.blur();
    };

    const onInputKeyDown = (e) => {
        if (["ArrowDown", "ArrowRight", "ArrowLeft", "ArrowUp"].includes(e.key)) {
            return;
        }
        if(e.key == "Enter") {
            onMessageSendClicked();
        }
        e.stopPropagation();
    }

    return (
        <div className="chatbox-content">
            <span className="chat-title font-italic text-center">Chat Box</span>
            <div className="messages-container">
                {chatHistory.map((chat) => (
                    <MessageBoxComponent
                        message={chat.message}
                        nickname={chat.nickname}
                        time={chat.time}
                    />
                ))}
            </div>
            <div className="send-box">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        value={message}
                        onKeyDownCapture={onInputKeyDown}
                        onChange={onMessageChanged}
                        className="form-control"
                        placeholder="Type..."
                        aria-label="Type"
                        aria-describedby="basic-addon2"
                    ></input>
                    <div className="input-group-append">
                        <button
                            onClick={onMessageSendClicked}
                            className="btn send-button"
                            type="button"
                            ref={sendButtonRef}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatboxComponent;
