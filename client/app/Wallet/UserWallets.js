import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { connect } from 'react-redux';
import map from 'lodash/map';
import {
  emptyArr,
  emptyNullFunc,
  PRIMARY,
  SECONDARY,
  UNLINK,
  UNLINK_WALLET,
  USER,
  WALLET,
} from 'defaults';
import { executePrimusRequest } from 'client/request';
import { addSuccess as addSuccessAction } from 'reducers/global/actions';
import { setCurrentWallet as setCurrentWalletAction } from 'reducers/user/actions';
import Select from 'components/Select';
import styles from './css/styles.css';

class UserWallets extends Component {
  static propTypes = {
    userWallets: PropTypes.array,
    addSuccess: PropTypes.func,
    setCurrentWallet: PropTypes.func,
    t: PropTypes.func,
  }

  static defaultProps = {
    userWallets: emptyArr,
    t: emptyNullFunc,
  }

  state = {
    wallet: this.props.userWallets[0],
  }

  data = emptyArr

  constructor(props) {
    super(props);

    this.prepare();
  }

  componentWillReceiveProps(newProps) {
    this.prepare(newProps);
  }

  prepare(props = this.props) {
    const { userWallets } = props;

    this.data = map(userWallets, (wallet) => {
      return {
        _id: wallet,
        name: wallet,
      };
    });
  }

  selectWallet = (ev) => {
    const { value } = ev.currentTarget;

    if (!value) {
      return;
    }

    this.setState({
      wallet: value,
    });
  }

  unlink = () => {
    const { wallet } = this.state;

    executePrimusRequest(UNLINK_WALLET, USER, { wallet }, this.cb);
  }

  cb = (err, data) => {
    if (err) {
      return;
    }

    const { addSuccess, setCurrentWallet } = this.props;

    addSuccess();
    setCurrentWallet(data.user);
  }

  render() {
    const { t } = this.props;

    const { wallet } = this.state;

    return (
      <div>

        <Select
          className={cx(PRIMARY, styles.select)}
          data={this.data}
          value={wallet}
          onChange={this.selectWallet}
        />

        {wallet && (
          <button
            className={cx(SECONDARY, styles.unlink)}
            onClick={this.unlink}
          >

            <img
              src={'/img/profile/unlink.svg'}
              alt={WALLET}
            />

            <span>
              {t([UNLINK])}
            </span>

          </button>
        )}

      </div>
    );
  }
}

export default connect(null, {
  addSuccess: addSuccessAction,
  setCurrentWallet: setCurrentWalletAction,
})(UserWallets);
