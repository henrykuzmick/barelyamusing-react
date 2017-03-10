import React, { Component } from 'react';
import { connect } from 'react-redux';
import Thumb from './thumb';
import { getRandomArrayElements } from "../common.js"

class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.renderLatest = this.renderLatest.bind(this)
    this.renderFavorites = this.renderFavorites.bind(this)
    this.renderRandom = this.renderRandom.bind(this)
  }

  componentDidMount() {
    FB.XFBML.parse();
  }


  renderLatest() {
    const numOfLatestComics = 3;
    return(
      this.props.comics
      .map((comic, i) => {
        if(i < numOfLatestComics) {
          return <Thumb fullwidth={true} long={true} key={comic.key} comic={ comic } />
        }
        return null;
      })
    )
  }

  renderFavorites() {
    return(
      this.props.comics
      .map((comic) => {
        if(comic.favorite) {
          return <Thumb fullwidth={true} long={true} key={comic.key} comic={ comic } />
        }
        return null;
      })
    )
  }

  renderRandom() {
    if(this.props.comics.length != 0) {
      const randomComics = getRandomArrayElements(this.props.comics, 6)
      return(
        randomComics
        .map((comic) => {
          return (
            <div className="col-md-4 p5">
              <Thumb fullwidth={true} key={comic.key} comic={ comic } />
            </div>
          )
        })
      )
    }
  }



  render() {
    return(
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-md-8">
            <h1>Latest</h1>
            { this.renderLatest() }
            <br />
            <h1>Random</h1>
            { this.renderRandom() }

          </div>
          <div className="col-xs-12 col-md-4 lp0">
            <h1>Social</h1>
            <div className="fb-page" data-href="https://www.facebook.com/barelyamusing/" data-small-header="false" data-width="312" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/barelyamusing/" className="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/barelyamusing/">Barely Amusing</a></blockquote></div>
            <h1>Favorites</h1>
            { this.renderFavorites() }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  comics : state.comics.list
});

export default connect(mapStateToProps)(Home);
