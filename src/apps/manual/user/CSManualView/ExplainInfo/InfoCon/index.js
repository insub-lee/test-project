import React from 'react';
import PropTypes from 'prop-types';

import Styled from './Styled';

import FroalaEditorView from '../../../../components/RichTextEditor/FroalaEditorView';

const InfoCon = ({ contents }) => (
  <Styled>
    <FroalaEditorView model={contents} />
  </Styled>
);

InfoCon.propTypes = {
  contents: PropTypes.string,
};

InfoCon.defaultProps = {
  contents: '',
};

export default InfoCon;
