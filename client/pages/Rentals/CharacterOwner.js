import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { emptyArr, emptyObj, PUBLIC_USER } from 'defaults';
import { withSub } from 'client/lib/sub';
import { getUser } from 'reducers/user/selectors';
import styles from './css/titan.css';

function CharacterOwner(props) {
  const { character, owner, setCharacter, t } = props;

  const { username } = owner;

  if (!username) {
    return null;
  }

  useEffect(function setCharacterEffect() {
    if (setCharacter) {
      setCharacter({
        _id: character._id,
        ownerName: username,
      });
    }
  });

  return (
    <div className={styles.owned}>

      {t(['ownedBy'])}&nbsp;

      <span className={styles.ownerName}>
        {username}
      </span>

    </div>
  );
}

CharacterOwner.displayName = 'CharacterOwner';

CharacterOwner.propTypes = {
  owner: PropTypes.object,
  character: PropTypes.object,
  setCharacter: PropTypes.func,
  t: PropTypes.func,
};

export default withSub(CharacterOwner, function characterOwner({ character = emptyObj }) {
  const userId = character.owner || character.userId;

  if (userId) {
    return [{
      name: PUBLIC_USER,
      props: {
        userId,
      },
    }];
  }

  return emptyArr;
}, function mapStateToProps(state, { character = emptyObj }) {
  const userId = character.owner || character.userId;

  return {
    owner: getUser(state, userId),
  };
});
