import React, { Component } from 'react';
import { Input, Table, Row, Col, Icon, Button, TreeSelect } from 'antd';
import StyledButton from 'apps/mdcs/styled/StyledButton';
import PropTypes from 'prop-types';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import Organization from '../../../../../containers/portal/components/Organization';

import Styled from './Styled';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false, // 배포자 선택 모달 On / Off
      selectedDept: {}, // 선택된 부서 정보
      selectedUsers: [], // 선택된 배포유저 정보
      viewType: 'wait', // input Area뷰타입
    };
  }

  componentDidMount() {
    const { getExtraApiData, id, apiArr } = this.props;
    // API 데이터 호출
    getExtraApiData(id, apiArr);
  }

  // 배포자 선택 모달켜기
  onDeptClick = () => {
    this.setState({
      isShow: true,
    });
  };

  // 배포자 선택 모달닫기
  closeSelectAccount = () => {
    this.setState({
      isShow: false,
    });
  };

  // 모달에서 선택한 배포자데이터 state 저장
  getDataFromOrganization = data => {
    this.setState({
      selectedUsers: data.selectedUsers,
    });
  };

  // 트리셀렉터에서 선택한 부서 정보
  onChangeTreeSelect = (value, label) => {
    this.setState({
      selectedDept: {
        deptId: value,
        deptName: label,
      },
    });
  };

  // 수정 / 삭제 / 입력 후 API 데이터 재호출
  reloadApiData = id => {
    const { getExtraApiData, apiArr } = this.props;
    getExtraApiData(id, apiArr);
  };

  // 저장버튼 액션
  onSaveHandle = () => {
    const { id, saveTask, changeFormData, extraApiData, workSeq, deleteTask } = this.props;
    const { selectedDept, selectedUsers } = this.state;
    const { reloadApiData } = this;
    if (selectedDept.deptId === undefined) {
      message.error(<MessageContent>부서를 선택해 주십시오.</MessageContent>, 3);
    } else {
      const pubListData = extraApiData.getInitPubData.pubList;
      const findDeptIdx = pubListData.findIndex(item => item.deptId === selectedDept.deptId);

      // 새로 추가된 부서의 배포관리자를 모두 세이브함
      if (findDeptIdx === -1) {
        selectedUsers.forEach(user => {
          changeFormData(id, 'DEPT_ID', selectedDept.deptId);
          changeFormData(id, 'PUB_USER_ID', user.USER_ID);
          saveTask(id, id, reloadApiData);
        });
      } else {
        const userList = pubListData[findDeptIdx].selectedUsers;

        // 기존 유저중 제거된 유저를 딜리트함
        userList.forEach(item => {
          const findUserId = selectedUsers.findIndex(user => user.USER_ID === item.USER_ID);
          if (findUserId === -1) {
            deleteTask(id, id, workSeq, item.TASK_SEQ, reloadApiData);
          }
        });

        // 기존 유저중 추가된 유저를 세이브함
        selectedUsers.forEach(item => {
          const findUserId = userList.findIndex(user => user.USER_ID === item.USER_ID);
          if (findUserId === -1) {
            changeFormData(id, 'DEPT_ID', selectedDept.deptId);
            changeFormData(id, 'PUB_USER_ID', item.USER_ID);
            saveTask(id, id, reloadApiData);
          }
        });
      }

      this.setState({
        selectedDept: {},
        selectedUsers: [],
        viewType: 'wait',
      });
    }
  };

  modifyHandle = record => {
    this.setState({
      selectedDept: {
        deptId: record.deptId,
        deptName: record.deptName,
      },
      selectedUsers: record.selectedUsers,
      viewType: 'modify',
    });
  };

  // 배포부서(내부인원 전체) 삭제
  deleteHandle = record => {
    const { id, workSeq, deleteTask } = this.props;
    const { reloadApiData } = this;
    const selectedUserList = record.selectedUsers;
    selectedUserList.forEach(user => {
      deleteTask(id, id, workSeq, user.TASK_SEQ, reloadApiData);
    });
    const targetindex = record.deptName.length - 1;
    message.success(<MessageContent>{`${record.deptName[targetindex].NAME_KOR} 을(를) 삭제하였습니다.`}</MessageContent>, 2);
  };

  // 배포부서 내 개별인원 삭제
  deleteOneUser = record => {
    const { id, workSeq, deleteTask } = this.props;
    const { reloadApiData } = this;
    deleteTask(id, id, workSeq, record.TASK_SEQ, reloadApiData);
    message.success(<MessageContent>{`${record.NAME_KOR}(${record.DEPT_NAME_KOR}) 을(를) 삭제하였습니다.`}</MessageContent>, 2);
  };

  // 작성 뷰타입 지정
  editTypeViewHandle = () => {
    this.setState({
      viewType: 'edit',
    });
  };

  // 작성 뷰 취소
  editCancel = () => {
    this.setState({
      selectedDept: {},
      selectedUsers: [],
      viewType: 'wait',
    });
  };

  render() {
    const { extraApiData } = this.props;
    const { isShow, selectedUsers, selectedDept, viewType } = this.state;
    const { onDeptClick, onSaveHandle, onChangeTreeSelect, modifyHandle, deleteHandle, editTypeViewHandle, editCancel, deleteOneUser } = this;

    let editBtnName;
    if (viewType === 'edit') {
      editBtnName = '등록';
    } else if (viewType === 'modify') {
      editBtnName = '수정';
    }

    // 트리데이터를 Antd 트리셀렉터 양식에 맞춰 수정
    const setInfoToTreeData = tree =>
      tree.map(node => {
        const children = node.children ? setInfoToTreeData(node.children) : [];
        return {
          ...node,
          key: node.FULL_PATH,
          title: node.NAME_KOR,
          value: node.DEPT_ID,
          children,
        };
      });

    // antd TreeSelector - 트리 데이터 넣기
    let deptTreeData = [];
    if (Object.prototype.hasOwnProperty.call(extraApiData, 'getDeptTree')) {
      const orginDeptList = JSON.parse(`[${extraApiData.getDeptTree.result.join('')}]`);
      deptTreeData = setInfoToTreeData(orginDeptList);
    }

    // antd table - 데이터를 넣음
    let tableData = [];
    if (Object.prototype.hasOwnProperty.call(extraApiData, 'getInitPubData')) {
      tableData = extraApiData.getInitPubData.pubList;
    }

    // input 에 보여질 포맷으로 변경 ::: 이정현(연구소)
    let selectedUserList = '';
    if (selectedUsers.length > 0) {
      selectedUserList = selectedUsers.flatMap(data => `${data.NAME_KOR}(${data.DEPT_NAME_KOR})`).join(', ');
    }

    // 메인 테이블 컬럼설정
    const columns = [
      {
        title: '부서명',
        dataIndex: 'deptName',
        width: '20%',
        align: 'center',
        render: text => {
          const mainDeptName = text[text.length - 1].NAME_KOR;
          if (text.length > 1) {
            const prntDept = text.slice(0, text.lastIndex);
            const deptPrntPathStr = prntDept.flatMap(currentValue => `${currentValue.NAME_KOR}`).join(' / ');
            return (
              <div className="deptBox">
                <div className="deptFullPath" style={{ fontSize: '12px' }}>
                  ( {`${deptPrntPathStr}`} )
                </div>
                <div className="deptName">{mainDeptName}</div>
              </div>
            );
          }
          return (
            <div className="deptBox">
              <div className="deptName">{mainDeptName}</div>
            </div>
          );
        },
      },
      {
        title: '사용자',
        dataIndex: 'selectedUsers',
        width: '70%',
        align: 'center',
        render: text => (
          <div style={{ display: 'flex' }}>
            {text.map((data, i) => (
              <div className="userBox" key={`userBox_${i}`} style={{ marginRight: '5px' }}>
                {i + 1 < text.length ? (
                  <span>
                    {data.NAME_KOR}({data.DEPT_NAME_KOR}),
                  </span>
                ) : (
                  <span>
                    {data.NAME_KOR}({data.DEPT_NAME_KOR})
                  </span>
                )}
              </div>
            ))}
          </div>
        ),
      },
      {
        title: '편집 / 삭제',
        dataIndex: 'deptId',
        width: '10%',
        align: 'center',
        render: (text, record) => (
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <StyledButton className="btn-primary btn-first" onClick={() => modifyHandle(record)}>
              <Icon type="edit" />
            </StyledButton>
            <StyledButton className="btn-light" onClick={() => deleteHandle(record)}>
              <Icon type="delete" />
            </StyledButton>
          </div>
        ),
      },
    ];

    // 확장 테이블 설정 및 렌더
    const expandedRowRender = (record, index) => {
      const expandedColumns = [
        { title: '이름', width: '15%', align: 'center', key: `pub_user_name_${index}`, render: text => <div>{text.NAME_KOR}</div> },
        { title: '소속부서', width: '20%', align: 'center', key: `pub_user_dept_${index}`, render: text => <div>{text.DEPT_NAME_KOR}</div> },
        {
          title: '연락처',
          width: '15%',
          align: 'center',
          key: `pub_user_mobile_${index}`,
          render: text => <div>{text.MOBILE_TEL_NO === null ? '등록된 연락처가 없습니다.' : text.MOBILE_TEL_NO}</div>,
        },
        {
          title: '이메일',
          width: '20%',
          align: 'center',
          key: `pub_user_email_${index}`,
          render: text => <div>{text.EMAIL === null ? '등록된 이메일이 없습니다' : text.EMAIL}</div>,
        },
        { title: '최초 등록일', width: '10%', align: 'center', key: `pub_user_regDate_${index}`, render: text => <div>{text.REG_DATE}</div> },
        { title: '최종 수정일', width: '10%', align: 'center', key: `pub_user_uptDate_${index}`, render: text => <div>{text.UPD_DATE}</div> },
        {
          title: '삭제',
          width: '10%',
          align: 'center',
          key: `pub_user_delete_${index}`,
          render: record => (
            <>
              <StyledButton className="btn-light" onClick={() => deleteOneUser(record)}>
                <Icon type="close" />
              </StyledButton>
            </>
          ),
        },
      ];
      return <Table rowKey="PUB_USER_LIST" pagination={false} columns={expandedColumns} dataSource={record.selectedUsers} />;
    };

    return (
      <div>
        <Styled className="DocPubMgrListWrap">
          <Row>
            <Col>
              <Row claaName="editArea" style={{ borderBottom: '1px solid #e8e8e8', paddingBottom: '10px' }}>
                <Col span={1} className="titleArea">
                  <span>부서</span>
                </Col>
                <Col span={5} className="inputArea">
                  {viewType === 'wait' ? (
                    <TreeSelect
                      style={{ width: '-webkit-fill-available' }}
                      value={selectedDept.deptId}
                      disabled
                      scroll={{ x: true, y: 20 }}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      treeData={deptTreeData}
                      placeholder="Please select"
                      onChange={(value, label) => onChangeTreeSelect(value, label)}
                    />
                  ) : (
                    <TreeSelect
                      style={{ width: '-webkit-fill-available' }}
                      value={selectedDept.deptId}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      treeData={deptTreeData}
                      scroll={{ x: true, y: 20 }}
                      placeholder="Please select"
                      onChange={(value, label) => onChangeTreeSelect(value, label)}
                    />
                  )}
                </Col>
                <Col span={2} className="titleArea">
                  <span>배포 담당자</span>
                </Col>
                <Col span={16} className="inputArea">
                  <div claaName="inputBtnGroup" style={{ display: 'flex' }}>
                    {viewType === 'wait' ? (
                      <>
                        <div style={{ width: '85%' }}>
                          <Input placeholder="사용자(부서)" disabled value={selectedUserList} onClick={onDeptClick} readOnly />
                        </div>
                        <div style={{ width: '25%', textAlign: 'center' }}>
                          <StyledButton className="btn-primary btn-first" onClick={() => editTypeViewHandle()}>
                            <span>등록</span>
                          </StyledButton>
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{ width: '85%' }}>
                          <Input placeholder="사용자(부서)" value={selectedUserList} onClick={onDeptClick} readOnly />
                        </div>
                        {viewType === 'edit' ? (
                          <div style={{ width: '25%', textAlign: 'center' }}>
                            <StyledButton className="btn-primary btn-first" onClick={() => onSaveHandle()}>
                              <Icon type="check" />
                              {editBtnName}
                            </StyledButton>
                            <StyledButton className="btn-light" onClick={() => editCancel()}>
                              <Icon type="close" />
                              <span>취소</span>
                            </StyledButton>
                          </div>
                        ) : (
                          <div style={{ width: '25%', textAlign: 'center' }}>
                            <StyledButton className="btn-primary btn-first" onClick={() => onSaveHandle()}>
                              <Icon type="check" />
                              <span>{editBtnName}</span>
                            </StyledButton>
                            <StyledButton className="btn-light" onClick={() => editCancel()}>
                              <Icon type="close" />
                              <span>취소</span>
                            </StyledButton>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <div className="tableArea">
                    <Table rowKey="TASK_SEQ" pagination={false} columns={columns} dataSource={tableData} expandedRowRender={expandedRowRender} />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Styled>
        <Organization
          show={isShow}
          userTab
          closeModal={this.closeSelectAccount}
          selectedUsers={selectedUsers}
          checkedDept={[]}
          checkedPstn={[]}
          checkedDuty={[]}
          checkedGrp={[]}
          onlyUser
          getDataFromOrganization={this.getDataFromOrganization}
        />
      </div>
    );
  }
}

List.propTypes = {
  id: PropTypes.string,
  getExtraApiData: PropTypes.func,
  extraApiData: PropTypes.object,
  workSeq: PropTypes.number,
  apiArr: PropTypes.array,
  deleteTask: PropTypes.func,
  changeFormData: PropTypes.func,
  saveTask: PropTypes.func,
};

export default List;
