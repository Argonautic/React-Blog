import React, { Component } from 'react/';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions/index';

class PostsShow extends Component {
    componentDidMount() {
        // if statement prevents refetching posts if already fetched. Trade off
        // is that if a user has been sitting on stale data for a long time, the
        // new data they get could be way outdated
        if (!this.props.post) {
            const { id } = this.props.match.params;
            this.props.fetchPost(id);
        }
    }

    onDeleteClick() {
        const { id } = this.props.match.params;

        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { post } = this.props;

        // ensure that the website loads as: component mounts -> calls fetchPost
        // and puts id of requested post in memory -> renders with the id
        // If done out of order (render only done once, before id is pulled from fetchPost),
        // no id will be in memory to render when render is called, and id will be assigned to undefined
        if (!post) {
            return <div>Loading...</div>;
        }

        return(
            <div>
                <Link to="/" className="btn btn-primary">Back to index</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                >
                    Delete Post
                </button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

// ownProps is the props object that is headed to our component PostsShow.
// In other words, this.props === ownProps
function mapStateToProps({ posts }, ownProps) {
    // get the id in the url that the user has requested. The namespace
    // id comes from our Route element in src\index.js that contains :id.
    // This return will return only the post htat matches that id, instead
    // of a list of all posts
    return { post: posts[ownProps.match.params.id]};
    //equal to post: posts[this.props.match.params.id
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
