import React from 'react';
import fetchJSONP from 'fetch-jsonp'
import MovieItem from './MovieItem.jsx'

import { Spin, Alert, Pagination } from 'antd';

export default class MovieList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      nowPage: parseInt(props.match.params.page) || 1,
      // nowPage: 2,
      pageSize: 12,
      total: 0,
      isloading: true,
      movieType: props.match.params.type
    }
  }

  componentWillMount() {
    // fetch('http://vue.studyit.io/api/getlunbo')
    //   .then(response => {
    //     console.log(response)
    //     return response.json()
    //   })
    //   .then(data => {
    //     console.log(data)
    //   })

    // setTimeout(()=>{
    //     //   this.setState({
    //     //     isloading: false
    //     //   })
    //     // },1000)
    this.loadMovieListByTypeAndPage()
  }

  componentWillReceiveProps(nextProps, nextContext) {
    console.log(nextProps.match)
    this.setState({
      isloading: true,
      nowPage: parseInt(nextProps.match.params.page) || 1,
      movieType: nextProps.match.params.type,
      total: 0
    },function () {
      this.loadMovieListByTypeAndPage()
    })
  }

  render() {
    return <div>
        {this.renderList()}
      </div>
  }

  // 根据电影类型和page获取电影数据
  loadMovieListByTypeAndPage = () => {
    // fetch('http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a')
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data)
    //   })

    const start = this.state.pageSize*(this.state.nowPage-1)

    const url = `http://api.douban.com/v2/movie/${this.state.movieType}?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${start}&count=${this.state.pageSize}`

    fetchJSONP(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          isloading: false,
          movies: data.subjects,
          total: data.total
        })
      })

    // const data = require('../../'+this.state.movieType+'.json')
    // setTimeout(() => {
    //   this.setState({
    //     isloading: false,
    //     movies: data.subjects,
    //     total: data.total
    //   })
    // },1000)
  }

  renderList = () => {
    if (this.state.isloading) {
      return <Spin tip="Loading...">
        <Alert
          message="正在请求电影列表"
          description="精彩内容，马上呈现..."
          type="info"
        />
      </Spin>
    } else {
      return <div>
        <div style={{display:'flex',flexWrap:'wrap'}}>
          {this.state.movies.map(item => {
            return <MovieItem {...item} key={item.id} history={this.props.history}></MovieItem>
          })}
        </div>
        {/*分页*/}
        <Pagination onChange={this.pageChanged} defaultCurrent={this.state.nowPage} pageSize={this.state.pageSize} total={this.state.total} />
      </div>
    }
  }

  // 页码改变加载新数据
  pageChanged = (page) => {
    // window.location.href = '/#/movie/'+ this.state.movieType + '/' + page
    this.props.history.push('/movie/' + this.state.movieType + '/' + page)
  }

}
