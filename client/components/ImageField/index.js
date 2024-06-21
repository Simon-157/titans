import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import round from 'lodash/round';
import set from 'lodash/set';
import { DIV, NAME, POINTER } from 'defaults';
import CropDialog from './CropDialog';
import FileUpload from './FileUpload';
import styles from './css/styles.css';

const allowedTypes = [
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
];

class ImageField extends Component {
  static displayName = 'ImageField'

  static propTypes = {
    className: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onCrop: PropTypes.func,
    onDrop: PropTypes.func,
  }

  static defaultProps = {
    height: 400,
    width: 600,
  }

  constructor(props) {
    super(props);

    const { value } = props;

    this.state = {
      file: null,
      isOpen: false,
      url: null,
    };

    if (value) {
      if (value instanceof Blob) {
        this.state.file = value;
        this.state.isOpen = true;
        this.state.url = URL.createObjectURL(value);
      } else if (isString(value)) {
        this.state.url = value;
      }
    }
  }

  componentWillReceiveProps(newProps) {
    const { value } = newProps;

    if ((value === null || typeof value === 'string') && value !== this.state.url) {
      this.state.url = value;
    }
  }

  closeCrop = () => {
    this.setState({
      isOpen: false,
    });
  }

  onCrop = (canvasScaled) => {
    const { onCrop } = this.props;

    const { file } = this.state;

    canvasScaled.toBlob((blob) => {
      const { name } = file;

      set(blob, [NAME], name);
      // set(blob, [TYPE], type);

      this.setState({
        isOpen: false,
        url: URL.createObjectURL(blob),
      });

      if (isFunction(onCrop)) {
        onCrop(blob);
      }
    });
  }

  onDrop = (file) => {
    const { onDrop } = this.props;

    if (file) {
      const { type } = file;

      if (allowedTypes.indexOf(type) === -1) {
        return;
      }
    }

    this.setState({
      file,
      isOpen: Boolean(file),
      url: file ? URL.createObjectURL(file) : null,
    });

    if (isFunction(onDrop)) {
      onDrop(file);
    }
  }

  cancel = () => {
    const { onDrop } = this.props;

    this.setState({
      file: null,
      url: null,
    });

    if (isFunction(onDrop)) {
      onDrop(null);
    }
  }

  render() {
    const { className, height, width } = this.props;

    const { file, isOpen, url } = this.state;

    let Comp;

    const props = {};
    if (className) {
      Comp = DIV;
      props.className = className;
    } else {
      Comp = Fragment;
    }

    return (
      <Comp {...props}>

        {url ? (
          <div
            className={styles.img}
            style={{
              backgroundImage: `url("${url}")`,
              paddingTop: `${round((height / width) * 100, 2)}%`,
            }}
          >
            <div
              className={cx(styles.cancel, POINTER)}
              onClick={this.cancel}
            />
          </div>
        ) : (
          <FileUpload onDrop={this.onDrop} />
        )}

        {isOpen && width && height && (
          <CropDialog
            className={styles.crop}
            height={height}
            image={file}
            open={isOpen}
            width={width}
            cancel={this.closeCrop}
            submit={this.onCrop}
          />
        )}

      </Comp>
    );
  }
}

export default ImageField;
