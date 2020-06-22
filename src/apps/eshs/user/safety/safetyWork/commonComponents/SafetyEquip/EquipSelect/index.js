import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Select, Input, Modal } from 'antd';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledModalWrapper from 'commonStyled/EshsStyled/Modal/StyledSelectModal';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import SwCode from 'apps/eshs/admin/safety/swCode';

const AntdTable = StyledLineTable(Table);
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdModal = StyledModalWrapper(Modal);
const { Option } = Select;

class SafetyWorker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchType: 'NAME_KOR',
      searchValue: '',
      list: props.equipList,
      modalVisible: false,
    };
  }

  onClickSearch = () => {
    const { equipList } = this.props;
    const { searchType, searchValue } = this.state;
    if (searchValue === '') {
      message.error(<MessageContent>검색어가 없습니다.</MessageContent>);
      return;
    }
    const nextList = equipList.filter(equip => equip[searchType].match(searchValue));
    this.setState({
      list: nextList,
    });
  };

  render() {
    const { searchType, searchValue, list, modalVisible } = this.state;
    const { equipList, rowSelect } = this.props;
    const columns = [
      {
        title: '코드',
        dataIndex: 'CODE',
        width: '30%',
        align: 'center',
      },
      {
        title: '장비명',
        dataIndex: 'NAME_KOR',
        width: '70%',
        align: 'center',
      },
    ];

    return (
      <>
        <StyledCustomSearchWrapper>
          <div className="search-input-area">
            <span className="text-label">검색분류</span>
            <AntdSelect className="select-sm" style={{ width: '100px' }} value={searchType} onChange={val => this.setState({ searchType: val })}>
              <Option value="NAME_KOR">코드명</Option>
              <Option value="CODE">코드</Option>
            </AntdSelect>
            <span className="text-label">검색어</span>
            <AntdInput
              className="ant-input-sm ant-input-inline"
              value={searchValue}
              onChange={e => this.setState({ searchValue: e.target.value })}
              style={{ width: '200px' }}
            />
            <StyledButton className="btn-gray btn-sm btn-first" onClick={() => this.onClickSearch()} style={{ marginLeft: '10px' }}>
              검색
            </StyledButton>
          </div>
        </StyledCustomSearchWrapper>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.setState({ modalVisible: true })}>
            안전작업 코드 등록
          </StyledButton>
        </StyledButtonWrapper>
        <AntdTable
          columns={columns}
          dataSource={list}
          footer={() => <div style={{ textAlign: 'center' }}>{`총 ${equipList.length === 0 ? 0 : equipList.length} 건`}</div>}
          onRow={record => ({
            onClick: () => rowSelect(record),
          })}
        />
        <AntdModal
          title="안전작업 코드 등록"
          width="80%"
          visible={modalVisible}
          footer={null}
          onOk={() => this.setState({ modalVisible: false })}
          onCancel={() => this.setState({ modalVisible: false })}
        >
          <SwCode />
        </AntdModal>
      </>
    );
  }
}
SafetyWorker.propTypes = {
  equipList: PropTypes.array,
  rowSelect: PropTypes.func,
};

SafetyWorker.defaultProps = {
  equipList: [],
};

export default SafetyWorker;
