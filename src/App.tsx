import React, {useState} from 'react'
import SSRConfig from "./model/SSRConfig";
import {ipcRenderer} from 'electron'

// import axios from 'axios'

function subscribe(setList) {
    let sendSync = ipcRenderer.sendSync("subscribe");
    console.log(sendSync)
    setList(sendSync)
}

const App: React.FC = () => {
    let [list, setList] = useState<SSRConfig[]>(new Array<SSRConfig>());
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