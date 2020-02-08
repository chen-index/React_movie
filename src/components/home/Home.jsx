import React from 'react';
import {Layout, Menu, Icon, Spin, Alert, Input, Tag, Tooltip } from 'antd';
import {Link, Route, Switch} from 'react-router-dom'
import Accompaniment from './accompaniment/accompaniment.jsx'
import Works from './works/works.jsx'
import Album from './album/album.jsx'
// import PropTypes from 'prop-types'

import fetchJSONP from 'fetch-jsonp'

import styles from '../../css/home.module.scss'

const {  Content } = Layout;
const { Search } = Input;

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
      time: Date.now(),
      search: 'https://kg.qq.com/node/personal?uid=669f9f8320283283',
      searchuid: ''
    }
    // this.state = store.getState();
  }

  // static childContextTypes = {
  //   search: PropTypes.string
  // }
  // getChildContext() {
  //   return {
  //     search: this.state.search
  //   }
  // }

  componentWillMount() {
    // this.props.dispatch(loadPostsAction)
    this.getMusicList()
  }

  getMusicList = async () => {
    // const start = this.state.pageSize*(this.state.nowPage-1)
    const searchurl = this.state.search
    const str = searchurl.split('=')
    // const url = `http://node.kg.qq.com/cgi/fcgi-bin/kg_ugc_get_homepage?type=get_uinfo&start=1&num=8&share_uid=669f9f8320283283`
    const url = `http://node.kg.qq.com/cgi/fcgi-bin/kg_ugc_get_homepage?type=get_uinfo&start=1&num=8&share_uid=${str[1]}`

    let promise = await fetchJSONP(url, {
          jsonpCallbackFunction: 'MusicJsonCallback'
        })
      ;
      let dataS = promise.json();
      dataS.then(data => {
        // console.log(data);
        this.setState({
          musics: data.data,
          total: data.ugc_total_count,
          isloading: false,
          searchuid: str[1]
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
    this.props.history.push('/home/works/1/'+ str[1])
  }

  getSearchMusic = async () => {
    const hash = window.location.hash.split('/')
    console.log(hash[4])

    const url = `http://node.kg.qq.com/cgi/fcgi-bin/kg_ugc_get_homepage?type=get_uinfo&start=1&num=8&share_uid=${hash[4]}`

    let promise = await fetchJSONP(url, {
        jsonpCallbackFunction: 'MusicJsonCallback'
      })
    ;
    let dataS = promise.json();
    dataS.then(data => {
      // console.log(data);
      this.setState({
        musics: data.data,
        total: data.ugc_total_count,
        isloading: false,
      })
    })
    // this.props.history.push('/home/works/1/'+ str[1])
    console.log(this.state)
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
            <div className={styles.kgetitle}>
              <div>
                <img style={{}} src={require('../../img/logo_seo.png')} alt=""/>
              </div>
              <div className={styles.inputbox}>
                <Search
                  placeholder="输入k歌主页地址"
                  onSearch={this.getMusicList}
                  className={styles.search}
                  onChange={(e) => this.Input(e)}
                />
                <div className={styles.tbtjbox}>
                  <Tag color="#f50">特别推荐地址</Tag>
                  <Tooltip trigger="click" placement="top" title={'https://kg.qq.com/node/personal?uid=639c948d272836823d'}>
                    <Tag color="magenta" onClick={this.verai} value={'sss'}>verai</Tag>
                  </Tooltip>
                  {/*<Tooltip placement="top" title={'ssss'}>*/}
                  {/*  <Tag color="cyan" onClick={this.me}>*/}
                  {/*    <img src={require('../../img/e400109@2x.gif')} style={{width:24,height:24}} alt=""/>*/}
                  {/*  </Tag>*/}
                  {/*</Tooltip>*/}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.my_show}>
            <div className={styles.my_show__con}>
              <div className={styles.my_show__photo}>
                <img className={styles.my_show_img} src={this.state.musics.head_img_url} alt=""/>
              </div>
              <div className={styles.my_show__user}>
                <span className={styles.my_show__name}>
                {this.state.musics.nickname}
                {/*<img src= style={{width:24,height:24}} alt=""/>*/}
                </span>
                <span className={styles.my_show__dj}>LV{this.state.musics.level}</span>
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
                <Link to={'/home/works/1/' + this.state.searchuid}>作品</Link>
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
            {/*<Route path='/home/works/:page' component={Works}></Route>*/}
            <Route path='/home/works/:page/:uid' component={Works}></Route>
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

  Input(e) {
    e.persist()
    // const value = e.target.value
    this.setState({
      search: e.target.value
    })
  }

  // me = () => {
  //   // this.props.history.push('/home/works/1/669f9f8320283283')
  //
  // }
  // verai = (e) => {
  //   console.log(e)
  //   // this.props.history.push('/home/works/1/639c948d272836823d')
  // }
}

// const mapStateToProps = (state, ownProps) => {
//   return {
//     post: state.post
//   }
// }
//
// export default connect(mapStateToProps)(Home);
