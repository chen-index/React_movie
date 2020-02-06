import React from 'react';
import {Layout, Menu, Icon, Spin, Alert} from 'antd';
import {Link, Route, Switch} from 'react-router-dom'
import Accompaniment from './accompaniment/accompaniment.jsx'
import Works from './works/works.jsx'
import Album from './album/album.jsx'

import { loadPostsAction } from '../../actions/get_musics_actions.js'

import fetchJSONP from 'fetch-jsonp'

import styles from '../../css/home.module.scss'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      musics: [],
      // nowPage: parseInt(props.match.params.page) || 1,
      // nowPage: 2,
      // pageSize: 12,
      total: 0,
      isloading: true,
      movieType: props.match.params.type,
      time: Date.now()
    }
    // this.state = store.getState();
  }

  componentWillMount() {
    // this.props.dispatch(loadPostsAction)
    this.getMusicList()
  }

  getMusicList = async () => {
    // const start = this.state.pageSize*(this.state.nowPage-1)

    const url = `http://node.kg.qq.com/cgi/fcgi-bin/kg_ugc_get_homepage?type=get_uinfo&start=1&num=8&share_uid=669f9f8320283283`

      let promise = await fetchJSONP(url, {
          jsonpCallbackFunction: 'MusicJsonCallback'
        })
      ;
      let dataS = promise.json();
      dataS.then(data => {
        console.log(data);
        this.setState({
          musics: data.data,
          total: data.ugc_total_count,
          isloading: false
        })
      })
    // fetchJSONP(url)
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data)
    //     this.setState({
    //       isloading: false,
    //       Musics: data,
    //       total: data.total
    //     })
    //   })
  }

  render() {
    // console.log(this.state)
    return (
      <Layout style={{ height:'100%'}}>
        {this.renderList()}
      </Layout>
    )
  }

  renderList = () => {
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />
    if (this.state.isloading) {
      return <div style={{height:'100%'}}>
        <div style={{height:'40%'}}></div>
        <Spin indicator={antIcon} tip="Loading..." size='large'>
          <Alert
            style={{display:'none'}}
            message=""
            description="精彩内容，马上呈现..."
            type="info"
          />
        </Spin>
      </div>
    } else {
      return <Layout>
        <Content style={{backgroundColor:'white'}}>
          <div style={{backgroundColor:'#eee'}}>
            <div style={{textAlign:'center'}}>
              <img style={{}} src={require('../../img/logo_seo.png')} alt=""/>
            </div>
          </div>
          <div className={styles.my_show}>
            <div className={styles.my_show__con}>
              <div className={styles.my_show__photo}>
                <img className={styles.my_show_img} src={this.state.musics.head_img_url} alt=""/>
              </div>
              <div className={styles.my_show__user}>
              <span className={styles.my_show__name}>
                <img src={require('../../img/e400109@2x.gif')} style={{width:24,height:24}} alt=""/>
              </span>
                <span>LV{this.state.musics.level}</span>
              </div>
              <div className={styles.my_show__info}>
                <span style={{marginRight:10}}>{this.state.musics.levelname}</span>
                <span>{this.state.musics.age} 岁 湖南衡阳</span>
              </div>
              <div className={styles.my_show__info}>
                <span style={{marginRight:10}}>粉丝{this.state.musics.follower}</span>
                <span>关注{this.state.musics.following}</span>
              </div>
            </div>
          </div>
          <div style={{width:'100%'}}>
            <Menu style={{display:"flex",justifyContent:'space-around'}} selectedKeys={['works']} mode="horizontal">
              <Menu.Item key="works">
                <Link to='/home/works/1'>作品</Link>
              </Menu.Item>
              <Menu.Item key="album" disabled>
                <Link to='/home/album/1'>专辑</Link>
              </Menu.Item>
              <Menu.Item key="accompaniment" disabled>
                <Link to='/home/accompaniment/1'>伴奏</Link>
              </Menu.Item>
            </Menu>
          </div>

          <Switch>
            <Route path='/home/works/:page' component={Works}></Route>
            <Route path='/home/album/:page' component={Album}></Route>
            <Route path='/home/accompaniment/:page' component={Accompaniment}></Route>
          </Switch>
          {/*<Switch>*/}
          {/*  <Route exact path='/movie/detail/:id' component={MovieDetail}></Route>*/}
          {/*  <Route exact path='/movie/:type/:page' component={MovieList}></Route>*/}
          {/*</Switch>*/}
        </Content>
      </Layout>

    }
  }
}
// const mapStateToProps = (state, ownProps) => {
//   return {
//     post: state.post
//   }
// }
//
// export default connect(mapStateToProps)(Home);
