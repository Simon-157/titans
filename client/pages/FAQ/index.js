import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import {
  emptyObj,
  title,
  ARROW,
  FAQ as FAQKey,
  ID,
  ITEM,
  LOGO,
  NAME,
  PRIMARY,
  TERTIARY,
  TOPIC,
} from 'defaults';
import i18n from 'lib/i18n';
import Accordeon from 'components/Accordeon';
import Helmet from 'components/Helmet';
import Select from 'components/Select';
import styles from './css/styles.css';
import answers from './answers';

class FAQ extends Component {
  static displayName = 'FAQ'

  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    t: PropTypes.func,
  }

  static defaultProps = {
    location: emptyObj,
  }

  MENU_LIST = [
    { id: 1, name: this.props.t(['tournamentOptions']) },
    { id: 2, name: this.props.t(['howToPlay']) },
    { id: 3, name: this.props.t(['signupPlay']) },
    { id: 4, name: this.props.t(['stakingRentals']) },
    { id: 5, name: this.props.t(['systemRequirements']) },
    { id: 6, name: this.props.t(['legalQuestions']) },
    { id: 7, name: this.props.t(['generalQuestions']) },
  ]

  state = {
    selected: 1,
  }

  goBack = () => {
    this.props.history.goBack();
  };

  selectItem = (selected) => {
    if (!selected) {
      return;
    }

    this.setState({
      selected,
      openAccordionIndex: -1,
    });
  }

  onAccordionOpen = (index) => {
    const { openAccordionIndex } = this.state;
    this.setState({ openAccordionIndex: index === openAccordionIndex ? null : index });
  }

  getAnswers = () => {
    const { t } = this.props;
    const { openAccordionIndex, selected } = this.state;
    const selectedAnswers = answers[selected];
    const result = [];

    selectedAnswers.forEach((item, index) => {
      const key = `${ITEM}-${selected}-${index}`;

      result.push(
        <Accordeon
          active={index === openAccordionIndex}
          label={t([FAQKey, item.title]).toString()}
          key={key}
          onOpen={() => this.onAccordionOpen(index)}
        >
          <span dangerouslySetInnerHTML={{ __html: t([FAQKey, item.text]) }} />
        </Accordeon>,
      );
    });

    return result;
  }

  getMenuList = () => {
    const list = [];
    const { selected } = this.state;

    this.MENU_LIST.forEach((item, index) => {
      list.push(
        <div
          className={cx(styles.menuItem, { [styles.selected]: selected === (index + 1) })}
          key={item.id}
        >
          <span
            className={styles.menuItemName}
            onClick={() => this.selectItem(item.id)}
          >
            {item.name}
          </span>
        </div>,
      );
    });

    return list;
  }

  render() {
    const { location, t } = this.props;

    const { selected } = this.state;

    const items = this.getAnswers();

    const menuList = this.getMenuList();

    const { pathname } = location;

    const seoLink = `https://${process.env.HOSTNAME || 'reignoftitans.gg'}${pathname}`;

    const seoTitle = `FAQ - ${title}`;

    return (
      <div className={styles.FAQ}>

        <Helmet
          title={seoTitle}
          link={seoLink}
        />

        <header className={styles.header}>

          <button
            className={TERTIARY}
            onClick={this.goBack}
          >

            <img src={'/img/faq/arrow-left.svg'} alt={ARROW} />

            {t(['back'])}

          </button>

          <div className={styles.logo}>
            <Link to={'/'}>
              <img
                src={'/img/faq/logo.svg'}
                alt={LOGO}
              />
            </Link>
          </div>

        </header>

        <section className={styles.section}>

          <div className={styles.title}>
            {t(['frequentlyAskedQuestions'])}
          </div>

          <div className={styles.select}>
            <Select
              className={PRIMARY}
              data={this.MENU_LIST}
              name={TOPIC}
              labelKey={NAME}
              valueKey={ID}
              value={selected}
              onChange={(data) => this.selectItem(data.currentTarget.value)}
            />
          </div>

          <div className={styles.descriptionBlock}>
            {items}
          </div>

          <div className={styles.content}>
            <div className={styles.menu}>
              {menuList}
            </div>
          </div>

        </section>

      </div>
    );
  }
}

export default i18n(FAQ);
