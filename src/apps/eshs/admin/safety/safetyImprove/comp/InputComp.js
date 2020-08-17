import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Select, DatePicker, Modal } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';

import UserSearchModal from 'apps/eshs/common/userSearchModal';
import InputTable from 'apps/eshs/admin/safety/safetyImprove/comp/InputTable';
import SearchList from 'apps/eshs/admin/safety/safetyImprove/comp/SearchList';
import { fields } from 'apps/eshs/admin/safety/safetyImprove/comp/fields';
import { getTreeFromFlatData } from 'react-sortable-tree';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import moment from 'moment';

const AntdSearchInput = StyledSearchInput(Input.Search);
const AntdDatePicker = StyledDatePicker(DatePicker);
const AntdModal = StyledAntdModal(Modal);
const AntdInput = StyledInput(Input);
const AntdTextarea = StyledTextarea(Input.TextArea);

const today = moment(new Date()).format('YYYY-MM-DD');

const getCategoryMapListAsTree = (flatData, flag, viewLang, rootkey) =>
  getTreeFromFlatData({
    flatData: flatData.map(item => ({
      title: item[`NAME_${viewLang && viewLang.length > 0 ? viewLang : 'KOR'}`],
      value: item.NODE_ID,
      key: item.NODE_ID,
      parentValue: item.PARENT_NODE_ID,
      selectable: flag === 'Y' || item.CHILDREN_CNT === 0,
    })),

    getKey: node => node.key,
    getParentKey: node => node.parentValue,
    rootKey: rootkey || 0,
  });

class InputComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      initFormData: {},
      modalObj: {
        title: '',
        visible: false,
        content: [],
      },
      inputTable: [],
      categoryData: {},
      selectRow: {},
      viewType: 'INPUT',
      modifyBtnFlag: 'F',
    };
  }

  componentDidMount = () => {
    const { sagaKey: id, getCallDataHandler, spinningOn } = this.props;

    spinningOn();
    const apiAry = [
      {
        key: 'CATEGORY_LOC',
        type: 'POST',
        url: '/api/admin/v1/common/categoryChildrenListUseYn',
        params: { PARAM: { NODE_ID: 1533, USE_YN: 'Y' } },
      },
      {
        key: 'CATEGORY_MM',
        type: 'POST',
        url: `/api/admin/v1/common/categoryChildrenListUseYn`,
        params: { PARAM: { NODE_ID: 1551, USE_YN: 'Y' } },
      },
      {
        key: 'CATEGORY_EACH_TYPE',
        type: 'POST',
        url: `/api/admin/v1/common/categoryChildrenListUseYn`,
        params: { PARAM: { NODE_ID: 1552, USE_YN: 'Y' } },
      },
      {
        key: 'CATEGORY_GRADE',
        type: 'POST',
        url: `/api/admin/v1/common/categoryChildrenListUseYn`,
        params: { PARAM: { NODE_ID: 1561, USE_YN: 'Y' } },
      },
      {
        key: 'codeData',
        url: `/api/admin/v1/common/categoryChildrenListUseYn`,
        type: 'POST',
        params: { PARAM: { NODE_ID: 30431, USE_YN: 'Y' } },
      },
    ];

    getCallDataHandler(id, apiAry, this.appStart);
  };

  appStart = () => {
    const { result, profile, spinningOff } = this.props;

    const initFormData = {
      ACP_PIC_FILE: {},
      PIC_FILE: {},
    };
    const flds = fields(profile);

    for (const name in flds) {
      initFormData[name] = flds[name].DEFAULT_VALUE;
    }

    const loc = (result && result.CATEGORY_LOC && result.CATEGORY_LOC.categoryMapList) || [];

    const grade =
      (result &&
        result.CATEGORY_GRADE &&
        result.CATEGORY_GRADE.categoryMapList &&
        result.CATEGORY_GRADE.categoryMapList.filter(item => item.NODE_ID !== result.CATEGORY_GRADE.PARAM.NODLE_ID && item.USE_YN === 'Y')) ||
      [];
    const eachType =
      (result &&
        result.CATEGORY_EACH_TYPE &&
        result.CATEGORY_EACH_TYPE.categoryMapList &&
        result.CATEGORY_EACH_TYPE.categoryMapList.filter(item => item.NODE_ID !== result.CATEGORY_EACH_TYPE.PARAM.NODLE_ID && item.USE_YN === 'Y')) ||
      [];
    const mm =
      (result &&
        result.CATEGORY_MM &&
        result.CATEGORY_MM.categoryMapList &&
        result.CATEGORY_MM.categoryMapList.filter(item => item.NODE_ID !== result.CATEGORY_MM.PARAM.NODLE_ID && item.USE_YN === 'Y')) ||
      [];

    const DANGERTYPE = [];
    const DANGERCAUSE = [];

    result &&
      result.codeData &&
      result.codeData.categoryMapList &&
      result.codeData.categoryMapList.forEach(item => {
        if (item.PARENT_NODE_ID === 30432) DANGERTYPE.push(item);
        if (item.PARENT_NODE_ID === 30433) DANGERCAUSE.push(item);
      });

    const categoryData = {
      LOC: getCategoryMapListAsTree(loc, 'Y', '', 1533),
      GRADE: grade,
      EACH_TYPE: eachType,
      MM: mm,
      DANGERTYPE,
      DANGERCAUSE,
    };

    this.setState(
      {
        initFormData,
        formData: { ...initFormData, locLabel: initFormData.LOC ? this.findTreeDataByNodeId(initFormData.LOC) : '' },
        inputTable: [
          <InputTable
            key="InputTable"
            formData={initFormData}
            changeFormData={this.changeFormData}
            setFormData={this.setFormData}
            findTreeDataByNodeId={this.findTreeDataByNodeId}
            categoryData={categoryData}
            acpTableButtons={this.getAcpTableButtons()}
          />,
        ],
        categoryData,
      },
      spinningOff,
    );
  };

  changeFormData = (target, value) => this.setState(prevState => ({ formData: { ...prevState.formData, [target]: value } }));

  setFormData = nextFormData => this.setState(prevState => ({ formData: { ...prevState.formData, ...nextFormData } }));

  changeStateData = (target, value) => this.setState({ [target]: value });

  findTreeDataByNodeId = nodeId => {
    const { result } = this.props;

    const loc = (result && result.CATEGORY_LOC && result.CATEGORY_LOC.categoryMapList) || [];

    const fidx = loc.findIndex(item => item.NODE_ID === nodeId);

    return fidx > -1 ? (loc[fidx].PARENT_NODE_ID === 1533 ? `${loc[fidx].NAME_KOR} 전체` : `${loc[fidx].NAME_KOR}`) : '';
  };

  save = formData => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    return submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsSafetyImprove', { PARAM: formData }, (_, res) => {
      if (res && res.result === 1) {
        return this.setState(
          {
            formData: {
              ...res.PARAM,
              DETAIL_ACP_EMP_NO: res.PARAM && res.PARAM.ACP_EMP_NO,
              DETAIL_ACP_DEPT_NM: res.PARAM && res.PARAM.ACP_DEPT_NM,
              DETAIL_ACP_EMP_NM: res.PARAM && res.PARAM.ACP_EMP_NM,
              DETAIL_ACP_PHONE: res.PARAM && res.PARAM.ACP_PHONE,
              PIC_FILE_NM: (res.PARAM && res.PARAM.file && res.PARAM.file.fileName) || '',
            },
            selectRow: {},
            viewType: 'MODIFY',
            inputTable: [],
          },
          () =>
            this.setState(
              prevState => ({
                inputTable: [
                  <InputTable
                    key="InputTable"
                    formData={prevState.formData}
                    changeFormData={this.changeFormData}
                    setFormData={this.setFormData}
                    findTreeDataByNodeId={this.findTreeDataByNodeId}
                    categoryData={prevState.categoryData}
                    acpTableButtons={this.getAcpTableButtons()}
                  />,
                ],
              }),
              () => this.showMessage('저장되었습니다.'),
            ),
        );
      }
      return this.showMessage('저장에 실패하였습니다.');
    });
  };

  update = formData => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    return submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsSafetyImprove', { PARAM: formData }, (_, res) => {
      if (res && res.result === 1) {
        return this.setState(
          {
            formData: {
              ...res.PARAM,
              DETAIL_ACP_EMP_NO: res.PARAM && res.PARAM.ACP_EMP_NO,
              DETAIL_ACP_DEPT_NM: res.PARAM && res.PARAM.ACP_DEPT_NM,
              DETAIL_ACP_EMP_NM: res.PARAM && res.PARAM.ACP_EMP_NM,
              DETAIL_ACP_PHONE: res.PARAM && res.PARAM.ACP_PHONE,
              PIC_FILE_NM: (res.PARAM && res.PARAM.file && res.PARAM.file.fileName) || '',
            },
            selectRow: {},
            viewType: 'MODIFY',
            inputTable: [],
          },
          () =>
            this.setState(
              prevState => ({
                inputTable: [
                  <InputTable
                    key="InputTable"
                    formData={prevState.formData}
                    changeFormData={this.changeFormData}
                    setFormData={this.setFormData}
                    findTreeDataByNodeId={this.findTreeDataByNodeId}
                    categoryData={prevState.categoryData}
                    acpTableButtons={this.getAcpTableButtons()}
                  />,
                ],
              }),
              () => this.showMessage('저장되었습니다.'),
            ),
        );
      }
      return this.showMessage('저장에 실패하였습니다.');
    });
  };

  search = () => {
    const { spinningOn, spinningOff } = this.props;
    const { selectRow } = this.state;
    if (JSON.stringify(selectRow) === '{}') return;
    spinningOn();
    this.searchBeforeFlagChk(selectRow.REQ_NO, () => {
      this.setState(
        {
          formData: selectRow,
          selectRow: {},
          inputTable: [],
          viewType: 'MODIFY',
        },
        () => {
          this.setState(
            prevState => ({
              inputTable: [
                <InputTable
                  key="InputTable"
                  formData={prevState.formData}
                  changeFormData={this.changeFormData}
                  setFormData={this.setFormData}
                  findTreeDataByNodeId={this.findTreeDataByNodeId}
                  categoryData={prevState.categoryData}
                  acpTableButtons={this.getAcpTableButtons()}
                />,
              ],
            }),
            spinningOff,
          );
        },
      );
    });
  };

  searchBeforeFlagChk = (reqNo, callBack) => {
    const { sagaKey: id, getCallDataHandler, spinningOn } = this.props;

    spinningOn();
    const apiAry = [
      {
        key: 'FLAG',
        type: 'GET',
        url: `/api/eshs/v1/common/eshsSafetyImprove?REQ_NO=${reqNo}`,
      },
    ];

    getCallDataHandler(id, apiAry, () => {
      const { result } = this.props;
      const modifyBtnFlag = (result && result.FLAG && result.FLAG.flag) || 'F';
      this.setState(
        {
          modifyBtnFlag,
        },
        callBack,
      );
    });
  };

  saveBeforeProcess = () => {
    const { sagaKey: id, submitHandlerBySaga, spinningOn } = this.props;
    const { formData } = this.state;
    spinningOn();

    const fileList = [];
    const picFileFlg = (formData && formData.PIC_FILE && formData.PIC_FILE.newFile) || false;
    const acpPicFile = (formData && formData.ACP_PIC_FILE && formData.ACP_PIC_FILE.newFile) || false;

    if (picFileFlg) fileList.push(formData.PIC_FILE);
    if (acpPicFile) fileList.push(formData.ACP_PIC_FILE);

    if (!fileList.length) return this.save(formData);

    return submitHandlerBySaga(id, 'POST', '/upload/moveFileToReal', { PARAM: { DETAIL: fileList } }, (_, result) => {
      if (result && result.message === 'success') {
        const realFileList = result.DETAIL || [];
        const seqObj = {};
        realFileList.forEach(f => (seqObj[f.target] = f.seq));
        return this.save({ ...formData, ...seqObj });
      }
      return this.showMessage('파일저장에 실패하였습니다.');
    });
  };

  updateBeforeProcess = () => {
    const { sagaKey: id, submitHandlerBySaga, spinningOn } = this.props;
    const { formData } = this.state;
    spinningOn();

    const fileList = [];
    const picFileFlg = (formData && formData.PIC_FILE && formData.PIC_FILE.newFile) || false;
    const acpPicFile = (formData && formData.ACP_PIC_FILE && formData.ACP_PIC_FILE.newFile) || false;

    if (picFileFlg) fileList.push(formData.PIC_FILE);
    if (acpPicFile) fileList.push(formData.ACP_PIC_FILE);

    if (!fileList.length) return this.update(formData);

    return submitHandlerBySaga(id, 'POST', '/upload/moveFileToReal', { PARAM: { DETAIL: fileList } }, (_, result) => {
      if (result && result.message === 'success') {
        const realFileList = result.DETAIL || [];
        const seqObj = {};
        realFileList.forEach(f => (seqObj[f.target] = f.seq));
        return this.update({ ...formData, ...seqObj });
      }
      return this.showMessage('파일저장에 실패하였습니다.');
    });
  };

  reset = () => {
    const { spinningOn, spinningOff } = this.props;
    spinningOn();
    this.setState(
      prevState => ({
        formData: prevState.initFormData,
        inputTable: [],
        viewType: 'INPUT',
      }),
      () =>
        this.setState(
          prevState => ({
            inputTable: [
              <InputTable
                key="InputTable"
                formData={prevState.initFormData}
                changeFormData={this.changeFormData}
                setFormData={this.setFormData}
                findTreeDataByNodeId={this.findTreeDataByNodeId}
                categoryData={prevState.categoryData}
              />,
            ],
          }),
          spinningOff,
        ),
    );
  };

  showMessage = text => {
    const { spinningOff } = this.props;
    spinningOff();
    return message.info(<MessageContent>{text}</MessageContent>);
  };

  changeModalObj = (title = '', visible = false, content = []) => this.setState({ modalObj: { title, visible, content } });

  getAcpTableButtons = () => {
    const { viewType, modifyBtnFlag } = this.state;

    return [
      {
        text: '수신',
        onClick: () => console.debug('수신'),
        className: 'btn-gray btn-sm mr5 mr5',
        visible: viewType !== 'INPUT' || modifyBtnFlag !== 'F',
      },
      {
        text: '저장',
        onClick: () => console.debug('저장'),
        className: 'btn-primary btn-sm mr5 mr5',
        visible: viewType !== 'INPUT',
      },
      {
        text: '조치',
        onClick: () => console.debug('조치'),
        className: 'btn-primary btn-sm mr5 mr5',
        visible: viewType !== 'INPUT',
      },
      {
        text: '요청반송',
        onClick: () => console.debug('요청반송'),
        className: 'btn-light btn-sm mr5 mr5',
        visible: viewType !== 'INPUT',
      },
      {
        text: '전달',
        onClick: () => console.debug('전달'),
        className: 'btn-gray btn-sm mr5 mr5',
        visible: viewType !== 'INPUT',
      },
      {
        text: '인쇄',
        onClick: () => console.debug('인쇄'),
        className: 'btn-gray btn-sm mr5 mr5',
        visible: viewType === 'INPUT',
      },
    ];
  };

  render() {
    const { inputTable, formData, modalObj, selectRow, viewType } = this.state;
    let status = '';
    switch (String(formData.STTLMNT_STATUS)) {
      case '0':
        status = '작성중';
        break;
      case '1':
        status = '요청완료/조치중';
        break;
      case '2':
        status = '조치완료';
        break;
      case '3':
        status = '완료승인';
        break;
      case '4':
        status = '부결';
        break;
      case '5':
        status = '요청반송/재작성';
        break;
      default:
        status = '작성요망';
        break;
    }
    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper className="search-wrapper-inline">
            <div className="search-input-area">
              <AntdSearchInput
                style={{ width: '150PX' }}
                value={selectRow.REQ_NO || formData.REQ_NO || undefined}
                className="input-search-sm ant-search-inline mr5"
                readOnly
                onClick={() =>
                  this.changeModalObj('안전개선 검색', true, [
                    <SearchList
                      key="searchList"
                      modalVisible={() => this.changeModalObj()}
                      onClickRow={data =>
                        this.setState({
                          selectRow: { ...data, PIC_FILE: data.PIC_FILE ? JSON.parse(data.PIC_FILE.value) : undefined },
                        })
                      }
                    />,
                  ])
                }
                onChange={() =>
                  this.changeModalObj('안전개선 검색', true, [
                    <SearchList
                      key="searchList"
                      modalVisible={() => this.changeModalObj()}
                      onClickRow={data =>
                        this.setState({
                          selectRow: { ...data, PIC_FILE: data.PIC_FILE ? JSON.parse(data.PIC_FILE.value) : undefined },
                        })
                      }
                    />,
                  ])
                }
              />
            </div>
            <div className="btn-area">
              <StyledButton className="btn-gray btn-sm mr5" onClick={this.search}>
                검색
              </StyledButton>
              {viewType === 'INPUT' ? (
                <StyledButton className="btn-primary btn-sm mr5" onClick={this.saveBeforeProcess}>
                  저장
                </StyledButton>
              ) : (
                <>
                  <StyledButton className="btn-primary btn-sm mr5" onClick={this.updateBeforeProcess}>
                    수정
                  </StyledButton>
                  <StyledButton className="btn-light btn-sm mr5">삭제</StyledButton>
                  <StyledButton className="btn-gray btn-sm mr5" onClick={this.reset}>
                    초기화
                  </StyledButton>
                  <StyledButton className="btn-gray btn-sm mr5">인쇄</StyledButton>
                </>
              )}
            </div>
            <div className="div-comment" style={{ display: 'inline-block' }}>
              {`[ 문서상태 : ${status} ]`}
            </div>
          </StyledCustomSearchWrapper>
          {inputTable}
        </StyledContentsWrapper>

        <AntdModal
          title={modalObj.title || ''}
          visible={modalObj.visible}
          width={800}
          onCancel={() => this.changeModalObj()}
          footer={
            <StyledButton className="btn-gray btn-sm mr5" onClick={() => this.changeModalObj()}>
              닫기
            </StyledButton>
          }
          destroyOnClose
        >
          {modalObj.content}
        </AntdModal>
      </>
    );
  }
}
InputComp.propTypes = {
  result: PropTypes.object,
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
  removeReduxState: PropTypes.func,
  profile: PropTypes.object,
  submitHandlerBySaga: PropTypes.func,
};
InputComp.defaultProps = {
  result: {},
  sagaKey: '',
  getCallDataHandler: () => {},
  spinningOn: () => {},
  spinningOff: () => {},
  removeReduxState: () => {},
  profile: {},
  submitHandlerBySaga: () => {},
};

export default InputComp;
