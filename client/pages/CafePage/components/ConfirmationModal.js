import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "../css/confirmmodal.css";
import { CIRCLE, FILLED, SECONDARY, TERTIARY } from "../../../../defaults";
import ModalWithHiddenCloseButton from "../../EventPage/components/ModalHighOrder";

export default class ConfirmationModal extends Component {
    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
        cafeDetails: PropTypes.object.isRequired,
    };

    copyToClipboard = () => {
        navigator.clipboard.writeText(this.props.cafeUrl).then(() => {
            alert("Event URL copied to clipboard!");
        });
    };

    render() {
        const { isOpen, onClose, cafeUrl } = this.props;

        if (!isOpen) {
            return null;
        }

        return (
            <ModalWithHiddenCloseButton onClose={onClose} className={styles.modal} wrapClassName={styles.wrap}>
                <div className={styles.socialShareModal}>
                    <button className={`${styles.closeButton} ${SECONDARY} ${CIRCLE}`} onClick={onClose} style={{ top: '10px', right: '10px', width: '40px', height: '40px', position: 'absolute', fontSize: '26px' }}><img src="/img/closeicon.svg" alt="Close" /></button>

                    <div className={styles.headerSection}>
                        <div>
                            <h1 className={styles.header}>Success!</h1>
                            <p>YOU HAVE JOINED</p>
                        </div>
                        <div>
                            <h2 >LEADERBOARD</h2>
                            <h3>FOR REIGN OF TITANS CAFÉ</h3>

                        </div>
                        <p >
                            Share With Friends
                        </p>

                    </div>
                    <div className={styles.icons}>
                        <button className={styles.iconButton}><img src="/img/discord-share.svg" alt="Discord" /></button>
                        <button className={styles.iconButton}><img src="/img/sms.png" alt="SMS" /></button>
                        <button className={styles.iconButton}><img src="/img/twitter.svg" alt="Twitter" /></button>
                        <button className={styles.iconButton}><img src="/img/whatsapp.svg" alt="WhatsApp" /></button>
                        <button className={styles.iconButton}><img src="/img/facebook.svg" alt="Facebook" /></button>
                    </div>
                    <div className={styles.urlSection}>
                            <span style={{marginTop:'12px', fontWeight:"bold"}}>COPYURL:</span>

                            <input type="text" value={cafeUrl} readOnly />
                            <button className={styles.copyButton} onClick={this.copyToClipboard}>
                                <img src="/img/copy.svg" alt="Copy" />
                            </button>
                    </div>
                </div>
            </ModalWithHiddenCloseButton>
        );
    }
}
