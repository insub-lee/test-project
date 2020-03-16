import React, { useState } from 'react';
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
const List = ({ sagaKey: id, getCallDataHandler, result, changeFormData }) => {
  const columnDefsOrigin = [
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
      valueFormatter: params => params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
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

  const requestValueOrigin = {
    site: '313',
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
  };

  const [selectedSite, setSelectedSite] = useState('');
  const [input, setInput] = useState('');
  const [visible, setVisible] = useState(false);
  const [requestValue, setRequestValue] = useState(requestValueOrigin);
  const [columnDefs, setColumnDefs] = useState(columnDefsOrigin);
  const [rowData, setRowData] = useState([]);

  // getNewRowData = debounce(getNewRowData, 300);

  const gridOptions = {
    defaultColDef: {
      width: 100,
      resizable: true,
    },
  };

  const initGridData = () => {
    getProtectionItemList().then(res => setRowData(res.response.list));
  };

  const changeGridData = func => {
    setRowData(func.response.list);
  };

  const getProtectionItemList = async () => {
    const result = await request({
      url: '/api/eshs/v1/common/geteshsprotectionitems',
      method: 'GET',
    });
    return result;
  };

  const handleSelectChange = async value => {
    setSelectedSite(value);
    getNewRowData(value, input);
  };

  const handleInputChange = e => {
    setInput(e.target.value);
    getNewRowData(selectedSite, e.target.value);
  };

  const getNewRowData = debounce(async (site, keyword) => {
    const result = await request({
      url: `/api/eshs/v1/common/geteshsprotectionitems?site=${site}&keyword=${keyword}`,
      method: 'GET',
    });
    changeGridData(result);
  }, 300);

  const CONFIG = {
    property: { isRequired: false },
  };

  const modalContent = [
    { title: '사진', content: '' },
    {
      title: '지역',
      content: (
        <Select name="site" defaultValue="313" width="300px" onChange={e => setRequestValue(Object.assign(requestValue, { site: e }))}>
          <Option value="313">청주</Option>
          <Option value="314">구미</Option>
        </Select>
      ),
    },
    { title: '품목', content: <Input name="kind" style={{ width: '500px' }} placeholder="품목명을 입력하세요." onChange={e => handleChange(e)} /> },
    { title: '모델', content: <Input name="model" style={{ width: '500px' }} placeholder="모델명을 입력하세요." onChange={e => handleChange(e)} /> },
    { title: 'Size', content: <Input name="size1" style={{ width: '500px' }} placeholder="사이즈를 입력하세요." onChange={e => handleChange(e)} /> },
    { title: '검정번호', content: <Input name="app_no" style={{ width: '500px' }} placeholder="검정번호를 입력하세요." /> },
    {
      title: 'Vendor',
      content: (
        <EshsCmpnyComp
          sagaKey={id}
          getExtraApiData={getCallDataHandler}
          extraApiData={result}
          readOnly={false}
          visible
          CONFIG={CONFIG}
          changeFormData={changeFormData}
          COMP_FIELD="VENDOR_CD"
        />
      ),
    },
    { title: 'Maker', content: '' },
    { title: '단위', content: <Input name="unit" style={{ width: '500px' }} placeholder="단위를 입력하세요." onChange={e => handleChange(e)} /> },
    {
      title: '유효기간',
      content: <Input name="validity_term" style={{ width: '500px' }} placeholder="유효기간을 입력하세요." onChange={e => handleChange(e)} />,
    },
    { title: '적정재고', content: <InputNumber name="properstock" style={{ width: '500px' }} placeholder="적정재고를 입력하세요." /> },
    { title: '비고', content: <Input.TextArea name="comments" style={{ width: '500px' }} placeholder="비고를 입력하세요." onChange={e => handleChange(e)} /> },
    { title: '첨부', content: '' },
  ];

  const handleChange = e => {
    const valueObj = { [e.target.name]: e.target.value };
    setRequestValue(Object.assign(requestValue, valueObj));
  };

  const handleOk = () => {
    console.debug(requestValue);
  };

  const handleCancel = () => {
    setVisible(false);
    setRequestValue(requestValueOrigin);
  };
  console.debug(changeFormData);
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
          <StyledButton className="btn-primary" onClick={() => setVisible(true)}>
            등록
          </StyledButton>
        </div>
        <div style={{ width: '100%', height: '100%' }}>
          <div className="ag-theme-balham" style={{ height: '540px' }}>
            <AgGridReact columnDefs={columnDefs} rowData={rowData} onGridReady={initGridData} gridOptions={gridOptions} suppressRowTransform />
          </div>
        </div>
        <Modal visible={visible} onOk={handleOk} onCancel={handleCancel} width="600px" closable>
          {modalContent.map(item => (
            <div>
              <div>{item.title}</div>
              <div>{item.content}</div>
            </div>
          ))}
        </Modal>
      </Sketch>
    </StyledViewDesigner>
  );
};

List.propTypes = {
  getCallDataHandler: PropTypes.func,
  sagaKey: PropTypes.string,
};

export default List;
