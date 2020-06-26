import React, { Component } from 'react';
import { Select, Input, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import UserSearchModal from 'apps/eshs/common/userSearchModal';

const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);

class ChkInput extends Component {
  state = {
    CHK_YEAR: '',
    CHK_SEQ: '1',
    selectedUser: {},
  };

  componentWillMount() {
    const today = new Date();
    this.setState({ CHK_YEAR: today.getFullYear().toString() });
  };

  componentDidMount() {
    const { sagaKey, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'workAreaList',
        url: `/api/admin/v1/common/categoryMap?MAP_ID=45`,
        type: 'GET',
        params: {},
      }
    ];
    getCallDataHandler(sagaKey, apiAry, () => {});
  };

  onChangeChkSeq = val => {
    this.setState({ CHK_SEQ: val });
  };

  onUserSearchAfter = user => {
    this.setState({ selectedUser: user });
  };

  onSave = () => {
    const { CHK_YEAR, CHK_SEQ, selectedUser } = this.state;
    const { chkTypeCd, chkTypeCdNodeId, sagaKey, submitHandlerBySaga, spinningOn, spinningOff, onSaveAfter, result } = this.props;

    if (selectedUser && Object.keys(selectedUser).length === 0) {
      message.info(<MessageContent>사원을 선택해주세요.</MessageContent>);
      return false;
    }

    const filterArea = result.workAreaList.categoryMapList.filter(cate => cate.NAME_KOR === selectedUser.GTEXT);

    const submitData = {
      saveData: {
        USER_ID: selectedUser.USER_ID,
        EMP_NO: selectedUser.EMP_NO,
        COMP_CD: selectedUser.COMP_CD,
        CHK_YEAR,
        CHK_TYPE_CD: chkTypeCd,
        CHK_TYPE_CD_NODE_ID: chkTypeCdNodeId,
        IS_MATE: '0',
        CHK_SEQ,
        TRIAL_SEQ: 1,
        DEPT_ID: selectedUser.DEPT_ID,
        DEPT_NAME: selectedUser.DEPT_NAME_KOR,
        WORK_AREA_CD: filterArea && filterArea.length === 1 ? filterArea[0].CODE : '',
        WORK_AREA_NAME: selectedUser.GTEXT,
        WORK_AREA_CD_NODE_ID: filterArea && filterArea.length === 1 ? filterArea[0].NODE_ID : -1,
        RCV_ADDR: selectedUser.ADDRESS,
        RCV_PHONE: selectedUser.MOBILE_TEL_NO,
      },
    };

    Modal.confirm({
      title: '등록하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      okText: '등록',
      cancelText: '취소',
      onOk() {
        spinningOn();
        submitHandlerBySaga(sagaKey, 'POST', '/api/eshs/v1/common/health/healthChkTarget', submitData, (id, res) => {
          if (res && res.result) {
            if (res.result === -9) {
              message.info(<MessageContent>이미 대상자로 등록되어 있습니다.</MessageContent>);
            } else if (res.result === 1) {
              message.success(<MessageContent>등록하였습니다.</MessageContent>);
            } else {
              message.error(<MessageContent>등록에 실패하였습니다.</MessageContent>);
            }
          } else {
            message.error(<MessageContent>등록에 실패하였습니다.</MessageContent>);
          }
          spinningOff();
          onSaveAfter();
        });
      }
    });
  };

  render() {
    const { selectedUser } = this.state;

    return (
      <StyledContentsWrapper>
        <StyledCustomSearchWrapper>
          <div className="search-input-area">
            <UserSearchModal onClickRow={this.onUserSearchAfter} />
            {/* <StyledButton className="btn-gray btn-sm">검색</StyledButton> */}
          </div>
        </StyledCustomSearchWrapper>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="10%" />
              <col width="10%" />
              <col width="" />
              <col width="10%" />
              <col width="15%" />
            </colgroup>
            <tbody>
              <tr>
                <th>이름</th>
                <th>사번</th>
                <th>부서</th>
                <th>근무지</th>
                <th>검진차수</th>
              </tr>
              {selectedUser && Object.keys(selectedUser).length > 0 && (
                <tr className="tr-center">
                  <td>{selectedUser.NAME_KOR}</td>
                  <td>{selectedUser.EMP_NO}</td>
                  <td>{selectedUser.DEPT_NAME_KOR}</td>
                  <td>{selectedUser.GTEXT}</td>
                  <td>
                    <AntdSelect defaultValue="1" className="select-sm" style={{ width: 100 }} onChange={val => this.onChangeChkSeq(val)}>
                      <AntdSelect.Option value="1">1차</AntdSelect.Option>
                      <AntdSelect.Option value="2">재검</AntdSelect.Option>
                    </AntdSelect>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </StyledHtmlTable>
        <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
          <StyledButton className="btn-light btn-sm mr5" onClick={this.props.onCancelPopup}>취소</StyledButton>
          <StyledButton className="btn-primary btn-sm" onClick={this.onSave}>등록</StyledButton>
        </StyledButtonWrapper>
      </StyledContentsWrapper>
    );
  }
}

export default ChkInput;