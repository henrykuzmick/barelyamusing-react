import React, { Component } from 'react'
import {Link} from 'react-router';

class Thumb extends Component {
  render() {
    if(this.props.comic !== null) {
      return(
        <Link to={`/comic/${this.props.comic.url}`} className={`thumb ${this.props.fullwidth && 'thumb-fullwidth'}`}>
          <div className="imghold">
            <img src={this.props.long ? this.props.comic.long : this.props.comic.thumb} alt={this.props.comic.name}/>
          </div>
        </Link>
      )
    } else {
      return(<div className="thumb"></div>);
    }
  }
}

export default Thumb;
