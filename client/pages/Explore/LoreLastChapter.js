import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { CONTENT, PRIMARY } from 'defaults';
import styles from './css/loreChapterEpilogue.css';

class LoreLastChapter extends Component {
  static displayName = 'LoreLastChapter'

  static propTypes = {
    chapter: PropTypes.number,
    onTitansButtonClick: PropTypes.func,
    t: PropTypes.func,
  }

  render() {
    const { t, chapter, onTitansButtonClick } = this.props;

    return (
      <>

        <div className={styles.leftBlock}>
          <div className={cx(styles.leftBlockText, styles.leftBlockLastChapter)}>

            <div
              className={styles.leftBlockTexLastChapter}
              dangerouslySetInnerHTML={{ __html: t([`loreChapter${chapter}Description`]) }}
            />

            <div>
              <button className={cx(PRIMARY, styles.meetTitansButton)} onClick={onTitansButtonClick}>
                {t(['meetTitans'])}
              </button>
            </div>

          </div>
        </div>

        <div className={cx(styles.rightBlock, styles.paper)} />

      </>
    );
  }
}

export default LoreLastChapter;
