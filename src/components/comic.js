import React, { Component } from 'react'
import ImageLoader from 'react-imageloader';

class Comic extends Component {

  render() {
    if(this.props.comic !== null) {
      return(
        <div className="comicHolder">
          <h1>{this.props.comic.name}</h1>
          <ImageLoader
            src={this.props.comic.main}
            wrapper={React.DOM.div}>
            Image load failed!
          </ImageLoader>

        </div>
      )
    } else {
      return(<div></div>);
    }
  }
}

// <img src={this.props.comic.main} alt={`${this.props.comic.name} - ${this.props.comic.tags}`}/>

export default Comic;
