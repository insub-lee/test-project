import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community';
import { Select, Input, InputNumber, Modal } from 'antd';
import request from 'utils/request';
import { debounce } from 'lodash';

import Sketch from 'components/BizBuilder/Sketch';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import StyledButton from 'components/BizBuilder/styled/StyledButton';

import EshsCmpnyComp from 'components/BizBuilder/Field/EshsCmpnyComp';

const { Option } = Select;
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    },
    {
      headerName: '모델',
      field: 'model',
      width: 200,
    },
    {
      headerName: 'Size',
      field: 'size1',
      width: 130,
    },
    {
      headerName: '검정#',
      field: 'app_no',
    },
    {
      headerName: 'Vendor',
      field: 'vendor_nm',
      width: 130,
    },
    {
      headerName: 'Maker',
      field: 'maker_nm',
    },
    {
      headerName: '단가',
      field: 'unitprice',
      valueFormatter: params => (params.value ? params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0),
    },
    {
      headerName: '유효기간',
      field: 'validity_term',
    },
    {
      headerName: '적정재고',
      field: 'properstock',
    },
    {
      headerName: '비고',
      field: 'comments',
      width: 930,
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
    },
  };

  initGridData = () => {
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

  modalContent = () => {
    const { viewData, viewType } = this.state;
    return [
      { title: '사진', content: '' },
      {
        title: '지역',
        content: (
          <Select
            name="site"
            // defaultValue="313"
            value={viewType === 'VIEW' ? viewData.site : '313'}
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
            defaultValue={viewType === 'VIEW' ? viewData.kind : this.state.kind}
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
            defaultValue={viewType === 'VIEW' ? viewData.model : this.state.model}
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
            defaultValue={viewType === 'VIEW' ? viewData.size1 : this.state.size1}
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
            defaultValue={viewType === 'VIEW' ? viewData.app_no : this.state.app_no}
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
              colData={this.state.viewData.vendor_cd ? this.state.viewData.vendor_cd : ''}
              readOnly={false}
              visible
              CONFIG={{ property: { isRequired: false } }}
              changeFormData={this.props.changeFormData}
              COMP_FIELD="VENDOR_CD"
              eshsCmpnyCompResult={(companyInfo, COMP_FIELD) => this.handleEshsCmpnyCompChange(companyInfo, COMP_FIELD)}
            />
          ) : (
            <EshsCmpnyComp
              sagaKey={this.props.sagaKey}
              getExtraApiData={this.props.getCallDataHandler}
              extraApiData={this.props.result}
              colData=""
              visible
              CONFIG={{ property: { isRequired: false } }}
              changeFormData={this.props.changeFormData}
              COMP_FIELD="VENDOR_CD"
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
              colData={this.state.viewData && this.state.viewData.maker_cd ? this.state.viewData.maker_cd : ''}
              readOnly={false}
              visible
              CONFIG={{ property: { isRequired: false } }}
              changeFormData={this.props.changeFormData}
              COMP_FIELD="MAKER_CD"
              eshsCmpnyCompResult={(companyInfo, COMP_FIELD) => this.handleEshsCmpnyCompChange(companyInfo, COMP_FIELD)}
            />
          ) : (
            <EshsCmpnyComp
              sagaKey={this.props.sagaKey}
              getExtraApiData={this.props.getCallDataHandler}
              extraApiData={this.props.result}
              colData=""
              visible
              CONFIG={{ property: { isRequired: false } }}
              changeFormData={this.props.changeFormData}
              COMP_FIELD="MAKER_CD"
              eshsCmpnyCompResult={(companyInfo, COMP_FIELD) => this.handleEshsCmpnyCompChange(companyInfo, COMP_FIELD)}
            />
          ),
      },
      {
        title: '단위',
        content: (
          <Input
            name="unit"
            defaultValue={viewType === 'VIEW' ? viewData.unit : this.state.unit}
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
            defaultValue={viewType === 'VIEW' ? viewData.validity_term : this.state.validity_term}
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
            defaultValue={viewType === 'VIEW' ? viewData.properstock : this.state.properstock}
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
            defaultValue={viewType === 'VIEW' ? viewData.comments : this.state.comments}
            style={{ width: '500px' }}
            placeholder="비고를 입력하세요."
            onChange={e => this.handleChange(e)}
            autoSize
          />
        ),
      },
      { title: '첨부', content: '' },
    ];
  };

  handleEshsCmpnyCompChange = (data, fieldName) => {
    const valueObj = { [fieldName.toLowerCase()]: data.WRK_CMPNY_CD };
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
    this.setState({
      properstock: value,
    });
    this.setState(prevState => ({ requestValue: Object.assign(prevState.requestValue, valueObj) }));
  };

  handleOk = () => {
    const { requestValue } = this.state;
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    submitHandlerBySaga(id, 'POST', `/api/eshs/v1/common/geteshsprotectionitems`, requestValue, () =>
      this.setState(prevState => ({ visible: false, rowData: prevState.rowData.concat(requestValue), requestValue: this.requestValueOrigin })),
    );
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      requestValue: this.requestValueOrigin,
      viewData: {},
    });
    return <EshsCmpnyComp colData="" />;
  };

  handleModifyClick = () => {
    const { viewData } = this.state;
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    // submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/geteshsprotectionitems`, viewData);
    this.setState(prevState => ({ requestValue: Object.assign(prevState.requestValue, prevState.viewData) }));
    console.debug(this.state.requestValue);
  };

  handleDeleteClick = () => {
    const { viewData } = this.state;
    console.debug(viewData.hitem_cd);
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
    const { handleSelectChange, handleInputChange, initGridData, gridOptions, handleOk, handleCancel, modalContent } = this;
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
                suppressRowTransform
                onRowClicked={e => {
                  console.debug(e.data);
                  this.setState({ visible: true, viewType: 'VIEW', viewData: e.data });
                }}
                // onCellMouseOver={e => console.debug(e.data)}
              />
            </div>
          </div>
          <Modal
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            width="600px"
            closable
            footer={viewType === 'INPUT' ? this.inputFooter : this.viewFooter}
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
