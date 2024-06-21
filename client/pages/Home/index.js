import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from 'lib/i18n';
import { LOGO, PRIMARY } from 'defaults';
import Header from 'app/Header';
import Footer from 'app/Footer';
import AuthGuard from 'app/Auth/AuthGuard';
import styles from './css/styles.css';

class Home extends Component {
  static displayName = 'Home'

  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    t: PropTypes.func,
  }

  state = {}

  videoRef = (video) => {
    this.video = video;

    if (video) {
      video.load();
      video.play();
    }
  }

  playNowRef = (playNowLink) => {
    this.setState({
      playNowLink,
    });
  }

  render() {
    const { history, location, t } = this.props;

    const { playNowLink } = this.state;

    return (
      <>

        <Header
          history={history}
          location={location}
          t={t}
        />

        <div className={styles.homePage}>

          <video
            className={styles.video}
            ref={this.videoRef}
            preload={'none'}
            loop
            muted
            playsInline
          >

            <source src={'/video/background-4.mp4'} type={'video/mp4'} />

            <source src={'/video/background-4.webm'} type={'video/webm'} />

          </video>

          <div className={styles.content}>

            <div className={styles.buttonsBlock}>

              <img className={styles.logo} src={'/img/logo.svg'} alt={LOGO} />

              <div className={styles.glow}>
                <a
                  href={`${process.env.HUB_URL ? `//${process.env.HUB_URL}` : '#'}`}
                  ref={this.playNowRef}
                >
                  <button className={PRIMARY}>
                    {t(['playNow'])}
                  </button>
                </a>
              </div>

            </div>

          </div>

        </div>

        <Footer t={t} />

        {playNowLink && (
          <AuthGuard elements={[playNowLink]} t={t} />
        )}

      </>
    );
  }
}

export default i18n(Home);
