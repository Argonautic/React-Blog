import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Link is router's version of a classic a tag in html
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {
    // state is updated automatically every time the component has Mounted
    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
        // use lodash map because posts is an object, not an array
        return _.map(this.props.posts, (post) => {
            return (
                <li key={post.id} className="list-group-item">
                    {post.title}
                </li>
            );
        });
    }

    render() {
        return (
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="/posts/new">
                        Add a Post
                    </Link>
                </div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex)