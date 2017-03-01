import React, { Component } from 'react'
import {Link} from 'react-router';

class Thumb extends Component {
  render() {
    if(this.props.comic !== null) {
      return(
        <Link to={`/comic/${this.props.comic.url}`} className={`thumb ${this.props.long && 'thumb-long'}`}>
          <img src={this.props.long ? this.props.comic.long : this.props.comic.thumb} alt={this.props.comic.name}/>
          <h6>{this.props.heading}</h6>
        </Link>
      )
    } else {
      return(<div className="thumb"></div>);
    }
  }
}

export default Thumb;
