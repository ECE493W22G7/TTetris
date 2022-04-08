import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import GameSettingsComponent from '../gameSettingsComponent';
import SocketMock  from 'socket.io-mock';
import socketIOClient from 'socket.io-client';
import { toMatchDiffSnapshot } from 'snapshot-diff';
import ReactTestUtils from "react-dom/test-utils";
// import ReactDOM from 'react-dom/client';
const {act} = renderer;


expect.extend({ toMatchDiffSnapshot });

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe("GameSettingsComponent", () => {
    let socket;
    let container;

    beforeEach(() => {
        // container = document.createElement('div');
        // document.body.appendChild(container);
        socket = new SocketMock();
            socket.on("getConnectedClients", (roomId) => {
            console.log("testasdfsf");
        })
    });

    // afterEach(() => {
    //     document.body.removeChild(container);
    //     container = null;
    // });


    
    test('renders correctly', async () => {
            let component;
            act(() => {
                component = renderer.create(<GameSettingsComponent socket={socket.socketClient} roomID={"34223"} />);
            });
            
            await sleep(2000);
            let tree = component.toJSON();
            expect(tree).toMatchSnapshot();
    });

    // test("should send 'changeGameSpeed' to socket when the slider is moved", async () => {
    //     let component;
    //     let speed = 1;
    //     socket.on("changeGameSpeed",  (newSpeed) =>{
    //         speed = newSpeed;
    //     });

    //     act(() => {
    //         // component = renderer.create(<GameSettingsComponent socket={socket.socketClient} roomID={"34223"} />);
    //         ReactDOM.createRoot(container).render(<GameSettingsComponent socket={socket.socketClient} roomID={"34223"} />);
    //     });
    //     const input_element = container.querySelector('#speed_input');
    //     // let input_element = component.root.findByProps({"type":"range"});

    //     ReactTestUtils.Simulate.change(input_element, { target: { value: 10 } });
    //     await sleep(1000);      

    //     expect(speed).toBe(10);
    // })

})

