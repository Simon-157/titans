import React, { Component } from "react";
import styles from "./css/styles.css";
import CustomButton from "./CustomButton";
import { LOGO, PRIMARY, SECONDARY, TERTIARY } from "defaults";
import SocialShare from "./components/SocialShare";


class PromoCard extends Component {
   state = {
    showSocialShare: true,
  };

  toggleSocialShare = () => {
    this.setState((prevState) => ({
      showSocialShare: !prevState.showSocialShare,
    }));
  };

  handleJoinClick = () => {
    console.log('Join Event clicked');
  };

  render() {
    return (
      
      <div className={styles.promoSectionWrapper}>
        <div className={styles.promoSection}>
          <p>
            <b>Absolutely free </b>. Join us for must-see esport competitions at
            your local bars.
          </p>

          <div className={styles.joinShareButtons}>
            <button
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
          

              <SocialShare
                className="shareWrapper"
                text="Check out this awesome article!"
                url={window.location.href}
                right={true}
                t={(text) => text.join(' ')}
              >
                Share
              </SocialShare>

            
          </div>
          {this.showSocialShare && (
          <SocialShare
            className=""
            text="Check this out!"
            url={window.location.href}
            right={true}
            t={(key) => key}
          />
        )}
          <div className={styles.promoContent}>
            <img
              src="/img/spar.png"
              alt="Promo"
              className={styles.promoImage}
            />
            <p className={styles.promoDescription}>
              Free LEGION NOTEBOOK Giveaway: Faucibus at et nulla ipsum, lorem
              et. Nullam adipiscing maecenas quis amet. Cum id leo, suspendisse
              nec, et, aliquet. Enim non fringilla nam sit tristique diam,
              nullam eget. Molestie vitae cursus justo.
            </p>
            <p className={styles.promoNote}>
              Join this event to unlock a QR code to claim your promo prize.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default PromoCard;
