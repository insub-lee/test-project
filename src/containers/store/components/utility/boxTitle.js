import React from 'react';
import PropTypes from 'prop-types';
import { BoxTitle, BoxSubTitle } from './boxTitle.style';

class boxTitle extends React.PureComponent {
  render() {
    return (
      <div>
        {this.props.title ?
          <BoxTitle className="storeBoxTitle">
            {' '}{this.props.title}{' '}
          </BoxTitle>
            : ''}
        {this.props.subtitle ?
          <BoxSubTitle className="storeBoxSubTitle">
            {' '}{this.props.subtitle}{' '}
          </BoxSubTitle>
            : ''}
      </div>
    );
  }
}

boxTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default boxTitle;
