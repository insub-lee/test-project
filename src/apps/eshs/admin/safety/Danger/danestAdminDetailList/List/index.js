import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DanestAdmin from 'apps/eshs/admin/safety/Danger/danestAdmin';
import moment from 'moment';

import { Input, Modal, Table, DatePicker, Select } from 'antd';

import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';

import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledAntdModal from 'components/BizBuilder/styled//Modal/StyledAntdModal';

const { RangePicker } = DatePicker;
const { Option } = Select;

const AntdModal = StyledAntdModal(Modal);
const AntdSelect = StyledSelect(Select);
const AntdTable = StyledAntdTable(Table);
const AntdInput = StyledInput(Input);
const AntdRangePicker = StyledDatePicker(RangePicker);

moment.locale('ko');

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rangeData: [moment(moment().subtract(1, 'years')).format('YYYY-MM'), moment().format('YYYY-MM')],
    };
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const { rangeData } = this.state;
    const param = `?START_DATE=${moment(rangeData[0]).format('YYYY-MM-DD')}&&END_DATE=${moment(rangeData[1]).format('YYYY-MM-DD')}`;
    const apiAry = [
      {
        key: 'dangerDanestAdmin',
        type: 'GET',
        url: `/api/eshs/v1/common/dangerDanestAdmin${param}`,
      },
      {
        key: 'selectList',
        type: 'POST',
        url: '/api/admin/v1/common/categoryChildrenListUseYn',
        params: { PARAM: { NODE_ID: 30451, USE_YN: 'Y' } },
      },
    ];
    getCallDataHandler(id, apiAry, this.initData);
  }

  initData = () => {
    const {
      result: { selectList, dangerDanestAdmin },
    } = this.props;
    const list = dangerDanestAdmin && dangerDanestAdmin.subList;
    const selectData = selectList && selectList.categoryMapList;
    this.setState({ selectData, list });
  };

  search = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const { rangeData, regGubun, empNo, empNm, deptNm, title } = this.state;
    let param = `?START_DATE=${moment(rangeData[0]).format('YYYY-MM-DD')}&&END_DATE=${moment(rangeData[1]).format('YYYY-MM-DD')}`;
    param += regGubun ? `&&REG_GUBUN=${regGubun}` : '';
    param += empNo ? `&&EMP_NO=${empNo}` : '';
    param += empNm ? `&&EMP_NM=${empNm}` : '';
    param += deptNm ? `&&DEPT_NM=${deptNm}` : '';
    param += title ? `&&TITLE=${title}` : '';
    const apiAry = [
      {
        key: 'dangerDanestAdmin',
        type: 'GET',
        url: `/api/eshs/v1/common/dangerDanestAdmin${param}`,
      },
    ];
    getCallDataHandler(id, apiAry, this.searchData);
  };

  searchData = () => {
    const {
      result: { dangerDanestAdmin },
    } = this.props;
    const list = dangerDanestAdmin && dangerDanestAdmin.subList;
    if (list && list.length > 0) {
      this.setState({ list });
    } else {
      message.info(<MessageContent>검색된 데이터가 없습니다.</MessageContent>);
    }
  };

  onModalChange = () => {
    const { isModal } = this.state;
    this.setState({ isModal: !isModal });
  };

  onClickRow = record => {
    this.setState({ recordByState: record });
    this.onModalChange();
  };

  columns = [
    {
      title: '평가번호',
      dataIndex: 'REG_NO',
      align: 'center',
      width: '12%',
    },
    {
      title: '등록일자',
      dataIndex: 'REG_DTTM',
      align: 'center',
      width: '10%',
    },
    {
      title: '문서제목',
      dataIndex: 'TITLE',
      align: 'center',
      width: '43%',
    },
    {
      title: '부서명',
      dataIndex: 'DEPT_NM',
      align: 'center',
      width: '15%',
    },
    {
      title: '등록자',
      dataIndex: 'REG_USER_NAME',
      align: 'center',
      width: '10%',
    },
    {
      title: '등록구분',
      dataIndex: 'REG_GUBUN',
      align: 'center',
      width: '10%',
      render: text =>
        `${this.state.selectData &&
          this.state.selectData.find(findItem => findItem.NODE_ID === Number(text)) &&
          this.state.selectData.find(findItem => findItem.NODE_ID === Number(text)).NAME_KOR}`,
    },
  ];

  render() {
    const { list, recordByState, selectData } = this.state;
    console.debug('list   :  ', list);
    return (
      <StyledContentsWrapper>
        <StyledCustomSearchWrapper>
          <div className="search-input-area mb10">
            <span className="text-label">평가종류</span>
            <AntdSelect
              style={{ width: 200, marginLeft: 15 }}
              className="select-xs"
              placeholder="전체"
              allowClear
              onChange={value => this.setState({ regGubun: value })}
            >
              {selectData && selectData.map(item => <Option value={item.NODE_ID}>{item.NAME_KOR}</Option>)}
            </AntdSelect>
            <span className="text-label">등록일</span>
            <AntdRangePicker
              className="ant-picker-sm"
              style={{ marginLeft: 24 }}
              defaultValue={[moment(this.state.rangeData[0], 'YYYY-MM'), moment(this.state.rangeData[1], 'YYYY-MM')]}
              format={['YYYY-MM-DD', 'YYYY-MM-DD']}
              onChange={(date, dateStrings) => this.dateChange(dateStrings)}
            />
          </div>
          <div className="search-input-area mb10">
            <span className="text-label">작성자 부서</span>
            <AntdInput className="ant-input-sm" allowClear placeholder="전체" style={{ width: 200 }} onChange={e => this.setState({ deptNm: e.target.vale })} />
            <span className="text-label">작성자 사번</span>
            <AntdInput className="ant-input-sm" allowClear placeholder="전체" style={{ width: 200 }} onChange={e => this.setState({ empNo: e.target.vale })} />

            <span className="text-label">작성자 성명</span>
            <AntdInput className="ant-input-sm" allowClear placeholder="전체" style={{ width: 200 }} onChange={e => this.setState({ empNm: e.target.vale })} />
          </div>
          <div className="search-input-area">
            <span className="text-label">제목</span>
            <AntdInput
              className="ant-input-sm"
              allowClear
              placeholder="전체"
              style={{ width: 200, marginLeft: 37 }}
              onChange={e => this.setState({ title: e.target.vale })}
            />
          </div>
          <StyledButtonWrapper className="btn-area">
            <StyledButton className="btn-gray btn-first btn-sm" onClick={this.search}>
              검색
            </StyledButton>
          </StyledButtonWrapper>
        </StyledCustomSearchWrapper>
        <AntdTable
          dataSource={list}
          columns={this.columns}
          onRow={record => ({
            onClick: () => {
              this.onClickRow(record);
            },
          })}
          bordered
        />
        <AntdModal width={1000} visible={this.state.isModal} title="위험성 평가" onCancel={this.onModalChange} destroyOnClose footer={null}>
          {this.state.isModal && <DanestAdmin improveDanger={{ REG_NO: recordByState.REG_NO, REG_DTTM: recordByState.REG_DTTM, IMPROVE: true }} />}
        </AntdModal>
      </StyledContentsWrapper>
    );
  }
}

List.propTypes = {
  getCallDataHandler: PropTypes.func,
  sagaKey: PropTypes.string,
  result: PropTypes.object,
};

List.defaultProps = {
  getCallDataHandler: () => {},
};

export default List;
