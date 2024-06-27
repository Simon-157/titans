import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "../css/confirmation_modal.css";
import Modal from "../../../components/Modal";
import { CIRCLE, FILLED, SECONDARY, TERTIARY } from "../../../../defaults";
import ModalWithHiddenCloseButton from "./ModalHighOrder";

export default class ConfirmationModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    eventDetails: PropTypes.object.isRequired,
  };

  render() {
    const { isOpen, onClose, eventDetails } = this.props;

    if (!isOpen) {
      return null;
    }

    return (
      <ModalWithHiddenCloseButton
        onClose={onClose}
        className={styles.modal}
        wrapClassName={styles.wrap}
      >
        <div className={styles.confirmationModal}>
          <div className={styles.closeButton}>
            <button
              className={`${SECONDARY} ${CIRCLE}`}
              onClick={onClose}
              style={{
                width: "45px",
                height: "45px",
                textAlign: "center",
                fontSize: "1.5em",
              }}
            >
              <img src="/img/closeicon.svg" alt="Close" />
            </button>
          </div>

          <div className={styles.header}>
            <h2>Congrats!</h2>
            <p>YOU HAVE JOINED</p>
            <h3>{eventDetails.title}</h3>
          </div>
          <div className={styles.details}>
            <div className={styles.detailItem}>
              <div class={styles.gradientClockIcon}></div>
              <div>
                <span>Start date | time</span>
                <p>{eventDetails.date}</p>
              </div>
            </div>
            <div className={styles.detailItem}>
              <div class={styles.gradientMarkerIcon}></div>
              <div>
                <span>Venue</span>
                <p>{eventDetails.venue}</p>
              </div>
            </div>
          </div>
          <div className={styles.qrCodeContainer}>
            <div className={styles.qrCode}>
              <img src="/img/qrcode.svg" alt="QR Code" />
              <p>{eventDetails.qrCode}</p>
            </div>
            <div className={styles.bottomSec}>
              <div className={styles.giveaway}>
                <p className={styles.promoDescription}>
                  <b>Free LEGION NOTEBOOK Giveaway:</b> Faucibus at et nulla
                  ipsum, lorem et. Nullam adipiscing maecenas quis amet.
                </p>
              </div>
              <div className={styles.download}>
                <button
                  className={`${TERTIARY}`}
                  style={{ width: "250px"}}
                >
                  DOWNLOAD
                </button>
              </div>
            </div>
          </div>
        </div>
      </ModalWithHiddenCloseButton>
    );
  }
}
