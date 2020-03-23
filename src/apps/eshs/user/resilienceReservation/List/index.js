import React from 'react';
import PropTypes from 'prop-type';

import Sketch from 'components/BizBuilder/Sketch';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <StyledViewDesigner>
        <Sketch>
          <div>Hello</div>
        </Sketch>
      </StyledViewDesigner>
    );
  }
}

List.propTypes = {};
List.defaultProps = {};

export default List;
