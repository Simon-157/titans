import React from 'react';
import styles from './css/styles.css';
import Navbar from '../EventsPage/NavBar';
import { PRIMARY } from 'defaults';
import CafeList from '../CafesPage/CafeList';
import RegionFilter from '../CafesPage/RegionFilter';
import { cafes } from '../CafesPage/data';
import HeaderSection from '../EventsPage/HeaderSection';
import Footer from '../EventsPage/Footer';
import { CIRCLE, TERTIARY } from '../../../defaults';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            region: 'see all regions',
            visibleCafes: 4,
            mainImage: "/img/langing_pageImage1.png",
            sideImages: [
                "/img/langing_pageImage2.png",
                "/img/langing_pageImage3.png",
                "/img/langing_pageImage4.png",
                "/img/langing_pageImage2.png"
            ],
            features: [
                {
                    id: 1,
                    title: "Craft Your Strategy",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa sed elementum sapien aliquam in. Magna mattis tellus nulla ultricies suscipit mi. sapien aliquam in. Magna mattis tellus nulla ultricies suscipit mi."
                },
                {
                    id: 2,
                    title: "Master the Arena of Art",
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

    handleRegionChange = (region) => {
        this.setState({ region });
    };

    loadMoreCafes = () => {
        this.setState((prevState) => ({ visibleCafes: prevState.visibleCafes + 12 }));
    };

    handleScrollButtonClick = () => {
        this.bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    render() {
        const { features, sideImages, mainImage, region, visibleCafes } = this.state;
        const filteredCafes = cafes.filter((cafe) => {
            const matchesRegion = region === 'see all regions' || cafe.region === region;
            return matchesRegion;
        });

        return (
            <div className={styles.landingPage}>
                <div className={styles.container}>
                    <Navbar />
                    <div className={styles.mainContent}>
                        <img src="/img/logo.svg" alt="Reign of Titans" width={600} height={250} />
                        <span className={styles.scroll}> 
                            <button
                                className={`${CIRCLE} ${TERTIARY}`}
                                style={{}}
                                onClick={this.handleScrollButtonClick}
                            >
                                <img src="/img/scrolldown.svg" alt="scroll" />
                            </button>
                        </span>
                        <button className={`${PRIMARY}`} style={{ width: "320px", height: "70px", margin: "90px auto" }}>PLAY NOW</button>
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
                        <HeaderSection />
                        <RegionFilter currentRegion={region} onRegionChange={this.handleRegionChange} />
                    </section>
                    <CafeList cafes={filteredCafes} visibleCafes={visibleCafes} loadMoreCafes={this.loadMoreCafes} />
                </div>

                <div className={styles.allCafes}>
                    <section className={styles.searchSection}>
                        <header className={styles.header}>
                            <img src='/img/box-icon.png' alt="box icon" />
                            <h1> Cafés Around You</h1>
                        </header>
                        <HeaderSection />
                        <RegionFilter currentRegion={region} onRegionChange={this.handleRegionChange} />
                    </section>
                    <CafeList cafes={filteredCafes} visibleCafes={visibleCafes} loadMoreCafes={this.loadMoreCafes} />
                </div>

                <Footer />
                <div ref={this.bottomRef}></div>
            </div>
        );
    }
}

export default LandingPage;
