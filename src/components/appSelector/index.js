import React from 'react';
import PropTypes from 'prop-types';
import AppSelector from './appSelector';

class AppSelectorWrapper extends React.PureComponent {
  render() {
    const {
      addList,
      closeModal,
      show,
      type,
    } = this.props;

    return (
      <div>
      {
        show
          ?
            <AppSelector
              addList={addList}
              closeModal={closeModal}
              show={show}
              type={type}
            />
          :
          ''
      }
      </div>
    );
  }
}

AppSelectorWrapper.propTypes = {
  addList: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};

export default AppSelectorWrapper;
