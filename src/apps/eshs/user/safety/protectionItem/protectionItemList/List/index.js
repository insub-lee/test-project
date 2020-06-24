import React from 'react';
import PropTypes from 'prop-types';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Select, Input, InputNumber, Modal } from 'antd';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';

import request from 'utils/request';
import { debounce } from 'lodash';

import { callBackAfterPost, callBackAfterPut, callBackAfterDelete } from 'apps/eshs/user/environment/chemicalMaterialManagement/input/submitCallbackFunc';
import ImageUploader from 'components/FormStuff/Upload/ImageUploader';
import EshsCmpnyComp from 'components/BizBuilder/Field/EshsCmpnyComp';
import CustomTooltip from './customTooltip';

const { Option } = Select;
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdModal = StyledAntdModal(Modal);
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frameworkComponents: { customTooltip: CustomTooltip },
      selectedSite: '',
      input: '',
      visible: false,
      viewType: '',
      requestValue: this.requestValueOrigin,
      columnDefs: this.columnDefsOrigin,
      rowData: [],
      tooltipShowDelay: 0,
      fileList: [],
      responseList: [],
    };
    this.getNewRowData = debounce(this.getNewRowData, 300);
  }

  columnDefsOrigin = [
    {
      headerName: '품목',
      field: 'KIND',
      width: 170,
      tooltipField: 'kind',
    },
    {
      headerName: '모델',
      field: 'MODEL',
      width: 200,
      tooltipField: 'model',
    },
    {
      headerName: 'Size',
      field: 'SIZE1',
      width: 130,
      tooltipField: 'size1',
    },
    {
      headerName: '검정#',
      field: 'APP_NO',
      tooltipField: 'app_no',
    },
    {
      headerName: 'Vendor',
      field: 'VENDOR_NM',
      width: 130,
      tooltipField: 'vendor_nm',
    },
    {
      headerName: 'Maker',
      field: 'MAKER_NM',
      tooltipField: 'maker_nm',
    },
    {
      headerName: '단가',
      field: 'UNITPRICE',
      valueFormatter: params => (params.value ? params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0),
      tooltipField: 'unitprice',
    },
    {
      headerName: '유효기간',
      field: 'VALIDITY_TERM',
      tooltipField: 'validity_term',
    },
    {
      headerName: '적정재고',
      field: 'PROPERSTOCK',
      tooltipField: 'properstock',
    },
    {
      headerName: '비고',
      field: 'COMMENTS',
      width: 930,
      tooltipField: 'comments',
    },
  ];

  requestValueOrigin = {
    SITE: '317',
    KIND: '',
    MODEL: '',
    SIZE1: '',
    APP_NO: '',
    VENDOR_CD: '',
    MAKER_CD: '',
    UNIT: '',
    VALIDITY_TERM: '',
    PROPERSTOCK: 0,
    COMMENTS: '',
  };

  gridOptions = {
    defaultColDef: {
      width: 100,
      resizable: true,
      tooltipComponent: 'customTooltip',
      tooltipShowDelay: 0,
    },
  };

  initGridData = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.getProtectionItemList().then(res =>
      this.setState({
        rowData: (res.response && res.response.list) || [],
      }),
    );
  };

  changeGridData = func => {
    this.setState({
      rowData: (func.response && func.response.list) || [],
    });
  };

  getProtectionItemList = async () => {
    const data = await request({
      url: `/api/eshs/v1/common/geteshsprotectionitems?SITE=${317}`,
      method: 'GET',
    });
    return data;
  };

  handleSelectChange = async value => {
    this.setState({
      selectedSite: value,
    });
  };

  handleInputChange = e => {
    this.setState({
      input: e.target.value,
    });
  };

  getNewRowData = async (site = 317, keyword = '') => {
    const data = await request({
      url: `/api/eshs/v1/common/geteshsprotectionitems?SITE=${site}&KEYWORD=${keyword}`,
      method: 'GET',
    });
    this.changeGridData(data);
  };

  handleEshsCmpnyCompChange = (data, fieldName) => {
    const valueObj = { [`${fieldName.toUpperCase()}_CD`]: data.WRK_CMPNY_CD, [`${fieldName.toUpperCase()}_NM`]: data.WRK_CMPNY_NM }; // 키값 바꾸기
    this.setState({ [fieldName.toUpperCase()]: data.WRK_CMPNY_NM, [`${fieldName.toUpperCase()}NAME`]: data.WRK_CMPNY_CD });
    this.setState(prevState => ({ requestValue: Object.assign(prevState.requestValue, valueObj) }));
  };

  handleChange = e => {
    const valueObj = { [e.target.name.toUpperCase()]: e.target.value };
    this.setState(prevState => ({ requestValue: Object.assign(prevState.requestValue, valueObj) }));
  };

  handleNumberChange = value => {
    if (typeof value !== 'number') {
      return;
    }
    const valueObj = { PROPERSTOCK: value };
    this.setState(prevState => ({ requestValue: Object.assign(prevState.requestValue, valueObj) }));
  };

  handleOk = () => {
    const { requestValue } = this.state;
    const { sagaKey: id, submitHandlerBySaga, result } = this.props;
    const fileSeqArr = [];

    if (result.realFile && result.realFile.DETAIL.length) {
      result.realFile.DETAIL.map(item => fileSeqArr.push(item.seq));
    }

    if (fileSeqArr.length) {
      this.setState(prevState => ({ requestValue: Object.assign(prevState.requestValue, { FILE_SEQ: fileSeqArr }) }));
    }

    const submitCallbackFunc = () => {
      this.gridApi.updateRowData({ add: [requestValue], addIndex: 0 });
      this.getNewRowData('', '');
      this.setState({ visible: false, requestValue: { SITE: '317' }, responseList: [], fileList: [] });
    };

    submitHandlerBySaga(id, 'POST', `/api/eshs/v1/common/geteshsprotectionitems`, requestValue, (key, response) =>
      callBackAfterPost(key, response, submitCallbackFunc),
    );
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      requestValue: { SITE: '317' },
      fileList: [],
    });
  };

  handleModifyClick = () => {
    const { requestValue } = this.state;
    const { sagaKey: id, submitHandlerBySaga, result } = this.props;
    const fileSeqArr = [];

    const submitCallbackFunc = () => {
      this.gridApi.redrawRows();
      this.setState({ requestValue: { SITE: '317' }, visible: false });
    };

    if (result.realFile && result.realFile.DETAIL.length) {
      // 수정화면에서 사진을 추가했다면
      result.realFile.DETAIL.map(item => fileSeqArr.push(item.seq));
      this.setState(prevState => ({
        // file_seq = 새로 올라온 파일, attachedFile = 기존 파일 (삭제해야 함)
        requestValue: Object.assign(prevState.requestValue, { FILE_SEQ: fileSeqArr }, { ATTACHEDFILE: result.attachs.fileList }),
      }));
      return submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/geteshsprotectionitems`, requestValue, (key, response) =>
        callBackAfterPut(key, response, submitCallbackFunc),
      );
    }
    return submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/geteshsprotectionitems`, requestValue, (key, response) =>
      callBackAfterPut(key, response, submitCallbackFunc),
    );
  };

  handleDeleteClick = () => {
    const { requestValue } = this.state;
    const { sagaKey: id, submitHandlerBySaga } = this.props;

    const submitCallbackFunc = () => {
      this.gridApi.redrawRows();
      this.setState(prevState => ({ rowData: prevState.rowData.filter(item => item.HITEM_CD !== prevState.requestValue.HITEM_CD), visible: false }));
    };

    submitHandlerBySaga(id, 'DELETE', `/api/eshs/v1/common/geteshsprotectionitems`, { HITEM_CD: requestValue.hitem_cd }, requestValue, (key, response) =>
      callBackAfterDelete(key, response, submitCallbackFunc),
    );
  };

  handleUploadFileChange = ({ fileList }) => {
    const responseList = [];
    fileList.map(item => responseList.push(item.response));
    this.setState({ fileList, responseList });
  };

  BeforeSaveTask = () => {
    const { responseList, viewType } = this.state;
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'realFile',
        type: 'POST',
        url: `/upload/moveFileToReal`,
        params: { PARAM: { DETAIL: responseList } },
      },
    ];
    if (viewType.toUpperCase() === 'INPUT') {
      return getCallDataHandler(id, apiArr, () => this.handleOk());
    }
    return getCallDataHandler(id, apiArr, () => this.handleModifyClick());
  };

  handleRowClick = rowData => {
    if (this.props.handleRowClick) {
      return this.props.handleRowClick(rowData);
    }
    const { sagaKey: id, getCallDataHandler } = this.props;
    this.setState({ requestValue: rowData, visible: true, viewType: 'VIEW' });
    const apiArr = [
      {
        key: 'attachs',
        type: 'GET',
        url: `/api/eshs/v1/common/geteshsprotectionitemsattach?HITEM_CD=${rowData.HITEM_CD}`,
      },
    ];
    return getCallDataHandler(id, apiArr);
  };

  inputFooter = () => [
    <StyledButton className="btn-primary" onClick={this.state.responseList.length ? this.BeforeSaveTask : this.handleOk}>
      등록
    </StyledButton>,
    <StyledButton className="btn-primary" onClick={this.handleCancel}>
      취소
    </StyledButton>,
  ];

  viewFooter = () => [
    <StyledButton className="btn-primary" onClick={this.state.responseList.length ? this.BeforeSaveTask : this.handleModifyClick}>
      수정
    </StyledButton>,
    <StyledButton className="btn-primary" onClick={this.handleDeleteClick}>
      삭제
    </StyledButton>,
    <StyledButton className="btn-primary" onClick={this.handleCancel}>
      닫기
    </StyledButton>,
  ];

  render() {
    const { handleSelectChange, handleInputChange, initGridData, gridOptions, handleOk, handleCancel, inputFooter, viewFooter } = this;
    const { selectedSite, input, visible, columnDefs, rowData, viewType, frameworkComponents, tooltipShowDelay, requestValue } = this.state;
    const { result } = this.props;
    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area">
              <span className="text-label">지역</span>
              <AntdSelect defaultValue="청주" onChange={handleSelectChange} className="select-mid mr5">
                <Option value="317">청주</Option>
                <Option value="318">구미</Option>
              </AntdSelect>
              <span className="text-label">품목</span>
              <AntdInput
                className="ant-input-inline ant-input-mid mr5"
                onChange={handleInputChange}
                style={{ width: '300px' }}
                placeholder="품목을 입력하세요."
              />
              <div className="btn-area">
                <StyledButton className="btn-gray btn-sm mr5" onClick={() => this.getNewRowData(selectedSite, input)}>
                  검색
                </StyledButton>
              </div>
            </div>
          </StyledCustomSearchWrapper>
          <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
            <StyledButton className="btn-primary btn-sm" onClick={() => this.setState({ visible: true, viewType: 'INPUT' })}>
              등록
            </StyledButton>
          </StyledButtonWrapper>
          <div style={{ width: '100%', height: '100%' }}>
            <div className="ag-theme-balham" style={{ height: '400px' }}>
              <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                onGridReady={initGridData}
                gridOptions={gridOptions}
                defaultColDef={gridOptions.defaultColDef}
                tooltipShowDelay={tooltipShowDelay}
                suppressRowTransform
                onRowClicked={e => this.handleRowClick(e.data)}
                frameworkComponents={frameworkComponents}
              />
            </div>
          </div>
          <AntdModal
            className="modal-table-pad"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            width="600px"
            closable
            destroyOnClose
            title={viewType.toUpperCase() === 'INPUT' ? '보호구 등록' : '보호구 수정'}
            footer={viewType.toUpperCase() === 'INPUT' ? inputFooter() : viewFooter()}
          >
            <StyledHtmlTable>
              <table>
                <colgroup>
                  <col width="30%" />
                  <col width="70%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>사진</th>
                    <td>
                      {viewType.toUpperCase() === 'VIEW' && result.attachs && result.attachs.fileList.length
                        ? result.attachs.fileList.map(item => (
                            <img src={`http://192.168.251.14:10197/down/file/${item.FILE_SEQ}`} alt="사진이 없습니다." width="150px" />
                          ))
                        : ''}
                    </td>
                  </tr>
                  <tr>
                    <th>지역</th>
                    <td>
                      <AntdSelect
                        className="select-sm"
                        name="SITE"
                        defaultValue="317"
                        onChange={e => this.setState(prevState => ({ requestValue: Object.assign(prevState.requestValue, { SITE: e }) }))}
                        style={{ width: '100%' }}
                      >
                        <Option value="317">청주</Option>
                        <Option value="318">구미</Option>
                      </AntdSelect>
                    </td>
                  </tr>
                  <tr>
                    <th>품목</th>
                    <td>
                      <AntdInput
                        className="ant-input-sm"
                        name="KIND"
                        defaultValue={requestValue.KIND}
                        value={requestValue.KIND}
                        style={{ width: '100%' }}
                        placeholder="품목명을 입력하세요."
                        onChange={e => this.handleChange(e)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>모델</th>
                    <td>
                      <AntdInput
                        className="ant-input-sm"
                        name="MODEL"
                        defaultValue={requestValue.MODEL}
                        value={requestValue.MODEL}
                        style={{ width: '100%' }}
                        placeholder="모델명을 입력하세요."
                        onChange={e => this.handleChange(e)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Size</th>
                    <td>
                      <AntdInput
                        className="ant-input-sm"
                        name="SIZE1"
                        defaultValue={requestValue.SIZE1}
                        value={requestValue.SIZE1}
                        style={{ width: '100%' }}
                        placeholder="사이즈를 입력하세요."
                        onChange={e => this.handleChange(e)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>검정번호</th>
                    <td>
                      <AntdInput
                        className="ant-input-sm"
                        name="APP_NO"
                        defaultValue={requestValue.APP_NO}
                        value={requestValue.APP_NO}
                        style={{ width: '100%' }}
                        placeholder="검정번호를 입력하세요."
                        onChange={e => this.handleChange(e)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Vendor</th>
                    <td>
                      {this.state.viewType === 'VIEW' ? (
                        <EshsCmpnyComp
                          sagaKey={this.props.sagaKey}
                          getExtraApiData={this.props.getCallDataHandler}
                          extraApiData={this.props.result}
                          colData={requestValue.VENDOR_CD ? requestValue.VENDOR_CD : ''}
                          readOnly={false}
                          visible
                          CONFIG={{ property: { isRequired: false } }}
                          changeFormData={this.props.changeFormData}
                          COMP_FIELD="VENDOR"
                          eshsCmpnyCompResult={(companyInfo, COMP_FIELD) => this.handleEshsCmpnyCompChange(companyInfo, COMP_FIELD)}
                        />
                      ) : (
                        <EshsCmpnyComp
                          sagaKey={this.props.sagaKey}
                          getExtraApiData={this.props.getCallDataHandler}
                          extraApiData={this.props.result}
                          colData={requestValue.VENDOR_CD}
                          visible
                          CONFIG={{ property: { isRequired: false } }}
                          changeFormData={this.props.changeFormData}
                          COMP_FIELD="VENDOR"
                          eshsCmpnyCompResult={(companyInfo, COMP_FIELD) => this.handleEshsCmpnyCompChange(companyInfo, COMP_FIELD)}
                        />
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>Maker</th>
                    <td>
                      {this.state.viewType === 'VIEW' ? (
                        <EshsCmpnyComp
                          sagaKey={this.props.sagaKey}
                          getExtraApiData={this.props.getCallDataHandler}
                          extraApiData={this.props.result}
                          colData={requestValue && requestValue.MAKER_CD ? requestValue.MAKER_CD : ''}
                          readOnly={false}
                          visible
                          CONFIG={{ property: { isRequired: false } }}
                          changeFormData={this.props.changeFormData}
                          COMP_FIELD="MAKER"
                          eshsCmpnyCompResult={(companyInfo, COMP_FIELD) => this.handleEshsCmpnyCompChange(companyInfo, COMP_FIELD)}
                        />
                      ) : (
                        <EshsCmpnyComp
                          sagaKey={this.props.sagaKey}
                          getExtraApiData={this.props.getCallDataHandler}
                          extraApiData={this.props.result}
                          colData={requestValue.MAKER_CD}
                          visible
                          CONFIG={{ property: { isRequired: false } }}
                          changeFormData={this.props.changeFormData}
                          COMP_FIELD="MAKER"
                          eshsCmpnyCompResult={(companyInfo, COMP_FIELD) => this.handleEshsCmpnyCompChange(companyInfo, COMP_FIELD)}
                        />
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>단위</th>
                    <td>
                      <AntdInput
                        className="ant-input-sm"
                        name="UNIT"
                        defaultValue={requestValue.UNIT}
                        value={requestValue.UNIT}
                        style={{ width: '100%' }}
                        placeholder="단위를 입력하세요."
                        onChange={e => this.handleChange(e)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>유효기간</th>
                    <td>
                      <AntdInput
                        className="ant-input-sm"
                        name="VALIDITY_TERM"
                        defaultValue={requestValue.VALIDITY_TERM}
                        value={requestValue.VALIDITY_TERM}
                        style={{ width: '100%' }}
                        placeholder="유효기간을 입력하세요."
                        onChange={e => this.handleChange(e)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>적정재고</th>
                    <td>
                      <InputNumber
                        className="ant-input-number-sm"
                        name="PROPERSTOCK"
                        defaultValue={requestValue.PROPERSTOCK}
                        value={requestValue.PROPERSTOCK}
                        style={{ width: '100%' }}
                        placeholder="적정재고를 입력하세요."
                        onChange={value => this.handleNumberChange(value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>비고</th>
                    <td>
                      <Input.TextArea
                        name="COMMENTS"
                        defaultValue={requestValue.COMMENTS}
                        value={requestValue.COMMENTS}
                        style={{ width: '100%' }}
                        placeholder="비고를 입력하세요."
                        onChange={e => this.handleChange(e)}
                        autoSize
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>첨부</th>
                    <td>
                      <ImageUploader
                        action="/upload"
                        listType="picture-card"
                        handleChange={this.handleUploadFileChange}
                        fileList={this.state.fileList}
                        multiple
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </StyledHtmlTable>
          </AntdModal>
        </StyledContentsWrapper>
      </>
    );
  }
}

List.propTypes = {
  getCallDataHandler: PropTypes.func,
  sagaKey: PropTypes.string,
  result: PropTypes.object,
  changeFormData: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
  handleRowClick: PropTypes.func,
};

List.defatulProps = {
  handleRowClick: null,
};

export default List;
