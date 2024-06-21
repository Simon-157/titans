import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { title as webSiteTitle } from 'defaults';
import style from './css/style.css';

const SearchPreview = ({ title, link, description, className }) => {
  if (!title || !link || !description) {
    return (
      <div className={cx(className, style.warn)}>
        Fill all of the seo fields!
      </div>
    );
  }

  let сutOffDescription = description;

  if (сutOffDescription.length > 160) {
    сutOffDescription = сutOffDescription.substring(0, 160);
    сutOffDescription += '...';
  }

  let сutOffTitle = title;

  if (webSiteTitle) {
    сutOffTitle += ` | ${webSiteTitle}`;
  }

  if (сutOffTitle.length > 60) {
    сutOffTitle = title.substring(0, 60);
    сutOffTitle += '...';
  }

  return (
    <div className={cx(className, style.area)}>
      <h3 className={style.title}>
        {сutOffTitle}
      </h3>
      <span className={style.linkText}>
        {link}
      </span>
      <p className={style.description}>
        {сutOffDescription}
      </p>
    </div>
  );
};

SearchPreview.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
  title: PropTypes.string,
};

export default SearchPreview;
