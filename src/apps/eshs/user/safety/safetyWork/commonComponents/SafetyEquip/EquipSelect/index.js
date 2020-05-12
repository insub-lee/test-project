import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Select, Input, Modal } from 'antd';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledModalWrapper from 'commonStyled/EshsStyled/Modal/StyledSelectModal';
import SwCode from 'apps/eshs/admin/safety/swCode';
import Styled from './Styled';

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
      <Styled>
        <StyledSearchWrap>
          <div className="search-group-layer">
            <div className="searchCmpnyWrap">
              <span className="label-text">검색분류</span>
              <AntdSelect className="select-xs" style={{ width: '100px' }} value={searchType} onChange={val => this.setState({ searchType: val })}>
                <Option value="NAME_KOR">코드명</Option>
                <Option value="CODE">코드</Option>
              </AntdSelect>
              <span className="label-text">검색어</span>
              <AntdInput
                className="ant-input-xs ant-input-inline"
                value={searchValue}
                onChange={e => this.setState({ searchValue: e.target.value })}
                style={{ width: '200px' }}
              />
              <StyledButton className="btn-primary btn-xs btn-first" onClick={() => this.onClickSearch()} style={{ marginLeft: '10px' }}>
                검색
              </StyledButton>
              <StyledButton className="btn-primary btn-xs btn-first" onClick={() => this.setState({ modalVisible: true })}>
                등록
              </StyledButton>
            </div>
          </div>
        </StyledSearchWrap>
        <AntdTable
          columns={columns}
          dataSource={list}
          footer={() => <div style={{ textAlign: 'center' }}>{`총 ${equipList.length === 0 ? 0 : equipList.length} 건`}</div>}
          onRow={record => ({
            onClick: () => rowSelect(record),
          })}
        />
        <AntdModal
          title="코드 등록"
          width="70%"
          visible={modalVisible}
          footer={null}
          onOk={() => this.setState({ modalVisible: false })}
          onCancel={() => this.setState({ modalVisible: false })}
        >
          <SwCode />
        </AntdModal>
      </Styled>
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
