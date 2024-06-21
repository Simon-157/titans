import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// import { QueryClientProvider } from '@tanstack/react-query';
import {
  emptyArr,
  emptyObj,
  title,
  ARROW,
  BUTTON,
  CONTAINER,
  HOUR,
  MARKETPLACE,
  MY_TITANS,
  RENTAL_REQUESTS,
  REQUESTS,
  TERTIARY,
  TITANS,
} from 'defaults';
import i18n from 'lib/i18n';
import { withSub } from 'client/lib/sub';
import Helmet from 'components/Helmet';
import Tabs from 'components/Tabs';
// import { EnvironmentProvider } from 'client/lib/rentals/providers/EnvironmentProvider';
// import { queryClient } from 'client/lib/rentals/common/queryClient';
import { getIncomingRequests } from 'reducers/rentalRequest/selectors';
import { getCurrentUser } from 'reducers/user/selectors';
import Marketplace from './Marketplace';
import MyCharacters from './MyCharacters';
import Requests from './Requests';
import styles from './css/styles.css';

class Rentals extends Component {
  static displayName = 'Rentals'

  static propTypes = {
    incoming: PropTypes.array,
    location: PropTypes.object,
    match: PropTypes.object,
    t: PropTypes.func,
    userId: PropTypes.string,
  }

  static defaultProps = {
    location: emptyObj,
  }

  counter = 0;

  selected = 0;

  constructor(props) {
    super(props);

    const { match } = this.props;

    const tab = match?.params?.tab;

    switch (tab) {
      case TITANS:
        this.selected = 1;
        break;
      case REQUESTS:
        this.selected = 2;
        break;
      default:
        this.selected = 0;
    }

    this.prepare();
  }

  componentWillReceiveProps(newProps) {
    this.prepare(newProps);
  }

  prepare(props = this.props) {
    const { incoming } = props;

    let incomingLength = incoming.length;

    this.counter = 0;

    while (incomingLength-- > 0) {
      const request = incoming[incomingLength];

      const { accepted, declined, requestedAt } = request;

      if (!accepted && !declined && dayjs().diff(requestedAt, HOUR) < 24) {
        this.counter += 1;
      }
    }
  }

  render() {
    const { incoming, location, userId, t } = this.props;

    const { pathname } = location;

    const seoLink = `https://${process.env.HOSTNAME || 'reignoftitans.gg'}${pathname}`;

    const seoTitle = `Rent Titans - ${title}`;

    return (
      <div className={cx(CONTAINER, styles.container)}>

        <Helmet
          title={seoTitle}
          link={seoLink}
        />

        <div className={styles.backButtonBlock}>
          <Link className={cx(BUTTON, TERTIARY, styles.backButton)} to={'/'}>

            <img src={'/img/faq/arrow-left.svg'} alt={ARROW} />

            {t(['back'])}

          </Link>
        </div>

        <div className={styles.containerBlock}>

          <Tabs
            tabs={[
              {
                label: t([MARKETPLACE]),
                content: <Marketplace location={location} t={t} />,
                link: '/rent-titan',
              },
              {
                label: t([MY_TITANS]),
                content: <MyCharacters location={location} t={t} />,
                link: '/rent-titan/titans',
              },
              {
                label: t([REQUESTS]),
                content:
                  (<Requests
                    incoming={incoming}
                    counter={this.counter}
                    location={location}
                    t={t}
                    userId={userId}
                  />),
                link: '/rent-titan/requests',
                counter: this.counter,
              },
            ]}
            selected={this.selected}
          />

        </div>
      </div>
    );
  }

  // return (
  //   <EnvironmentProvider>
  //     <QueryClientProvider client={queryClient}>
  //       <div className={cx(CONTAINER, styles.container)}>
  //         <Tabs
  //           tabs={[{
  //             label: t([MARKETPLACE]),
  //             content: <Marketplace t={t} />,
  //           }, {
  //             label: t([MY_TITANS]),
  //             content: <MyCharacters t={t} />,
  //           }]}
  //         />
  //       </div>
  //     </QueryClientProvider>
  //   </EnvironmentProvider>
  // );
}
export default withSub(i18n(Rentals), function requestsSub({ userId }) {
  if (!userId) {
    return emptyArr;
  }

  return [{
    name: RENTAL_REQUESTS,
    props: {
      userId,
    },
  }];
}, function mapStateToProps(state) {
  const user = getCurrentUser(state);
  const userId = user?.id;

  return {
    incoming: getIncomingRequests(state, userId),
    userId,
  };
});
