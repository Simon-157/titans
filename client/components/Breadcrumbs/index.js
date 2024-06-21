import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import map from 'lodash/map';
import { findWithParents, preventDefault, replaceParams } from 'client/helpers';
import breadcrumbs from 'client/lib/breadcrumbs';
import styles from './css/styles.css';

const cachedBreadcrumbs = {};

class Breadcrumbs extends Component {
  static displayName = 'Breadcrumbs'

  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    t: PropTypes.func,
  }

  constructor(props) {
    super(props);

    const { id } = props;

    if (!cachedBreadcrumbs[id]) {
      cachedBreadcrumbs[id] = findWithParents(breadcrumbs, id);
    }

    this.result = cachedBreadcrumbs[id];
  }

  renderBreadcrumb = (item, key) => {
    const { t } = this.props;

    const isCurrent = key + 1 === this.result.length;

    const className = isCurrent ?
      styles.current :
      styles.path;

    const href = replaceParams(item.href, this.props);
    const label = replaceParams(item.label, this.props);

    return (
      <Fragment key={key}>

        {key !== 0 && ' / '}

        <Link
          className={className}
          to={href}
          onClick={isCurrent ? preventDefault : null}
        >
          {t(label)}
        </Link>

      </Fragment>
    );
  }

  render() {
    const { result } = this;

    if (!result.length) {
      return null;
    }

    const { className } = this.props;

    return (
      <div className={cx(styles.breadcrumbs, className)}>
        {map(result, this.renderBreadcrumb)}
      </div>
    );
  }
}

export default Breadcrumbs;
