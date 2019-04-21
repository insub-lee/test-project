import React from 'react';
import PropTypes from 'prop-types';
import * as comp from '../../ArticleComponents/components';


const Example = (props) => {
  const { Ex } = props;
  return (
    <div>
      <comp.ArticleHead txt={Ex.title} />
      <comp.ArticleText txt={Ex.details} />
      <div className="guideComponentWrapper">
        <Ex.App />
      </div>
      <comp.ArticleCode code={Ex.code} />
      <br /><br />
    </div>
  );
};

Example.propTypes = {
  Ex: PropTypes.element.isRequired,
};


export default Example;
