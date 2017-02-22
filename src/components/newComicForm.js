import React from 'react';
import { Field, reduxForm } from 'redux-form';

const NewComicForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group row">
        <label className="col-xs-2 col-form-label" htmlFor="name">name</label>
        <div className="col-xs-10">
          <Field className="form-control" name="name" component="input" type="text"/>
        </div>
      </div>
      <div className="form-group row">
        <label className="col-xs-2 col-form-label" htmlFor="url">url</label>
        <div className="col-xs-10">
          <Field className="form-control" name="url" component="input" type="text"/>
        </div>
      </div>
      <div className="form-group row">
        <label className="col-xs-2 col-form-label" htmlFor="comment">comment</label>
        <div className="col-xs-10">
          <Field className="form-control" name="comment" component="input" type="text"/>
        </div>
      </div>
      <button className="btn btn-primary" type="submit">Submit</button>
    </form>
  );
}

export default reduxForm({
  form: 'newComic' // a unique name for this form
})(NewComicForm);
