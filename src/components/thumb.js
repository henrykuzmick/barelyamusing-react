import React, { Component } from 'react'
import {Link} from 'react-router';
import ImageLoader from 'react-imageloader';

class Thumb extends Component {
  render() {
    if(this.props.comic !== null) {
      return(
        <Link to={`/comic/${this.props.comic.url}`} className={`thumb ${this.props.fullwidth && 'thumb-fullwidth'} ${this.props.frame && 'thumb-frame'}`}>
          <div className="imghold">
            <ImageLoader
              src={this.props.long ? this.props.comic.long : this.props.comic.thumb}
              wrapper={React.DOM.div}>
            </ImageLoader>
          </div>
        </Link>
      )
    } else {
      return(<div className="thumb"></div>);
    }
  }
}

export default Thumb;
