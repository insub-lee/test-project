import React from 'react';
import PropTypes from 'prop-types';

import Styled from './Styled';

const Nav = ({ navList }) => (
  <Styled>
    {navList.map((node, idx) => {
      if (idx === 0) {
        return (
          <li className="home" key={`mualViewNav_${node.CATEGORY_IDX}`}>
            <i className="fa fa-home"></i>
            {node.CATEGORY_NAME}
          </li>
        );
      }
      if (idx + 1 === navList.length) {
        return (
          <li className="here" key={`mualViewNav_${node.CATEGORY_IDX}`}>
            {node.CATEGORY_NAME}
          </li>
        );
      }
      return <li key={`mualViewNav_${node.CATEGORY_IDX}`}>{node.CATEGORY_NAME}</li>;
    })}
  </Styled>
);

Nav.propTypes = {
  navList: PropTypes.arrayOf(PropTypes.object),
};

Nav.defaultProps = {
  navList: [],
};

export default Nav;
