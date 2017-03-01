import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLatestComics } from '../actions';
import Thumb from './thumb';

class Home extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    // this.props.setCurrentComic();
    this.props.getLatestComics();

  }
  componentDidMount(){
    FB.XFBML.parse();
  }
  renderLatest() {
    return(
      _.map(this.props.latestComics, (comic) => {
        return <Thumb long={true} key={comic.key} comic={ comic } heading="latest" />
      })
    )
  }
  render() {
    console.log(this.props);
    return(
      <div>
        <div className="col-2">
          { this.renderLatest() }
        </div>
        <div className="col-1">
          <div className="fb-page" data-href="https://www.facebook.com/barelyamusing/"  data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/barelyamusing/" className="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/barelyamusing/">Barely Amusing</a></blockquote></div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  latestComics : state.comics.latest
});

export default connect(mapStateToProps, { getLatestComics })(Home);
