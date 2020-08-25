import * as PropTypes from 'prop-types';
import React from 'react';
import { Modal, Card } from 'antd';
import { EditFilled } from '@ant-design/icons';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import UserSelectComp from 'components/UserSelect';
import UserSearchModal from 'apps/eshs/common/userSearchModal/ModalContent';
const AntdModal = StyledAntdModal(Modal);

const cardStyle = {
  width: '30%',
  textAlign: 'center',
  display: 'inline-block',
};

class MultiUserSelectComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalObj: {
        title: '',
        visible: false,
        content: [],
      },
      firstUsrs: Array.isArray(this.props.userList) ? this.props.userList.filter(user => user.GUBUN === '1') : [],
      secondUsers: Array.isArray(this.props.userList) ? this.props.userList.filter(user => user.GUBUN === '2') : [],
    };
  }

  changeModalObj = (title = '', visible = false, content = []) => this.setState({ modalObj: { title, visible, content } });

  onUserSelectedComplete = (target, users = []) =>
    this.setState(
      {
        [target]: users,
      },
      this.changeModalObj,
    );

  send = () => {
    const { selectedMultiUserSave } = this.props;
    const { firstUsrs, secondUsers } = this.state;

    const sendUsers = [];

    firstUsrs.forEach(user => {
      sendUsers.push({ ...user, GUBUN: '1' });
    });

    secondUsers.forEach(user => {
      sendUsers.push({ ...user, GUBUN: '2' });
    });
    return selectedMultiUserSave(sendUsers);
  };

  editOnclick = (target, userId) =>
    this.changeModalObj('사원 검색', true, [
      <UserSearchModal
        key="userSearchModal"
        visible
        onClickRow={data => {
          if (data.USER_ID === userId) return this.changeModalObj();
          return this.setState(
            prevState => ({
              [target]: prevState[target].map(user => (user.USER_ID === userId ? data : user)),
            }),
            this.changeModalObj,
          );
        }}
      />,
    ]);

  render() {
    const { modalObj, firstUsrs, secondUsers } = this.state;
    return (
      <>
        <StyledContentsWrapper>
          <StyledHtmlTable>
            <table className="table-border">
              <colgroup>
                <col width="50%" />
                <col width="50%" />
              </colgroup>
              <thead>
                <tr>
                  <th colSpan={2} align="center">
                    <b>선택한 전달자에게 메일을 발송하고 이 요청서의 처리권한을 부여 합니다.</b>
                    {this.props.btnVisible ? (
                      <StyledButton className="btn-primary btn-sm ml5" onClick={this.send}>
                        전송
                      </StyledButton>
                    ) : (
                      ''
                    )}
                  </th>
                </tr>
                <tr>
                  <th>
                    <StyledButton
                      className="btn-primary btn-sm ml5"
                      onClick={() =>
                        this.changeModalObj('복수 지정', true, [
                          <UserSelectComp
                            maxSelected={6}
                            onCancel={() => this.changeModalObj()}
                            initUserList={firstUsrs.map(user => user.USER_ID)}
                            onUserSelectHandler={() => undefined}
                            onUserSelectedComplete={users => this.onUserSelectedComplete('firstUsrs', users)}
                            onUserDelete={() => undefined}
                          />,
                        ])
                      }
                    >
                      1차 전달자 선택
                    </StyledButton>
                  </th>
                  <th>
                    <StyledButton
                      className="btn-primary btn-sm ml5"
                      onClick={() =>
                        this.changeModalObj('복수 지정', true, [
                          <UserSelectComp
                            maxSelected={6}
                            onInitComplete={userList => console.debug(userList)}
                            onCancel={() => this.changeModalObj()}
                            initUserList={[]}
                            onUserSelectHandler={userList => console.debug(userList)}
                            onUserSelectedComplete={users => this.onUserSelectedComplete('secondUsers', users)}
                            onUserDelete={userList => console.debug(userList)}
                          />,
                        ])
                      }
                    >
                      2차 전달자 선택
                    </StyledButton>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ height: '250px' }}>
                  <td align="center">
                    {firstUsrs.length ? (
                      firstUsrs.map(user => (
                        <Card
                          key={user.USER_ID}
                          title={<p style={{ fontSize: '12px', fontWeight: '500', color: '#0000ff' }}>{`${user.NAME_KOR} ${user.PSTN_NAME_KOR || ''}`}</p>}
                          size="small"
                          extra={
                            user.VISIBILITY === '1' && (
                              <EditFilled
                                onClick={() => this.editOnclick('firstUsrs', user.USER_ID)}
                                style={{ fontSize: '10px', verticalAlign: 'middle', marginLeft: '5px' }}
                              />
                            )
                          }
                          style={{ ...cardStyle, backgroundColor: user.FINAL_FLAG === '1' ? '#FBC669' : '' }}
                        >
                          <p style={{ fontSize: '12px' }}>{user.DEPT_NAME_KOR}</p>
                          <p style={{ fontSize: '12px' }}>{user.EMP_NO}</p>
                        </Card>
                      ))
                    ) : (
                      <p style={{ fontSize: '12px', fontWeight: '500', color: '#0000ff' }}>선택된 사용자가 없습니다.</p>
                    )}
                  </td>
                  <td align="center">
                    {secondUsers.length ? (
                      secondUsers.map(user => (
                        <Card
                          key={user.USER_ID}
                          title={<p style={{ fontSize: '12px', fontWeight: '500', color: '#0000ff' }}>{`${user.NAME_KOR} ${user.PSTN_NAME_KOR || ''}`}</p>}
                          size="small"
                          extra={
                            user.VISIBILITY === '1' && (
                              <EditFilled
                                onClick={() => this.editOnclick('secondUsers', user.USER_ID)}
                                style={{ fontSize: '10px', verticalAlign: 'middle', marginLeft: '5px' }}
                              />
                            )
                          }
                          style={{ ...cardStyle, backgroundColor: user.FINAL_FLAG === '1' ? '#FBC669' : '' }}
                        >
                          <p style={{ fontSize: '12px' }}>{user.DEPT_NAME_KOR}</p>
                          <p style={{ fontSize: '12px' }}>{user.EMP_NO}</p>
                        </Card>
                      ))
                    ) : (
                      <p style={{ fontSize: '12px', fontWeight: '500', color: '#0000ff' }}>선택된 사용자가 없습니다.</p>
                    )}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2} align="center">
                    <div
                      style={{
                        backgroundColor: '#FBC669',
                        display: 'inline-block',
                        width: '30px',
                        height: '18px',
                        marginRight: '5px',
                        verticalAlign: 'middle',
                      }}
                    ></div>
                    <b style={{ verticalAlign: 'middle' }}>요청서를 수신한 사원</b>
                  </td>
                </tr>
              </tfoot>
            </table>
          </StyledHtmlTable>
        </StyledContentsWrapper>
        <AntdModal title={modalObj.title || ''} visible={modalObj.visible} width={1000} onCancel={() => this.changeModalObj()} footer={null} destroyOnClose>
          {modalObj.content}
        </AntdModal>
      </>
    );
  }
}

MultiUserSelectComp.propTypes = {
  userList: PropTypes.array,
  selectedMultiUserSave: PropTypes.func,
  btnVisible: PropTypes.bool,
};

MultiUserSelectComp.defaultProps = {
  userList: [],
  selectedMultiUserSave: () => {},
  btnVisible: false,
};

export default MultiUserSelectComp;
