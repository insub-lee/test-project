import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community';
import { Select, Input, InputNumber, Modal } from 'antd';

import Sketch from 'components/BizBuilder/Sketch';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import StyledButton from 'components/BizBuilder/styled/StyledButton';

import request from 'utils/request';
import { debounce } from 'lodash';

const { Option } = Select;
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSite: '',
      input: '',
      visible: false,
      requestValue: {
        site: '',
        kind: '',
        model: '',
        size1: '',
        app_no: '',
        vendor_nm: '',
        maker_nm: '',
        unit: '',
        validity_term: '',
        properstock: '',
        comments: '',
      },
      columnDefs: [
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
          valueFormatter: this.numberFormatter,
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
      ],
      rowData: [],
    };
    this.getNewRowData = debounce(this.getNewRowData, 300);
  }

  gridOptions = {
    defaultColDef: {
      width: 100,
      resizable: true,
    },
  };

  initGridData = () => {
    this.getProtectionItemList().then(res => this.setState({ rowData: res.response.list }));
  };

  changeGridData = func => {
    this.setState({
      rowData: func.response.list,
    });
  };

  getProtectionItemList = async () => {
    const result = await request({
      url: '/api/eshs/v1/common/geteshsprotectionitems',
      method: 'GET',
    });
    return result;
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
    const result = await request({
      url: `/api/eshs/v1/common/geteshsprotectionitems?site=${site}&keyword=${keyword}`,
      method: 'GET',
    });
    this.changeGridData(result);
  };

  modalContent = [
    { title: '사진', content: '' },
    {
      title: '지역',
      content: (
        <Select defaultValue="청주" width="300px">
          <Option value="313">청주</Option>
          <Option value="314">구미</Option>
        </Select>
      ),
    },
    { title: '품목', content: <Input name="kind" style={{ width: '500px' }} placeholder="모델명을 입력하세요." onChange={e => this.handleChange(e)} /> },
    { title: '모델', content: <Input name="model" style={{ width: '500px' }} placeholder="모델명을 입력하세요." onChange={e => this.handleChange(e)} /> },
    { title: 'Size', content: <Input name="size1" style={{ width: '500px' }} placeholder="사이즈를 입력하세요." onChange={e => this.handleChange(e)} /> },
    { title: '검정번호', content: <Input style={{ width: '500px' }} placeholder="검정번호를 입력하세요." /> },
    { title: 'Vendor', content: '' },
    { title: 'Maker', content: '' },
    { title: '단위', content: <Input style={{ width: '500px' }} placeholder="단위를 입력하세요." onChange={e => this.handleChange(e)} /> },
    { title: '유효기간', content: <Input style={{ width: '500px' }} placeholder="유효기간을 입력하세요." onChange={e => this.handleChange(e)} /> },
    { title: '적정재고', content: <InputNumber style={{ width: '500px' }} placeholder="적정재고를 입력하세요." /> },
    { title: '비고', content: <Input.TextArea style={{ width: '500px' }} placeholder="비고를 입력하세요." onChange={e => this.handleChange(e)} /> },
    { title: '첨부', content: '' },
  ];

  handleChange = e => {
    const valueObj = { [e.target.name]: e.target.value };
    this.setState(prevState => ({ requestValue: Object.assign(prevState.requestValue, valueObj) }));
  };

  handleOk = () => {
    const { getCallDataHandler } = this.props;
    console.debug(getCallDataHandler);
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  numberFormatter = params => params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  render() {
    const { columnDefs, rowData, visible } = this.state;
    const { initGridData, gridOptions, handleSelectChange, handleInputChange, handleOk, handleCancel } = this;
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
            <StyledButton className="btn-primary" onClick={() => this.setState({ visible: true })}>
              등록
            </StyledButton>
          </div>
          <div style={{ width: '100%', height: '100%' }}>
            <div className="ag-theme-balham" style={{ height: '540px' }}>
              <AgGridReact columnDefs={columnDefs} rowData={rowData} onGridReady={initGridData} gridOptions={gridOptions} suppressRowTransform />
            </div>
          </div>
          <Modal visible={visible} onOk={handleOk} onCancel={handleCancel} width="600px" closable>
            {this.modalContent.map(item => (
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
};

export default List;
