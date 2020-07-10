import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DanestAdmin from 'apps/eshs/admin/safety/Danger/danestAdmin';
import moment from 'moment';

import { Modal, Table, DatePicker, Select, TreeSelect } from 'antd';

import { getTreeFromFlatData } from 'react-sortable-tree';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';

import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledTreeSelect from 'components/BizBuilder/styled/Form/StyledTreeSelect';
import StyledAntdModal from 'components/BizBuilder/styled//Modal/StyledAntdModal';

const { RangePicker } = DatePicker;
const { Option } = Select;

const AntdModal = StyledAntdModal(Modal);
const AntdTreeSelect = StyledTreeSelect(TreeSelect);
const AntdSelect = StyledSelect(Select);
const AntdTable = StyledAntdTable(Table);
const AntdRangePicker = StyledDatePicker(RangePicker);

moment.locale('ko');

const getCategoryMapListAsTree = (flatData, rootkey) =>
  getTreeFromFlatData({
    flatData: flatData.map(item => ({
      title: item.NAME_KOR,
      value: item.NODE_ID,
      key: item.NODE_ID,
      parentValue: item.PARENT_NODE_ID,
      selectable: true,
      level: item.LVL,
    })),
    getKey: node => node.key,
    getParentKey: node => node.parentValue,
    rootKey: rootkey || 0,
    level: node => node.level || 0,
  });

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
        key: 'treeSelectData',
        type: 'POST',
        url: '/api/admin/v1/common/categoryChildrenListUseYn',
        params: { PARAM: { NODE_ID: 1831, USE_YN: 'Y' } },
      },
    ];
    getCallDataHandler(id, apiAry, this.initData);
  }

  initData = () => {
    const {
      result: { treeSelectData, dangerDanestAdmin },
    } = this.props;
    const list = dangerDanestAdmin && dangerDanestAdmin.list;
    const nData = (treeSelectData && treeSelectData.categoryMapList && getCategoryMapListAsTree(treeSelectData.categoryMapList, 1831)) || [];
    this.setState({ nData, list });
  };

  search = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const { rangeData, DANGRAD, SDIV_ID, DIV_ID, PLACE_ID, PROCESS_ID, EQUIP_ID } = this.state;
    const apiAry = [
      {
        key: 'dangerDanestAdmin',
        type: 'POST',
        url: `/api/eshs/v1/common/dangerDanestAdminSub`,
        params: {
          PARAM: {
            START_DATE: moment(rangeData[0]).format('YYYY-MM-DD'),
            END_DATE: moment(rangeData[1]).format('YYYY-MM-DD'),
            DANGRAD,
            SDIV_ID,
            DIV_ID,
            PLACE_ID,
            PROCESS_ID,
            EQUIP_ID,
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

  onChangeTreeSelect = (value, label, extra) => {
    switch (extra.triggerNode.props.level) {
      case 3:
        return this.setState({ SDIV_ID: value, DIV_ID: undefined, PLACE_ID: undefined, PROCESS_ID: undefined, EQUIP_ID: undefined });
      case 4:
        return this.setState({ SDIV_ID: undefined, DIV_ID: value, PLACE_ID: undefined, PROCESS_ID: undefined, EQUIP_ID: undefined });
      case 5:
        return this.setState({ SDIV_ID: undefined, DIV_ID: undefined, PLACE_ID: value, PROCESS_ID: undefined, EQUIP_ID: undefined });
      case 6:
        return this.setState({ SDIV_ID: undefined, DIV_ID: undefined, PLACE_ID: undefined, PROCESS_ID: value, EQUIP_ID: undefined });
      case 7:
        return this.setState({ SDIV_ID: undefined, DIV_ID: undefined, PLACE_ID: undefined, PROCESS_ID: undefined, EQUIP_ID: value });
      default:
        return '';
    }
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
    const { list, recordByState, nData } = this.state;
    return (
      <StyledContentsWrapper>
        <StyledCustomSearchWrapper>
          <div className="search-input-area mb10">
            <span className="text-label">등록일</span>
            <AntdRangePicker
              className="ant-picker-sm"
              defaultValue={[moment(this.state.rangeData[0], 'YYYY-MM'), moment(this.state.rangeData[1], 'YYYY-MM')]}
              format={['YYYY-MM-DD', 'YYYY-MM-DD']}
              onChange={(date, dateStrings) => this.dateChange(dateStrings)}
            />
            <span className="text-label">위험등급</span>
            <AntdSelect style={{ width: 200 }} className="select-sm" placeholder="전체" allowClear onChange={value => this.setState({ DANGRAD: value })}>
              <Option value="A">A</Option>
              <Option value="B">B</Option>
              <Option value="C">C</Option>
              <Option value="D">D</Option>
              <Option value="E">E</Option>
              <Option value="F">F</Option>
            </AntdSelect>
          </div>
          <div className="search-input-area mb10">
            <span className="text-label">분류</span>
            <AntdTreeSelect
              style={{ width: 361, marginLeft: 11 }}
              className="select-sm"
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={nData || []}
              placeholder="전체"
              allowClear
              onChange={this.onChangeTreeSelect}
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
