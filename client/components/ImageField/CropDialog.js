import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AvatarEditor from 'react-avatar-editor';
import i18n from 'lib/i18n';
import { CANCEL, SECONDARY, SUBMIT } from 'defaults';
import Slider from 'components/Slider';
import Modal from 'components/Modal';
import styles from './css/styles.css';

class CropDialog extends Component {
  static propTypes = {
    open: PropTypes.bool,
    image: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number,
    cancel: PropTypes.func,
    submit: PropTypes.func,
    t: PropTypes.func,
  }

  state = {
    scale: 1,
  }

  ref = (editor) => {
    this.editor = editor;
  }

  onScaleChange = (ev, value) => {
    this.setState({ scale: value });
  }

  onSubmit = () => {
    const { submit } = this.props;

    submit(this.editor.getImageScaledToCanvas());
  }

  render() {
    const { open } = this.props;

    if (!open) {
      return null;
    }

    const { cancel, image, width, height, t } = this.props;

    const { scale } = this.state;

    return (
      <Modal
        className={styles.modal}
        wrapClassName={styles.modalWrap}
        onClose={cancel}
      >
        <div className={styles.crop}>

          <AvatarEditor
            ref={this.ref}
            image={image}
            width={width}
            height={height}
            border={20}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={scale}
            style={{
              width: '100%',
              height: 'auto',
            }}
          />

          <Slider
            className={styles.slider}
            min={1}
            max={3}
            multiplier={100}
            value={scale}
            onChange={this.onScaleChange}
          />

          <div className={styles.btns}>

            <button className={SECONDARY} onClick={cancel}>
              {t([CANCEL])}
            </button>

            <button className={SECONDARY} onClick={this.onSubmit}>
              {t([SUBMIT])}
            </button>

          </div>

        </div>
      </Modal>
    );
  }
}

export default i18n(CropDialog);
