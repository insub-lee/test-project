import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Input, Modal, message, Popconfirm } from 'antd';

import BizBuilderBase from 'components/BizBuilderBase';

import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';

import StyledSearchInput from 'commonStyled/Form/StyledSearchInput';

import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import SearchListPage from 'apps/eshs/user/qualSqtb/sqConfirmRequest/pages/SearchList';
import StyledContentsModal from 'commonStyled/EshsStyled/Modal/StyledContentsModal';

import ConfirmCheckSheet from 'apps/eshs/user/qualSqtb/ConfirmCheckSheet';
const AntdModal = StyledContentsModal(Modal);

const AntdSearch = StyledSearchInput(Input.Search);

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchList: [],
      modalVisible: false,
    };
  }

  componentDidMount() {}

  handleModalVisible = () => {
    const { modalVisible } = this.state;
    this.setState({
      modalVisible: !modalVisible,
    });
    this.searchListRender();
  };

  modalRowSelected = record => {
    const { sagaKey: id, setFormData, formData } = this.props;
    console.debug('record 1111 ', record);
    setFormData(id, { ...formData, REQ_CD: record.REQ_CD, selectRow: { ...record } });
    this.handleModalVisible();
  };

  handleAction = type => {
    const { sagaKey, saveTask, changeViewPage, formData, viewPageData, modifySaveTask, deleteTask } = this.props;
    const { workSeq, taskSeq } = viewPageData;
    const selectTask = (formData && formData.selectRow && formData.selectRow.TASK_SEQ) || 0;
    switch (type) {
      case 'SEARCH':
        if (selectTask) {
          changeViewPage(sagaKey, workSeq, selectTask, 'MODIFY');
        }
        break;
      case 'SAVE':
        saveTask();
        break;
      case 'CONFIRM_LINE':
        message.warning('미구현');
        break;
      case 'DELETE':
        deleteTask(sagaKey, sagaKey, workSeq, taskSeq, changeViewPage);
        break;
      case 'MODIFY':
        modifySaveTask();
        break;
      case '상신':
        message.warning('미구현');
        break;
      default:
        break;
    }
  };

  searchListRender = () => {
    const { modalVisible } = this.state;
    const searchList = [];
    if (!modalVisible) {
      searchList.push(
        <BizBuilderBase
          key="qualSearchList"
          sagaKey="qualSearchList"
          workSeq={5561}
          viewType="LIST"
          loadingComplete={this.loadingComplete}
          CustomListPage={SearchListPage}
          listMetaSeq={5584}
          customOnRowClick={record => this.modalRowSelected(record)}
        />,
      );
    }
    this.setState({ searchList });
  };

  handleConfirmProcess = (status, action, callBack) => {
    const { sagaKey: id, formData, changeFormData } = this.props;
    changeFormData(id, 'APP_STATUS', status);
    if (typeof callBack === 'function') {
      callBack(action);
    }
  };

  render() {
    const { searchList, modalVisible } = this.state;
    const {
      formData,
      viewPageData: { viewType, taskSeq },
      sagaKey: id,
      extraApiData,
      getExtraApiData,
      changeFormData,
      submitExtraHandler,
    } = this.props;
    const REQ_CD = (formData && formData.REQ_CD) || '';
    const APP_STATUS = (formData && formData.APP_STATUS) || '';
    if (viewType === 'CONFIRM_RESULT') {
      return (
        <>
          <StyledButtonWrapper className="btn-wrap-left btn-wrap-mb-10">
            <AntdSearch
              value={REQ_CD || ''}
              style={{ width: '150px' }}
              readOnly
              onClick={this.handleModalVisible}
              onSearch={this.handleModalVisible}
              className="ant-input-inline mr5"
            />
            <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleAction('SEARCH')}>
              검색
            </StyledButton>
            {((taskSeq !== -1 && REQ_CD !== '' && !APP_STATUS) || APP_STATUS === '1') && (
              /* AS_IS 
                if (!"".equals(qualConfirm.getReqCd()) && ("".equals(qualConfirmResult.getAppStatus()) || "1".equals(qualConfirmResult.getAppStatus()))) {
                    <IMG align="absMiddle" onClick="save(1)" src="../../image/b_save2.gif" style="CURSOR: hand"> -- 저장
										<IMG align="absMiddle" onClick="setConfirmLine()" src="../../image/b_appline2.gif" style="CURSOR: hand"> -- 결제선 지정
										<IMG align="absMiddle" onClick="save(2)" src="../../image/button2_update.gif" style="CURSOR: hand"> -- 상신
										<IMG align="absMiddle" onClick="goChkSheet()" src="../../image/checksheet_regist.gif" style="CURSOR: hand"> -- checkSheet 수정가능
                  }
                if ("3".equals(qualConfirmResult.getAppStatus())){
										<IMG align="absMiddle" onClick="goChkSheetview()" src="../../image/checksheet_search.gif" style="CURSOR: hand"> -- checkSheet 수정불가
									}
              */
              <>
                <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleConfirmProcess('1', 'MODIFY', this.handleAction)}>
                  저장
                </StyledButton>
                <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleConfirmProcess('2', 'MODIFY', this.handleAction)}>
                  상신
                </StyledButton>
                <ConfirmCheckSheet
                  viewType="INPUT"
                  changeFormData={changeFormData}
                  formData={formData}
                  sagaKey={id}
                  extraApiData={extraApiData}
                  submitExtraHandler={submitExtraHandler}
                  getExtraApiData={getExtraApiData}
                />
              </>
            )}
            {APP_STATUS === '3' && (
              <ConfirmCheckSheet
                viewType="VIEW"
                changeFormData={changeFormData}
                formData={formData}
                sagaKey={id}
                extraApiData={extraApiData}
                submitExtraHandler={submitExtraHandler}
                getExtraApiData={getExtraApiData}
              />
            )}
          </StyledButtonWrapper>
          <AntdModal title="ESH Qual. 신청번호 검색" visible={modalVisible} width={1300} heigth={600} onCancel={this.handleModalVisible} footer={[null]}>
            {searchList}
          </AntdModal>
        </>
      );
    }
    return (
      <>
        <StyledButtonWrapper className="btn-wrap-left btn-wrap-mb-10">
          <AntdSearch
            value={REQ_CD || ''}
            style={{ width: '150px' }}
            readOnly
            onClick={this.handleModalVisible}
            onSearch={this.handleModalVisible}
            className="ant-input-inline mr5"
          />
          <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleAction('SEARCH')}>
            검색
          </StyledButton>
          {viewType === 'INPUT' ? (
            <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleAction('SAVE')}>
              저장
            </StyledButton>
          ) : (
            <>
              <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleAction('MODIFY')}>
                저장
              </StyledButton>
              <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleAction('CONFIRM_LINE')}>
                결제선지정
              </StyledButton>
              <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleAction('상신')}>
                상신
              </StyledButton>
              <Popconfirm title="정말 삭제하시겠습니까?" onConfirm={() => this.handleAction('DELETE')} okText="확인" cancelText="취소">
                <StyledButton className="btn-primary btn-sm">삭제</StyledButton>
              </Popconfirm>
            </>
          )}
        </StyledButtonWrapper>
        <AntdModal title="ESH Qual. 신청번호 검색" visible={modalVisible} width={1300} heigth={600} onCancel={this.handleModalVisible} footer={[null]}>
          {searchList}
        </AntdModal>
      </>
    );
  }
}

// <IMG align="absMiddle" onClick="search()" src="../../image/b_search.gif" style="CURSOR: hand">           -- 검색

//  신청자만 저장,결재선, 상신 가능
// if (ses_empNo.equals(reqEmpNo) || "".equals(reqEmpNo)) {
//       if ("".equals(qualConfirm.getReqCd())
//           || "1".equals(qualConfirm.getReqStatus())) {
//             <IMG align="absMiddle" onClick="save()" src="../../image/b_save2.gif" style="CURSOR: hand">   -- 저장
//     }
//       if (!"".equals(qualConfirm.getReqCd())
//           && ("".equals(qualConfirm.getReqStatus()) || "1"
//               .equals(qualConfirm.getReqStatus()))) {
//             <IMG align="absMiddle" onClick="setConfirmLine()" src="../../image/b_appline2.gif" style="CURSOR: hand">   -- 결제선 지정
//             <IMG align="absMiddle" id="updatebtn" onClick="requestUpdate()" src="../../image/button2_update.gif" style="CURSOR: hand"> -- 수정
//       }
//     }
//   <!--IMG align="absMiddle" onClick="javascript:goURL('./SQ_EquipMgt_W.jsp','800','600',3)" src="../../image/b_equipmgt.gif" style="CURSOR: hand"-->
//     //ESH Qual 관리자는 Qual 문서 삭제 가능
//     if (Integer.parseInt(ses_sqAuth) <= 20) {
//     <!--IMG align="absMiddle" onClick="" src="../../image/b_delete.gif" style="CURSOR: hand"-->
//     <jsp:include page="SQ_DelReqCd_In.jsp" flush="true">
//      <jsp:param name="req_cd" value="<%=reqCd%>" />   -- 삭제
//     </jsp:include>
// }

Header.propTypes = {
  formData: PropTypes.object,
  setFormData: PropTypes.func,
  sagaKey: PropTypes.string,
  saveTask: PropTypes.func,
  changeViewPage: PropTypes.func,
  viewPageData: PropTypes.object,
  modifySaveTask: PropTypes.func,
  deleteTask: PropTypes.func,
  extraApiData: PropTypes.object,
  getExtraApiData: PropTypes.func,
  changeFormData: PropTypes.func,
  submitExtraHandler: PropTypes.func,
};
Header.defaultProps = {
  formData: {},
  setFormData: () => {},
  sagaKey: '',
  saveTask: () => {},
  changeViewPage: () => {},
  viewPageData: {},
  modifySaveTask: () => {},
  deleteTask: () => {},
  extraApiData: {},
  getExtraApiData: () => {},
  changeFormData: () => {},
  submitExtraHandler: () => {},
};

export default Header;
