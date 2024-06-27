import React from 'react';
import Modal from '../../../components/Modal';


const withHiddenCloseButton = (WrappedComponent) => {
  return (props) => {
    return <WrappedComponent {...props} hideCloseButton={true} />;
  };
};

const ModalWithHiddenCloseButton = withHiddenCloseButton(Modal);

export default ModalWithHiddenCloseButton;
