import React from 'react';
import PropTypes from 'prop-types';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Select, Input, InputNumber, Modal } from 'antd';
import request from 'utils/request';
import { debounce } from 'lodash';

import Sketch from 'components/BizBuilder/Sketch';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import StyledButton from 'commonStyled/Buttons/StyledButton';

import ImageUploader from 'components/FormStuff/Upload/ImageUploader';
import EshsCmpnyComp from 'components/BizBuilder/Field/EshsCmpnyComp';
import CustomTooltip from './customTooltip';

const { Option } = Select;
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
      field: 'kind',
      width: 170,
      tooltipField: 'kind',
    },
    {
      headerName: '모델',
      field: 'model',
      width: 200,
      tooltipField: 'model',
    },
    {
      headerName: 'Size',
      field: 'size1',
      width: 130,
      tooltipField: 'size1',
    },
    {
      headerName: '검정#',
      field: 'app_no',
      tooltipField: 'app_no',
    },
    {
      headerName: 'Vendor',
      field: 'vendor_nm',
      width: 130,
      tooltipField: 'vendor_nm',
    },
    {
      headerName: 'Maker',
      field: 'maker_nm',
      tooltipField: 'maker_nm',
    },
    {
      headerName: '단가',
      field: 'unitprice',
      valueFormatter: params => (params.value ? params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0),
      tooltipField: 'unitprice',
    },
    {
      headerName: '유효기간',
      field: 'validity_term',
      tooltipField: 'validity_term',
    },
    {
      headerName: '적정재고',
      field: 'properstock',
      tooltipField: 'properstock',
    },
    {
      headerName: '비고',
      field: 'comments',
      width: 930,
      tooltipField: 'comments',
    },
  ];

  requestValueOrigin = {
    site: '313',
    kind: '',
    model: '',
    size1: '',
    app_no: '',
    vendor_cd: '',
    maker_cd: '',
    unit: '',
    validity_term: '',
    properstock: 0,
    comments: '',
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
              <img src={`http://192.168.251.14:10197/down/file/${item.file_seq}`} alt={this.state.requestValue.kind} width="150px" />
            ))
          : '',
    },
    {
      title: '지역',
      content: (
        <Select
          name="site"
          defaultValue="313"
          width="300px"
          onChange={e => this.setState(prevState => ({ requestValue: Object.assign(prevState.requestValue, { site: e }) }))}
        >
          <Option value="313">청주</Option>
          <Option value="314">구미</Option>
        </Select>
      ),
    },
    {
      title: '품목',
      content: (
        <Input
          name="kind"
          defaultValue={this.state.requestValue.kind}
          value={this.state.requestValue.kind}
          style={{ width: '500px' }}
          placeholder="품목명을 입력하세요."
          onChange={e => this.handleChange(e)}
        />
      ),
    },
    {
      title: '모델',
      content: (
        <Input
          name="model"
          defaultValue={this.state.requestValue.model}
          value={this.state.requestValue.model}
          style={{ width: '500px' }}
          placeholder="모델명을 입력하세요."
          onChange={e => this.handleChange(e)}
        />
      ),
    },
    {
      title: 'Size',
      content: (
        <Input
          name="size1"
          defaultValue={this.state.requestValue.size1}
          value={this.state.requestValue.size1}
          style={{ width: '500px' }}
          placeholder="사이즈를 입력하세요."
          onChange={e => this.handleChange(e)}
        />
      ),
    },
    {
      title: '검정번호',
      content: (
        <Input
          name="app_no"
          defaultValue={this.state.requestValue.app_no}
          value={this.state.requestValue.app_no}
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
            colData={this.state.requestValue.vendor_cd ? this.state.requestValue.vendor_cd : ''}
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
            colData={this.state.requestValue.vendor_cd}
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
            colData={this.state.requestValue && this.state.requestValue.maker_cd ? this.state.requestValue.maker_cd : ''}
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
            colData={this.state.requestValue.maker_cd}
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
        <Input
          name="unit"
          defaultValue={this.state.requestValue.unit}
          value={this.state.requestValue.unit}
          style={{ width: '500px' }}
          placeholder="단위를 입력하세요."
          onChange={e => this.handleChange(e)}
        />
      ),
    },
    {
      title: '유효기간',
      content: (
        <Input
          name="validity_term"
          defaultValue={this.state.requestValue.validity_term}
          value={this.state.requestValue.validity_term}
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
          name="properstock"
          defaultValue={this.state.requestValue.properstock}
          value={this.state.requestValue.properstock}
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
          name="comments"
          defaultValue={this.state.requestValue.comments}
          value={this.state.requestValue.comments}
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
      url: `/api/eshs/v1/common/geteshsprotectionitems?site=${313}`,
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
      url: `/api/eshs/v1/common/geteshsprotectionitems?site=${site}&keyword=${keyword}`,
      method: 'GET',
    });
    this.changeGridData(data);
  };

  handleEshsCmpnyCompChange = (data, fieldName) => {
    const valueObj = { [`${fieldName.toLowerCase()}_cd`]: data.WRK_CMPNY_CD, [`${fieldName.toLowerCase()}_nm`]: data.WRK_CMPNY_NM }; // 키값 바꾸기
    this.setState({ [fieldName.toLowerCase()]: data.WRK_CMPNY_NM, [`${fieldName.toLowerCase()}name`]: data.WRK_CMPNY_CD });
    this.setState(prevState => ({ requestValue: Object.assign(prevState.requestValue, valueObj) }));
  };

  handleChange = e => {
    const valueObj = { [e.target.name]: e.target.value };
    this.setState(prevState => ({ requestValue: Object.assign(prevState.requestValue, valueObj) }));
  };

  handleNumberChange = value => {
    if (typeof value !== 'number') {
      return;
    }
    const valueObj = { properstock: value };
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
      this.setState(prevState => ({ requestValue: Object.assign(prevState.requestValue, { file_seq: fileSeqArr }) }));
    }
    submitHandlerBySaga(id, 'POST', `/api/eshs/v1/common/geteshsprotectionitems`, requestValue, () => {
      this.gridApi.updateRowData({ add: [requestValue], addIndex: 0 });
      this.getNewRowData('', '');
      this.setState({ visible: false, requestValue: { site: '313' }, responseList: [], fileList: [] });
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      requestValue: { site: '313' },
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
        requestValue: Object.assign(prevState.requestValue, { file_seq: fileSeqArr }, { attachedFile: result.attachs.fileList }),
      }));
      return submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/geteshsprotectionitems`, requestValue, () => {
        this.gridApi.redrawRows();
        this.setState({ requestValue: { site: '313' }, visible: false });
      });
    }
    return submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/geteshsprotectionitems`, requestValue, () => {
      this.gridApi.redrawRows();
      this.setState({ requestValue: { site: '313' }, visible: false });
    });
  };

  handleDeleteClick = () => {
    const { requestValue } = this.state;
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    submitHandlerBySaga(id, 'DELETE', `/api/eshs/v1/common/geteshsprotectionitems`, { hitem_cd: requestValue.hitem_cd }, this.gridApi.redrawRows());
    this.setState(prevState => ({ rowData: prevState.rowData.filter(item => item.hitem_cd !== prevState.requestValue.hitem_cd), visible: false }));
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
    const { sagaKey: id, getCallDataHandler } = this.props;
    this.setState({ requestValue: rowData, visible: true, viewType: 'VIEW' });
    const apiArr = [
      {
        key: 'attachs',
        type: 'GET',
        url: `/api/eshs/v1/common/geteshsprotectionitemsattach?hitem_cd=${rowData.hitem_cd}`,
      },
    ];
    getCallDataHandler(id, apiArr);
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
    const { visible, columnDefs, rowData, viewType, frameworkComponents } = this.state;
    const { handleSelectChange, handleInputChange, initGridData, gridOptions, handleOk, handleCancel, modalContent, inputFooter, viewFooter } = this;
    return (
      <StyledViewDesigner>
        <Sketch>
          <div>
            <Select defaultValue="청주" onChange={handleSelectChange}>
              <Option value="313">청주</Option>
              <Option value="314">구미</Option>
            </Select>
            <Input
              onChange={handleInputChange}
              style={{ width: '300px', marginRight: '10px', marginLeft: '10px', marginBottom: '10px' }}
              placeholder="품목을 입력하세요."
            />
            <StyledButton className="btn-primary" onClick={() => this.setState({ visible: true, viewType: 'INPUT' })}>
              등록
            </StyledButton>
          </div>
          {/* <CustomTooltipStyled> */}
          <div style={{ width: '100%', height: '100%' }}>
            <div id="myGrid" className="ag-theme-balham" style={{ height: '540px' }}>
              <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                onGridReady={initGridData}
                gridOptions={gridOptions}
                defaultColDef={gridOptions.defaultColDef}
                tooltipShowDelay={this.state.tooltipShowDelay}
                suppressRowTransform
                onRowClicked={e => this.handleRowClick(e.data)}
                frameworkComponents={frameworkComponents}
              />
            </div>
          </div>
          <Modal
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            width="600px"
            closable
            destroyOnClose
            footer={viewType === 'INPUT' ? inputFooter() : viewFooter()}
          >
            {modalContent().map(item => (
              <div>
                <div>{item.title}</div>
                <div>{item.content}</div>
              </div>
            ))}
          </Modal>
        </Sketch>
      </StyledViewDesigner>
    );
  }
}

List.propTypes = {
  getCallDataHandler: PropTypes.func,
  sagaKey: PropTypes.string,
  result: PropTypes.object,
  changeFormData: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
};

export default List;
