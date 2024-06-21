import React, { Component } from 'react';
import PropTypes from 'prop-types';
import chunk from 'lodash/chunk';
import each from 'lodash/each';
import isEqual from 'lodash/isEqual';
import map from 'lodash/map';
import round from 'lodash/round';
import { emptyArr, RESIZE, SLIDESHOW } from 'defaults';
import Carousel from 'components/Carousel';
import styles from './css/styles.css';

class BarCarousel extends Component {
  static displayName = 'BarCarousel'

  static propTypes = {
    files: PropTypes.array,
  }

  state = {
    edit: false,
    width: global.__CLIENT__ ? window.innerWidth : 1200,
  }

  images = emptyArr

  slideshow = emptyArr

  constructor(props) {
    super(props);

    const { files } = props;

    this.prevProps = files;

    this.prepare(files);
  }

  componentDidMount() {
    this.resize();

    global.addEventListener(RESIZE, this.resize);
  }

  shouldComponentUpdate(newProps, newState) {
    const { files } = newProps;

    const equals = isEqual(this.prevProps, files) &&
      this.state.edit === newState.edit &&
      this.state.width === newState.width;

    if (!equals) {
      this.prevProps = files;

      this.prepare(files);
    }

    return !equals;
  }

  prepare(files) {
    if (!files) {
      return;
    }

    const { width } = this.state;

    if (width > 1199) {
      this.num = 4;
    } else if (width > 899) {
      this.num = 3;
    } else if (width > 599) {
      this.num = 2;
    } else {
      this.num = 1;
    }

    const slideshow = this.slideshow = [];

    each(files, (file) => {
      const { type, url } = file;

      if (type !== SLIDESHOW) {
        return;
      }

      slideshow.push(url);
    });

    this.images = chunk(slideshow, this.num);
  }

  componentWillUnmount() {
    window.removeEventListener(RESIZE, this.resize);
  }

  resize = () => {
    this.setState({
      width: window.innerWidth,
    });
  }

  renderRow = (row, key) => {
    return (
      <div key={key} className={styles.row}>
        {map(row, this.renderImg)}
      </div>
    );
  }

  renderImg = (img, key) => {
    return (
      <div
        key={key}
        className={styles.img}
        style={{
          backgroundImage: `url('${img}')`,
          width: `${round((100 / this.num), 2)}%`,
        }}
      />
    );
  }

  render() {
    const { images } = this;

    if (images.length === 0) {
      return null;
    }

    return (
      <div className={styles.images}>
        <Carousel className={styles.carousel} dots={false}>
          {map(images, this.renderRow)}
        </Carousel>
      </div>
    );
  }
}

export default BarCarousel;
