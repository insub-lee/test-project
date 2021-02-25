import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from 'components/BizBuilderBase';
import customList from 'apps/eshs/admin/environment/air/stack/List';
import moment from 'moment';

import { Input, Modal, Tabs, Popconfirm } from 'antd';

import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledAntdModal from 'components/BizBuilder/styled//Modal/StyledAntdModal';
import StyledAntdModalPad from 'components/BizBuilder/styled//Modal/StyledAntdModalPad';
import { callBackAfterPost, callBackAfterPut, callBackAfterDelete } from 'apps/eshs/common/submitCallbackFunc';

import AdminMain from './AdminMain';
import SubList from './SubList';
import ReAppriseList from '../ReAppriseList';

const AntdSearchInput = StyledSearchInput(Input.Search);
const AntdModal = StyledAntdModal(Modal);
const AntdModalPad = StyledAntdModalPad(Modal);
const dangerRank = value => {
  let returnValue;
  if (value >= 16) returnValue = 'A';
  else if (value >= 12) returnValue = 'B';
  else if (value >= 9) returnValue = 'C';
  else if (value === 8) returnValue = 'D';
  else if (value >= 4) returnValue = 'E';
  else returnValue = 'F';
  return returnValue;
};
const { TabPane } = Tabs;
moment.locale('ko');

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      revisionReRendering: true,
      selectedRecord: {},
      userSearchComp:[],
    };
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandler, improveDanger } = this.props;
    const apiAry = [
      {
        key: 'dangerInfoModalDataList',
        type: 'GET',
        url: '/api/eshs/v1/common/eshsDanger',
      },
      {
        key: 'dangerInfoSelectList',
        type: 'POST',
        url: '/api/admin/v1/common/categoryChildrenListUseYn',
        params: { PARAM: { NODE_ID: 1831, USE_YN: 'Y' } },
      },
    ];
    getCallDataHandler(id, apiAry, this.initData);
    if (improveDanger) {
      this.selectedModal(improveDanger);
    }
  }

  componentWillUnmount() {
    const { sagaKey: id, removeReduxState } = this.props;
    removeReduxState(id);
  }


  initData = () => {
    const {
      result: { dangerInfoModalDataList, dangerInfoSelectList },
    } = this.props;
    const dangerInfoModalData = dangerInfoModalDataList && dangerInfoModalDataList.list;
    const dangerInfoSelect = dangerInfoSelectList && dangerInfoSelectList.categoryMapList && dangerInfoSelectList.categoryMapList.filter(f => f.LVL === 7);
    this.setState({ dangerInfoModalData, dangerInfoSelect });
  };

  search = () => {
    this.dangerData();
  };

  hazardModal = () => {
    const { isModal } = this.state;
    this.setState({ isModal: !isModal });
  };

  reAppriseModal = () => {
    const { isModalReApprise } = this.state;
    this.setState({ isModalReApprise: !isModalReApprise });
  };

  selecteRow = record => {
    this.setState({ selectedRecord: record, regNo: record.REG_NO }, this.hazardModal);
  };

  selectedModal = record => {
    const { isModal } = this.state;
    this.setState({ selectedRecord: record, regNo: record.REG_NO, isModal: record.IMPROVE ? isModal : !isModal }, this.handleSearch);
  };

  handleSearch = () => {
    const { sagaKey: id, getCallDataHandler, spinningOn } = this.props;
    const { selectedRecord } = this.state;
    if (JSON.stringify(selectedRecord) === '{}') return message.info(<MessageContent>등록번호를 먼저 선택해주십시오.</MessageContent>);
    spinningOn();
    const apiAry = [
      {
        key: 'dangerInfo',
        type: 'POST',
        url: '/api/eshs/v1/common/eshsBuilderCustomSearch/10341',
        params: {
          PARAM: {
            whereString: [`AND TO_CHAR(W.REG_DTTM , 'YYYY') = '${moment(selectedRecord.REG_DTTM).format('YYYY')}'`],
          },
        },
      },
      {
        key: 'safetyImprove',
        type: 'POST',
        url: '/api/eshs/v1/common/eshsBuilderCustomSearch/5262',
        params: {
          PARAM: {
            whereString: [`AND W.DA_REG_NO = '${selectedRecord.REG_NO}'`],
          },
        },
      },
      {
        key: 'dangerDanestAdmin',
        type: 'GET',
        url: `/api/eshs/v1/common/dangerDanestAdmin?REG_NO=${selectedRecord.REG_NO}`,
      },
    ];
    return getCallDataHandler(id, apiAry, this.dangerData);
  };

  dangerData = () => {
    const {
      result: { dangerInfo, dangerDanestAdmin, safetyImprove },
      spinningOff,
    } = this.props;
    if (dangerDanestAdmin && dangerDanestAdmin.list && dangerDanestAdmin.list.length <= 0) {
      spinningOff();
      message.info(<MessageContent>검색된 데이터가 없습니다.</MessageContent>);
    } else {
      this.setState(
        {
          dangerInfo: dangerInfo && dangerInfo.list,
          safetyImprove: (safetyImprove && safetyImprove.list) || [],
          dangerDanestAdmin: (dangerDanestAdmin && dangerDanestAdmin.list) || [],
          dangerDanestAdminSub: (dangerDanestAdmin && dangerDanestAdmin.subList) || [],
          dangerDanestAdminSubFile: (dangerDanestAdmin && dangerDanestAdmin.fileList) || [],
          reAppriseList: (dangerDanestAdmin && dangerDanestAdmin.reAppriseList) || [],
          tempfile: [],
          revisionReRendering: true,
        },
        spinningOff,
      );
    }
  };

  onChangeAdmin = (name, value, record) => {
    const { dangerDanestAdmin } = this.state;
    const change = dangerDanestAdmin.map(changeData => (changeData.DA_REG_NO === record.DA_REG_NO ? { ...changeData, [name]: value } : { ...changeData }));
    this.setState({ dangerDanestAdmin: change });
  };

  onChangeAdminSub = (name, value, record) => {
      const { dangerDanestAdminSub } = this.state;
      const change = dangerDanestAdminSub.map(changeData =>
        changeData.DA_REG_NO === record.DA_REG_NO && changeData.SEQ === record.SEQ ? { ...changeData, [name]: value } : { ...changeData },
      );
      this.setState({ dangerDanestAdminSub: change });
  
  };

  onChangeManager = (userRecord, record) => {
    const { dangerDanestAdmin } = this.state;
    const temp = dangerDanestAdmin.map(changeData =>
      changeData.DA_REG_NO === record.DA_REG_NO
        ? { ...changeData, DEPT_MANAGER: userRecord.USER_ID, DEPT_MANAGER_NM: userRecord.NAME_KOR, DEPT_MANAGER_ID: userRecord.USER_ID }
        : { ...changeData},
    );
    this.setState({ dangerDanestAdmin: temp });
  };

  onFileUploadTemp = (name, obj, record) => {
    const { dangerDanestAdminSub, tempfile } = this.state;
    const change = dangerDanestAdminSub.map(changeData =>
      changeData.DA_REG_NO === record.DA_REG_NO && changeData.SEQ === record.SEQ
        ? {
            ...changeData,
            file: Array.isArray(changeData.file) ? [...changeData.file, obj] : [obj],
          }
        : {
            ...changeData,
          },
    );
    const temp = tempfile || [];
    const tempfileConcat = temp.concat({ ...obj, DANEST_SUB_SEQ: record.UNIQUE_SEQ, REG_NO: record.REG_NO, DA_REG_NO: record.DA_REG_NO });
    this.setState({ dangerDanestAdminSub: change, tempfile: tempfileConcat });
  };

  updateDanest = daRegNo => {
    const { sagaKey: id, submitHandlerBySaga, spinningOn, spinningOff } = this.props;
    const { dangerDanestAdmin, dangerDanestAdminSub, tempfile } = this.state;
    const submitFind = dangerDanestAdmin.find(findItem => findItem.DA_REG_NO === daRegNo);
    const submitFindSub = dangerDanestAdminSub.filter(findItem => findItem.DA_REG_NO === daRegNo).map(item => ({ ...item, WORK_NM: item.DANGFACT }));
    const submitData = { PARAM: { ...submitFind, DANEST_SUB_LIST: submitFindSub } };
    const msg     = this.validationCheck(submitFind);
    //const msglist = this.validationListCheck(submitFindSub);
    //console.debug('submitFindSub', submitFindSub);
    
    if (msg) {
      message.error(msg);
      return false;
    } 

    /*if (msglist) {
      message.error(msglist);
      return false;
    } */ 
    spinningOn();
    if (tempfile && tempfile.length) {
      submitHandlerBySaga(id, 'POST', '/upload/moveFileToReal', { PARAM: { DETAIL: tempfile } }, (afterId, res) => {
        if (res && res.message === 'success') {
          submitHandlerBySaga(
            id,
            'PUT',
            `/api/eshs/v1/common/dangerDanestAdmin`,
            { PARAM: { ...submitFind, DANEST_SUB_LIST: submitFindSub, FILE_LIST: res.DETAIL } },
            (key, response) => callBackAfterPut(key, response, this.callbackDataSet),
          );
        } else {
          spinningOff();
          message.info(<MessageContent>파일저장에 실패하였습니다.</MessageContent>);
        }
      });
    } else {
      submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/dangerDanestAdmin`, submitData, (key, response) =>
        callBackAfterPut(key, response, this.callbackDataSet),
      );
    }
  };

  onSave = daRegNo => {
    const { sagaKey: id, submitHandlerBySaga, spinningOn, spinningOff } = this.props;
    const { dangerDanestAdmin, dangerDanestAdminSub, tempfile } = this.state;
    const submitFind = dangerDanestAdmin.find(findItem => findItem.DA_REG_NO === daRegNo);
    const submitFindSub = dangerDanestAdminSub.filter(findItem => findItem.DA_REG_NO === daRegNo).map(item => ({ ...item, WORK_NM: item.DANGFACT }));
    const submitData = { PARAM: { ...submitFind, DANEST_SUB_LIST: submitFindSub , SAVE:'Y'} };
    const msg     = this.validationCheck(submitFind);
    const msglist = this.validationListCheck(submitFindSub);

    //console.log("submitData", submitData);
    if (msg) {
      message.error(msg);
      return false;
    } 
    if (msglist) {
      message.error(msglist);
      return false;
    }  
    spinningOn();
    submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/dangerDanestAdmin`, submitData, (key, response) =>
     callBackAfterPut(key, response, this.callbackDataSet),
    );
 
  };

  revisionDanest = daRegNo => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { dangerDanestAdminSub } = this.state;
    this.setState({ revisionReRendering: false }); // revsion 사용 시 필드에 defaultValue 초기화용
    const submitFindSub = dangerDanestAdminSub.filter(findItem => findItem.DA_REG_NO === daRegNo);
    const submitData = { PARAM: { REVISION_LIST: submitFindSub } };
    submitHandlerBySaga(id, 'POST', `/api/eshs/v1/common/dangerDanestAdmin`, submitData, (key, response) =>
      callBackAfterPost(key, response, this.callbackDataSet),
    );
  };

  callbackDataSet = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const { regNo } = this.state;
    const apiAry = [
      {
        key: 'dangerDanestAdmin',
        type: 'GET',
        url: `/api/eshs/v1/common/dangerDanestAdmin?REG_NO=${regNo}`,
      },
    ];
    getCallDataHandler(id, apiAry, this.dangerData);
  };

  UploadTempFilesDel = seq => {
    const { dangerDanestAdminSub, tempfile } = this.state;
    const deleteItem = dangerDanestAdminSub.map(deleteData =>
      deleteData.file
        ? {
            ...deleteData,
            file: deleteData.file.filter(filter => Number(filter.seq) !== Number(seq)),
          }
        : {
            ...deleteData,
          },
    );
    const temp = tempfile || [];
    const tempfileConcat = temp.filter(deleteTemp => Number(deleteTemp.seq) !== Number(seq));
    this.setState({ dangerDanestAdminSub: deleteItem, tempfile: tempfileConcat });
  };

  UploadFilesDel = SEQ => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    submitHandlerBySaga(id, 'DELETE', `/api/eshs/v1/common/dangerDanestAdmin`, { PARAM: { SEQ } }, (key, response) =>
      callBackAfterDelete(key, response, this.callbackDataSet),
    );
  };

  onDangerInfoModal = () => {
    const { dangerInfoModal } = this.state;
    this.setState({ dangerInfoModal: !dangerInfoModal });
  };

  onSafetyImproveModal = () => {
    const { safetyImproveModal } = this.state;
    this.setState({ safetyImproveModal: !safetyImproveModal });
  };

  validationCheck = formData => {
    if (!formData.WORKMAN_MALE) return '근무인원(남)을 입력해주세요.';
    if (!formData.WORKMAN_FEMALE) return '근무인원(여)을 입력해주세요.';
    if (!formData.POST) return '소속을 입력해주세요.';
    if (!formData.DEPT_MANAGER) return '부서장을 입력해주세요.';
    return '';
  };

  validationListCheck = formDataList => {
    for(let i= 0; i < formDataList.length;i++){
      if(!formDataList[i].SAFEACTION) return '현재 안전조치(대책) 입력해주세요.';
      if(dangerRank(Number(formDataList[i].DAN_FREQC || 1) * Number(formDataList[i].DAN_STRGT || 1)) === 'A' ||dangerRank(Number(formDataList[i].DAN_FREQC || 1) * Number(formDataList[i].DAN_STRGT || 1)) === 'B' ||dangerRank(Number(formDataList[i].DAN_FREQC || 1) * Number(formDataList[i].DAN_STRGT || 1)) === 'C'){
        if(!formDataList[i].AP_IMPROVE) return '개선대책 입력해주세요!'; 
        if(!formDataList[i].AP_ENDDATE) return '완료예정일을 입력해주세요!'; 
      }
    }
    return '';
  };
  

  changeModalObj = (title = '', visible = false, content = []) => this.setState({ modalObj: { title, visible, content } });

  render() {
    const { dangerDanestAdmin, dangerInfo, dangerDanestAdminSub, dangerDanestAdminSubFile, regNo, reAppriseList } = this.state;
    return (
      <StyledContentsWrapper>
        <StyledCustomSearchWrapper className="search-wrapper-inline">
          <div className="search-input-area">
            <span className="text-label">등록번호</span>
            <AntdSearchInput
              style={{ width: '150px' }}
              className="input-search-inline input-search-sm input-pointer mr5"
              value={regNo}
              readOnly
              onClick={this.hazardModal}
              onChange={this.hazardModal}
            />
          </div>
          <StyledButtonWrapper className="btn-area">
            <StyledButton className="btn-gray btn-first btn-sm" onClick={this.handleSearch}>
              검색
            </StyledButton>
          </StyledButtonWrapper>
        </StyledCustomSearchWrapper>
        {Array.isArray(dangerDanestAdmin) && dangerDanestAdmin[0] && (
          <Tabs defaultActiveKey={dangerDanestAdmin[0].DA_REG_NO}>
            {dangerDanestAdmin.map(item => (
              <TabPane tab={item.DA_REG_NO} key={item.DA_REG_NO}>
                <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">

                {item.STATE === '2' ? (
               <></>
                  ) : (
                    <>
                    <StyledButton className="btn-primary btn-first btn-sm mr5"  onClick={() => this.onSave(item.DA_REG_NO)}>완료</StyledButton>
                <StyledButton className="btn-primary btn-first btn-sm" onClick={() => this.updateDanest(item.DA_REG_NO)}>
                  저장
                   </StyledButton>
                 <StyledButton className="btn-primary btn-first btn-sm" onClick={() => this.updateDanest(item.DA_REG_NO)}>
                    수정
                  </StyledButton>
                  </>
                  )}


                  <Popconfirm title="재평가 하시겠습니까?" onConfirm={() => this.revisionDanest(item.DA_REG_NO)} okText="Yes" cancelText="No">
                    <StyledButton className="btn-primary btn-first btn-sm"> 재평가</StyledButton>
                  </Popconfirm>
                  {reAppriseList && reAppriseList.length > 0 ? (
                    <>
                      <StyledButton className="btn-gray btn-sm" onClick={this.reAppriseModal}>
                        재평가내역
                      </StyledButton>
                      <AntdModalPad
                        width={1000}
                        visible={this.state.isModalReApprise}
                        title="재평가 목록"
                        onCancel={this.reAppriseModal}
                        destroyOnClose
                        footer={null}
                      >
                        {this.state.isModalReApprise && <ReAppriseList reAppriseList={reAppriseList} dangerDanestAdminSubFile={dangerDanestAdminSubFile} />}
                      </AntdModalPad>
                    </>
                  ) : (
                    <></>
                  )}
                </StyledButtonWrapper>
                <StyledHtmlTable>
                  <table>
                    <colgroup>
                      <col width="8%" />
                      <col width="8%" />
                      <col width="10%" />
                      <col width="8%" />
                      <col width="10%" />
                      <col width="6%" />
                      <col width="6%" />
                      <col width="5%" />
                      <col width="10%" />
                      <col width="11%" />
                      <col width="5%" />
                      <col width="13%"/>
                    </colgroup>
                    {this.state.revisionReRendering && (
                      <tbody>
                        <AdminMain
                          formData={item}
                          dangerInfo={dangerInfo && dangerInfo.find(info => info.PROCESS_ID === item.PROCESS_ID)}
                          onChangeAdmin={this.onChangeAdmin}
                          onDangerInfoModal={this.onDangerInfoModal}
                          dangerInfoModal={this.state.dangerInfoModal}
                          onChangeManager={this.onChangeManager}
                          dangerInfoModalData={this.state.dangerInfoModalData}
                          dangerInfoSelect={this.state.dangerInfoSelect}
                          safetyImprove={this.state.safetyImprove[0]}
                          safetyImproveModal={this.state.safetyImproveModal}
                          onSafetyImproveModal={this.onSafetyImproveModal}
                        />
                        {dangerDanestAdminSub &&
                          dangerDanestAdminSub
                            .filter(sub => sub.DA_REG_NO === item.DA_REG_NO)
                            .map(subItem => (
                              <SubList
                                key={subItem.SEQ}
                                subItem={subItem}
                                onChangeManager={this.onChangeManager}
                                onChangeAdminSub={this.onChangeAdminSub}
                                onFileUploadTemp={this.onFileUploadTemp}
                                UploadFilesDel={this.UploadFilesDel}
                                UploadTempFilesDel={this.UploadTempFilesDel}
                                dangerDanestAdminSubFile={dangerDanestAdminSubFile.filter(filterFile => filterFile.DANEST_SUB_SEQ === subItem.UNIQUE_SEQ)}
                              />
                            ))}
                      </tbody>
                    )}
                  </table>
                </StyledHtmlTable>
              </TabPane>
            ))}
          </Tabs>
        )}
        <AntdModal width={1000} visible={this.state.isModal} title="위험성 평가 검색" onCancel={this.hazardModal} destroyOnClose footer={null}>
          {this.state.isModal && (
            <BizBuilderBase
              sagaKey="hazardModal"
              workSeq={12061}
              CustomListPage={customList}
              viewType="LIST"
              conditional={`AND W.END_YN = 'Y'`}
              customOnRowClick={this.selecteRow}
            />
          )}
        </AntdModal>
      </StyledContentsWrapper>
    );
  }
}

List.propTypes = {
  getCallDataHandler: PropTypes.func,
  sagaKey: PropTypes.string,
  result: PropTypes.object,
  improveDanger: PropTypes.object,
  submitHandlerBySaga: PropTypes.func,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
};

List.defaultProps = {
  getCallDataHandler: () => {},
};

export default List;
