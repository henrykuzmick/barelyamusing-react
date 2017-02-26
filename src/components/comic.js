import React, { Component } from 'react'

class Comic extends Component {
  render() {
    if(this.props.comic !== null) {
      return(
        <div className="comicHolder">
          <h1>{this.props.comic.name}</h1>
          <img src={this.props.comic.url} alt={this.props.comic.name}/>
        </div>
      )
    } else {
      return(<div></div>);
    }
  }
}

export default Comic;
