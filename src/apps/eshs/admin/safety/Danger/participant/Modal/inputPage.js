import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Select } from 'antd';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import WorkStepMenu from './Menu';

const { Option } = Select;
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdTable = StyledAntdTable(Table);

const InputPage = props => {
  const { year, modalSearchInfo, onChangeModalSearchInfo, userList, modalSearch, modalMenu, onSave } = props;
  const { type } = modalSearchInfo;
  const [listData, setListData] = useState([]);
  const [selectedRowKeys, setRowKeys] = useState([]);

  useEffect(() => {
    setListData(userList);
  }, [userList]);

  const rowSelection = {
    selectedRowKeys,
    onChange: onRowSelection,
  };

  function onRowSelection(rowKeys) {
    setRowKeys(rowKeys);
  }

  function onChange(record) {
    const nextListData = listData.map(item => {
      if (item.EMP_NO === record.EMP_NO) {
        return {
          ...record,
        };
      }
      return item;
    });
    setListData(nextListData);
  }

  function onSaveBefore() {
    if (selectedRowKeys.length > 0) {
      const formData = listData
        .filter(item => selectedRowKeys.includes(item.EMP_NO))
        .map(item => ({ ...item, DE_YEAR: year }));
      if (validFormData(formData)) {
        onSave(formData);
      }
    } else {
      message.warning(<MessageContent>등록할 참여자를 선택하세요.</MessageContent>);
    }
  }

  function validFormData(formData) {
    const msg = [];
    formData.forEach(item => {
      if (item.SELECTED3 === '') {
        msg.push(item.EMP_NM);
      }
    });

    if (msg.length > 0) {
      message.warning(
        <MessageContent>{`등록할 참여자(${msg.join(', ')})의 분류, 부서, 공정을 모두 선택하세요.`}</MessageContent>,
      );
      return false;
    }
    return true;
  }

  const userInsertCol = [
    {
      key: 'EMP_NO',
      title: '사번',
      align: 'center',
      dataIndex: 'EMP_NO',
      width: '15%',
    },
    {
      title: '이름',
      align: 'center',
      dataIndex: 'EMP_NM',
      width: '10%',
    },
    {
      title: '직위',
      align: 'center',
      dataIndex: 'JIKWI',
      width: '10%',
    },
    {
      title: '부서명',
      align: 'center',
      dataIndex: 'DEPT_NM',
      width: '20%',
    },
    {
      title: '분류',
      align: 'center',
      dataIndex: 'SELECTED1',
      width: '15%',
      render: (text, record) => <WorkStepMenu lvl={1} record={record} onChange={onChange} modalMenu={modalMenu} />,
    },
    {
      title: '부서',
      align: 'center',
      dataIndex: 'SELECTED2',
      width: '15%',
      render: (text, record) => <WorkStepMenu lvl={2} record={record} onChange={onChange} modalMenu={modalMenu} />,
    },
    {
      title: '공정',
      align: 'center',
      dataIndex: 'SELECTED3',
      width: '15%',
      render: (text, record) => <WorkStepMenu lvl={3} record={record} onChange={onChange} modalMenu={modalMenu} />,
    },
  ];

  return (
    <>
      <StyledCustomSearchWrapper className="search-wrapper-inline">
        <div className="search-input-area">
          <span className="text-label">참여연도</span>
          <AntdInput style={{ width: 100 }} className="ant-input-sm" defaultValue={year} readOnly />
          <span className="text-label">검색구분</span>
          <AntdSelect
            className="mr5 select-sm"
            style={{ width: 100 }}
            defaultValue={type}
            onChange={value => onChangeModalSearchInfo('type', value)}
          >
            <Option value="NAME">이름</Option>
            <Option value="NO">사번</Option>
            <Option value="DEPT">소속</Option>
            <Option value="PSTN">직위</Option>
          </AntdSelect>
          <span className="text-label">검색어</span>
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
        </div>
      </StyledCustomSearchWrapper>
      <AntdTable
        columns={userInsertCol}
        bordered
        rowKey="EMP_NO"
        dataSource={listData}
        rowSelection={rowSelection}
        footer={() => <span>{`총 ${(userList && userList.length) || 0} 건`}</span>}
      />
      <StyledButtonWrapper className="btn-wrap-center" style={{ marginTop: '10px' }}>
        <StyledButton className="btn-primary btn-first btn-sm" onClick={onSaveBefore}>
          저장
        </StyledButton>
        <StyledButton className="btn-primary btn-first btn-sm" onClick={() => false}>
          취소
        </StyledButton>
      </StyledButtonWrapper>
    </>
  );
};

InputPage.propTypes = {
  year: PropTypes.string,
  userList: PropTypes.array,
  modalMenu: PropTypes.array,
  onSave: PropTypes.func,
  modalSearch: PropTypes.func,
  modalSearchInfo: PropTypes.object,
  onChangeModalSearchInfo: PropTypes.func,
};

InputPage.defaultProps = {
  userList: [],
  modalSearchInfo: {},
  onSave: () => false,
  modalSearch: () => false,
  onChangeModalSearchInfo: () => false,
};

export default InputPage;
