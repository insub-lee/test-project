import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Select, Input } from 'antd';

import StyledButton from 'commonStyled/Buttons/StyledButton';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledInput from 'commonStyled/Form/StyledInput';

const AntdLineTable = StyledLineTable(Table);
const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);

const { Option } = Select;

class CompanyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalSearchtype: 'HST_CMPNY_NM',
      modalSearch: '',
    };
  }

  componentDidMount() {
    this.selectCodeApi();
  }

  selectCodeApi = search => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    let listUrl;
    if (search) {
      listUrl = `/api/eshs/v1/common/eshsHstCompanyList?SEARCH_TYPE=${this.state.modalSearchtype}&SEARCH=${this.state.modalSearch}`;
    } else {
      listUrl = '/api/eshs/v1/common/eshsHstCompanyList';
    }
    const apiAry = [
      {
        key: 'modalData',
        url: listUrl,
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry);
  };

  onChangetValue = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    const { modalcolumns, result, selectedModalRecord } = this.props;
    const modalList = result && result.modalData && result.modalData.eshsHstCmpnyList;
    return (
      <ContentsWrapper>
        <div className="selSaveWrapper alignLeft">
          <span className="textLabel">검색구분</span>
          <AntdSelect className="selectMid mr5" onChange={value => this.onChangetValue('modalSearchtype', value)} value={this.state.modalSearchtype}>
            <Option value="HST_CMPNY_CD">코드</Option>
            <Option value="HST_CMPNY_NM">회사명</Option>
          </AntdSelect>
          <span className="textLabel">검색어</span>
          <AntdInput
            style={{ width: '150px', margin: '5px' }}
            className="ant-input-inline mr5"
            value={this.state.modalSearch}
            onChange={e => this.onChangetValue('modalSearch', e.target.value)}
            name="modalSearch"
          />
          <StyledButton className="btn-primary btn-first" onClick={() => this.selectCodeApi('search')}>
            검색
          </StyledButton>
        </div>
        <AntdLineTable
          className="tableWrapper"
          key={modalList.HST_CMPNY_CD}
          columns={modalcolumns}
          dataSource={modalList}
          onRow={record => ({
            onClick: () => {
              selectedModalRecord(record);
            },
          })}
          footer={() => <div style={{ textAlign: 'center' }}>{`${modalList.length} 건`}</div>}
        />
      </ContentsWrapper>
    );
  }
}

CompanyModal.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  selectedModalRecord: PropTypes.func,
  modalcolumns: PropTypes.array,
  result: PropTypes.any,
};

CompanyModal.defaultProps = {
  getCallDataHandler: () => {},
  modalcolumns: [
    {
      title: '코드',
      dataIndex: 'HST_CMPNY_CD',
      align: 'center',
      width: 100,
    },
    {
      title: '회사명',
      dataIndex: 'HST_CMPNY_NM',
      align: 'center',
      width: 200,
    },
  ],
};

export default CompanyModal;
