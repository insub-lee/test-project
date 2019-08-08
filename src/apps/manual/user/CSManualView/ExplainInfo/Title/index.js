import React from 'react';
import PropTypes from 'prop-types';

import IconCollection from '../../../components/IconCollection';

import Styled from './Styled';

const handleOpenPopup = url => window.open(url);

const Title = ({ contents, idx, compData }) => (
  <Styled>
    {compData.TYPE === 'indexLink' ? (
      <p
        className="manualCompIndexLink"
        id={`manualViewIndexComp_${idx}`}
        name={`manualViewIndexComp_${idx}`}
        onClick={() => handleOpenPopup(compData.COMP_OPTION.URL)}
      >
        {contents}
      </p>
    ) : (
      <p id={`manualViewIndexComp_${idx}`} name={`manualViewIndexComp_${idx}`}>
        {contents}
      </p>
    )}
  </Styled>
);

Title.propTypes = {
  contents: PropTypes.string,
  idx: PropTypes.number,
};

Title.defaultProps = {
  contents: '',
  idx: 0,
};

export default Title;
