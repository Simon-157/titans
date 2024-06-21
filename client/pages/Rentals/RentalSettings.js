import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  emptyArr,
  emptyObj,
  emptyNullFunc,
  AUTO_APPROVAL,
  BUTTON,
  CLOSE,
  CONFIRM,
  HOUR,
  HOURS,
  INSTANT,
  SECONDARY,
  SET,
  SETTINGS,
  TERTIARY,
} from 'defaults';
import { executePrimusRequest } from 'client/request';
import { withSub } from 'client/lib/sub';
import Modal from 'components/Modal';
import { addSuccess as addSuccessAction } from 'reducers/global/actions';
import { getUserSettings } from 'reducers/settings/selectors';
import styles from './css/styles.css';

class RentalSettings extends Component {
  static displayName = 'RentalSettings'

  static propTypes = {
    settings: PropTypes.object, // eslint-disable-line
    addSuccess: PropTypes.func,
    t: PropTypes.func,
  }

  static defaultProps = {
    settings: emptyObj,
    t: emptyNullFunc,
  }

  state = {}

  constructor(props) {
    super(props);

    this.prepare();
  }

  componentWillReceiveProps(newProps) {
    this.prepare(newProps);
  }

  prepare(props = this.props) {
    const { settings } = props;

    const { autoApproval } = settings;

    this.state.autoApproval = autoApproval;
  }

  toggleModal = () => {
    const { modal } = this.state;

    this.prepare();

    this.setState({
      modal: !modal,
    });
  }

  setNoValue = () => {
    this.setState({
      autoApproval: null,
    });
  }

  setValue1 = () => {
    this.setState({
      autoApproval: 1,
    });
  }

  setValue3 = () => {
    this.setState({
      autoApproval: 3,
    });
  }

  setValue6 = () => {
    this.setState({
      autoApproval: 6,
    });
  }

  setValue12 = () => {
    this.setState({
      autoApproval: 12,
    });
  }

  confirm = () => {
    const { autoApproval } = this.state;

    executePrimusRequest(SET, SETTINGS, { autoApproval }, this.cb);
  }

  cb = (err) => {
    if (err) {
      return;
    }

    const { addSuccess } = this.props;

    addSuccess();
    this.toggleModal();
  }

  render() {
    const { t } = this.props;

    const { autoApproval, modal } = this.state;

    return (
      <>

        <button
          className={cx(TERTIARY, styles.autoApproval)}
          type={BUTTON}
          onClick={this.toggleModal}
        >
          {t([AUTO_APPROVAL])}: {autoApproval ?
            `${autoApproval}-${t([autoApproval > 1 ? HOURS : HOUR])}` :
            t([INSTANT])}
        </button>

        {modal && (
          <Modal
            className={styles.modal}
            wrapClassName={styles.modalWrap}
            onClose={this.toggleModal}
          >

            <div className={styles.modalHead}>

              {t([AUTO_APPROVAL])}

              <button
                type={BUTTON}
                className={cx(TERTIARY, styles.close)}
                onClick={this.toggleModal}
              >
                <img src={'/img/profile/close.svg'} alt={CLOSE} />
              </button>

            </div>

            <div className={styles.modalContent}>

              <button
                type={BUTTON}
                className={cx(TERTIARY, styles.autoBtn, {
                  [styles.active]: !autoApproval,
                })}
                onClick={this.setNoValue}
              >
                {t([INSTANT])}
              </button>

              <div className={styles.autoBtns}>

                <button
                  type={BUTTON}
                  className={cx(TERTIARY, styles.autoBtn, {
                    [styles.active]: autoApproval === 1,
                  })}
                  onClick={this.setValue1}
                >
                  1-{t([HOUR])}
                </button>

                <button
                  type={BUTTON}
                  className={cx(TERTIARY, styles.autoBtn, {
                    [styles.active]: autoApproval === 3,
                  })}
                  onClick={this.setValue3}
                >
                  3-{t([HOURS])}
                </button>

              </div>

              <div className={styles.autoBtns}>

                <button
                  type={BUTTON}
                  className={cx(TERTIARY, styles.autoBtn, {
                    [styles.active]: autoApproval === 6,
                  })}
                  onClick={this.setValue6}
                >
                  6-{t([HOURS])}
                </button>

                <button
                  type={BUTTON}
                  className={cx(TERTIARY, styles.autoBtn, {
                    [styles.active]: autoApproval === 12,
                  })}
                  onClick={this.setValue12}
                >
                  12-{t([HOURS])}
                </button>

              </div>

              <button
                type={BUTTON}
                className={cx(SECONDARY, styles.confirm)}
                onClick={this.confirm}
              >
                {t([CONFIRM])}
              </button>

            </div>

          </Modal>
        )}

      </>
    );
  }
}

export default withSub(RentalSettings, function settingsWithSub({ userId }) {
  if (userId) {
    return [{
      name: SETTINGS,
      props: {
        userId,
      },
    }];
  }

  return emptyArr;
}, function mapStateToProps(state, { userId }) {
  return {
    settings: getUserSettings(state, userId),
  };
}, {
  addSuccess: addSuccessAction,
});
