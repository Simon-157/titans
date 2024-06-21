import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  CANCEL,
  CIRCLE,
  CONFIRM,
  FILTER,
  SECONDARY,
  TERTIARY,
} from 'defaults';
import Modal from 'components/Modal';
import map from 'lodash/map';
import styles from './css/filtersModal.css';

class FiltersModal extends Component {
  static displayName = 'FiltersModal'

  static propTypes = {
    filters: PropTypes.object,
    onConfirm: PropTypes.func,
    t: PropTypes.func,
  }

  state = {
    filters: {},
    showModal: false,
  }

  toggleModal = () => {
    const { filters, showModal } = this.state;

    this.setState({
      showModal: !showModal,
      filters: !showModal ? {} : filters,
    });
  }

  onConfirm = () => {
    const { onConfirm } = this.props;

    onConfirm(this.state.filters);
    this.toggleModal();
  }

  renderFilter = (filter) => {
    const { t } = this.props;

    return (
      <div className={styles.filter} key={filter.name}>

        <div className={styles.filterTitle}>
          {t([filter.name])}
        </div>

        <div className={styles.filterItems}>
          {map(filter.list, (item) => this.renderFilterItem(filter, item))}
        </div>

      </div>
    );
  }

  renderFilterItem = (filter, item) => {
    const { t } = this.props;
    const value = this.state.filters[filter.name];
    const isItemActive = (value !== undefined ? value : filter.value) === item._id;

    return (
      <div
        key={item._id}
        className={cx(styles.filterOption, {
          [styles.active]: isItemActive,
        })}
        onClick={() => this.select(filter.name, item._id)}
      >
        {t([item.name])}
      </div>
    );
  }

  select = (key, value) => {
    const { filters } = this.state;

    this.setState({
      filters: {
        ...filters,
        [key]: value,
      },
    });
  }

  render() {
    const { filters, t } = this.props;
    const { showModal } = this.state;

    return (
      <>

        <button className={cx(SECONDARY, CIRCLE, styles.button)} onClick={this.toggleModal}>
          <img src={'/img/rentals/filter.svg'} alt={FILTER} />
        </button>

        {showModal && (
          <Modal
            hideCloseButton
            className={styles.filtersModal}
            wrapClassName={styles.filtersModalWrap}
          >
            <div className={styles.filters}>

              <div className={styles.title}>
                {t(['setFilters'])}
              </div>

              <div className={styles.content}>
                {map(filters, this.renderFilter)}
              </div>

              <div className={styles.footer}>

                <button
                  className={TERTIARY}
                  onClick={this.toggleModal}
                >
                  {t(['cancel'])}
                  <img src={'/img/rentals/cancel.svg'} alt={CANCEL} />
                </button>

                <button
                  className={cx(TERTIARY)}
                  onClick={this.onConfirm}
                >
                  {t(['confirm'])}
                  <img src={'/img/rentals/confirm.svg'} alt={CONFIRM} />
                </button>

              </div>

            </div>
          </Modal>
        )}

      </>
    );
  }
}

export default FiltersModal;
