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
      siteId,
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
              siteId={siteId}
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
  siteId: PropTypes.number.isRequired,
};

AppSelectorWrapper.defaultProps = {
  siteId: 0,
};

export default AppSelectorWrapper;
