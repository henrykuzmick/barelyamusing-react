import React, { Component } from 'react';
import Comic from './comic';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import Thumb from './thumb';
import _ from 'lodash';
import ReactDisqusThread from 'react-disqus-thread';

class ComicPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {}
    this.pushMetaTags = this.pushMetaTags.bind(this);
    this.getCurrentComic = this.getCurrentComic.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  resetState() {
    this.setState({currentComic: null, prevComic: null, nextComic: null})
  }


  componentWillMount() {
    this.getCurrentComic(this.props.comics, this.props.params.id)
  }

  getCurrentComic(list, id) {
    let nextComic = null
    let prevComic = null
    let currentComic = null
    list.find((c, i) => {
      if(c.url === id) {
        currentComic = c;
        if(i !== 0) {
          nextComic = list[i-1];
        }
        if(i+1 !== list.length) {
          prevComic = list[i+1];
        }
      }
    });
    this.setState({currentComic, prevComic, nextComic})
  }

  componentWillReceiveProps(nextProps) {
    this.resetState();
    if(this.props.comics != nextProps.comics | this.props.params.id != nextProps.params.id) {
      this.getCurrentComic(nextProps.comics, nextProps.params.id);
    }
  }

  pushMetaTags() {
    document.querySelector('meta[name="keywords"]').setAttribute("content", this.state.currentComic.tags);
    document.querySelector('meta[name="description"]').setAttribute("content", `A webcomic about stuff - ${this.state.currentComic.name}`);
    document.title = `Barely Amusing - ${this.state.currentComic.name}`;
  }


  renderDisqus() {

    var disqus_config = function () {
        this.page.url = `http://www.barelyamusing.com${this.props.location.pathname}`
        this.page.identifier = this.state.currentComic.key
    };
    var d = document, s = d.createElement('script');

    s.src = '//barelyamusing.disqus.com/embed.js';  // IMPORTANT: Replace EXAMPLE with your forum shortname!
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  }

  render() {
    if(this.state.currentComic) {
      this.pushMetaTags()
    }
    console.log(this.state.currentComic)
    return(
      <div className="comicPage">
        { this.state.currentComic &&
          <Comic comic={this.state.currentComic} / >
        }
        <div className="left">
          { this.state.prevComic &&
            <Thumb frame={true} comic={ this.state.prevComic } heading="Prev" />
          }
        </div>
        <div className="right">
          { this.state.nextComic &&
            <Thumb frame={true} comic={ this.state.nextComic } heading="Next" />
          }
        </div>
        <div className="bottom">
          { this.state.currentComic && this.state.currentComic.comment &&
            <div className="comment">
              <h4>Author's comment</h4>
              <p>{this.state.currentComic.comment}</p>
            </div>
          }
          <div id="disqus_thread"></div>
          { this.state.currentComic &&
            this.renderDisqus()
          }
        </div>
      </div>
    )
  }
}



const mapStateToProps = (state) => ({
  comics : state.comics.list
});

export default connect(mapStateToProps)(ComicPage);
