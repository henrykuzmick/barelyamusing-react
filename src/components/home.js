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
    // FB.XFBML.parse();
    // twttr.widgets.load();
  }


  renderLatest() {
    const numOfLatestComics = 3;
    return(
      this.props.comics
      .map((comic, i) => {
        if(i < numOfLatestComics) {
          return <Thumb frame={true} fullwidth={true} long={true} key={`new-${comic.key}`} comic={ comic } />
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
          return (
            <div className="col-xs-6 col-sm-6 p5" key={`fav-${comic.key}`}>
              <Thumb frame={true} fullwidth={true} comic={ comic } />
            </div>
          )
        }
        return null;
      })
    )
  }

  renderRandom() {
    if(this.props.comics.length != 0) {
      const randomComics = getRandomArrayElements(this.props.comics, 8)
      return(
        randomComics
        .map((comic) => {
          return (
            <div className="col-xs-6 col-sm-3 p5" key={`rand-${comic.key}`} >
              <Thumb frame={true} fullwidth={true} comic={ comic } />
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
            <br /><br />
            <a href="https://twitter.com/BarelyAmusing" data-size="large" className="twitter-follow-button" data-show-count="false">Follow @BarelyAmusing</a><script async src="//platform.twitter.com/widgets.js" charSet="utf-8"></script>
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
