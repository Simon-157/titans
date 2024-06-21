import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import dayjs from 'dayjs';
import {
  emptyNullFunc,
  CENTER,
  FLEX,
  INCOMING,
  OUTGOING,
} from 'defaults';
import { withSub } from 'client/lib/sub';
import { addSuccess as addSuccessAction } from 'reducers/global/actions';
import RequestsList from './RequestsList';
import RequestsOutgoing from './RequestsOutgoing';
import RentalSettings from './RentalSettings';
import styles from './css/styles.css';

class Requests extends Component {
  static displayName = 'Requests'

  static propTypes = {
    counter: PropTypes.number,
    incoming: PropTypes.array,
    location: PropTypes.object,
    userId: PropTypes.string,
    addSuccess: PropTypes.func,
    t: PropTypes.func,
  }

  static defaultProps = {
    t: emptyNullFunc,
  }

  state = {
    tab: this.props.location?.state?.incoming ? INCOMING : OUTGOING,
  }

  constructor(props) {
    super(props);

    this.prepare();
  }

  componentWillReceiveProps() {
    this.prepare();
  }

  prepare() {
    this.now = dayjs();
  }

  setIncoming = () => {
    this.setState({
      tab: INCOMING,
    });
  }

  setOutgoing = () => {
    this.setState({
      tab: OUTGOING,
    });
  }

  render() {
    const { counter, incoming, userId, addSuccess, t } = this.props;

    const { tab } = this.state;

    const { now } = this;

    return (
      <>

        <div className={cx(styles.toolbar, styles.requestsToolbar)}>

          <div className={styles.tabs}>

            <div
              className={cx(styles.tab, {
                [styles.selected]: tab === INCOMING,
              })}
              onClick={this.setIncoming}
            >

              <span>
                {t([INCOMING])}
              </span>

              {counter > 0 && (
                <div className={cx(FLEX, CENTER, styles.newCount)}>
                  {counter}
                </div>
              )}

            </div>

            <div
              className={cx(styles.tab, {
                [styles.selected]: tab === OUTGOING,
              })}
              onClick={this.setOutgoing}
            >
              {t([OUTGOING])}
            </div>

          </div>

        </div>

        <div className={styles.rentalSettings}>
          {tab === INCOMING && (
            <RentalSettings userId={userId} t={t} />
          )}
        </div>

        <div className={cx(styles.content, styles.requestsContent)}>

          {tab === INCOMING && (
            <RequestsList
              now={now}
              requests={incoming}
              userId={userId}
              addSuccess={addSuccess}
              t={t}
              incoming
            />
          )}

          {tab === OUTGOING && (
            <RequestsOutgoing
              userId={userId}
              addSuccess={addSuccess}
              t={t}
            />
          )}

        </div>

      </>
    );
  }
}

export default withSub(Requests, null, null, {
  addSuccess: addSuccessAction,
});
