import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  ARROW,
  ASK,
  BLEND,
  BOOK,
  CIRCLE,
  HAMMER,
  SECONDARY,
  SUBMIT,
  TERTIARY,
  TIMER,
} from 'defaults';
import LoreChapterPrologue from './LoreChapterPrologue';
import LoreChapterEpilogue from './LoreChapterEpilogue';
import LoreLastChapter from './LoreLastChapter';
import styles from './css/lore.css';

class Lore extends Component {
  static displayName = 'Lore'

  static propTypes = {
    getTitansPageRef: PropTypes.func,
    history: PropTypes.object,
    pageRef: PropTypes.func,
    t: PropTypes.func,
  }

  CHAPTERS = {
    1: {
      title: this.props.t(['loreChapter1Title']),
      icon: TIMER,
    },
    2: {
      title: this.props.t(['loreChapter3Title']),
      icon: BLEND,
    },
    3: {
      title: this.props.t(['loreChapter5Title']),
      icon: HAMMER,
    },
    4: {
      title: this.props.t(['loreChapter7Title']),
      icon: ASK,
    },
  }

  SUB_CHAPTERS = {
    1: LoreChapterPrologue,
    2: LoreChapterEpilogue,
    3: LoreChapterPrologue,
    4: LoreChapterEpilogue,
    5: LoreChapterPrologue,
    6: LoreChapterEpilogue,
    7: LoreChapterPrologue,
    8: LoreLastChapter,
  }

  state = {
    subChapter: 1,
  }

  get chaptersLength() {
    return Object.keys(this.SUB_CHAPTERS).length;
  }

  goToHomePage = () => {
    this.props.history.push('/');
  }

  goToTitansPage = () => {
    const { getTitansPageRef } = this.props;

    this.scrollIntoView(getTitansPageRef());
  }

  scrollIntoView = (view) => {
    view.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start',
    });
  }

  goToPreviousChapter = () => {
    if (this.state.subChapter > 1) {
      this.changeChapter(this.state.subChapter - 1);
    }
  }

  goToNextChapter = () => {
    if (this.state.subChapter < this.chaptersLength) {
      this.changeChapter(this.state.subChapter + 1);
    }
  }

  changeChapter = (subChapter) => {
    this.setState({ subChapter });
  }

  getChapters = () => {
    const chapters = [];

    for (let i = 1; i <= this.chaptersLength / 2; i++) {
      chapters.push(
        <div
          key={i}
          className={cx(styles.chapter, {
            [styles.active]: [i * 2, i * 2 - 1].includes(this.state.subChapter),
          })}
        >

          <div className={styles.chapterTitle}>

            <div className={styles.titleIcon}>
              <img src={`/img/explore/${this.CHAPTERS[i].icon}.svg`} alt={this.CHAPTERS[i].icon} />
            </div>

            <div>{this.CHAPTERS[i].title}</div>

          </div>

          <div className={styles.progress}>
            {this.getSubChapters(i)}
          </div>

        </div>,
      );
    }

    return chapters;
  }

  getSubChapters = (chapter) => {
    const chapters = [];

    for (let i = chapter * 2 - 1; i <= chapter * 2; i++) {
      chapters.push(
        <div
          key={i}
          className={cx(styles.progressLine, {
            [styles.active]: this.state.subChapter === i,
          })}
        >
          0{i}
        </div>,
      );
    }

    return chapters;
  }

  getChapterNumber = () => {
    const chapter = Math.round(this.state.subChapter / 2);
    const romanNumbers = {
      1: 'I',
      2: 'II',
      3: 'III',
      4: 'IV',
    };

    return romanNumbers[chapter];
  }

  render() {
    const { pageRef, t } = this.props;
    const { subChapter } = this.state;
    const romeChapter = this.getChapterNumber();
    const ComponentName = this.SUB_CHAPTERS[subChapter];
    const chapters = this.getChapters();

    return (
      <div className={styles.lorePage} ref={pageRef}>

        <div className={styles.header}>

          <div className={styles.backButton}>
            <button
              className={TERTIARY}
              type={SUBMIT}
              onClick={this.goToHomePage}
            >

              <img src={'/img/explore/arrow-left-blue.svg'} alt={ARROW} />

              {t(['back'])}

            </button>
          </div>

          <div className={styles.breadCrumbs}>

            <div className={styles.breadCrumbsBlock}>{t(['lore'])}</div>

            <div className={styles.breadCrumbsBlock}>
              <img src={'/img/explore/breadcrumbs-arrow.svg'} alt={ARROW} />
            </div>

            <div className={styles.breadCrumbsBlock}>{t(['chapter'])} {romeChapter}</div>
            <div
              className={cx(styles.breadCrumbsBlock, styles.breadCrumbsToggleBlock, {
                [styles.hide]: (subChapter % 2) !== 0,
              })}
            >

              <div className={styles.breadCrumbsBlock}>
                <img src={'/img/explore/breadcrumbs-arrow.svg'} alt={ARROW} />
              </div>

              <div>{this.CHAPTERS[subChapter / 2]?.title}</div>

            </div>
          </div>

          <div className={styles.tab}>
            <div className={styles.tabIcon}>
              <img src={'/img/explore/book.svg'} alt={BOOK} />
            </div>
          </div>

        </div>

        <div className={styles.content}>
          <ComponentName
            chapter={subChapter}
            onTitansButtonClick={this.goToTitansPage}
            onButtonClick={this.goToNextChapter}
            t={t}
          />
        </div>

        <div className={styles.footer}>

          <div className={styles.navigationButtons}>

            <button
              className={cx(SECONDARY, CIRCLE)}
              disabled={subChapter === 1}
              onClick={this.goToPreviousChapter}
            >
              <div className={cx(styles.arrow, styles.left)} />
            </button>

            <div className={styles.counter}>
              0{subChapter} / 0{this.chaptersLength}
            </div>

            <button
              className={cx(SECONDARY, CIRCLE)}
              disabled={subChapter === this.chaptersLength}
              onClick={this.goToNextChapter}
            >
              <div className={cx(styles.arrow, styles.right)} />
            </button>

          </div>

          <div className={styles.progressBar}>
            {chapters}
          </div>

        </div>

      </div>
    );
  }
}

export default Lore;
