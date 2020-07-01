import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Input, Select } from 'antd';

import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';

const AntdTable = StyledAntdTable(Table);
const StyledButton = StyledAntdButton(Button);
const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);

const columns = [
  { dataIndex: 'REQ_CD', title: '신청번호', width: 130, align: 'center' },
  { dataIndex: 'REQ_STATUS_NM', title: '신청', width: 60, align: 'center' },
  { dataIndex: 'REQ_DT', title: '신청일', width: 80, align: 'center' },
  { dataIndex: 'APP_STATUS_NM', title: '승인', width: 60, align: 'center' },
  { dataIndex: 'QUAL_DT', title: '승인일', width: 80, align: 'center' },
  { dataIndex: 'QUAL_STATUS_NM', title: '판정', width: 80, align: 'center' },
  { dataIndex: 'REG_USER_NAME', title: '신청자', width: 60, align: 'center' },
  { dataIndex: 'EQUIP_CD', title: '장비코드', width: 80, align: 'center' },
  { dataIndex: 'EQUIP_NM', title: '장비명', width: 250, align: 'center' },
  { dataIndex: 'SITE_NM', title: '지역', width: 60, align: 'center' },
  { dataIndex: 'FAB_NM', title: 'FAB', width: 80, align: 'center' },
  { dataIndex: 'AREA_NM', title: '공정', width: 80, align: 'center' },
  { dataIndex: 'MAKER_NM', title: 'Maker', width: 200, align: 'center' },
];

class CustomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData: {},
    };
  }

  componentDidMount = () => {
    const { changeSearchData, sagaKey: id, listGubun } = this.props;

    changeSearchData(id, 'GUBUN', `AND GUBUN = '${listGubun}'`);
    this.getListData();
  };

  getListData = () => {
    const { sagaKey: id, getListData, changeSearchData } = this.props;
    const { searchData } = this.state;

    changeSearchData(id, 'CUSTOM', searchData.target && searchData.text ? `AND W.${searchData.target} like '%${searchData.text}%'` : '');
    return getListData(id, 6821);
  };

  handleOnChangeSearchData = (target, value) => this.setState(prevState => Object.assign(prevState.searchData, { [target]: value }));

  render = () => {
    const { listData, customOnRowClick } = this.props;

    return (
      <StyledContentsWrapper>
        <StyledCustomSearchWrapper className="search-wrapper-inline">
          <AntdSelect
            className="select-sm"
            style={{ width: 150 }}
            placeholder="검색구분"
            allowClear
            onChange={value => this.handleOnChangeSearchData('target', value)}
          >
            <AntdSelect.Option value="REQ_CD">신청번호</AntdSelect.Option>
            <AntdSelect.Option value="EQUIP_CD">장비코드</AntdSelect.Option>
            <AntdSelect.Option value="REG_USER_ID">신청자ID</AntdSelect.Option>
            <AntdSelect.Option value="EXAM_EMP_ID">검토자ID</AntdSelect.Option>
          </AntdSelect>
          <AntdInput
            className="ant-input-sm mr5"
            style={{ width: 150 }}
            placeholder="검색어"
            allowClear
            onPressEnter={this.getListData}
            onChange={e => this.handleOnChangeSearchData('text', e.target.value)}
          />
          <StyledButton className="btn-gray btn-sm" onClick={this.getListData}>
            검색
          </StyledButton>
        </StyledCustomSearchWrapper>
        <AntdTable
          bordered
          rowKey="TASK_SEQ"
          columns={columns}
          dataSource={listData}
          onRow={record => ({ onClick: () => customOnRowClick(record) })}
          scroll={{ x: '100%' }}
        />
      </StyledContentsWrapper>
    );
  };
}

CustomList.propTypes = {
  sagaKey: PropTypes.string,
  customOnRowClick: PropTypes.any,
  listGubun: PropTypes.string,
  listData: PropTypes.array,

  changeSearchData: PropTypes.func,
  getListData: PropTypes.func,
};

CustomList.defaultProps = {
  customOnRowClick: undefined,
  listData: [],
  changeSearchData: () => {},
  getListData: () => {},
};

export default CustomList;
