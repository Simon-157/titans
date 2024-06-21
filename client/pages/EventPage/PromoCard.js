import React, { Component } from "react";
import styles from "./css/styles.css";
import CustomButton from "./CustomButton";
import { LOGO, PRIMARY, SECONDARY } from "defaults";

class PromoCard extends Component {
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
            {/* <button className={SECONDARY} style={{ width: "75%" , height: "50px", fontSize: "1em" , fontWeight: "bold" }} icon="/img/share.svg">
                    SHARE
                  </button> */}
            <CustomButton
              text="SHARE"
              onClick={this.handleShareClick}
              icon="/img/share.svg"
              width={"75%"}
            />
          </div>
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
