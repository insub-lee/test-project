import React, { Component } from 'react';
import { Table, Input, Select, DatePicker, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import moment from 'moment';

const AntdTable = StyledAntdTable(Table)
const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);
const AntdDatePicker= StyledDatePicker(DatePicker);
const AntdModal = StyledAntdModal(Modal);

class List extends Component {
  state = {
    yearList: [],
    searchParam: {
      CHK_YEAR: '',
    }
  };

  componentWillMount() {
    const today = new Date();
    const currYear = today.getFullYear();
    const yearList = [];
    for (let i=currYear; i>=1998; i--) {
      yearList.push(i);
    }
    this.setState({ yearList });
    this.onChangeSearchParam('CHK_YEAR', currYear);
  };

  componentDidMount() {
    const { sagaKey, getCallDataHandler, selectedRow, spinningOn } = this.props;
    const apiAry = [
      {
        key: 'chkTypeList',
        url: '/api/admin/v1/common/categoryMapList',
        type: 'POST',
        params: {
          PARAM: { NODE_ID: 675 }
        },
      },
      {
        key: 'siteList',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=45',
        type: 'GET',
      },
    ];
  }

  onChangeSearchParam = (key, val) => {
    this.setState(prevState => {
      const { searchParam } = prevState;
      searchParam[key] = val;
      return { searchParam }
    });
  };

  render() {
    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area">
              <AntdSelect
                value={this.state.searchParam.CHK_YEAR} className="select-sm mr5" style={{ width: 100 }}
                onChange={val => this.onChangeSearchParam('CHK_YEAR', val)}
              >
              {this.state.yearList && this.state.yearList.map(year => (
                <AntdSelect.Option value={year}>{`${year}년`}</AntdSelect.Option>
              ))}
              </AntdSelect>
            </div>
          </StyledCustomSearchWrapper>
        </StyledContentsWrapper>
      </>
    )
  }
}

export default List;