import React, { Component } from 'react';
import styles from './css/cafe_banner.css';
import { PRIMARY, SECONDARY } from '../../../defaults';


class CafeBannerCard extends Component {
    render() {
        return (
            <main className={styles.customCard}>
                <section className={styles.cardLeft}>
                    <section >
                        <div className={styles.location}>MUMBAI, INDIA</div>
                        <h1 className={styles.title}>REIGN OF TITANS CAFÉ</h1>
                        <div className={styles.rating}>
                            <span>★★★★★</span>
                            <span>5.0</span>
                        </div>
                        <p className={styles.description}>
                            The Asgard was designed in Ireland and local artists put the finishing touches on this truly one-of-a-kind bar. Two gigantic communal tables, sofas and chairs make the pub a comfortable and inviting place to watch the games for groups of any size.
                        </p>
                        <div className={styles.buttons}>
                            <button className={` ${PRIMARY} ${styles.joinButton}`}>JOIN REIGN OF TITANS LEADERBOARD</button>
                            <button className={`${SECONDARY} ${styles.actionButton}`}>EDIT</button>
                            <button className={`${SECONDARY} ${styles.actionButton}`}>STAFF</button>
                            <button className={`${SECONDARY} ${styles.actionButton}`}>DELETE</button>
                        </div>

                    </section>
                    <hr className={styles.divider} />
                    <section className={styles.info}>

                        <div className={styles.infoContainerColumnOne}>

                            <div className={styles.infoItem}>
                                <span className={styles.icon}>📍</span>
                                <span className={styles.text}>649.32 MILES AWAY</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.icon}>👥</span>
                                <span className={styles.text}>CAPACITY: 80</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.icon}>📍</span>
                                <div className={styles.schedule}>
                                    <p>MON: 5:00 PM – 11:30 PM</p>
                                    <p>TUE: 5:00 PM – 11:30 PM</p>
                                    <p>WED: 5:00 PM – 11:30 PM</p>
                                    <p>THU: 5:00 PM – 11:30 PM</p>
                                    <p>FRI: 12:00 PM – 1:00 AM</p>
                                    <p>SAT: 12:00 PM – 1:00 AM</p>
                                    <p>SUN: 12:00 PM – 10:30 PM</p>
                                </div>

                            </div>

                        </div>
                        <div className={styles.infoContainerColumnTwo}>
                            <div className={styles.infoItem}>
                                <span className={styles.icon}>📞</span>
                                <span className={styles.text}>+420 604 464 481</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.icon}>🌐</span>
                                <span className={styles.text}>HTTPS://WWW.ASGARD-BAR.COM/</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.icon}>📍</span>
                                <span className={styles.text}>90 FETTER LN, HOLBORN, PRAGUE EC4A 1JP, CZECH REPUBLIC</span>
                            </div>
                        </div>
                        <div className={styles.infoContainerColumnThree}>
                            <span>FOLLOW</span>
                            <div className={styles.socialIcons}>
                                <a href="#"><img src="/img/instagram.svg" alt="Instagram" /></a>
                                <a href="#"><img src="/img/twitter.svg" alt="Twitter" /></a>
                                <a href="#"><img src="/img/discord.svg" alt="Discord" /></a>
                            </div>
                        </div>
                    </section>
                </section>
                <section className={styles.cardRight}>
                    <img src="/img/cafebanner.png" alt="Titan" />
                </section>
            </main>
        );
    }
}



export default CafeBannerCard;
