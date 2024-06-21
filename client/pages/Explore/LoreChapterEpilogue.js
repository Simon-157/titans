import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ARROW,
  QUOTE,
  SUBMIT,
  TERTIARY,
} from 'defaults';
import styles from './css/loreChapterEpilogue.css';

class LoreChapterEpilogue extends Component {
  static displayName = 'LoreChapterEpilogue'

  static propTypes = {
    chapter: PropTypes.number,
    onButtonClick: PropTypes.func,
    t: PropTypes.func,
  }

  render() {
    const { t, chapter, onButtonClick } = this.props;

    return (
      <>

        <div className={styles.leftBlock}>
          <div className={styles.light} />
          <div
            className={styles.leftBlockText}
            dangerouslySetInnerHTML={{ __html: t([`loreChapter${chapter}Description`]) }}
          />
        </div>

        <div className={styles.rightBlock}>

          <div className={styles.description}>

            <div className={styles.quote}>
              <img src={'/img/explore/quote.svg'} alt={QUOTE} />
            </div>

            {t([`loreChapter${chapter}Quote`])}

            <div className={styles.author}>
              {t([`loreChapter${chapter}Author`])}
            </div>

          </div>

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

export default LoreChapterEpilogue;
