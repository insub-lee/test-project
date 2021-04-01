import React from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Select } from 'antd';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import { userColumns } from '../List/tableColumn';

const { Option } = Select;

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdTable = StyledAntdTable(Table);

const UserSearch = props => {
  const { modalSearchInfo, onChangeModalSearchInfo, userList, modalSearch } = props;
  const { type } = modalSearchInfo;
  return (
    <>
      <StyledCustomSearchWrapper>
        <AntdSelect
          className="mr5 select-sm"
          style={{ width: 100 }}
          value={type}
          onChange={value => onChangeModalSearchInfo('type', value)}
        >
          <Option value="NAME">이름</Option>
          <Option value="NO">사번</Option>
          <Option value="DEPT">소속</Option>
          <Option value="PSTN">직위</Option>
        </AntdSelect>
        <AntdInput
          style={{ width: 500 }}
          className="ant-input-sm ant-input-inline mr5"
          placeholder=" 검색어를 입력하세요"
          allowClear
          defaultValue=""
          onChange={e => onChangeModalSearchInfo('keyword', e.target.value)}
          onPressEnter={modalSearch}
        />
        <StyledButton className="btn-gray btn-first btn-sm" onClick={modalSearch}>
          검색
        </StyledButton>
      </StyledCustomSearchWrapper>
      <AntdTable
        columns={userColumns}
        bordered
        rowKey="USER_ID"
        pagination={{ pageSize: 20 }}
        dataSource={userList || []}
        footer={() => <span>{`${(userList && userList.length) || 0} 건`}</span>}
        onRow={record => ({
          onClick: () => {
            props.onRowClick(record);
          },
        })}
      />
    </>
  );
};

UserSearch.propTypes = {
  userList: PropTypes.array,
  modalSearch: PropTypes.func,
  onRowClick: PropTypes.func,
  modalSearchInfo: PropTypes.object,
  onChangeModalSearchInfo: PropTypes.func,
};

UserSearch.defaultProps = {
  userList: [],
  modalSearchInfo: {},
  modalSearch: () => false,
  onRowClick: () => false,
  onChangeModalSearchInfo: () => false,
};

export default UserSearch;
