import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Organization from 'containers/portal/components/Organization';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { intlObj } from 'utils/commonUtils';

import * as actions from './actions';
import * as selectors from './selectors';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import CarouselWrapper from './carousel.style';
import Carousels from './carousel';
import { MemberStyle } from './memberStyle';
import { Table } from 'semantic-ui-react';
import messages from './messages';

const Carousel = props => (
    <CarouselWrapper>
      <Carousels {...props} />
    </CarouselWrapper>
  );

const style3 = {
  textAlign: 'center',
  fontSize: 10,
  width: '100%',
  color: 'black',
  background: 'orange',
  height: '200px',
}

const noContent = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: '#909090',
  fontSize: '14px'
}

class Members extends PureComponent {
  constructor(props) {
    super(props);

    const { handleLoadingMembers, members } = this.props;

    handleLoadingMembers();

    this.state = {
      show: false,
      selectedUserDeptId: 0,
      selectedMember: {},
    };
  }

  // 구성원을 클릭했을 때 프로필 모달 띄워주기 위한 함수
  onModal = (member) => {
    this.setState({
      show: true,
      selectedUserDeptId: member.DEPT_ID,
      selectedMember: member,
    });
  }

  getUserProfileOrg = () => {
    return (
      <Organization
        show={this.state.show}
        closeModal={this.closeModal}
        userProfile={this.state.selectedMember}
        isProfile={true}
      />
    )
  }

  // 프로필 모달의 종료를 위한 함수
  closeModal = () => {
    this.setState({ show: false });
  }

  onChange = (index,) => {
  };
  getMember = (members, widgetWidth, widgetHeight, widgetView) => {
    let tableCellArr = [];

    members.map((member, index) => {
      tableCellArr.push(
        <Table.Cell key={index}>
          <div className='member'>
            <span className='photoWrapper'>
              <img
                alt='q1'
                src={`/portalWeb/uploadfile/pictures/${member.EMP_NO}.jpg`}
                style={{ width: 50, height:50 }}
                onError={(e) => { e.target.src = '/no_img_pro.jpg'; }}
                onClick={() => { this.onModal(member); }}
              />
            </span>
            <p className="titleText">{member.NAME_KOR}</p>
          </div>
        </Table.Cell>
      );
    });

    if (widgetView !== "Mobile") {
    // 위젯 넓이가 1인 경우
    if (widgetWidth === 1) {
      if(widgetHeight === 1) {
      // tableRow에 들어갈 tableCell의 개수
      const num = 3;
      // tableRow의 총 개수
      const lineNum = Math.ceil(members.length / num);
      // table의 총 개수
      const pageNum = Math.ceil(members.length / 6);

      let tableRowArr = [];
      let tableArr = [];
      let index = 0;

      let tableRowArrBefore = [];
      for(var i = 0 ; i < lineNum ; i ++) {
        for(var j = 0 ; j < num ; j ++) {
          if (index < members.length) {
            tableRowArrBefore.push(tableCellArr[index++]);
            if (j === num - 1 || index === members.length) {
              tableRowArr.push(
                React.createElement(Table.Row, { key: i },
                  tableRowArrBefore
                )              
              );
              tableRowArrBefore = [];
            }
          }
        }
      }

      index = 0;
      let tableArrBefore = [];
      for(var i = 0 ; i < pageNum ; i ++) {
        for(var j = 0 ; j < 2 ; j ++) {
          if (index < tableRowArr.length) {
            tableArrBefore.push(tableRowArr[index++]);
            if (j === 1 || index === tableRowArr.length) {
              tableArr.push(
                React.createElement('div', { className: 'tableDivOneByOne', key: i },
                  React.createElement(Table, { size: 'small', className: 'tableWrapper' },
                    React.createElement(Table.Body, { key: i },
                      tableArrBefore
                    )
                  )
                )
              );
              tableArrBefore = [];
            }
          }
        }
      }
      return tableArr;
    } else if (widgetHeight === 2) {
      // tableRow에 들어갈 tableCell의 개수
      const num = 15;
      // table의 총 개수
      const pageNum = Math.ceil(members.length / num);

      let tableRowArr = [];
      let index = 0;

      let tableRowArrBefore = [];
      for(var i = 0 ; i < pageNum ; i ++) {
        for(var j = 0 ; j < num ; j ++) {
          if (index < members.length) {
            tableRowArrBefore.push(tableCellArr[index++]);
            if (j === num - 1 || index === members.length) {
              tableRowArr.push(
                React.createElement('div', { className: 'tableDivOneByTwo', key: i },
                  React.createElement(Table, { size: 'small', className: 'tableWrapper' },
                    React.createElement(Table.Body, { key: i },
                      React.createElement(Table.Row, { key: i },
                        tableRowArrBefore
                      )
                    )
                  )
                )
              );
              tableRowArrBefore = [];
            }
          }
        }
      }
      return tableRowArr;
    }
    } else if (widgetWidth === 2) {
      // tableRow에 들어갈 tableCell의 개수
      const num = 12;
      // table의 총 개수
      const pageNum = Math.ceil(members.length / num);

      let tableRowArr = [];
      let index = 0;

      let tableRowArrBefore = [];
      for(var i = 0 ; i < pageNum ; i ++) {
        for(var j = 0 ; j < num ; j ++) {
          if (index < members.length) {
            tableRowArrBefore.push(tableCellArr[index++]);
            if (j === num - 1 || index === members.length) {
              tableRowArr.push(
                React.createElement('div', { className: 'tableDivTwoByOne', key: i },
                  React.createElement(Table, { size: 'small', className: 'tableWrapper' },
                    React.createElement(Table.Body, { key: i },
                      React.createElement(Table.Row, { key: i },
                        tableRowArrBefore
                      )
                    )
                  )
                )
              );
              tableRowArrBefore = [];
            }
          }
        }
      }
      return tableRowArr;
    }
  } else {
    if(widgetHeight === 1) {
      // tableRow에 들어갈 tableCell의 개수
      const num = 3;
      // tableRow의 총 개수
      const lineNum = Math.ceil(members.length / num);
      // table의 총 개수
      const pageNum = Math.ceil(members.length / 6);

      let tableRowArr = [];
      let tableArr = [];
      let index = 0;

      let tableRowArrBefore = [];
      for(var i = 0 ; i < lineNum ; i ++) {
        for(var j = 0 ; j < num ; j ++) {
          if (index < members.length) {
            tableRowArrBefore.push(tableCellArr[index++]);
            if (j === num - 1 || index === members.length) {
              tableRowArr.push(
                React.createElement(Table.Row, { key: i },
                  tableRowArrBefore
                )              
              );
              tableRowArrBefore = [];
            }
          }
        }
      }

      index = 0;
      let tableArrBefore = [];
      for(var i = 0 ; i < pageNum ; i ++) {
        for(var j = 0 ; j < 2 ; j ++) {
          if (index < tableRowArr.length) {
            tableArrBefore.push(tableRowArr[index++]);
            if (j === 1 || index === tableRowArr.length) {
              tableArr.push(
                React.createElement('div', { className: 'tableDivOneByOne', key: i },
                  React.createElement(Table, { size: 'small', className: 'tableWrapper' },
                    React.createElement(Table.Body, { key: i },
                      tableArrBefore
                    )
                  )
                )
              );
              tableArrBefore = [];
            }
          }
        }
      }
      return tableArr;
    } else if (widgetHeight === 2) {
      // tableRow에 들어갈 tableCell의 개수
      const num = 15;
      // table의 총 개수
      const pageNum = Math.ceil(members.length / num);

      let tableRowArr = [];
      let index = 0;

      let tableRowArrBefore = [];
      for(var i = 0 ; i < pageNum ; i ++) {
        for(var j = 0 ; j < num ; j ++) {
          if (index < members.length) {
            tableRowArrBefore.push(tableCellArr[index++]);
            if (j === num - 1 || index === members.length) {
              tableRowArr.push(
                React.createElement('div', { className: 'tableDivOneByTwo', key: i },
                  React.createElement(Table, { size: 'small', className: 'tableWrapper' },
                    React.createElement(Table.Body, { key: i },
                      React.createElement(Table.Row, { key: i },
                        tableRowArrBefore
                      )
                    )
                  )
                )
              );
              tableRowArrBefore = [];
            }
          }
        }
      }
      return tableRowArr;
    }
  }
  }

  render() {
    const {
      item,
      members,
    } = this.props;
    const widgetWidth = item.position[2];
    const widgetHeight = item.position[3];
    const widgetView = this.props.view;
    const content = members ? this.getMember(members, widgetWidth, widgetHeight, widgetView) : '';
    let userProfileOrg = [];

    if (this.state.show) {
      userProfileOrg = this.getUserProfileOrg();
    }
    return (
      <MemberStyle className="members">
        { members.length !== 0 ? 
        <div className="carouselWrapper members">
          <Carousel
            arrows
            slidesToShow={1}
            adaptiveHeight
            afterChange={this.onChange}
            infinite={false}
          >
          {content}
          </Carousel>
        </div> :
        <div className="noWidgetWrapper">
          <div className="noWidgetContent">
            <p className="noWCIcon">{intlObj.get(messages.registerService)}</p>
          </div>
        </div>
        }
        {userProfileOrg}
      </MemberStyle>
    );
  }
}

Members.propTypes = {
  item: PropTypes.object.isRequired,
  members: PropTypes.array,
};

Members.defaultProps = {
  members: [],
};

const mapStateToProps = createStructuredSelector({
  members: selectors.makeMembers(),
  view: selectors.currentView(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleLoadingMembers: () => dispatch(actions.loadingMembers()),
  };
}

const withReducer = injectReducer({ key: 'members', reducer });
const withSaga = injectSaga({ key: 'members', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(Members);
