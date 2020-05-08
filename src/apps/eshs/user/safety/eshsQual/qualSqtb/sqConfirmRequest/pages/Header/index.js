import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Input, Modal, message, Popconfirm } from 'antd';

import BizBuilderBase from 'components/BizBuilderBase';

import StyledSearchInput from 'commonStyled/Form/StyledSearchInput';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import StyledContentsModal from 'commonStyled/EshsStyled/Modal/StyledContentsModal';

import SearchListPage from 'apps/eshs/user/safety/eshsQual/qualSqtb/sqConfirmRequest/pages/SearchList';
import ConfirmCheckSheet from 'apps/eshs/user/safety/eshsQual/qualSqtb/ConfirmCheckSheet';
import moment from 'moment';

const AntdModal = StyledContentsModal(Modal);
const AntdSearch = StyledSearchInput(Input.Search);

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchList: [],
      modalVisible: false,
      chkCnt: 0,
    };
  }

  componentDidMount() {
    const {
      sagaKey: id,
      viewPageData: { viewType, taskSeq, getExtraApiData },
    } = this.props;

    if (viewType === '') {
      const apiArray = [
        {
          key: 'chkCnt',
          type: 'POST',
          url: `/api/eshs/v1/common/eshsGetQualChkSheetByTaskSeq/${taskSeq}`,
        },
      ];

      getExtraApiData(id, apiArray, this.appStart);
    }
  }

  appStart = () => {
    const { extraApiData } = this.props;
    const chkCnt = (extraApiData && extraApiData.chkCnt && extraApiData.chkCnt.result) || 0;
    this.setState({ chkCnt });
  };

  handleModalVisible = () => {
    const { modalVisible } = this.state;
    this.setState({
      modalVisible: !modalVisible,
    });
    this.searchListRender();
  };

  modalRowSelected = record => {
    const { sagaKey: id, setFormData, formData } = this.props;
    setFormData(id, { ...formData, REQ_CD: record.REQ_CD, selectRow: { ...record } });
    this.handleModalVisible();
  };

  handleAction = type => {
    const { sagaKey, saveTask, changeViewPage, formData, viewPageData, modifySaveTask, deleteTask, changeFormData } = this.props;
    const { workSeq, taskSeq } = viewPageData;
    const selectTask = (formData && formData.selectRow && formData.selectRow.TASK_SEQ) || 0;
    switch (type) {
      case 'SEARCH':
        if (selectTask) {
          changeViewPage(sagaKey, workSeq, selectTask, 'MODIFY');
        }
        break;
      case 'SEARCH_VIEW':
        if (selectTask) {
          changeViewPage(sagaKey, workSeq, selectTask, 'VIEW');
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
        changeFormData(sagaKey, 'REQ_STATUS', '2');
        modifySaveTask();

        message.warning('SQTB_APPROVAL TABLE 결제라인이 지정되어 있다면');
        message.warning('REQ_STATUS 상태변경 -> 2 ');
        message.warning('및 엄수필(138941), 박동혁(102655), 지종현(103207), 최동길(104375), 이의락(112688), 각팀의 ESH담당자 총6명한테 메일 발송 ');
        message.warning('ELSE 결제라인을 먼저 선택해주십시오 메시지 노출');
        message.warning('개발중인 현재 결제라인 미구현.. 상신시 REQ_STATUS -> 2로 무조건 변경됨');

        /* 
          SQTB_APPROVAL TABLE 결제라인이 지정되어 있다면 
          WBT_SQTB_QUAL TABLE의 REQ_STATUS 상태값 2로 변경및 엄수필(138941), 박동혁(102655), 지종현(103207), 최동길(104375), 이의락(112688), 각팀의 ESH담당자 총6명한테 메일 발송해야함
          결제라인이 지정되어 있지 않으면 '결제라인을 먼저 선택해주십시오' 메시지 노출
          개발중인 현제 결제라인 미구현.. 상신시 REQ_STATUS -> 2로 무조건 변경및 메일발송 미구현
        */

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
    const { chkCnt } = this.state;
    const { sagaKey: id, changeFormData, formData } = this.props;
    const reqDt = (formData && formData.REQ_DT) || undefined;
    const examDt = (formData && formData.EXAM_DT) || undefined;
    const qualComment = (formData && formData.QUAL_COMMENT) || '';
    if (!examDt) return message.warning('검토일자를 지정하여 주십시오.');
    if (reqDt > examDt) return message.warning('검토일자는 신청일자 이후여야 합니다');
    if (qualComment.length > 500) {
      message.warning(`종합의견 문자수는 ${qualComment.length} 자입니다.`);
      return message.warning('500자 이내로 작성하여 주십시오.');
    }

    /* 
    TODO 결제선 구현후 status === '2' 일경우 조건추가
    if (f.conLineCnt.value == 0) {
			alert("결재선을 설정하여 주십시오.");
			return false;
    }
    */

    // 상신시 CheckSheet가 등록되어 있지않다면 상신불가.
    if (status === '2') if (!chkCnt) return message.warning('저장후 [장비ESH CheckSheet등록]을 완료하여주십시오.');
    changeFormData(id, 'APP_STATUS', status);
    if (typeof callBack === 'function') {
      callBack(action);
    }
  };

  handleMakeConfirm = (status, action, callBack) => {
    const { sagaKey: id, formData, setFormData } = this.props;
    setFormData(id, { ...formData, QUAL_STATUS: status, QUAL_DT: moment(new Date()).format('YYYY-MM-DD') });
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
    const QUAL_STATUS = (formData && formData.QUAL_STATUS) || '';
    const isAllconfirm = (formData && formData.isAllconfirm) || false;
    const REQ_STATUS = (formData && formData.REQ_STATUS) || '';

    if (viewType === 'CONFIRM_VIEW') {
      return (
        <>
          <StyledButtonWrapper className="btn-wrap-left btn-wrap-mb-10">
            <AntdSearch
              value={REQ_CD || ''}
              style={{ width: '150px' }}
              readOnly
              onClick={this.handleModalVisible}
              onSearch={this.handleModalVisible}
              className="ant-search-inline input-search-mid mr5"
            />
            <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleAction('SEARCH_VIEW')}>
              검색
            </StyledButton>
          </StyledButtonWrapper>
          <AntdModal title="ESH Qual. 신청번호 검색" visible={modalVisible} width={1000} heigth={600} onCancel={this.handleModalVisible} footer={[null]}>
            {searchList}
          </AntdModal>
        </>
      );
    }

    if (viewType === 'IMPROVE_RESULT') {
      return (
        <>
          <StyledButtonWrapper className="btn-wrap-left btn-wrap-mb-10">
            <AntdSearch
              value={REQ_CD || ''}
              style={{ width: '150px' }}
              readOnly
              onClick={this.handleModalVisible}
              onSearch={this.handleModalVisible}
              className="ant-search-inline input-search-mid mr5"
            />
            <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleAction('SEARCH')}>
              검색
            </StyledButton>
            {!!QUAL_STATUS && QUAL_STATUS !== '2007' && taskSeq > -1 && (
              <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleAction('MODIFY')}>
                저장
              </StyledButton>
            )}
          </StyledButtonWrapper>
          <AntdModal title="ESH Qual. 신청번호 검색" visible={modalVisible} width={1000} heigth={600} onCancel={this.handleModalVisible} footer={[null]}>
            {searchList}
          </AntdModal>
        </>
      );
    }
    if (viewType === 'IMPROVE_CONFIRM') {
      return (
        <>
          <StyledButtonWrapper className="btn-wrap-left btn-wrap-mb-10">
            <AntdSearch
              value={REQ_CD || ''}
              style={{ width: '150px' }}
              readOnly
              onClick={this.handleModalVisible}
              onSearch={this.handleModalVisible}
              className="ant-search-inline input-search-mid mr5"
            />
            <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleAction('SEARCH')}>
              검색
            </StyledButton>
            {QUAL_STATUS !== '2007' && taskSeq > -1 && (
              /*
                QUAL_STATUS 2007 (승인), 2008(조건부승인), 2009(미승인)
                QUAL_STATUS (ESHS Qual 승인. 확인결과 메뉴에서만 [판정] 상태값 변경)
                승인건에 대해서만 COND 데이터 저장가능 - STEP2 개선계획
              */
              <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleAction('MODIFY')}>
                저장
              </StyledButton>
            )}

            {QUAL_STATUS !== '2007' && isAllconfirm && taskSeq > -1 && (
              <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleMakeConfirm('2007', 'MODIFY', this.handleAction)}>
                승인
              </StyledButton>
            )}
          </StyledButtonWrapper>
          <AntdModal title="ESH Qual. 신청번호 검색" visible={modalVisible} width={1000} heigth={600} onCancel={this.handleModalVisible} footer={[null]}>
            {searchList}
          </AntdModal>
        </>
      );
    }

    if (viewType === 'IMPROVE_PLAN') {
      return (
        <>
          <StyledButtonWrapper className="btn-wrap-left btn-wrap-mb-10">
            <AntdSearch
              value={REQ_CD || ''}
              style={{ width: '150px' }}
              readOnly
              onClick={this.handleModalVisible}
              onSearch={this.handleModalVisible}
              className="ant-search-inline input-search-mid mr5"
            />
            <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleAction('SEARCH')}>
              검색
            </StyledButton>
            {QUAL_STATUS !== '2007' && taskSeq > -1 && (
              /*
                QUAL_STATUS 2007 (승인), 2008(조건부승인), 2009(미승인)
                QUAL_STATUS (ESHS Qual 승인. 확인결과 메뉴에서만 [판정] 상태값 변경)
                승인건에 대해서만 COND 데이터 저장가능 - STEP2 개선계획
              */
              <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleAction('MODIFY')}>
                저장
              </StyledButton>
            )}
          </StyledButtonWrapper>
          <AntdModal title="ESH Qual. 신청번호 검색" visible={modalVisible} width={1000} heigth={600} onCancel={this.handleModalVisible} footer={[null]}>
            {searchList}
          </AntdModal>
        </>
      );
    }
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
              className="ant-search-inline input-search-mid mr5"
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
                {/* 저장 / 상신 클릭시 신청일자(REQ_DT) < 검토일자(EXAM_DT) 여야지만 가능 추가하세요 */}
                <ConfirmCheckSheet
                  viewType="INPUT"
                  changeFormData={changeFormData}
                  formData={formData}
                  sagaKey={id}
                  extraApiData={extraApiData}
                  submitExtraHandler={submitExtraHandler}
                  getExtraApiData={getExtraApiData}
                  handelChangeChkCnt={cnt => this.setState({ chkCnt: cnt })}
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
          <AntdModal title="ESH Qual. 신청번호 검색" visible={modalVisible} width={1000} heigth={600} onCancel={this.handleModalVisible} footer={[null]}>
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
            className="ant-search-inline input-search-mid mr5"
          />
          <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleAction('SEARCH')}>
            검색
          </StyledButton>
          {viewType === 'INPUT' && (
            <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleAction('SAVE')}>
              저장
            </StyledButton>
          )}
          {taskSeq !== -1 && REQ_STATUS === '1' && (
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
        <AntdModal title="ESH Qual. 신청번호 검색" visible={modalVisible} width={1000} heigth={600} onCancel={this.handleModalVisible} footer={[null]}>
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
