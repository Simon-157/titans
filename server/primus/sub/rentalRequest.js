import { RentalRequest } from 'collections';

export default {
  async rentalRequests(props) {
    const { userId } = props;

    const rentalRequest = await RentalRequest.findAll({
      $or: [
        {
          owner: userId,
        },
        {
          taker: userId,
        },
      ],
    }, {
      projection: {
        _id: 1,
        accepted: 1,
        characterId: 1,
        declined: 1,
        owner: 1,
        requestedAt: 1,
        taker: 1,
      },
      sort: {
        requestedAt: -1,
      },
    });

    return {
      rentalRequest,
    };
  },
};
