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
    const apiAry = [
      {
        key: 'dangerDanestAdmin',
        type: 'POST',
        url: `/api/eshs/v1/common/dangerDanestAdminSub`,
        params: { PARAM: { START_DATE: moment(rangeData[0]).format('YYYY-MM-DD'), END_DATE: moment(rangeData[1]).format('YYYY-MM-DD') } },
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
    const list = dangerDanestAdmin && dangerDanestAdmin.list;
    const selectData = selectList && selectList.categoryMapList;
    this.setState({ selectData, list });
  };

  search = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const { rangeData, regGubun, empNo, empNm, deptNm, title } = this.state;
    const apiAry = [
      {
        key: 'dangerDanestAdmin',
        type: 'POST',
        url: `/api/eshs/v1/common/dangerDanestAdminSub`,
        params: {
          PARAM: {
            START_DATE: moment(rangeData[0]).format('YYYY-MM-DD'),
            END_DATE: moment(rangeData[1]).format('YYYY-MM-DD'),
            REG_GUBUN: regGubun,
            EMP_NO: empNo,
            EMP_NM: empNm,
            DEPT_NM: deptNm,
            TITLE: title,
          },
        },
      },
    ];
    getCallDataHandler(id, apiAry, this.searchData);
  };

  searchData = () => {
    const {
      result: { dangerDanestAdmin },
    } = this.props;
    const list = dangerDanestAdmin && dangerDanestAdmin.list;
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
      width: 110,
    },
    {
      title: '세부평가번호',
      dataIndex: 'DA_REG_NO',
      align: 'center',
      width: 120,
    },
    {
      title: '부서',
      dataIndex: 'DIV_NM',
      align: 'center',
      width: 100,
    },
    {
      title: '공정(장소)',
      dataIndex: 'PLACE_NM',
      align: 'center',
      width: 100,
    },
    {
      title: '세부공정',
      dataIndex: 'PROCESS_NM',
      align: 'center',
      width: 100,
    },
    {
      title: '장비(설비)',
      dataIndex: 'EQUIP_NM',
      align: 'center',
      width: 100,
    },
    {
      title: '작업단계위험요인',
      dataIndex: 'DANGFACT',
      align: 'center',
      width: 200,
    },
    {
      title: '현재안전조치대책',
      dataIndex: 'SAFEACTION',
      align: 'center',
      width: 200,
    },
    {
      title: '위험빈도',
      dataIndex: 'DAN_FREQC',
      align: 'center',
      width: 100,
    },
    {
      title: '위험강도',
      dataIndex: 'DAN_STRGT',
      align: 'center',
      width: 100,
    },
    {
      title: '위험등급',
      align: 'center',
      dataIndex: 'DANGRAD',
      width: 100,
    },
    {
      title: '작성자',
      dataIndex: 'REG_USER_NAME',
      align: 'center',
      width: 100,
    },
    {
      title: '개선대책',
      dataIndex: 'AP_IMPROVE',
      align: 'center',
      width: 200,
    },
  ];

  render() {
    const { list, recordByState, selectData } = this.state;
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
          pagination={false}
          scroll={{ x: 1500, y: 300 }}
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
