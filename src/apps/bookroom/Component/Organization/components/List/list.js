import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './listItem';
import { StyledBgDiv } from './styled';

class List extends React.PureComponent {
  // 조직도의 탭을 클릭하면 새로 불림
  constructor(props) {
    super(props);

    const { attendGroupList } = this.props;

    const attendGroupListUpdated = attendGroupList.map((o) => {
      return (
        <ListItem
          grpId={o.GRP_ID}
          handleGetAttendMemberList={this.props.handleGetAttendMemberList}
          listItem={o}
        />
      );
    });

    this.state = {
      list: attendGroupListUpdated,
    };
  }

  render() {
    return (
      <StyledBgDiv>
        <ul>
          {this.state.list}
        </ul>
      </StyledBgDiv>
    );
  }
}

List.propTypes = {
  attendGroupList: PropTypes.array.isRequired,
  handleGetAttendMemberList: PropTypes.func.isRequired,
};

export default List;
