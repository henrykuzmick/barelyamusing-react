import React, { Component } from 'react';
import Comic from './comic';
import { connect } from 'react-redux';
import { getCurrentComic } from '../actions';
import {Link} from 'react-router';
import _ from 'lodash';

class ComicPage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  mapComics(list, id) {
    let prevkey = null;
    let currkey = null;
    let nextkey = null;
    let found = false;
    let done = false;
    if(list !== {}) {
      _.map(list, (comic, key) => {
        if(found && !done) {
          nextkey = key;
          done = true;
        }
        if(key === id) {
          currkey = key;
          found = true;
        } else if(!found) {
          prevkey = key;
        }
      })
      if(currkey) {
        return this.props.getCurrentComic(currkey, prevkey, nextkey)
      }
    }
    return false;
  }

  resetComic() {
    this.props.getCurrentComic(null, null, null)
  }

  componentWillMount() {
    this.resetComic();
    this.mapComics(this.props.comics, this.props.params.id);
  }


  componentWillReceiveProps(nextProps) {
    if(this.props.comics != nextProps.comics | this.props.params.id != nextProps.params.id) {
      this.resetComic();
      this.mapComics(nextProps.comics, nextProps.params.id);
    }
  }

  render() {
    return(
      <div>
        { this.props.currentComic &&
          <h1>{this.props.currentComic.name}</h1>
        }

        { this.props.prevComic &&
          <div>
            <Link to={`/comic/${this.props.prevComic.key}`}>Prev</Link>
          </div>
        }
        { this.props.nextComic &&
          <div>
            <Link to={`/comic/${this.props.nextComic.key}`}>Next</Link>
          </div>
        }
      </div>
    )
  }
}
// <Comic comic={this.props.currentComic} / >
// { this.props.nextComic !== null &&
//   <Link to={`/comic/${this.props.nextComic.key}`}>Next</Link>
// }
const mapStateToProps = (state) => ({
  comics : state.comics.list,
  currentComic: state.comics.current,
  prevComic: state.comics.prev,
  nextComic: state.comics.next
});

export default connect(mapStateToProps, { getCurrentComic })(ComicPage);
