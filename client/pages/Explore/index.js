import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { emptyObj, title } from 'defaults';
import i18n from 'lib/i18n';
import Helmet from 'components/Helmet';
import Categories from './Categories';
import Home from './Home';
import Lands from './Lands';
import Lore from './Lore';
import Titans from './Titans';
import styles from './css/styles.css';

class Explore extends Component {
  static displayName = 'Explore'

  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    t: PropTypes.func,
  }

  static defaultProps = {
    location: emptyObj,
  }

  componentDidMount() {
    const { match } = this.props;
    const page = match.params.page;

    if (this[page]) {
      this.scrollToPage(this[page]);
    }
  }

  scrollToPage = (page) => {
    page.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start',
    });
  }

  state = {
    selectedLand: 1,
    selectedTitan: 1,
  }

  titansRef = (c) => {
    this.titans = c;
  }

  getTitansRef = () => {
    return this.titans;
  }

  getLoreRef = () => {
    return this.lore;
  }

  categoriesRef = (c) => {
    this.categories = c;
  }

  getCategoriesRef = () => {
    return this.categories;
  }

  landsRef = (c) => {
    this.lands = c;
  }

  loreRef = (c) => {
    this.lore = c;
  }

  getLandsRef = () => {
    return this.lands;
  }

  onButtonClick = (selectedItem) => {
    this.setState({
      selectedLand: selectedItem,
      selectedTitan: selectedItem,
    });
  }

  onTitanChange = (selectedTitan) => {
    this.setState({ selectedTitan });
  }

  onLandChange = (selectedLand) => {
    this.setState({ selectedLand });
  }

  render() {
    const { history, location, t } = this.props;

    const { selectedLand, selectedTitan } = this.state;

    const { pathname } = location;

    const seoLink = `https://${process.env.HOSTNAME || 'reignoftitans.gg'}${pathname}`;

    const seoTitle = `Explore - ${title}`;

    return (
      <div className={styles.container}>

        <Helmet
          title={seoTitle}
          link={seoLink}
        />

        <Home t={t} />

        <Categories
          categoriesRef={this.categoriesRef}
          getLandsRef={this.getLandsRef}
          getTitansRef={this.getTitansRef}
          getLoreRef={this.getLoreRef}
          t={t}
        />

        <Titans
          buttonClick={this.onButtonClick}
          getPreviousPageRef={this.getCategoriesRef}
          getNextPageRef={this.getLandsRef}
          history={history}
          itemChange={this.onTitanChange}
          pageRef={this.titansRef}
          selectedItem={selectedTitan}
          t={t}
        />

        <Lands
          buttonClick={this.onButtonClick}
          getPreviousPageRef={this.getTitansRef}
          history={history}
          itemChange={this.onLandChange}
          pageRef={this.landsRef}
          selectedItem={selectedLand}
          t={t}
        />

        <Lore
          getPreviousPageRef={this.getLandsRef}
          getTitansPageRef={this.getTitansRef}
          history={history}
          pageRef={this.loreRef}
          t={t}
        />

      </div>
    );
  }
}

export default i18n(Explore);
