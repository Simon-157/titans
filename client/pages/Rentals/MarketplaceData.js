import { useEffect } from 'react';
import PropTypes from 'prop-types';
import keyBy from 'lodash/keyBy';
import set from 'lodash/set';
import { MAKER, MINT, TAKER } from 'defaults';
import { useRentalsListed, useRentalsRented } from 'client/lib/rentals/hooks';

function MarketplaceData(props) {
  const { setCharacters } = props;

  const charactersListed = useRentalsListed();
  const charactersRented = useRentalsRented();

  useEffect(function setCharactersEffect() {
    if (charactersListed.isFetched && charactersRented.isFetched) {
      const characters = keyBy([...charactersListed.data, ...charactersRented.data], (character) => {
        const { maker, mint, taker } = character.parsed;

        set(character, [MAKER], maker?.toString());
        set(character, [MINT], mint?.toString());
        set(character, [TAKER], taker?.toString());

        return mint;
      });

      setCharacters(characters);
    }
  }, [charactersListed.isFetched, charactersRented.isFetched]);

  return null;
}

MarketplaceData.displayName = 'MarketplaceData';

MarketplaceData.propTypes = {
  setCharacters: PropTypes.func,
};

export default MarketplaceData;
