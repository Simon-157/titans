import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import debounce from 'lodash/debounce';
import {
  emptyStr,
  BAR,
  BARS,
  CONTAINER,
  DESC,
  DISCOVER,
  GET,
  KEY,
  SEARCH,
  TITLE,
  title as webSiteTitle,
} from 'defaults';
import { executePrimusRequest } from 'client/request';
import BarTop from 'components/BarTop';
import Breadcrumbs from 'components/Breadcrumbs';
import Helmet from 'components/Helmet';
import Input from 'components/Input';
import { addError as addErrorAction } from 'reducers/global/actions';
import BarsFollowing from './BarsFollowing';
import BarsList from './BarsList';
import styles from './css/styles.css';

class BarsContent extends Component {
  static displayName = 'BarsContent'

  static propTypes = {
    location: PropTypes.object,
    userId: PropTypes.string,
    addError: PropTypes.func,
    t: PropTypes.func,
  }

  state = {
    bars: null,
    search: emptyStr,
  }

  constructor(props) {
    super(props);

    this.doSearch = debounce(this.doSearch, 500);
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  filter = (payload) => {
    this.setState({
      ...payload,
      search: emptyStr,
    });
  }

  onSearch = (search) => {
    this.setState({
      search,
    });

    this.doSearch(search);
  }

  doSearch = (search = emptyStr) => {
    if (!search.length) {
      this.setState({
        bars: null,
      });

      return;
    }

    const { city, country } = this.state;

    executePrimusRequest(GET, BAR, {
      city,
      country,
      search,
      // userLatLong,
    }, this.callback);
  }

  callback = (err, data) => {
    if (err) {
      const { addError } = this.props;

      addError(err);

      return;
    }

    this.setState({
      bars: data.bar,
    });
  }

  render() {
    const { location, userId, t } = this.props;

    const { bars, city, country, search } = this.state;

    const seoLink = `${process.env.FRONTEND_PATH}${location.pathname}`;

    return (
      <div className={styles.bars}>

        <Helmet
          title={`${t([BARS, TITLE])} | ${webSiteTitle}`}
          description={t([BARS, DESC])}
          keywords={t([BARS, KEY])}
          link={seoLink}
          img={`${process.env.FRONTEND_PATH}/img/og-image-bars.jpg`}
        />

        <BarTop t={t} withLogo />

        <div className={cx(CONTAINER, styles.searchWrap)}>
          <div className={styles.searchWrapper}>
            <Input
              className={styles.search}
              inputClassName={styles.input}
              placeHolder={t([BAR, SEARCH])}
              onChange={this.onSearch}
            />
          </div>
        </div>

        <Breadcrumbs id={BARS} t={t} />

        {null
          // isBarOwner && (
          //   <MyBars latLng={userLatLong} userId={userId} t={t} />
          // )
        }

        {userId && (
          <BarsFollowing userId={userId} t={t} />
        )}

        <BarsList
          bars={bars}
          city={city}
          country={country}
          search={search}
          userId={userId}
          filter={this.filter}
          onSearch={this.onSearch}
          t={t}
        />

        <div className={DISCOVER} />

      </div>
    );
  }
}

export default connect(null, {
  addError: addErrorAction,
})(BarsContent);
