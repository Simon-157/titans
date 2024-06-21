import { useEffect } from 'react';
import PropTypes from 'prop-types';
import keyBy from 'lodash/keyBy';
import set from 'lodash/set';
import { MINT, OWNER } from 'defaults';
import { useMyCharacters } from 'client/lib/rentals/hooks';

function MyCharactersData(props) {
  const { user, setCharacters } = props;

  const myCharacters = useMyCharacters(user?.wallet);

  useEffect(function setCharactersEffect() {
    if (myCharacters.isFetched) {
      const characters = keyBy(myCharacters.data, (character) => {
        const { mint, owner } = character.tokenAccount.parsed;

        set(character, [MINT], mint);
        set(character, [OWNER], owner);

        return mint;
      });

      setCharacters(characters);
    }
  }, [myCharacters.isFetched]);

  return null;
}

MyCharactersData.displayName = 'MyCharactersData';

MyCharactersData.propTypes = {
  user: PropTypes.object,
  setCharacters: PropTypes.func,
};

export default MyCharactersData;
