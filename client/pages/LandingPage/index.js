import React from 'react';
import styles from './css/styles.css';
import Navbar from '../EventsPage/components/NavBar';
import { PRIMARY } from 'defaults';
import CafeList from '../CafesPage/components/CafeList';
import RegionFilter from '../CafesPage/components/RegionFilter';
import { cafes } from '../CafesPage/data';
import HeaderSection from '../EventsPage/components/HeaderSection';
import Footer from '../EventsPage/components/Footer';
import { CIRCLE, SECONDARY, TERTIARY } from '../../../defaults';
import RelatedEvents from '../EventPage/RelatedEvents';
import { events } from '../EventsPage/data';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobile: window.innerWidth <= 768,
            region1: 'see all regions',
            region2: 'see all regions',
            visibleCafes: 3,
            visibleEvents: 4,
            mainImage: "/img/langing_pageImage1.png",
            sideImages: [
                "/img/group.png",
                "/img/group.png",
                "/img/group.png",
                "/img/group.png"
            ],
            features: [
                {
                    id: 1,
                    title: "Craft Your Strategy",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa sed elementum sapien aliquam in. Magna mattis tellus nulla ultricies suscipit mi. sapien aliquam in. Magna mattis tellus nulla ultricies suscipit mi."
                },
                {
                    id: 2,
                    title: "Master the Arena",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa sed elementum sapien aliquam in. Magna mattis tellus nulla ultricies suscipit mi. sapien aliquam in. Magna mattis tellus nulla ultricies suscipit mi. "
                },
                {
                    id: 3,
                    title: "Compete for Glory",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa sed elementum sapien aliquam in. Magna mattis tellus nulla ultricies suscipit mi. sapien aliquam in. Magna mattis tellus nulla ultricies suscipit mi. "
                }
            ]
        };
        this.bottomRef = React.createRef();
        this.topRef = React.createRef();
    }

    handleImageClick = (index) => {
        this.setState((prevState) => {
            const newSideImages = [...prevState.sideImages];
            const newMainImage = newSideImages[index];
            newSideImages[index] = prevState.mainImage;
            return { mainImage: newMainImage, sideImages: newSideImages };
        });
    };

    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    handleRegion1Change = (region1) => {
        this.setState({ region1 });
    };

    handleRegion2Change = (region2) => {
        this.setState({ region2 });
    };


    loadMoreCafes = () => {
        this.setState((prevState) => ({ visibleCafes: prevState.visibleCafes + 3 }));
    };

    loadMoreEvents = () => {
        this.setState((prevState) => ({ visibleEvents: prevState.visibleEvents + 4 }));
    };


    handleScrollDownButtonClick = () => {
        this.bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    handleScrollUpButtonClick = () => {
        this.topRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    handleResize = () => {
        this.setState({ isMobile: window.innerWidth <= 1206 });
    };

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }


    render() {

        const { features, sideImages, mainImage, region1, region2, visibleCafes, visibleEvents, isMobile } = this.state;

        const filteredCafes = cafes.filter((cafe) => {
            const matchesRegion = region1 === 'see all regions' || cafe.region === region1;
            return matchesRegion;
        });

        const filteredEvents = events.filter((event) => {
            const matchesRegion = region2 === 'see all regions' || event.region === region2;
            return matchesRegion;
        });

        return (

            <div className={styles.landingPage} >
                <div className={styles.container}>

                    {/* <RegionFilter currentRegion={region1} onRegionChange={this.handleRegion1Change} /> */}
                    <Navbar />
                    <div className={styles.mainContent}>
                        <img ref={this.topRef} src="/img/logo.svg" alt="Reign of Titans" width={600} height={250} />
                        {isMobile ?
                            <button className={`${PRIMARY}`} style={{ width: "320px", height: "70px", margin: "90px auto" }}>PLAY NOW</button>
                            : <div className={styles.containerHeader}>
                                <div>
                                    <button className={`${PRIMARY}`} style={{ width: "320px", height: "70px", margin: "90px auto" }}>PLAY NOW</button>
                                </div>
                                <div className={styles.scroll}>
                                    <button
                                        className={`${CIRCLE} ${TERTIARY}`}

                                        onClick={this.handleScrollDownButtonClick}
                                    >
                                        <img src="/img/scrolldown.svg" alt="scroll" height={50} style={{ marginBottom: "40px" }} />
                                    </button>
                                </div>
                            </div>
                        }
                        <h2 className={styles.subtitle}>Reign of Titans Comes to India!</h2>
                        <div className={styles.features}>
                            {features.map((feature) => (
                                <div key={feature.id} className={styles.feature}>
                                    <h3>
                                        <span className={styles.featureNumber}>{feature.id}</span> {feature.title}
                                    </h3>
                                    <p>{feature.description}</p>
                                </div>
                            ))}
                        </div>
                        <div className={styles.images}>
                            <div className={styles.sideImages}>
                                <img src={sideImages[0]} alt="Image 1" onClick={() => this.handleImageClick(0)} />
                                <img src={sideImages[1]} alt="Image 2" onClick={() => this.handleImageClick(1)} />
                            </div>
                            <div className={styles.mainImage}>
                                <img src={mainImage} alt="Main Image" />
                            </div>
                            <div className={styles.sideImages}>
                                <img src={sideImages[2]} alt="Image 4" onClick={() => this.handleImageClick(2)} />
                                <img src={sideImages[3]} alt="Image 5" onClick={() => this.handleImageClick(3)} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.allCafes}>
                    <section className={styles.searchSection}>
                        <header className={styles.header}>
                            <img src='/img/box-icon.png' alt="box icon" />
                            <h1> Events Around You</h1>
                        </header>
                        <div className={styles.headerSectionWrapper}>
                            <HeaderSection />
                        </div>
                        <div className={styles.regionfilter}>
                            <RegionFilter currentRegion={region2} onRegionChange={this.handleRegion2Change} />
                        </div>
                    </section>
                    <div className={styles.eventsAround}>
                        <RelatedEvents events={filteredEvents} visibleEvents={visibleEvents} loadMoreEvents={this.loadMoreEvents} />
                    </div>
                </div>

                <div className={styles.allCafes}>
                    <section className={styles.searchSection}>
                        <header className={styles.header}>
                            <img src='/img/box-icon.png' alt="box icon" />
                            <h1> Cafés Around You</h1>
                        </header>
                        <div className={styles.headerSectionWrapper}>
                            <HeaderSection />
                        </div>
                        <div className={styles.regionfilter}>
                            <RegionFilter currentRegion={region1} onRegionChange={this.handleRegion1Change} />
                        </div>
                    </section>
                    <CafeList cafes={filteredCafes} visibleCafes={visibleCafes} loadMoreCafes={this.loadMoreCafes} />
                </div>
                <span className={styles.scrollUp}>
                    <button
                        className={`${CIRCLE} ${TERTIARY}`}
                        style={{}}
                        onClick={this.handleScrollUpButtonClick}
                    >
                        <img src="/img/scrollup.svg" alt="scroll" />
                    </button>
                </span>

                <Footer />
                <div ref={this.bottomRef}></div>
            </div>
        );
    }
}

export default LandingPage;
