import React from 'react';

import styles from '../../css/about.module.scss'

export default class About extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div style={{height:'100%'}}>
        <img className={styles.img} src={require('../../img/ec24565b5db616984639e4eca8b0ad4f.jpg')} alt=""/>
      </div>
    )
  }
}
