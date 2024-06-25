import React, { Component } from 'react';
import SocialShareModal from '../EventPage/components/SocialShareModal';

class Test extends Component {
  state = {
    isSocialShareModalOpen: false,
    eventUrl: 'https://example.com/event/12345'
  };

  toggleSocialShareModal = () => {
    this.setState((prevState) => ({
      isSocialShareModalOpen: !prevState.isSocialShareModalOpen,
    }));
  };

  render() {
    const { isSocialShareModalOpen, eventUrl } = this.state;

    return (
      <div>
        <button onClick={this.toggleSocialShareModal}>Open Share Modal</button>
        <SocialShareModal
          isOpen={isSocialShareModalOpen}
          onClose={this.toggleSocialShareModal}
          eventUrl={eventUrl}
        />
      </div>
    );
  }
}

export default Test;
