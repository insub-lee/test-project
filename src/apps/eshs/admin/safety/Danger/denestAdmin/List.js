import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import customList from 'apps/eshs/admin/environment/air/stack/List';
import moment from 'moment';

import { Input, Modal, Tabs } from 'antd';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledAntdModal from 'components/BizBuilder/styled//Modal/StyledAntdModal';
import { callBackAfterPut } from 'apps/eshs/common/submitCallbackFunc';
import View from './View';

const AntdSearchInput = StyledSearchInput(Input.Search);
const AntdModal = StyledAntdModal(Modal);

const { TabPane } = Tabs;

moment.locale('ko');

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  search = () => {
    this.dangerData();
  };

  hazardModal = () => {
    const { isModal } = this.state;
    this.setState({ isModal: !isModal });
  };

  selectedModal = record => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    this.setState({ regNo: record.REG_NO });
    this.hazardModal();
    const apiAry = [
      {
        key: 'dangerInfo',
        type: 'POST',
        url: '/api/eshs/v1/common/eshsBuilderCustomSearch/10341',
        params: {
          PARAM: {
            whereString: [`AND TO_CHAR(W.REG_DTTM , 'YYYY') = '${moment(record.REG_DTTM).format('YYYY')}'`],
          },
        },
      },
      {
        key: 'dangerDanestAdmin',
        type: 'GET',
        url: `/api/eshs/v1/common/dangerDanestAdmin?REG_NO=${record.REG_NO}`,
      },
      {
        key: 'dangerDanestAdminSub',
        type: 'POST',
        url: `/api/eshs/v1/common/dangerDanestAdmin`,
        params: {
          PARAM: {
            REG_NO: record.REG_NO,
          },
        },
      },
    ];
    getCallDataHandler(id, apiAry, this.dangerData);
  };

  dangerData = () => {
    const {
      result: { dangerInfo, dangerDanestAdmin, dangerDanestAdminSub },
    } = this.props;
    if (dangerDanestAdmin && dangerDanestAdmin.list && dangerDanestAdmin.list.length <= 0) {
      message.info(<MessageContent>검색된 데이터가 없습니다.</MessageContent>);
    } else {
      this.setState({
        dangerInfo: dangerInfo && dangerInfo.list,
        dangerDanestAdmin: dangerDanestAdmin && dangerDanestAdmin.list,
        dangerDanestAdminSub: dangerDanestAdminSub && dangerDanestAdminSub.list,
      });
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
        ? { ...changeData, DEPT_MANAGER: userRecord.EMP_NO, DEPT_MANAGER_NM: userRecord.NAME_KOR, DEPT_MANAGER_ID: userRecord.USER_ID }
        : { ...changeData },
    );
    this.setState({ dangerDanestAdmin: temp });
  };

  onFileUploadTemp = (name, obj, record) => {
    const { dangerDanestAdminSub } = this.state;
    const change = dangerDanestAdminSub.map(changeData =>
      changeData.DA_REG_NO === record.DA_REG_NO && changeData.SEQ === record.SEQ
        ? { ...changeData, [name]: Array.isArray(changeData[name]) ? changeData[name].push(obj) : [obj] }
        : { ...changeData },
    );
    this.setState({ dangerDanestAdminSub: change });
  };

  updateDanest = daRegNo => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { dangerDanestAdmin, dangerDanestAdminSub } = this.state;
    const submitFind = dangerDanestAdmin.find(findItem => findItem.DA_REG_NO === daRegNo);
    const submitFindSub = dangerDanestAdminSub.filter(findItem => findItem.DA_REG_NO === daRegNo);
    const submitData = { PARAM: { ...submitFind, DANEST_SUB_LIST: submitFindSub } };
    // submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/dangerDanestAdmin`, submitData, (key, response) =>
    //   callBackAfterPut(key, response, this.callbackDataSet),
    // );

    const file = (submitFindSub && submitFindSub.itemData && submitFindSub.itemData.file) || {};
    if (JSON.stringify(file) !== '{}') {
      submitHandlerBySaga(id, 'POST', '/upload/moveFileToReal', { PARAM: { DETAIL: [file] } }, (afterId, res) => {
        if (res && res.message === 'success') {
          submitHandlerBySaga(
            id,
            'PUT',
            `/api/eshs/v1/common/dangerDanestAdmin`,
            { PARAM: { ...submitFind, DANEST_SUB_LIST: submitFindSub, FILE_LIST: res.DETAIL } },
            (key, response) => callBackAfterPut(key, response, this.callbackDataSet),
          );
        } else {
          message.info(<MessageContent>파일저장에 실패하였습니다.</MessageContent>);
        }
      });
    } else {
      submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/dangerDanestAdmin`, submitData, (key, response) =>
        callBackAfterPut(key, response, this.callbackDataSet),
      );
    }
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
      {
        key: 'dangerDanestAdminSub',
        type: 'POST',
        url: `/api/eshs/v1/common/dangerDanestAdmin`,
        params: {
          PARAM: {
            REG_NO: regNo,
          },
        },
      },
    ];
    getCallDataHandler(id, apiAry, this.dangerData);
  };

  render() {
    const { isModal, dangerDanestAdmin, dangerInfo, dangerDanestAdminSub, regNo } = this.state;
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
            <StyledButton className="btn-gray btn-first btn-sm" onClick={this.search}>
              검색
            </StyledButton>
          </StyledButtonWrapper>
        </StyledCustomSearchWrapper>
        {Array.isArray(dangerDanestAdmin) && dangerDanestAdmin[0] && (
          <Tabs defaultActiveKey={dangerDanestAdmin[0].DA_REG_NO}>
            {dangerDanestAdmin.map(item => (
              <TabPane tab={item.DA_REG_NO} key={item.DA_REG_NO}>
                <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
                  <StyledButton className="btn-primary btn-first btn-sm" onClick={() => this.updateDanest(item.DA_REG_NO)}>
                    수정
                  </StyledButton>
                  <StyledButton className="btn-primary btn-first btn-sm" onClick={() => message.info(<MessageContent>개발중입니다.</MessageContent>)}>
                    재평가
                  </StyledButton>
                  <StyledButton className="btn-gray btn-first btn-sm" onClick={() => message.info(<MessageContent>개발중입니다.</MessageContent>)}>
                    재평가내역
                  </StyledButton>
                </StyledButtonWrapper>
                <View
                  formData={item}
                  dangerInfo={dangerInfo}
                  SUB_LIST={dangerDanestAdminSub && dangerDanestAdminSub.filter(sub => sub.DA_REG_NO === item.DA_REG_NO)}
                  onChangeAdmin={this.onChangeAdmin}
                  onChangeManager={this.onChangeManager}
                  onChangeAdminSub={this.onChangeAdminSub}
                  onFileUploadTemp={this.onFileUploadTemp}
                />
              </TabPane>
            ))}
          </Tabs>
        )}
        <AntdModal width={1000} visible={isModal} title="위험성 평가 검색" onCancel={this.hazardModal} destroyOnClose footer={null}>
          {isModal && (
            <BizBuilderBase sagaKey="hazardModal" workSeq={12061} CustomListPage={customList} viewType="LIST" customOnRowClick={this.selectedModal} />
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
  submitHandlerBySaga: PropTypes.func,
};

List.defaultProps = {
  getCallDataHandler: () => {},
};

export default List;
