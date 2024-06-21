import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import {
  BLANK,
  emptyNullFunc,
  RENTALS,
} from 'defaults';
import AuthGuard from '../Auth/AuthGuard';
import styles from './css/menu.css';

class Menu extends Component {
  static displayName = 'Menu'

  static propTypes = {
    t: PropTypes.func,
    opened: PropTypes.bool,
  }

  static defaultProps = {
    t: emptyNullFunc,
  }

  state = {
    playNowLinkRef: null,
    rentTitanLinkRef: null,
  }

  playNowLink = (playNowLink) => {
    this.setState({
      playNowLinkRef: playNowLink,
    });
  }

  rentTitanLink = (rentTitanLink) => {
    this.setState({
      rentTitanLinkRef: rentTitanLink,
    });
  }

  render() {
    const { opened, t } = this.props;

    const { playNowLinkRef, rentTitanLinkRef } = this.state;

    return (
      <div
        className={cx({
          [styles.opened]: opened,
        })}
      >
        <div className={styles.navigation}>
          <div className={styles.navigationBlock}>
            <div className={styles.navigationMenu}>

              <div className={styles.extraBlock} />

              <ul className={styles.navigationMenuList}>

                <li>

                  <Link to={'/'}>
                    <span>
                      {t(['game'])}
                    </span>
                  </Link>

                  <span className={styles.listItemUnderline} />

                </li>

                <li>
                  <a href={'/documents/how-to-play.pdf'} target={BLANK}>
                    {t(['howToPlay'])}
                  </a>
                </li>

                <li>
                  <a
                    href={`${process.env.HUB_URL ? `//${process.env.HUB_URL}` : '#'}`}
                    ref={this.playNowLink}
                  >
                    {t(['playNow'])}
                  </a>
                </li>

                <li>
                  <Link to={'/tournament-leaderboard'}>
                    {t(['tournamentLeaderboard'])}
                  </Link>
                </li>

              </ul>

              <ul className={styles.navigationMenuList}>

                <li>

                  <Link to={'/explore'}>
                    <span>
                      {t(['explore'])}
                    </span>
                  </Link>

                  <span className={styles.listItemUnderline} />

                </li>

                <li>
                  <Link to={'/explore/titans'}>
                    {t(['meetPrimordials'])}
                  </Link>
                </li>

                <li>
                  <Link to={'/explore/lands'}>
                    {t(['lands'])}
                  </Link>
                </li>

                <li>
                  <Link to={'/explore/lore'}>
                    {t(['story'])}
                  </Link>
                </li>

              </ul>

              <ul className={styles.navigationMenuList}>

                <li>

                  <Link to={'/'}>
                    <span>
                      {t(['marketplace'])}
                    </span>
                  </Link>

                  <span className={styles.listItemUnderline} />

                </li>

                <li>
                  <Link to={'/rent-titan'} ref={this.rentTitanLink}>
                    <span>
                      {t([RENTALS])}
                    </span>
                  </Link>
                </li>

                <li>
                  <a
                    href={'https://magiceden.io/marketplace/cryptotitans'}
                    target={'_blank'}
                  >
                    {t(['buyTitan'])}
                  </a>
                </li>

                {/* <li> */}
                {/*  <a */}
                {/*    href={'https://www.cryptotitans.com/staking'} */}
                {/*    target={'_blank'} */}
                {/*  > */}
                {/*    {t(['stakeTitan'])} */}
                {/*  </a> */}
                {/* </li> */}

                {/* <li> */}
                {/*  <Link to={'/'}> */}
                {/*    {t(['howToBuy'])}? */}
                {/*  </Link> */}
                {/* </li> */}

              </ul>

              {/* <ul className={styles.navigationMenuList}> */}

              {/*  <li> */}

              {/*    <Link to={'/'}> */}
              {/*      <span> */}
              {/*        {t(['aboutUs'])} */}
              {/*      </span> */}
              {/*    </Link> */}

              {/*    <span className={styles.listItemUnderline} /> */}

              {/*  </li> */}

              {/*  <li> */}
              {/*    <Link to={'/'}> */}
              {/*      {t(['purpose'])} */}
              {/*    </Link> */}
              {/*  </li> */}

              {/*  <li> */}
              {/*    <Link to={'/faq'}> */}
              {/*      {t(['FAQ'])} */}
              {/*    </Link> */}
              {/*  </li> */}

              {/* </ul> */}

              <div className={styles.extraBlock} />

            </div>
          </div>
        </div>

        <div className={styles.placeholder} />

        {playNowLinkRef && rentTitanLinkRef && (
          <AuthGuard elements={[playNowLinkRef, rentTitanLinkRef]} t={t} />
        )}

      </div>
    );
  }
}

export default Menu;
