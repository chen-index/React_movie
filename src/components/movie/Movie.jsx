import React from 'react';

import { Layout, Menu } from 'antd';

import {Link, Route, Switch} from 'react-router-dom'
import MovieList from './MovieList.jsx'
import MovieDetail from './MovieDetail.jsx'

import styles from '../../css/movie.module.scss'

const { Content, Sider } = Layout;

export default class Movie extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Layout style={{ height:'100%'}}>

        <Sider width={200} style={{ background: '#fff' }} className={styles.sider}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[window.location.hash.split('/')[2]]}
            className={styles.menu}
          >
            <Menu.Item key="in_theaters"><Link to='/movie/in_theaters/1'>正在热映</Link></Menu.Item>
            <Menu.Item key="coming_soon"><Link to='/movie/coming_soon/1'>即将上映</Link></Menu.Item>
            <Menu.Item key="top250"><Link to='/movie/top250/1'>Tap250</Link></Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{paddingLeft: '1px'}}>
          <Content style={{ padding: '10px', margin:0, minHeight: 280 }}>
            <Menu
              mode="horizontal"
              defaultSelectedKeys={[window.location.hash.split('/')[2]]}
              className={styles.menujs}
            >
              <Menu.Item key="in_theaters"><Link to='/movie/in_theaters/1'>正在热映</Link></Menu.Item>
              <Menu.Item key="coming_soon"><Link to='/movie/coming_soon/1'>即将上映</Link></Menu.Item>
              <Menu.Item key="top250"><Link to='/movie/top250/1'>Tap250</Link></Menu.Item>
            </Menu>
            <Switch>
              <Route exact path='/movie/detail/:id' component={MovieDetail}></Route>
              <Route exact path='/movie/:type/:page' component={MovieList}></Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
