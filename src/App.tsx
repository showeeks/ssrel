import React, {useState} from 'react'
import SSRConfig from "./model/SSRConfig";
import {Layout, Menu, Breadcrumb, Button, Table, Divider, Tag, Checkbox} from "antd";

const {Header, Content, Footer} = Layout;

const electron = window.require("electron");
const {send, sendSync} = electron.ipcRenderer;

// import axios from 'axios'

function subscribe(setList) {
    console.log("try to setLists");
    // send("sub", "ping");
    let sendSync1 = sendSync("sub", "ping");
    console.log(sendSync1);
    sendSync1 = sendSync1.map((data) => {
        data.key = data.remarks;
        return data
    });
    setList(sendSync1)
    // electron.ipcRenderer.on("pub", (event, arg) => {
    //     console.log(arg)
    // });
}

function ListSSRConfig() {
    const [list, setList] = useState<SSRConfig[]>(new Array<SSRConfig>());
    // const listItems = list.map((con: SSRConfig) => {
    //     return (<li key={con.remarks}>
    //         {con.remarks} - {con.method} - {con.server}
    //     </li>)
    // });
    return (
        <div>
            <p>
                <Button onClick={() => subscribe(setList)}>fetch all</Button>
            </p>
            <p>Hello world!</p>
            <Table columns={[
                {
                    title: "名称",
                    dataIndex: "remarks",
                },
                {
                    title: "IP",
                    dataIndex: "server"
                },
                {
                    title: "端口",
                    dataIndex: "server_port"
                }, {
                    title: "分组",
                    dataIndex: "group"
                }, {
                    title: "启用",
                    dataIndex: "enable",
                    key: "enable",
                    render: (text) => {
                        return <Checkbox checked={text} onClick={() => {}}/>
                    }
                }
            ]} dataSource={list}>
            </Table>
        </div>
    )
}

function MainLayout() {
    return (<Layout className="layout">
        <Header>
            <div className="logo"/>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{lineHeight: '64px'}}
            >
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
        </Header>
        <Content style={{padding: '0 50px'}}>
            <Breadcrumb style={{margin: '16px 0'}}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{background: '#fff', padding: 24, minHeight: 280}}><ListSSRConfig/></div>
        </Content>
        <Footer style={{textAlign: 'center'}}>pdeantihuman ©2019 </Footer>
    </Layout>)
}


const App: React.FC = () => {
    return (<MainLayout/>)
};

export default App;