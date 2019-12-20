import React from 'react';
import PropTypes from 'prop-types';
import AppSelector from './appSelector';

class AppSelectorWrapper extends React.PureComponent {
  render() {
    const { addList, closeModal, show, type, isAdmin } = this.props;

    return <div>{show ? <AppSelector addList={addList} closeModal={closeModal} show={show} type={type} isAdmin={isAdmin} /> : ''}</div>;
  }
}

AppSelectorWrapper.propTypes = {
  addList: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

AppSelectorWrapper.defaultProps = {
  isAdmin: false,
};

export default AppSelectorWrapper;
