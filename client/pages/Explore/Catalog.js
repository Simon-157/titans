import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  ARROW,
  BACK,
  CHARACTER,
  ELEMENT,
  RANGE,
  SUBMIT,
  TERTIARY,
  TITAN,
} from 'defaults';
import { elements } from 'lib/element';
import styles from './css/catalog.css';

class Catalog extends Component {
  static displayName = 'Catalog'

  static propTypes = {
    buttonClick: PropTypes.func,
    className: PropTypes.string,
    getNextPageRef: PropTypes.func,
    getPreviousPageRef: PropTypes.func,
    history: PropTypes.object,
    itemChange: PropTypes.func,
    pageRef: PropTypes.func,
    selectedItem: PropTypes.number,
    t: PropTypes.func,
    type: PropTypes.string,
  }

  COUNT_ITEMS = 8

  state = {
    selectedItem: 1,
    viewMore: false,
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedItem !== prevProps.selectedItem) {
      this.changeItem(this.props.selectedItem);
    }
  }

  moveToLeft = () => {
    if (this.state.selectedItem > 1) {
      this.changeItem(this.state.selectedItem - 1);
    }
  }

  moveToRight = () => {
    if (this.state.selectedItem < this.COUNT_ITEMS) {
      this.changeItem(this.state.selectedItem + 1);
    }
  }

  changeItem = (selectedItem) => {
    const { itemChange } = this.props;
    this.setState({
      selectedItem,
      viewMore: false,
    });
    itemChange(selectedItem);
  }

  getPosition = (itemNumber) => {
    return this.state.selectedItem - itemNumber + 1;
  }

  onSwitcherChange = (element) => {
    this.changeItem(+element.target.value);
  }

  goToHomePage = () => {
    this.props.history.push('/');
  }

  goToPreviousPage = () => {
    const { getPreviousPageRef } = this.props;
    this.scrollIntoView(getPreviousPageRef());
  }

  goToNextPage = () => {
    const { getNextPageRef } = this.props;
    this.scrollIntoView(getNextPageRef());
  }

  scrollIntoView = (view) => {
    view.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start',
    });
  }

  getChaosOROrderClass = () => {
    const titansWithOrder = [1, 2, 4, 6];

    return titansWithOrder.includes(this.state.selectedItem) ?
      styles.order :
      styles.chaos;
  }

  getListItems = () => {
    const { type } = this.props;

    const listItems = [];

    for (let i = 1; i <= this.COUNT_ITEMS; i++) {
      listItems.push(
        <div
          className={cx(styles.itemIcon, styles[`position${this.getPosition(i)}`])}
          key={i}
          onClick={() => this.onItemClick(i)}
        >
          <div className={cx(styles.land, styles[`land${i}`])}>
            <img src={`/img/explore/${type}/${i}.png`} alt={CHARACTER} />
          </div>
        </div>,
      );
    }

    return listItems;
  }

  onButtonClick = () => {
    const { type, buttonClick } = this.props;

    if (type === TITAN) {
      this.goToNextPage();
    } else {
      this.goToPreviousPage();
    }

    buttonClick(this.state.selectedItem);
  }

  onItemClick = (item) => {
    this.changeItem(item);
  }

  onViewMoreButtonClick = () => {
    this.description.scrollTop = 0;
    this.setState({ viewMore: !this.state.viewMore });
  }

  descriptionRef = (c) => {
    this.description = c;
  }

  render() {
    const {
      className,
      pageRef,
      type,
      t,
    } = this.props;

    const { selectedItem, viewMore } = this.state;

    const listItems = this.getListItems();

    return (
      <div
        className={cx(className, styles.catalogPage, styles[`selectedItem${selectedItem}`])}
        ref={pageRef}
      >

        <div className={cx(BACK, styles.backButton)}>
          <button
            className={TERTIARY}
            type={SUBMIT}
            onClick={this.goToHomePage}
          >

            <img src={'/img/explore/arrow-left.svg'} alt={ARROW} />

            {t(['back'])}

          </button>
        </div>

        <div className={styles.itemsBlock}>

          <div className={cx(BACK, styles.backButton)}>
            <button
              className={TERTIARY}
              type={SUBMIT}
              onClick={this.goToHomePage}
            >

              <img src={'/img/explore/arrow-left.svg'} alt={ARROW} />

              {t(['back'])}

            </button>
          </div>

          <div className={styles.slider}>

            <div>
              <button className={styles.buttonUp} onClick={this.moveToLeft}>
              </button>
            </div>

            <div className={styles.switcherBlock}>
              <input
                type={RANGE}
                min={1}
                max={this.COUNT_ITEMS}
                value={selectedItem}
                onChange={this.onSwitcherChange}
              />
            </div>

            <div>
              <button className={styles.buttonDown} onClick={this.moveToRight}>
              </button>
            </div>

          </div>

          <div className={styles.ellipse}>

            {listItems}

          </div>

        </div>

        {type === TITAN && (
          <div className={styles.selectedItemBlock}>
            <img src={`/img/explore/${type}/${selectedItem}.png`} alt={CHARACTER} />
          </div>
        )}

        <div className={styles.descriptionBlock}>

          <div className={styles.descriptionHeader}>

            <div className={styles.tab} />

          </div>

          <div className={styles.descriptionContent}>
            <div className={styles.descriptionContentBlock}>

              <div className={styles.itemName}>

                {type === TITAN && (
                  <div className={styles.gerbBlock}>

                    <div className={cx(styles.gerb, this.getChaosOROrderClass())} />

                  </div>
                )}

                {t([`${type}Name${selectedItem}`])}

              </div>

              <div
                className={cx(styles.itemDescription, {
                  [styles.opened]: viewMore,
                })}
              >
                <div
                  ref={this.descriptionRef}
                  className={cx(styles.itemDescriptionData, {
                    [styles.full]: viewMore,
                  })}
                >
                  {t([`${type}Description${selectedItem}`])}
                </div>
              </div>

              <div
                className={cx(styles.descriptionButton, {
                  [styles.active]: viewMore,
                  [styles.hide]: viewMore,
                })}
              >
                <button onClick={this.onViewMoreButtonClick}>
                  <div>{t(['viewMore'])}</div>
                  <div className={styles.readMoreIcon}>
                    <span></span>
                    <span></span>
                  </div>
                </button>
              </div>

            </div>
          </div>

          <div className={styles.descriptionFooter}>
            <button
              className={TERTIARY}
              type={SUBMIT}
              onClick={this.onButtonClick}
            >

              <div className={styles.buttonIcon}>
                <img
                  src={`/img/explore/elements/${elements[selectedItem - 1]}.svg`}
                  alt={ELEMENT}
                />
              </div>

              {t([`${type}Land${selectedItem}`])}

              <img src={'/img/explore/arrow-right.svg'} alt={ARROW} />

            </button>
          </div>

        </div>

      </div>
    );
  }
}

export default Catalog;
