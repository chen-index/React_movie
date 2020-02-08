import React from 'react'
import {HashRouter, Link, Route} from 'react-router-dom'
// import './App.css'

// import styles from './css/app.module.scss'

import Home from './components/home/Home.jsx'
import Movie from './components/movie/Movie.jsx'
import About from './components/about/About.jsx'

import { Layout, Menu } from 'antd';
import WorkDetail from "./components/home/works/WorkDetail";
const { Header, Content } = Layout;


export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentWillMount() {
        // console.log(window.location.hash.split('/')[1])
    }

    render(){
        // console.log(window.location)
        return <HashRouter>
            <Layout className="layout" style={{height: '100%'}}>
                {/*<div className='App'>111</div>*/}
                <Header style={{height:'30px'}}>
                    {/*<div className={styles.logo}/>*/}
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={[window.location.hash.split('/')[1]]}
                        style={{lineHeight: '30px'}}
                    >
                        <Menu.Item key="home">
                            <Link to='/home/works/1/669f9f8320283283'>首页</Link>
                        </Menu.Item>
                        <Menu.Item key="movie">
                            <Link to='/movie/in_theaters/1'>电影</Link>
                        </Menu.Item>
                        <Menu.Item key="about">
                            <Link to='/about'>关于</Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{backgroundColor: '#fff',flex:1 }}>
                    <Route path="/" component={Home} exact />
                    <Route path='/home' component={Home}></Route>
                    <Route path='/movie' component={Movie}></Route>
                    <Route path='/about' component={About}></Route>
                    <Route path='/workdetail/:id' component={WorkDetail}></Route>
                </Content>
                {/*<Footer style={{textAlign: 'center'}}>*/}
                {/*    阿不 ©2020 Created*/}
                {/*</Footer>*/}
            </Layout>
        </HashRouter>
    }
}


