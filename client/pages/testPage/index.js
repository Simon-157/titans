import React, { Component } from 'react';
import ConfirmationModal from '../EventPage/components/ConfirmationModal';

class Test extends Component {
  state = {
    isConfirmationModalOpen: false,
    eventDetails: {
      title: 'CHAMPIONS CHALLENGE KERMES CUP',
      date: 'June 29th, 2024 | 17:00-22:00',
      venue: 'Lounge tulip Cafe, Mumbai, India',
      qrCode: '65XA - 352',
      giveaway: 'Free LEGION NOTEBOOK Giveaway: Faucibus at et nulla ipsum, lorem et. Nullam adipiscing maecenas quis amet.'
    }
  };

  toggleConfirmationModal = () => {
    this.setState((prevState) => ({
      isConfirmationModalOpen: !prevState.isConfirmationModalOpen,
    }));
  };

  render() {
    const { isConfirmationModalOpen, eventDetails } = this.state;

    return (
      <div>
        <button onClick={this.toggleConfirmationModal}>Open Confirmation Modal</button>
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={this.toggleConfirmationModal}
          eventDetails={eventDetails}
        />
      </div>
    );
  }
}

export default Test;
