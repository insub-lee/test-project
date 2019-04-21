import React from 'react';
import PropTypes from 'prop-types';
import { StyledLi } from './styled';

class ListItem extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  getAttendMemberList = () => {
    const {
      grpId,
      handleGetAttendMemberList,
    } = this.props;

    handleGetAttendMemberList(grpId);
  }

  render() {
    return(
      <StyledLi>
        <button
          onClick={this.getAttendMemberList}
        >
          {this.props.listItem.GRP_NM}
        </button>
      </StyledLi>
    );
  }
}

ListItem.propTypes = {
  listItem: PropTypes.object.isRequired,
  grpId: PropTypes.string.isRequired,
  handleGetAttendMemberList: PropTypes.func.isRequired,
};

export default ListItem;
