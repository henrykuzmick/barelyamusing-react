import React, { Component } from 'react'
import {Link} from 'react-router';

class Thumb extends Component {
  render() {
    if(this.props.comic !== null) {
      return(
        <Link to={`/comic/${this.props.comic.key}`} className="thumb">
          <div className="imghold">
            <img src={this.props.comic.url} alt={this.props.comic.name}/>
          </div>
          <h6>{this.props.heading}</h6>
        </Link>
      )
    } else {
      return(<div className="thumb"></div>);
    }
  }
}

export default Thumb;
