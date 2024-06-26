import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../css/socialshare.css';
import Modal from '../../../components/Modal';
import { CIRCLE, SECONDARY } from '../../../../defaults';

export default class SocialShareModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    eventUrl: PropTypes.string.isRequired,
  };

  copyToClipboard = () => {
    navigator.clipboard.writeText(this.props.eventUrl).then(() => {
      alert("Event URL copied to clipboard!");
    });
  };

  render() {
    const { isOpen, onClose, eventUrl } = this.props;

    if (!isOpen) {
      return null;
    }

    return (
      <Modal onClose={onClose} className={styles.modal} wrapClassName={styles.wrap}>
        <div className={styles.socialShareModal}>
          <button 
            className={`${styles.closeButton} ${SECONDARY} ${CIRCLE}`} 
            onClick={onClose} 
            style={{ top: '10px', right: '10px', width: '40px', height: '40px', position: 'absolute', fontSize: '26px' }}
          >
            &times;
          </button>
          <div className={styles.header}>
            Share With Friends
          </div>
          <div className={styles.icons}>
            <button className={styles.iconButton}><img src="/img/discord-share.svg" alt="Discord" /></button>
            <button className={styles.iconButton}><img src="/img/sms.png" alt="SMS" /></button>
            <button className={styles.iconButton}><img src="/img/twitter.svg" alt="Twitter" /></button>
            <button className={styles.iconButton}><img src="/img/whatsapp.svg" alt="WhatsApp" /></button>
            <button className={styles.iconButton}><img src="/img/facebook.svg" alt="Facebook" /></button>
          </div>
          <div className={styles.urlSection}>
            <input type="text" value={eventUrl} readOnly />
            <button className={styles.copyButton} onClick={this.copyToClipboard}>
              <img src="/img/copy.svg" alt="Copy" />
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}
