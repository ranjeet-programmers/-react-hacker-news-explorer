import React, {Component} from 'react';
import {connect} from "react-redux";
import moment from "moment";
import InfiniteScroll from 'react-infinite-scroll-component';

import {getPostsData} from "./redux/posts/PostActions";
import {Button, Modal} from "react-bootstrap";
import {debounce, get} from "lodash";

const dateRangeOptions = [
  {label: 'All', value: ''},
  {label: 'Last 24 Hours', value: 1586695702.275},
  {label: 'Past Week', value: 1586177335.023},
  {label: 'Past Month', value: 1584103752.7},
  {label: 'Past Year', value: 1555246167.325},
];

class App extends Component {

  interval;
  state = {
    show: false,
    selectedRecord: null,
    date: '',
    query: ''
  };

  componentDidMount() {
    this.getPosts();
    this.interval = setInterval(() => {
      this.getPosts();
    }, 10000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  getPosts = () => {
    let {page, query} = this.props.posts;
    const {date} = this.state;
    page = page + 1;
    this.props.doGetPosts(page, query, date, false);
  };

  onScroll = () => {
    this.getPosts();
  };

  selectRow = (post) => {
    this.setState({
      show: true,
      selectedRecord: post
    })
  };

  handleClose = () => {
    this.setState({
      show: false,
      selectedRecord: null,
    })
  };

  handleQueryChange = (e) => {
    const {value} = e.target;
    this.setState({query: value});
    this._debounceSearch(value);
  };

  handleDateChange = (e) => {
    const {value} = e.target;
    this.setState({
      date: value
    }, () => {
      const {query} = this.props.posts;
      const {date} = this.state;
      this.props.doGetPosts(0, query, date, true);
    });
  };

  _debounceSearch = debounce((value) => {
    let page = 0, query = value, dr = this.props.posts.dateRange;
    this.props.doGetPosts(page, query, dr, true);
  }, 1000);


  render() {
    const {posts} = this.props.posts;
    const {show, query, date, selectedRecord} = this.state;

    const infiniteScrollOptions = {
      dataLength: 1,
      next: this.onScroll,
      loader: `<h4>Please wait while we fetch new data</h4>`,
    };
    return (
        <div className={'container'}>
          <div className="row mt-2 mb-2">
            <div className="col-12">
              <h2>React Search List</h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-9">
              <div className="form-group">
                <label>Search</label>
                <input type="search" className="form-control" value={query} onChange={this.handleQueryChange}
                       placeholder="Search by title, URL and author name."/>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label>Records Duration</label>
                <select className="form-control" value={date} onChange={this.handleDateChange}>
                  {
                    dateRangeOptions.map((opt, idx) => <option key={idx} value={opt.value}>{opt.label}</option>)
                  }
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <InfiniteScroll {...infiniteScrollOptions}>
                <table className="table">
                  <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">URL</th>
                    <th scope="col">Created</th>
                    <th scope="col">Author</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    posts.map((post, index) => {
                      return (
                          <tr key={`${post.objectID}-${index + 1}`} className={'c-pointer'}
                              onClick={() => this.selectRow(post)}>
                            <td>{post.story_title}</td>
                            <td><a href={post.url} target={'_blank'}>{post.url}</a></td>
                            <td>{post.created_at && moment(post.created_at).format('DD MMM YYYY')}</td>
                            <td>{post.author}</td>
                          </tr>
                      )
                    })
                  }

                  </tbody>

                </table>
              </InfiniteScroll>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Modal show={show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>{get(selectedRecord, 'story_title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <pre>
                    {
                      JSON.stringify(selectedRecord, '', 4)
                    }
                  </pre>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
    );
  }
}

const MapStateToProps = (state) => {
  return {
    posts: state.posts
  }
};

const MapDispatchToProps = (dispatch) => {
  return {
    doGetPosts: (p, q, d, s) => dispatch(getPostsData(p, q, d, s))
  }
};

export default connect(MapStateToProps, MapDispatchToProps)(App);
