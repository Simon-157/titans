import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { emptyArr, emptyObj, PUBLIC_USER } from 'defaults';
import { withSub } from 'client/lib/sub';
import { getUser } from 'reducers/user/selectors';
import styles from './css/titan.css';

function CharacterTaker(props) {
  const { character, setCharacter, taker, t } = props;

  const { username } = taker;

  if (!username) {
    return null;
  }

  useEffect(function setCharacterEffect() {
    if (setCharacter) {
      setCharacter({
        _id: character._id,
        takerName: username,
      });
    }
  });

  return (
    <div className={styles.owned}>

      {t(['rentedBy'])}&nbsp;

      <span className={styles.ownerName}>
        {username}
      </span>

    </div>
  );
}

CharacterTaker.displayName = 'CharacterTaker';

CharacterTaker.propTypes = {
  character: PropTypes.object,
  setCharacter: PropTypes.func,
  taker: PropTypes.object,
  t: PropTypes.func,
};

export default withSub(CharacterTaker, function characterTaker({ character = emptyObj }) {
  const userId = character.taker;

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
  const userId = character.taker;

  return {
    taker: getUser(state, userId),
  };
});
