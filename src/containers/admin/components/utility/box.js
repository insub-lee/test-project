import React from 'react';
import PropTypes from 'prop-types';
import BoxTitleWrapper from './boxTitle';
import BoxWrapper from './box.style';

class Box extends React.PureComponent {
  render() {
    return (
      <BoxWrapper className="storeBoxWrapper">
        <BoxTitleWrapper title={this.props.title} subtitle={this.props.subtitle} />
        {this.props.children}
      </BoxWrapper>
    );
  }
}

Box.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Box.defaultProps = {
  title: '',
  subtitle: '',
};

export default Box;
