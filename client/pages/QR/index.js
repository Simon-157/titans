import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import {
  emptyObj,
  emptyStr,
  BACKBUTTON,
  CONTAINER,
  POINTER,
  QR,
  REDEEM,
  ROOT,
  TRANSPARENT,
  WRONG,
} from 'defaults';
import { executePrimusRequest } from 'client/request';
import i18n from 'lib/i18n';
import Input from 'components/Input';
import {
  addError as addErrorAction,
  addSuccess as addSuccessAction,
} from 'reducers/global/actions';
import styles from './css/styles.css';

class QRPage extends Component {
  static propTypes = {
    match: PropTypes.object,
    addError: PropTypes.func,
    addSuccess: PropTypes.func,
    t: PropTypes.func,
  }

  static defaultProps = {
    match: {
      params: emptyObj,
    },
  }

  constructor(props) {
    super(props);

    const { match } = props;

    const { code } = match.params;

    this.state = {
      code,
      submitting: false,
    };
  }

  componentDidMount() {
    if (process.env.CORDOVA && global.QRScanner) {
      this.root = document.getElementById(ROOT);
    }
  }

  componentWillUnmount() {
    document.removeEventListener(BACKBUTTON, this.back);
  }

  onChange = (code) => {
    this.setState({
      code,
    });
  }

  scan = () => {
    global.QRScanner.scan(this.scanCb);
    global.QRScanner.show();

    const classNames = this.root.className.split(' ');
    if (classNames.indexOf(TRANSPARENT) === -1) {
      this.root.className += ` ${TRANSPARENT}`;
    }

    this.setState({
      scanning: true,
    });

    document.addEventListener(BACKBUTTON, this.back);
  }

  back = () => {
    this.root.className = this.root.className.replace(/\btransparent\b/g, '');

    this.setState({
      scanning: false,
    });

    document.removeEventListener(BACKBUTTON, this.back);
  }

  scanCb = (err, link = emptyStr) => {
    const { addError, t } = this.props;

    this.back();

    if (err) {
      addError(err);

      return;
    }

    const code = link.split('/')[4];

    if (code) {
      this.setState({
        code,
      });
    } else {
      addError(t([QR, WRONG]));
    }
  }

  submit = () => {
    const { code, submitting } = this.state;

    if (!code || submitting) {
      return;
    }

    this.setState({
      submitting: true,
    });

    executePrimusRequest(REDEEM, QR, { code }, this.callback);
  }

  callback = (err) => {
    const { addSuccess, t } = this.props;

    if (err) {
      this.setState({
        submitting: false,
      });

      return;
    }

    addSuccess(t('qr.redeemed'));

    this.setState({
      code: '',
      submitting: false,
    });
  }

  render() {
    const { t } = this.props;

    const { code, scanning, submitting } = this.state;

    if (scanning) {
      return null;
    }

    return (
      <div className={styles.qr}>
        <div className={CONTAINER}>

          <div className={styles.title}>
            {t(['qr', 'redeem'])}
          </div>

          {process.env.CORDOVA && global.QRScanner && (
            <div
              className={cx(POINTER, styles.scaner)}
              onClick={this.scan}
            />
          )}

          <Input
            placeholder={t(['qr', 'codePlaceholder'])}
            value={code || emptyStr}
            onChange={this.onChange}
            className={styles.input}
          />

          <button
            className={styles.submit}
            disabled={submitting}
            onClick={this.submit}
          >
            {t([QR, REDEEM])}
          </button>

        </div>
      </div>
    );
  }
}

export default connect(null, {
  addError: addErrorAction,
  addSuccess: addSuccessAction,
})(i18n(QRPage));
