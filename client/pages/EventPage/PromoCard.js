import React, { Component } from "react";
import styles from "./css/styles.css";
import CustomButton from "./CustomButton";
import { LOGO, PRIMARY, SECONDARY, TERTIARY } from "defaults";
import SocialShare from "./components/SocialShare";
import RegisterModal from "./components/RegisterForm";
import SocialShareModal from "./components/SocialShareModal";


class PromoCard extends Component {
  state = {

    isRegisterModalOpen: false,
    isSocialShareModalOpen: false,
    eventUrl: window.location.href

  };


  toggleSocialShareModal = () => {
    this.setState((prevState) => ({
      isSocialShareModalOpen: !prevState.isSocialShareModalOpen,
    }));
  };

  toggleRegisterModal = () => {
    this.setState((prevState) => ({
      isRegisterModalOpen: !prevState.isRegisterModalOpen,
    }));
  };

  
  render() {
    const { isRegisterModalOpen, isSocialShareModalOpen, eventUrl } = this.state;
    return (

      <div className={styles.promoSectionWrapper}>
        <div className={styles.promoSection}>
          <p>
            <b>Absolutely free </b>. Join us for must-see esport competitions at
            your local bars.
          </p>

          <div className={styles.joinShareButtons}>
            <button
              onClick={this.toggleRegisterModal}
              className={PRIMARY}
              style={{
                width: "75%",
                height: "50px",
                fontSize: "1em",
                fontWeight: "bold",
              }}
            >
              JOIN EVENT
            </button>

            <button
              className={TERTIARY}
              onClick={this.toggleSocialShareModal}
              style={{
                width: "75%",
                height: "50px",
                fontSize: "1em",
                fontWeight: "bold",
              }}
            >
              <img src="/img/tabler_share.svg"  alt="Share" />
              SHARE
            </button>

          </div>

          <div className={styles.promoContent}>
            <img
              src="/img/spar.png"
              alt="Promo"
              className={styles.promoImage}
            />
            <p className={styles.promoDescription}>
              <b>Free LEGION NOTEBOOK Giveaway:</b> Faucibus at et nulla ipsum, lorem
              et. Nullam adipiscing maecenas quis amet. Cum id leo, suspendisse
              nec, et, aliquet. Enim non fringilla nam sit tristique diam,
              nullam eget. Molestie vitae cursus justo.
            </p>
            <p className={styles.promoNote}>
              Join this event to unlock a QR code to claim your promo prize.
            </p>
          </div>
        </div>
        <RegisterModal isOpen={isRegisterModalOpen} onClose={this.toggleRegisterModal} />
        <SocialShareModal
          isOpen={isSocialShareModalOpen}
          onClose={this.toggleSocialShareModal}
          eventUrl={eventUrl}
        />

      </div>
    );
  }
}

export default PromoCard;
