import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { DESCRIPTION, KEYWORDS } from 'defaults';

const appID = process.env.FACEBOOK_CLIENTID;

function HelmetComp(props) {
  const {
    title,
    description,
    link,
    img,
    keywords,
  } = props;

  const meta = [
    {
      name: DESCRIPTION,
      content: description,
    },

    {
      name: KEYWORDS,
      content: keywords,
    },

    {
      property: 'og:url',
      content: link,
    },

    {
      property: 'og:title',
      content: title,
    },

    {
      property: 'og:description',
      content: description,
    },

    {
      name: 'twitter:title',
      content: title,
    },

    {
      name: 'twitter:description',
      content: description,
    },
  ];

  if (img) {
    meta.push({
      property: 'og:image',
      content: img,
    }, {
      name: 'twitter:image',
      content: img,
    });
  }

  if (appID) {
    meta.push({
      property: 'fb:app_id',
      content: appID,
    });
  }

  return (
    <Helmet
      title={title}
      meta={meta}
      link={[
        {
          rel: 'canonical',
          href: link,
        },
      ]}
    />
  );
}

HelmetComp.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
  img: PropTypes.string,
  keywords: PropTypes.string,
};

export default HelmetComp;
