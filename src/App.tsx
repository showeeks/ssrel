import React, {useState} from 'react'
import {remote} from "electron"
import {Config} from "./utils/Config";
// import axios from 'axios'


const App: React.FC = () => {
    let [list, setList] = useState<Config[]>(new Array<Config>());
    const listItems = list.map((con:Config) => {
        return (<li>{con}</li>)
    });
    return (
        <div>
            <p><button onClick={() => subscribe(setList)}>fetch all</button></p>
            <p>Hello world!</p>
            <ul>
                {listItems}
            </ul>
        </div>
    )
};

export default App;