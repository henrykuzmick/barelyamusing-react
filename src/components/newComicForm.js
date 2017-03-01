import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone';

const renderDropzoneInput = (field) => {
  const files = field.input.value;
  return (
    <div className="dropzoneHolder">
      <Dropzone
        name={field.name}
        onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
      >
      <p>{field.txt}</p>
      </Dropzone>
      {field.meta.touched &&
        field.meta.error &&
        <span className="error">{field.meta.error}</span>}
      {files && Array.isArray(files) && (
        <ul>
          { files.map((file, i) => <li key={i}>{file.name}</li>) }
        </ul>
      )}
    </div>
  );
}

class NewComicForm extends Component {
  constructor(props, context) {
    super(props, context);
    const { handleSubmit, pristine, reset, submitting } = this.props;
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className="form-group row">
          <label className="col-xs-2 col-form-label" htmlFor="name">name</label>
          <div className="col-xs-10">
            <Field className="form-control" name="name" component="input" type="text"/>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-xs-2 col-form-label" htmlFor="name">tags</label>
          <div className="col-xs-10">
            <Field className="form-control" name="tags" component="input" type="text"/>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-xs-2 col-form-label" htmlFor="comment">comment</label>
          <div className="col-xs-10">
            <Field className="form-control" name="comment" component="textarea" />
          </div>
        </div>
        <Field name="files" txt="Files" component={renderDropzoneInput} />
        <br />
        <button className={`btn btn-primary ${ this.props.uploading && 'disabled' }`} type="submit">{ this.props.uploading && <i className="fa fa-circle-o-notch fa-spin"></i> } Submit</button>
      </form>
    );
  }
}



export default reduxForm({
  form: 'newComic' // a unique name for this form
})(NewComicForm);
