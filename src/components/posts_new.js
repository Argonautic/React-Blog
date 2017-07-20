import React, { Component } from 'react';
// Field is a React component automatically hooked up to redux-form. reduxForm
// is a function that is very similar to the connect function from react-redux.
// It also helps hook up a component to Redux state
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class PostsNew extends Component {
    renderField(field) {
        // pull off the touched and error fields from the meta object via field.meta
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        // {...field.input} means all the properties of field.input should be
        // communicated as props to the <input> tag. field.input contains a
        // lot of properties like onChange/onFocus/onBlur and also the value
        // of the field
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        console.log(values)
    }

    render() {
        // pull the constant handleSubmit via this.props.handleSubmit
        const { handleSubmit } = this.props;

        // handleSubmit takes a function we provide it (in this case onSubmit())
        // since onSubmit will be called outside of this component, it is bound
        // to this (hence this.onSubmit.bind(this))
        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title for Post"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        )
    }
}

// this is a lifecycle function. validate will be called anytime the user changes the
// state of a form. validate will be given the parameter 'values' automatically. values
// contains all the data the user has entered into the form.
function validate(values) {
    // console.log(values) -> { title: 'asdf', categories: 'fddf', 'content': 'bdgbgggt'}

    // Validate the inputs from 'values'. If errors is empty, the form is fine to submit.
    const errors = {};

    if (!values.title || values.title.length < 2) {
        errors.title = "Enter a title that is at least 2 characters"
    }
    if (!values.categories) {
        errors.categories = "Enter a category"
    }
    if (!values.content) {
        errors.content = "Enter some content"
    }

    // If errors has any properties, redux-form assumes form is invalid
    return errors;
}

// Very similar to the connect function from react-redux
export default reduxForm({
    // Make sure the string assigned to this form property is unique. The
    // property name form must always be form but the property value (in
    // this instance 'PostsNewForm') can be anything
    form: 'PostsNewForm',
    validate,
})(PostsNew);