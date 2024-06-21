import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  ARROW,
  SUBMIT,
  TERTIARY,
} from 'defaults';
import styles from './css/loreChapterPrologue.css';

class LoreChapterPrologue extends Component {
  static displayName = 'LoreChapterPrologue'

  static propTypes = {
    chapter: PropTypes.number,
    onButtonClick: PropTypes.func,
    t: PropTypes.func,
  }

  render() {
    const { t, chapter, onButtonClick } = this.props;

    return (
      <>

        <div className={cx(styles.leftBlock, styles[`chapter${chapter}`])}>

          <div className={styles.titleWrapper}>

            <div className={styles.titleIconBlock}>

              <div className={styles.titleLine} />

              <div className={styles.wrapperIcon}>
                <div className={styles.titleIcon} />
              </div>

              <div className={styles.titleLine} />

            </div>

            <div className={styles.contentTitle}>
              {t([`loreChapter${chapter}Title`])}
            </div>

          </div>

          <div className={styles.background}></div>

        </div>

        <div className={styles.rightBlock}>

          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: t([`loreChapter${chapter}Description`]) }}
          />

          <div className={styles.buttonBlock}>
            <button
              className={TERTIARY}
              type={SUBMIT}
              onClick={onButtonClick}
            >
              <img src={'/img/explore/arrow-right.svg'} alt={ARROW} />
            </button>
          </div>

        </div>

      </>
    );
  }
}

export default LoreChapterPrologue;
