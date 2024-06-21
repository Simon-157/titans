import React, { Component } from 'react';
import PropTypes from 'prop-types';
import first from 'lodash/first';
import map from 'lodash/map';
import reject from 'lodash/reject';
import {
  emptyFunc,
  emptyNullFunc,
  FILE,
  FILEPOND,
  GENERAL,
  ID,
  LABEL,
} from 'defaults';
import i18n from 'lib/i18n';
import styles from './css/styles.css';

let FilePond = emptyNullFunc;

class FileUpload extends Component {
  static displayName = 'FileUpload'

  static propTypes = {
    label: PropTypes.string,
    multi: PropTypes.bool,
    removeFile: PropTypes.bool,
    onDrop: PropTypes.func,
    t: PropTypes.func,
  }

  static defaultProps = {
    multi: false,
  }

  constructor(props) {
    super(props);

    if (FilePond === emptyNullFunc) {
      import('client/lib/filepond').then((m) => {
        FilePond = m.FilePond;

        this.forceUpdate();
      });
    }
  }

  state = {
    uploadedFiles: [],
  }

  componentWillReceiveProps(nextProps) { // eslint-disable-line
    if (nextProps.removeFile !== this.props.removeFile) {
      this.removeFile();
    }
  }

  onAddFile = (e, file) => {
    const { onDrop, multi } = this.props;

    const { uploadedFiles } = this.state;

    uploadedFiles.push(file);

    this.setState({
      uploadedFiles,
    });

    onDrop(multi ? map(uploadedFiles, FILE) : first(map(uploadedFiles, FILE)));
  }

  onRemoveFile = (file) => {
    const { onDrop, multi } = this.props;

    const { uploadedFiles } = this.state;

    const newUploadedFiles = reject(uploadedFiles, [ID, file.id]);

    this.setState({
      uploadedFiles: newUploadedFiles,
    });

    onDrop(multi ? map(newUploadedFiles, FILE) : first(map(newUploadedFiles, FILE)));
  }

  removeFile = () => {
    const { onDrop } = this.props;

    this.setState({
      uploadedFiles: [],
    });

    onDrop(null);
  }

  render() {
    const { label, multi, t } = this.props;

    return (
      <div className={styles.uploadWrap}>

        {label && (
          <div key={LABEL}>
            {label}
          </div>
        )}

        <FilePond
          allowMultiple={multi}
          labelIdle={t([GENERAL, FILEPOND])}
          maxFiles={multi ? 3 : 1}
          maxFileSize={'5MB'}
          oninit={emptyFunc}
          onaddfile={this.onAddFile}
          onremovefile={this.onRemoveFile}
          allowFileTypeValidation
        />

      </div>
    );
  }
}

export default i18n(FileUpload);
