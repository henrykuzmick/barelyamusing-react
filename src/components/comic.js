import React, { Component } from 'react'

class Comic extends Component {
  render() {
    if(this.props.comic !== null) {
      return(
        <div className="comicHolder">{this.props.comic.name}</div>
      )
    } else {
      return(<div></div>);
    }
  }
}

export default Comic;
