
import React from 'react'
import {HashRouter} from 'react-router-dom'

import './css/app.scss'

import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render(){
        return <HashRouter>
            <Layout className="layout" style={{height: '100%'}}>
                <Header>
                    <div className="logo"/>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{lineHeight: '64px'}}
                    >
                        <Menu.Item key="1">首页</Menu.Item>
                        <Menu.Item key="2">电影</Menu.Item>
                        <Menu.Item key="3">关于</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{backgroundColor: '#fff'}}>
                    123
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    阿不 ©2020 Created
                </Footer>
            </Layout>
        </HashRouter>
    }
}


