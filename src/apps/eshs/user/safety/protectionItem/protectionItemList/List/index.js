import React from 'react';
import PropTypes from 'prop-types';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Select, Input, InputNumber, Modal } from 'antd';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledContentsModal from 'commonStyled/EshsStyled/Modal/StyledContentsModal';

import request from 'utils/request';
import { debounce } from 'lodash';

import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledButton from 'commonStyled/Buttons/StyledButton';

import ImageUploader from 'components/FormStuff/Upload/ImageUploader';
import EshsCmpnyComp from 'components/BizBuilder/Field/EshsCmpnyComp';
import CustomTooltip from './customTooltip';

const { Option } = Select;
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdModal = StyledContentsModal(Modal);
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
    SITE: '313',
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

  modalContent = () => [
    {
      title: this.state.viewType.toUpperCase() === 'VIEW' ? '사진' : '',
      content:
        this.state.viewType.toUpperCase() === 'VIEW' && this.props.result.attachs && this.props.result.attachs.fileList.length
          ? this.props.result.attachs.fileList.map(item => (
              <img src={`http://192.168.251.14:10197/down/file/${item.FILE_SEQ}`} alt={this.state.requestValue.kind} width="150px" />
            ))
          : '',
    },
    {
      title: '지역',
      content: (
        <AntdSelect
          name="SITE"
          defaultValue="317"
          width="300px"
          onChange={e => this.setState(prevState => ({ requestValue: Object.assign(prevState.requestValue, { SITE: e }) }))}
        >
          <Option value="317">청주</Option>
          <Option value="318">구미</Option>
        </AntdSelect>
      ),
    },
    {
      title: '품목',
      content: (
        <AntdInput
          name="KIND"
          defaultValue={this.state.requestValue.KIND}
          value={this.state.requestValue.KIND}
          style={{ width: '500px' }}
          placeholder="품목명을 입력하세요."
          onChange={e => this.handleChange(e)}
        />
      ),
    },
    {
      title: '모델',
      content: (
        <AntdInput
          name="MODEL"
          defaultValue={this.state.requestValue.MODEL}
          value={this.state.requestValue.MODEL}
          style={{ width: '500px' }}
          placeholder="모델명을 입력하세요."
          onChange={e => this.handleChange(e)}
        />
      ),
    },
    {
      title: 'Size',
      content: (
        <AntdInput
          name="SIZE1"
          defaultValue={this.state.requestValue.SIZE1}
          value={this.state.requestValue.SIZE1}
          style={{ width: '500px' }}
          placeholder="사이즈를 입력하세요."
          onChange={e => this.handleChange(e)}
        />
      ),
    },
    {
      title: '검정번호',
      content: (
        <AntdInput
          name="APP_NO"
          defaultValue={this.state.requestValue.APP_NO}
          value={this.state.requestValue.APP_NO}
          style={{ width: '500px' }}
          placeholder="검정번호를 입력하세요."
          onChange={e => this.handleChange(e)}
        />
      ),
    },
    {
      title: 'Vendor',
      content:
        this.state.viewType === 'VIEW' ? (
          <EshsCmpnyComp
            sagaKey={this.props.sagaKey}
            getExtraApiData={this.props.getCallDataHandler}
            extraApiData={this.props.result}
            colData={this.state.requestValue.VENDOR_CD ? this.state.requestValue.VENDOR_CD : ''}
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
            colData={this.state.requestValue.VENDOR_CD}
            visible
            CONFIG={{ property: { isRequired: false } }}
            changeFormData={this.props.changeFormData}
            COMP_FIELD="VENDOR"
            eshsCmpnyCompResult={(companyInfo, COMP_FIELD) => this.handleEshsCmpnyCompChange(companyInfo, COMP_FIELD)}
          />
        ),
    },
    {
      title: 'Maker',
      content:
        this.state.viewType === 'VIEW' ? (
          <EshsCmpnyComp
            sagaKey={this.props.sagaKey}
            getExtraApiData={this.props.getCallDataHandler}
            extraApiData={this.props.result}
            colData={this.state.requestValue && this.state.requestValue.MAKER_CD ? this.state.requestValue.MAKER_CD : ''}
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
            colData={this.state.requestValue.MAKER_CD}
            visible
            CONFIG={{ property: { isRequired: false } }}
            changeFormData={this.props.changeFormData}
            COMP_FIELD="MAKER"
            eshsCmpnyCompResult={(companyInfo, COMP_FIELD) => this.handleEshsCmpnyCompChange(companyInfo, COMP_FIELD)}
          />
        ),
    },
    {
      title: '단위',
      content: (
        <AntdInput
          name="UNIT"
          defaultValue={this.state.requestValue.UNIT}
          value={this.state.requestValue.UNIT}
          style={{ width: '500px' }}
          placeholder="단위를 입력하세요."
          onChange={e => this.handleChange(e)}
        />
      ),
    },
    {
      title: '유효기간',
      content: (
        <AntdInput
          name="VALIDITY_TERM"
          defaultValue={this.state.requestValue.VALIDITY_TERM}
          value={this.state.requestValue.VALIDITY_TERM}
          style={{ width: '500px' }}
          placeholder="유효기간을 입력하세요."
          onChange={e => this.handleChange(e)}
        />
      ),
    },
    {
      title: '적정재고',
      content: (
        <InputNumber
          name="PROPERSTOCK"
          defaultValue={this.state.requestValue.PROPERSTOCK}
          value={this.state.requestValue.PROPERSTOCK}
          style={{ width: '500px' }}
          placeholder="적정재고를 입력하세요."
          onChange={value => this.handleNumberChange(value)}
        />
      ),
    },
    {
      title: '비고',
      content: (
        <Input.TextArea
          name="COMMENTS"
          defaultValue={this.state.requestValue.COMMENTS}
          value={this.state.requestValue.COMMENTS}
          style={{ width: '500px' }}
          placeholder="비고를 입력하세요."
          onChange={e => this.handleChange(e)}
          autoSize
        />
      ),
    },
    {
      title: '첨부',
      content: <ImageUploader action="/upload" listType="picture-card" handleChange={this.handleUploadFileChange} fileList={this.state.fileList} multiple />,
    },
  ];

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
    const { input } = this.state;
    this.setState({
      selectedSite: value,
    });
    this.getNewRowData(value, input);
  };

  handleInputChange = e => {
    const { selectedSite } = this.state;
    this.setState({
      input: e.target.value,
    });
    this.getNewRowData(selectedSite, e.target.value);
  };

  getNewRowData = async (site, keyword) => {
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
    submitHandlerBySaga(id, 'POST', `/api/eshs/v1/common/geteshsprotectionitems`, requestValue, () => {
      this.gridApi.updateRowData({ add: [requestValue], addIndex: 0 });
      this.getNewRowData('', '');
      this.setState({ visible: false, requestValue: { SITE: '313' }, responseList: [], fileList: [] });
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      requestValue: { SITE: '313' },
      fileList: [],
    });
  };

  handleModifyClick = () => {
    const { requestValue } = this.state;
    const { sagaKey: id, submitHandlerBySaga, result } = this.props;
    const fileSeqArr = [];
    if (result.realFile && result.realFile.DETAIL.length) {
      // 수정화면에서 사진을 추가했다면
      result.realFile.DETAIL.map(item => fileSeqArr.push(item.seq));
      this.setState(prevState => ({
        // file_seq = 새로 올라온 파일, attachedFile = 기존 파일 (삭제해야 함)
        requestValue: Object.assign(prevState.requestValue, { FILE_SEQ: fileSeqArr }, { ATTACHEDFILE: result.attachs.fileList }),
      }));
      return submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/geteshsprotectionitems`, requestValue, () => {
        this.gridApi.redrawRows();
        this.setState({ requestValue: { SITE: '313' }, visible: false });
      });
    }
    return submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/geteshsprotectionitems`, requestValue, () => {
      this.gridApi.redrawRows();
      this.setState({ requestValue: { SITE: '313' }, visible: false });
    });
  };

  handleDeleteClick = () => {
    const { requestValue } = this.state;
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    submitHandlerBySaga(id, 'DELETE', `/api/eshs/v1/common/geteshsprotectionitems`, { HITEM_CD: requestValue.hitem_cd }, this.gridApi.redrawRows());
    this.setState(prevState => ({ rowData: prevState.rowData.filter(item => item.HITEM_CD !== prevState.requestValue.HITEM_CD), visible: false }));
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
    const { visible, columnDefs, rowData, viewType, frameworkComponents, tooltipShowDelay } = this.state;
    const { handleSelectChange, handleInputChange, initGridData, gridOptions, handleOk, handleCancel, modalContent, inputFooter, viewFooter } = this;
    return (
      <>
        <ContentsWrapper>
          <div className="selSaveWrapper alignLeft">
            <AntdSelect defaultValue="청주" onChange={handleSelectChange} className="ant-select-mid">
              <Option value="313">청주</Option>
              <Option value="314">구미</Option>
            </AntdSelect>
            <AntdInput className="ant-input-inline mr5" onChange={handleInputChange} style={{ width: '300px' }} placeholder="품목을 입력하세요." />
            <StyledButton className="btn-primary" onClick={() => this.setState({ visible: true, viewType: 'INPUT' })}>
              등록
            </StyledButton>
          </div>
          <div style={{ width: '100%', height: '100%' }}>
            <div className="ag-theme-balham tableWrapper" style={{ height: '520px' }}>
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
        </ContentsWrapper>
        <AntdModal
          className="modal-table-pad"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          width="600px"
          closable
          destroyOnClose
          title={viewType.toUpperCase() === 'INPUT' ? '등록' : '수정'}
          footer={viewType.toUpperCase() === 'INPUT' ? inputFooter() : viewFooter()}
        >
          {modalContent().map(item => (
            <div>
              <div>{item.title}</div>
              <div>{item.content}</div>
            </div>
          ))}
        </AntdModal>
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
