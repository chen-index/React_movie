import React, {Component} from 'react';
import fetchJSONP from "fetch-jsonp";
import WorkItem from "./workitem";
import {Pagination} from "antd";
import PropTypes from 'prop-types'

class Works extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musics: [],
      total: 0,
      isloading: false,
      nowPage:parseInt(props.match.params.page) || 1,
      pageSize:8
    }
  }

  static contextTypes ={
    search: PropTypes.string
  }

  componentWillMount() {
    this.getMusicList()
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      isloading: true,
      nowPage: parseInt(nextProps.match.params.page) || 1,
      // total: 0
    },function () {
      this.getMusicList()
    })
  }

  getMusicList = async () => {
    const uid =  this.props.match.params.uid
    const start = this.state.nowPage || 1

    const url = `http://node.kg.qq.com/cgi/fcgi-bin/kg_ugc_get_homepage?type=get_uinfo&start=${start}&num=8&share_uid=${uid}`

    let promise = await fetchJSONP(url, {
        jsonpCallbackFunction: 'MusicJsonCallback'
      })
    ;
    let dataS = promise.json();
    dataS.then(data => {
      // console.log(data);
      this.setState({
        musics: data.data.ugclist,
        total: data.data.ugc_total_count,
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
    // const uid = this.props.match.params.uid
    // const params = this.props.match.params
    // console.log(uid)
    // console.log(params)
    return (
      <div>
        {this.renderList()}
      </div>
    );
  }

  renderList = () => {
    return <div>
      <div style={{display:'flex',flexWrap:'wrap'}}>
        {this.state.musics.map(item => {
          return <WorkItem {...item} key={item.shareid} history={this.props.history}></WorkItem>
        })}
      </div>
      {/*分页*/}
      <Pagination style={{display:"inline-block",margin:'70px 0',marginLeft:'35%'}} onChange={this.pageChanged} current={this.state.nowPage} pageSize={this.state.pageSize} total={this.state.total} />
    </div>
  }

  // 页码改变加载新数据
  pageChanged = (page) => {
    // window.location.href = '/#/movie/'+ this.state.movieType + '/' + page
    this.props.history.push('/home/works/' + page + '/' + this.props.match.params.uid)
  }
}

export default Works;
