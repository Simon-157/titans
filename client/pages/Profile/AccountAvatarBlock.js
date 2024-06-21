import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import get from 'lodash/get';
import {
  BUTTON,
  EDIT_USER,
  FILE_UPLOAD,
  ICON,
  POST,
  PROFILE_PICTURE,
  SAVE,
  SECONDARY,
} from 'defaults';
import { executeHttpRequest } from 'client/request';
import ImageField from 'components/ImageField';
import Modal from 'components/Modal';
import { addError as addErrorAction } from 'reducers/global/actions';
import { setCurrentUser as setCurrentUserAction } from 'reducers/user/actions';
import styles from './css/account.css';

class AccountAvatarBlock extends Component {
  static displayName = 'AccountAvatarBlock'

  static propTypes = {
    user: PropTypes.object,
    addError: PropTypes.func,
    setCurrentUser: PropTypes.func,
    t: PropTypes.func,
  }

  state = {}

  toggleModal = () => {
    const { showModal } = this.state;

    this.setState({
      file: null,
      showModal: !showModal,
    });
  }

  onDrop = (file) => {
    this.setState({
      file,
    });
  }

  save = () => {
    const { file } = this.state;

    if (!file) {
      return;
    }

    this.uploadPicture(file);
  }

  uploadPicture = (blob) => {
    if (this.uploading) {
      return;
    }

    this.uploading = true;

    this.upload(blob);
  }

  upload = (file) => {
    if (file.size > 8 * 1024 * 1024) {
      const { addError, t } = this.props;

      addError(t('stories.form.errPictureTooBig'));

      this.uploading = false;

      return;
    }

    executeHttpRequest(POST, FILE_UPLOAD, file, this.cb);

    this.toggleModal();
  }

  cb = (err, profilePicture) => {
    this.uploading = false;

    if (err) {
      return;
    }

    const { user, setCurrentUser } = this.props;

    setCurrentUser({
      ...user,
      profilePicture,
    });

    executeHttpRequest(POST, EDIT_USER, {
      profilePicture,
    });
  }

  render() {
    const { user, t } = this.props;

    const { file, showModal } = this.state;

    const profilePicture = get(user, [PROFILE_PICTURE]) || '/img/user-icon.png';

    return (
      <div className={styles.avatarBlock}>

        <div
          className={styles.avatar}
          style={{
            backgroundImage: `url('${profilePicture}')`,
          }}
        />

        <div className={styles.camera} onClick={this.toggleModal}>
          <img src={'/img/profile/camera.svg'} alt={ICON} />
        </div>

        {showModal && (
          <Modal
            className={styles.modal}
            wrapClassName={styles.modalWrap}
            onClose={this.toggleModal}
          >

            <ImageField
              className={styles.upload}
              width={256}
              height={256}
              onDrop={this.onDrop}
              onCrop={this.onCrop}
            />

            {file && (
              <button
                className={cx(SECONDARY, styles.btn)}
                type={BUTTON}
                onClick={this.save}
              >
                {t([SAVE])}
              </button>
            )}

          </Modal>
        )}

      </div>
    );
  }
}

export default connect(null, {
  addError: addErrorAction,
  setCurrentUser: setCurrentUserAction,
})(AccountAvatarBlock);
