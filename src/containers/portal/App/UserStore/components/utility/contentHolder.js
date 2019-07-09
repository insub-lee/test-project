import React from 'react';
import PropTypes from 'prop-types';
import ContentHolderWrapper from './contentHolder.style';


class ContentHolder extends React.PureComponent {
  render() {
    return (
      <ContentHolderWrapper className="storeBoxListWrapper" style={this.props.style}>
        {this.props.children}
      </ContentHolderWrapper>
    );
  }
}

ContentHolder.propTypes = {
  style: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default ContentHolder;
