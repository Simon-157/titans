import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import {
  ARROW,
  CHARACTER,
  CIRCLE,
  LOGO,
  RANGE,
  SECONDARY,
} from 'defaults';
import styles from './css/categories.css';

class Categories extends Component {
  static displayName = 'Categories'

  static propTypes = {
    categoriesRef: PropTypes.func,
    getLoreRef: PropTypes.func,
    getTitansRef: PropTypes.func,
    getLandsRef: PropTypes.func,
    t: PropTypes.func,
  }

  state = {
    selectedItem: 2,
    categoryHovered: false,
  }

  goToTitansPage = () => {
    const { getTitansRef } = this.props;

    this.scrollIntoView(getTitansRef());
  }

  goToLorePage = () => {
    const { getLoreRef } = this.props;

    this.scrollIntoView(getLoreRef());
  }

  goToLandsPage = () => {
    const { getLandsRef } = this.props;

    this.scrollIntoView(getLandsRef());
  }

  scrollIntoView = (view) => {
    view.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start',
    });
  }

  onSwitcherChange = (element) => {
    this.changeItem(+element.target.value);
  }

  changeItem = (selectedItem) => {
    this.setState({ selectedItem });
  }

  moveToLeft = () => {
    if (this.state.selectedItem > 1) {
      this.changeItem(this.state.selectedItem - 1);
    }
  }

  moveToRight = () => {
    if (this.state.selectedItem < 3) {
      this.changeItem(this.state.selectedItem + 1);
    }
  }

  onTitansMouseEnter = () => {
    clearTimeout(this.timeout);

    this.setState({
      categoryHovered: true,
    });
  }

  onTitansMouseLeave = () => {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.setState({
        categoryHovered: false,
      });
    }, 400);
  }

  render() {
    const { categoriesRef, t } = this.props;

    const { categoryHovered, selectedItem } = this.state;

    return (
      <div
        className={styles.categoriesPage}
        id={'categoriesPage'}
        ref={categoriesRef}
      >

        <div>
          <Link to={'/'}>
            <img
              className={styles.logo}
              src={'/img/logo.svg'}
              alt={LOGO}
            />
          </Link>
        </div>

        <div className={styles.ellipse}>

          <div className={cx(styles.categoriesPageItems, styles[`position${selectedItem}`])}>

            <div className={cx(styles.wrapper, styles.wrapperLands)} onClick={this.goToLandsPage}>
              <div className={cx(styles.categoriesPageItem, styles.lands)}>

                <div className={styles.categoryCaption}>
                  {t(['lands'])}
                </div>

                <button className={cx(SECONDARY, CIRCLE)} />

              </div>
            </div>

            <div
              className={cx(styles.wrapper, styles.wrapperTitans)}
              onClick={this.goToTitansPage}
              onMouseEnter={this.onTitansMouseEnter}
              onMouseLeave={this.onTitansMouseLeave}
            >
              <div className={cx(styles.categoriesPageItem, styles.titans)}>

                <div
                  className={cx(styles.titanImages, {
                    [styles.overflowUnset]: categoryHovered,
                  })}
                >

                  <img src={'/img/explore/titan/1.png'} alt={CHARACTER} />

                  <img src={'/img/explore/titan/2.png'} alt={CHARACTER} />

                </div>

                <div className={styles.categoryCaption}>
                  {t(['titans'])}
                </div>

                <button className={cx(SECONDARY, CIRCLE)} />

              </div>
            </div>

            <div className={cx(styles.wrapper, styles.wrapperLore)} onClick={this.goToLorePage}>
              <div className={cx(styles.categoriesPageItem, styles.lore)}>

                <div className={styles.categoryCaption}>
                  {t(['lore'])}
                </div>

                <button className={cx(SECONDARY, CIRCLE)} />

              </div>
            </div>

          </div>

        </div>

        <div className={styles.slider}>

          <div>
            <button onClick={this.moveToLeft}>
              <img src={'/img/explore/slider-button-left.svg'} alt={ARROW} />
            </button>
          </div>

          <div className={styles.switcherBlock}>
            <input
              type={RANGE}
              min={1}
              max={3}
              value={selectedItem}
              onChange={this.onSwitcherChange}
            />
          </div>

          <div>
            <button onClick={this.moveToRight}>
              <img
                src={'/img/explore/slider-button-right.svg'}
                alt={ARROW}
              />
            </button>
          </div>

        </div>

      </div>
    );
  }
}

export default Categories;
