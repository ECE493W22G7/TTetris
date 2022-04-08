import "./gameSettingsComponent.css";
import { Button, Card } from "react-bootstrap"

// Reference for wifi button: https://fontawesomeicons.com/bootstrap/icons/wifi-off

// FRMARKER: FR09: Host.Edit.Game.Settings
// FRMARKER: FR10: Host.Start.Game
const HostSettingsComponent = (props) => {
    const { isHost, gameSpeed, onGameSpeedChanged, onStartButtonClicked } = props;
    return (
        <Card className="game-settings-component">
            <div className="settings-content">
                <span className="game-title font-italic text-center">
                    Host Settings
                </span>
                <div className="host-input">
                    <div className="input-group">
                            <span className="input-group-text" id="inputGroup-sizing-default">
                                Set Speed:
                            </span>
                            <input
                                className="form-control set-speed"
                                id = "speed_input"
                                type="range"
                                min="1"
                                max="15"
                                onChange={onGameSpeedChanged}
                                value={gameSpeed}
                                disabled={!isHost}
                                step="1"
                            ></input>
                    </div>
                    <Button
                        onClick={onStartButtonClicked}
                        disabled={!isHost}
                        className="start-button"
                        role="button"
                    >
                        Start Game
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default HostSettingsComponent;
