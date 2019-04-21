import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class NoteSubtitle extends React.PureComponent {
  render() {
    return (
      <h3 className="inform-result-title">
        {this.props.title}
      </h3>
    );
  }
}

NoteSubtitle.defaultProps = {
  title: '',
};

NoteSubtitle.propTypes = {
  title: PropTypes.string,
};

export default NoteSubtitle;
