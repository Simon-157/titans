import React, { Component } from "react";
import styles from "./css/styles.css";
import PromoCard from "./PromoCard";
import { SECONDARY, TERTIARY } from "../../../defaults";
import GoogleMaps from "../../components/GoogleMaps";

class EventDetails extends Component {
    render() {
        const { id, title, location, date, description, time, details, image } =
            this.props.event;

        return (
            <div className={styles.detailsWrapper}>
                <button
                    className={SECONDARY} style={{ height: '40px',fontSize: '1em' , padding: '25px' }}
                    onClick={() => this.props.history.goBack()}
                >
                  <span><img src="/img/back.png" alt="back" /></span>{`BACK`}
                </button>
                <div className={styles.eventDetails}>
                    <div className={styles.eventMain}>
                        <div className={styles.eventBanner}>
                            <img src={image} alt="Event Banner" />
                        </div>
                        <div className={styles.eventInfo}>
                            <h3>REIGN OF TITANS</h3>
                            <h2>{title}</h2>
                            <p style={{ fontSize: "1.1em", marginBottom: "50px" }}>{description}</p>
                            <div className={styles.eventDetails__info}>
                                <div className={styles.infoItem}>
                                    <div>
                                        <img
                                            src="/img/clockSimple.svg"
                                            alt="date"
                                            className={styles.icon}
                                        />
                                        <span>Starte Date | Time </span>
                                    </div>
                                    <p>
                                        {date} | {time}
                                    </p>
                                </div>
                                <div className={styles.infoItem}>
                                    <div>
                                        <img
                                            src="/img/home-icon.svg"
                                            alt="location"
                                            className={styles.icon}
                                        />
                                        <span>Location | Venue</span>
                                    </div>
                                    <p>{location}</p>
                                </div>
                            </div>
                            <div className={styles.eventActions}>
                                <button className={"tertiary"} style={{ color: "#45E5E5", height: "40px", border: "1px solid #45E5E5", fontSize: "1em", fontWeight: "bold" }}>
                                    GET DIRECTIONS
                                </button>

                                <button className={"tertiary"} style={{ color: "#45E5E5", height: "40px", border: "1px solid #45E5E5", fontSize: "1em", fontWeight: "bold" }}>
                                    CAFE INFO
                                </button>
                            </div>
                            <div className={styles.eventMap}>
                                {/* <img src={"/img/map.svg"} alt="Map" /> */}
                                <GoogleMaps
                                    defaultZoom={8}
                                    markers={[{ lat: 37.7749, lng: -122.4194 }]}
                                    showMarker={true}
                                    lat={37.7749}
                                    lng={-122.4194}
                                    height={400}
                                    getRef={(map) => console.log(map)}
                                    onBoundsChanged={() => console.log('Bounds changed')}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <PromoCard />

            </div>
        );
    }
}

export default EventDetails;
