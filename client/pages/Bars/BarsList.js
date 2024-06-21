import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import isArray from 'lodash/isArray';
import isEqual from 'lodash/isEqual';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
// import reduce from 'lodash/reduce';
import size from 'lodash/size';
import {
  emptyArr,
  // _ID,
  ALL,
  BAR,
  BARS,
  // CITIES,
  // CITY,
  CONTAINER,
  // COUNTRY,
  DISTANCE,
  // FILTER,
  GENERAL,
  H1_LARGE,
  // ID,
  NAME,
  NONE,
  RED,
} from 'defaults';
// import countries from 'lib/countries';
import { withSub } from 'client/lib/sub';
// import Select from 'components/Select';
import FeaturedItem from 'components/FeaturedBlock/FeaturedItem';
import StatusMessage from 'components/StatusMessage';
import { getBars } from 'reducers/bar/selectors';
import styles from './css/styles.css';

class BarsList extends Component {
  static displayName = 'BarsList'

  static propTypes = {
    bars: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    // cities: PropTypes.array,
    // city: PropTypes.string,
    // country: PropTypes.string,
    userId: PropTypes.string,
    isBarOwner: PropTypes.bool,
    filter: PropTypes.func,
    t: PropTypes.func,
  }

  constructor(props) {
    super(props);

    const { bars } = props;

    this.prevProps = props;

    this.prepare(bars);
  }

  shouldComponentUpdate(newProps) {
    const { bars } = newProps;

    const equals = isEqual(this.prevProps, newProps);

    if (!equals) {
      this.prevProps = bars;

      this.prepare(bars);
    }

    return !equals;
  }

  prepare(bars) {
    if (!bars) {
      return;
    }

    this.bars = orderBy(bars, [DISTANCE, NAME]);
  }

  reduce = (result, { id }) => {
    result.push({
      id,
      name: id,
    });

    return result;
  }

  onCityChange = (ev) => {
    const { filter } = this.props;

    const { value } = ev.currentTarget;

    filter({ city: value === ALL ? null : value });
  }

  onCountryChange = (ev) => {
    const { filter } = this.props;

    const { value } = ev.currentTarget;

    filter({ city: null, country: value === ALL ? null : value });
  }

  render() {
    const {
      // country,
      // cities,
      // city,
      isBarOwner,
      userId,
      t,
    } = this.props;

    const hasItems = size(this.bars) !== 0;

    return (
      <div className={cx(styles.block, styles.list)}>
        <div className={CONTAINER}>

          <h1 className={cx(H1_LARGE, RED)}>
            {`${isBarOwner ? `${t([GENERAL, ALL])} ` : ''}${t([BARS, ALL])}`}
          </h1>

          {null
            // <div className={styles.filters}>
            //
            //   <Select
            //     className={styles.select}
            //     valueKey={ID}
            //     labelKey={NAME}
            //     data={reduce(countries, this.reduce, [{
            //       id: ALL,
            //       name: t(['allCountries']),
            //     }])}
            //     placeholder={(
            //       <span>
            //
            //         <span>
            //           {`${t([GENERAL, FILTER])}: `}
            //         </span>
            //
            //         <span className={styles.yellow}>
            //           {t([COUNTRY])}
            //         </span>
            //
            //       </span>
            //     )}
            //     value={country}
            //     onChange={this.onCountryChange}
            //   />
            //
            //   {country && (
            //     <Select
            //       className={styles.select}
            //       valueKey={_ID}
            //       labelKey={NAME}
            //       data={reduce(cities, this.reduce, [{
            //         id: ALL,
            //         name: t([CITIES]),
            //       }])}
            //       placeholder={(
            //         <span>
            //
            //           <span>
            //             {`${t([GENERAL, FILTER])}: `}
            //           </span>
            //
            //           <span className={styles.yellow}>
            //             {t([CITY])}
            //           </span>
            //
            //         </span>
            //       )}
            //       value={city}
            //       onChange={this.onCityChange}
            //     />
            //   )}
            //
            // </div>
          }

          {hasItems ? (
            <div className={styles.grid}>
              {map(this.bars, (item) => {
                const { _id } = item;

                return (
                  <FeaturedItem
                    key={_id}
                    className={styles.bar}
                    entity={BARS}
                    item={item}
                    userId={userId}
                    t={t}
                  />
                );
              })}
            </div>
          ) : (
            <StatusMessage
              title={t([BAR, NONE])}
              dark
            />
          )}

        </div>
      </div>
    );
  }
}

export default withSub(BarsList, function barsListSub({ city, country, latLng, search }) {
  const citiesProps = { bars: 1 };
  const barsProps = {};

  if (country) {
    citiesProps.country = country;
    barsProps.country = country;

    if (city) {
      barsProps.city = city;
    }
  }

  if (latLng) {
    barsProps.latLng = latLng;
  }

  return [...(country ? [{
    name: 'citiesForFilter',
    props: citiesProps,
  }] : emptyArr), ...(search ? emptyArr : [{
    name: 'closestBars',
    props: barsProps,
    loadMore: {
      increment: 12,
      initial: 12,
    },
  }])];
}, function mapStateToProps(state, { bars }) {
  return {
    bars: isArray(bars) ? bars : getBars(state),
  };
});
