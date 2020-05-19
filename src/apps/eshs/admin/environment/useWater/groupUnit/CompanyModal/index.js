import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Select, Input } from 'antd';

import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledCustomSearch from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';

const AntdTable = StyledAntdTable(Table);
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
      <StyledContentsWrapper>
        <StyledCustomSearch className="search-wrapper-modal">
          <span className="text-label">검색구분</span>
          <AntdSelect className="select-sm mr5" onChange={value => this.onChangetValue('modalSearchtype', value)} value={this.state.modalSearchtype}>
            <Option value="HST_CMPNY_CD">코드</Option>
            <Option value="HST_CMPNY_NM">회사명</Option>
          </AntdSelect>
          <span className="text-label">검색어</span>
          <AntdInput
            style={{ width: '150px', margin: '5px' }}
            className="ant-input-inline mr5 ant-input-sm"
            value={this.state.modalSearch}
            onChange={e => this.onChangetValue('modalSearch', e.target.value)}
            name="modalSearch"
          />
          <StyledButton className="btn-primary btn-sm" onClick={() => this.selectCodeApi('search')}>
            검색
          </StyledButton>
        </StyledCustomSearch>
        <AntdTable
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
      </StyledContentsWrapper>
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
