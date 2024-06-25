import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "../css/confirmation_modal.css";
import Modal from "../../../components/Modal";
import { FILLED, SECONDARY, TERTIARY } from "../../../../defaults";

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
            <Modal
                onClose={onClose}
                className={styles.modal}
                wrapClassName={styles.wrap}
            >
                <div className={styles.confirmationModal}>
                    <button className={styles.closeButton} onClick={onClose}>
                        &times;
                    </button>
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
                            <div>
                                <p>{eventDetails.giveaway}</p>
                            </div>
                            <div>
                                <button className={`${TERTIARY} ${FILLED}`} style={{ width: '250px' }}>DOWNLOAD</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}
