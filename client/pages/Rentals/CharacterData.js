import { useEffect } from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import get from 'lodash/get';
import identity from 'lodash/identity';
import pickBy from 'lodash/pickBy';
import { emptyObj, DATA } from 'defaults';
import { tryPublicKey } from 'client/lib/rentals/common';
import { useMintJson, useMintMetadata } from 'client/lib/rentals/hooks';

function CharacterData(props) {
  const { character, setCharacter } = props;

  const mintMetadata = useMintMetadata(
    character.parsed?.mint ||
    tryPublicKey(character.mint),
  );
  const json = useMintJson(mintMetadata.data?.data.uri);

  useEffect(function setCharactersEffect() {
    if (json.isFetched) {
      const {
        agility,
        attack,
        attributes,
        defense,
        image,
        level,
        magicka,
        name,
        number: _id,
      } = get(json, [DATA], emptyObj);

      const element = find(attributes, (attr) => {
        return attr.trait_type === 'Element';
      })?.value.toLocaleLowerCase();

      setCharacter(pickBy({
        _id,
        agility,
        attack,
        defense,
        element,
        image,
        level,
        magicka,
        name,
      }, identity));
    }
  }, [json.isFetched]);

  return null;
}

CharacterData.displayName = 'CharacterData';

CharacterData.propTypes = {
  character: PropTypes.object,
  setCharacter: PropTypes.func,
};

CharacterData.defaultProps = {
  character: emptyObj,
};

export default CharacterData;
