import React, {Component} from 'react';

import styles from '../../../css/workitem.module.scss'

class Workitem extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className={styles.container} onClick={this.goDetail}>
        <div className={styles.content_imgbox}>
          <img src={this.props.avatar} alt="" className={styles.img_avatar}/>
          <div className={styles.bf}>
            <img src={require('../../../img/u=3721795396,687977588&fm=26&gp=0.jpg')} alt=""/>
          </div>
        </div>
        <div className={styles.content}>
          <p className={styles.content_title}>
            <span className={styles.content_title_span_box}>
              <span className={styles.content_title_span_box_content}>{this.props.title}</span>
            </span>
          </p>
          <span className={styles.comment}>评论：<span>{this.props.coment_count}</span></span>
          <span className={styles.comment}>收听：<span>{this.props.gift_count}</span></span>
        </div>
      </div>
    );
  }

  goDetail = () => {
    // console.log(this.props.history)
    this.props.history.push('/workdetail/'+ this.props.shareid)
  }
}

export default Workitem;
