import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Input, message, Select, Modal } from 'antd';

import StyledButton from 'apps/mdcs/styled/StyledButton';

import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import { CustomStyledAntdTable as StyledAntdTable } from 'components/CommonStyled/StyledAntdTable';

const AntdTable = StyledAntdTable(Table);
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
    getCallDataHandler(id, apiAry, this.initData);
  };

  changeInputValue = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  changeSelectValue = value => {
    this.setState({ modalSearchtype: value });
  };

  render() {
    const { modalcolumns, result, selectedModalRecord } = this.props;
    const modalList = result && result.modalData && result.modalData.eshsHstCmpnyList;
    return (
      <div style={{ padding: '10px 15px', backgroundColor: 'white' }}>
        <StyledViewDesigner>
          <Sketch>
            <Group>
              <StyledSearchWrap>
                <span>검색구분</span>
                <Select onChange={(value, option) => this.changeSelectValue(value)} value={this.state.modalSearchtype} style={{ margin: '5px' }}>
                  <Option value="HST_CMPNY_CD">코드</Option>
                  <Option value="HST_CMPNY_NM">회사명</Option>
                </Select>
                <span>검색어</span>
                <Input style={{ width: '250px', margin: '5px' }} value={this.state.modalSearch} onChange={e => this.changeInputValue(e)} name="modalSearch" />
                <StyledButton className="btn-primary btn-first" onClick={() => this.selectCodeApi('search')}>
                  검색
                </StyledButton>
              </StyledSearchWrap>
              <AntdTable
                style={{ cursor: 'pointer' }}
                rowKey={modalList.HST_CMPNY_CD}
                key={modalList.HST_CMPNY_CD}
                columns={modalcolumns}
                dataSource={modalList}
                bordered
                onRow={record => ({
                  onClick: () => {
                    selectedModalRecord(record);
                  },
                })}
                pagination={{ pageSize: 100 }}
                scroll={{ y: 400 }}
                footer={() => <div style={{ textAlign: 'center' }}>{`${modalList.length} 건`}</div>}
              />
            </Group>
          </Sketch>
        </StyledViewDesigner>
      </div>
    );
  }
}

CompanyModal.propTypes = {};

CompanyModal.defaultProps = {
  getCallDataHandler: () => {},
  formData: {},
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
