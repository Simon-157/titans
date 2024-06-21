import {
  rentalRequestReducer,
  setRentalRequest,
  setRentalRequests,
} from '../actions';

describe('Rental Requst actions', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(rentalRequestReducer).not.toThrow();
    expect(setRentalRequest).not.toThrow();
    expect(setRentalRequests).not.toThrow();
  });
});
