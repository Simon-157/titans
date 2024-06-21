import { Component } from 'react';
import PropTypes from 'prop-types';
import each from 'lodash/each';
import filter from 'lodash/filter';
import flatten from 'lodash/flatten';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import size from 'lodash/size';
import { EN, FILES, TYPE } from 'defaults';
import { withSub } from 'client/lib/sub';

class Files extends Component {
  static displayName = 'Files'

  static propTypes = {
    children: PropTypes.func,
    files: PropTypes.object,
    profile: PropTypes.object,
  }

  render() {
    const { files, profile, children } = this.props;

    const defaultLanguage = EN;

    let preferredLanguage = EN;

    if (profile && profile.country) {
      switch (profile.country) {
        case 'Belgium':
          preferredLanguage = 'be-nl';
          break;
        case 'Netherlands':
          preferredLanguage = 'nl-nl';
          break;
        default:
          preferredLanguage = EN;
          break;
      }
    }

    const filesGroupedByType = groupBy(files, TYPE);

    const allowedFiles = flatten(
      map(filesGroupedByType, (groupFiles) => {
        let filesToReturn = null;

        const preferredFiles = filter(groupFiles, ['language', preferredLanguage]);

        if (size(preferredFiles) === 0) {
          filesToReturn = filter(groupFiles, ['language', defaultLanguage]);
        } else {
          filesToReturn = preferredFiles;
        }

        return filesToReturn;
      }),
    );

    const filesToReturn = {};

    each(allowedFiles, (file) => {
      if (file) {
        filesToReturn[file.id] = file;
      }
    });

    return children(filesToReturn);
  }
}

export default withSub(Files, function filesSub({ objectType, objectId }) {
  return [{
    name: FILES,
    props: {
      [`${objectType}Id`]: objectId,
    },
  }];
});
