import React, {useState} from 'react'
import SSRConfig from "./model/SSRConfig";

const electron = window.require("electron");
const {send} = electron.ipcRenderer;

// import axios from 'axios'

function subscribe(setList) {
    console.log("try to setLists")
    send("sub", "ping");
    electron.ipcRenderer.on("pub", (event, arg) => {
        console.log(arg)
    });
}

const App: React.FC = () => {
    const [list, setList] = useState<SSRConfig[]>(new Array<SSRConfig>());
    const listItems = list.map((con: SSRConfig) => {
        return (<li>{con}</li>)
    });
    return (
        <div>
            <p>
                <button onClick={() => subscribe(setList)}>fetch all</button>
            </p>
            <p>Hello world!</p>
            <ul>
                {listItems}
            </ul>
        </div>
    )
};

export default App;