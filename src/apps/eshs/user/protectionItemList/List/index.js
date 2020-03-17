import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
// import { AllCommuinityModules } from 'ag-grid-community';
import { Select, Input, InputNumber, Modal } from 'antd';
import request from 'utils/request';
import { debounce } from 'lodash';

import Sketch from 'components/BizBuilder/Sketch';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import StyledButton from 'components/BizBuilder/styled/StyledButton';

import EshsCmpnyComp from 'components/BizBuilder/Field/EshsCmpnyComp';
import CustomTooltip from './customTooltip';

const { Option } = Select;
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // modules: AllCommuinityModules,
      frameworkComponents: { customTooltip: CustomTooltip },
      selectedSite: '',
      input: '',
      visible: false,
      viewType: '',
      requestValue: this.requestValueOrigin,
      columnDefs: this.columnDefsOrigin,
      rowData: [],
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
      tooltipField: 'kind',
    },
    {
      headerName: 'Size',
      field: 'size1',
      width: 130,
      tooltipField: 'kind',
    },
    {
      headerName: '검정#',
      field: 'app_no',
      tooltipField: 'kind',
    },
    {
      headerName: 'Vendor',
      field: 'vendor_nm',
      width: 130,
      tooltipField: 'kind',
    },
    {
      headerName: 'Maker',
      field: 'maker_nm',
      tooltipField: 'kind',
    },
    {
      headerName: '단가',
      field: 'unitprice',
      valueFormatter: params => (params.value ? params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0),
      tooltipField: 'kind',
    },
    {
      headerName: '유효기간',
      field: 'validity_term',
      tooltipField: 'kind',
    },
    {
      headerName: '적정재고',
      field: 'properstock',
      tooltipField: 'kind',
    },
    {
      headerName: '비고',
      field: 'comments',
      width: 930,
      tooltipField: 'kind',
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
    properstock: '',
    comments: '',
  };

  gridOptions = {
    defaultColDef: {
      width: 100,
      resizable: true,
      tooltipComponent: 'customTooltip',
    },
  };

  modalContent = () => [
    { title: '사진', content: '' },
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
    { title: '첨부', content: '' },
  ];

  initGridData = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.getProtectionItemList().then(res =>
      this.setState({
        rowData: res.response.list,
      }),
    );
  };

  changeGridData = func => {
    this.setState({
      rowData: func.response.list,
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
    this.setState({ [e.target.name]: e.target.value });
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
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    this.setState({ visible: false, requestValue: this.requestValueOrigin });
    submitHandlerBySaga(
      id,
      'POST',
      `/api/eshs/v1/common/geteshsprotectionitems`,
      requestValue,
      this.gridApi.updateRowData({ add: [requestValue], addIndex: 0 }),
    );
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      requestValue: this.requestValueOrigin,
    });
  };

  handleModifyClick = () => {
    const { requestValue } = this.state;
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/geteshsprotectionitems`, requestValue, this.gridApi.redrawRows());
    this.setState({ requestValue: this.requestValueOrigin, visible: false });
  };

  handleDeleteClick = () => {
    const { requestValue } = this.state;
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    submitHandlerBySaga(id, 'DELETE', `/api/eshs/v1/common/geteshsprotectionitems`, { hitem_cd: requestValue.hitem_cd }, this.gridApi.redrawRows());
    this.setState(prevState => ({ rowData: prevState.rowData.filter(item => item.hitem_cd !== prevState.requestValue.hitem_cd), visible: false }));
  };

  inputFooter = [
    <StyledButton className="btn-primary" onClick={this.handleOk}>
      등록
    </StyledButton>,
    <StyledButton className="btn-primary" onClick={this.handleCancel}>
      취소
    </StyledButton>,
  ];

  viewFooter = [
    <StyledButton className="btn-primary" onClick={this.handleModifyClick}>
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
    const { visible, columnDefs, rowData, viewType } = this.state;
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
          <div style={{ width: '100%', height: '100%' }}>
            <div className="ag-theme-balham" style={{ height: '540px' }}>
              <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                onGridReady={initGridData}
                gridOptions={gridOptions}
                defaultColDef={gridOptions.defaultColDef}
                suppressRowTransform
                onRowClicked={e => {
                  this.setState({ visible: true, viewType: 'VIEW', requestValue: e.data });
                }}
                frameworkComponents={this.state.frameworkComponents}
                // onCellMouseOver="ds"
              />
            </div>
          </div>
          <Modal visible={visible} onOk={handleOk} onCancel={handleCancel} width="600px" closable footer={viewType === 'INPUT' ? inputFooter : viewFooter}>
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
