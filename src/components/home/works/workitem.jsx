import React, {Component} from 'react';

class Workitem extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div style={{textAlign: 'center',width:'25%'}} onClick={this.goDetail}>
        <img src={this.props.avatar} alt="" style={{width: 215, height: 215,cursor:'pointer'}}/>
        <div style={{paddingTop: 10}}>
          <p style={{fontSize: 12, margin: 0, padding: '5px 0'}}>
            <a href={'javascript:;'} style={{color: 'black'}}>
              <span style={{fontSize: '16px', lineHeight: '16px'}}>{this.props.title}</span>
            </a>
          </p>
          <span><span style={{fontSize: 14, marginRight: 10}}>{this.props.coment_count}</span></span>
          <span><span>{this.props.gift_count}</span></span>
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
