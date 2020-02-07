import React, {Component} from 'react';

import styles from '../../../css/workdetail.module.scss'
import fetchJSONP from "fetch-jsonp";

class WorkDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      music:[],
      isloading: false,
      lwb:[],
      comments: []
    }
  }

  componentWillMount() {
    this.getMusicList()
  }

  getMusicList = async () => {
    const id = this.props.match.params.id
    // console.log(this.props.match)
    const url = `http://cgi.kg.qq.com/fcgi-bin/kg_ugc_getdetail?inCharset=GB2312&outCharset=utf-8&v=4&shareid=${id}`

    let promise = await fetchJSONP(url, {
        jsonpCallbackFunction: 'MusicJsonCallback'
      })
    ;
    let dataS = promise.json();
    dataS.then(data => {
      // console.log(data);
      this.setState({
        music: data.data,
        isloading: false,
        lwb: data.data.flower,
        comments: data.data.comments
      })
    })
  }

  render() {
    return (
      <div>
        <div className={styles.mod_content}>
          {/*  用户作品*/}
          <h2 className={styles.play_name}>{this.state.music.song_name}</h2>
          <div className={styles.play_show}>
            <div className={styles.play_info}>
              <div className={styles.play_swf}>
                <img style={{winth: '100%', height: '100%'}} src={this.state.music.cover} alt=""/>
              </div>
            </div>
          </div>
          <audio controls
                 src={`https://node.kg.qq.com/cgi/fcgi-bin/fcg_get_play_url?shareid=${this.props.match.params.id}`}
                 preload={'none'}></audio>
        </div>
        <div className={styles.mod_sidebar}>
          {/*  用户信息*/}
          <div className={styles.singer_show}>
            <div className={styles.singer_con}>
              <div className={styles.singer_person}>
                <span className={styles.singer_img}>
                  <img src={this.state.music.avatar} alt=""/>
                </span>
                <div className={styles.singer_user}>
                  <span className={styles.singer_user__name}>
                    <img src={require('../../../img/e400109@2x.gif')} style={{width:'16px',height:'16px'}} alt=""/>
                  </span>
                  <p className={styles.singer_user__info}>
                    收听{this.state.music.play_num} 评论{this.state.music.total} 得分{this.state.music.score}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.singer_say}>
              <p className={styles.singer_say__cut}>{this.state.music.content}</p>
            </div>
            <div className={styles.singer_time}>时间：{this.state.music.ctime} {this.state.music.tail_name}</div>
            <div className={styles.singer_more}>
              <p className={styles.singer_user__info}></p>
            </div>
          </div>
          {/*  大塞信息*/}
          <div></div>
          <div className={styles.play_gift}>
            <div className={styles.mod_title}>
              <h4 className={styles.mod_title__name}>礼物榜</h4>
              <div className={styles.mod_title__info}>累计： k币：{this.state.music.gift_num} 鲜花：{this.state.music.play_num}</div>
            </div>
            <div className={styles.play_gift__rank}>
              <ul className={styles.play_rank__list} key={this.state.lwb.uid}>
                {this.state.lwb.map(item => {
                  return <li key={item.uid} className={styles.play_rank__item}>
                    <span className={styles.play_rank__img}>
                      <img className={styles.lazyload_img} src={item.avatar} alt=""/>
                    </span>
                    <p className={styles.play_rank__count}>{item.num}{item.type === 0 ? 'K币' : '鲜花'}</p>
                  </li>
                })}
              </ul>
            </div>
          </div>
          {/* 评论*/}
          <div className={styles.mod_comment}>
            <div className={styles.mod_title}>
              <h2 className={styles.mod_title__name}>
                <span className={styles.mod_title__bar}>评论</span>
                <span className={styles.mod_title__info}>33</span>
              </h2>
            </div>
            <div className={styles.mod_comment__show}>
              <ul className={styles.mod_comment__list} key={this.state.comments.comment_id}>
                {this.state.comments.map(item => {
                  return <li key={item.comment_id} className={styles.mod_comment__item}>
                    <span className={styles.mod_comment__img}>
                      <img className={styles.lazyload_img} src={item.avatar} alt=""/>
                    </span>
                    <div className={styles.mod_comment__con}>
                      <span className={styles.mod_comment__name}>{item.nick}</span>
                      <span className={styles.mod_comment__time}>{item.ctime}</span>
                      <p className={styles.mod_comment__info}>{item.content}</p>
                    </div>
                  </li>
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WorkDetail;
