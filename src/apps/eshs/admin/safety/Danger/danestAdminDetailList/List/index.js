import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DanestAdmin from 'apps/eshs/admin/safety/Danger/danestAdmin';
import ReAppriseList from 'apps/eshs/admin/safety/Danger/danestAdmin/ReAppriseList';

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
import ExcelDownloadComp from 'components/BizBuilder/Field/ExcelDownloadComp';

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
      rangeData: [moment(moment().subtract(1, 'month')).format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
      modalObj: {
        visible: false,
        title: '',
        content: [],
      },
    };
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const { rangeData } = this.state;
    const apiAry = [
      // {
      //   key: 'dangerDanestAdmin',
      //   type: 'POST',
      //   url: `/api/eshs/v1/common/dangerDanestAdminSub`,
      //   params: { PARAM: { START_DATE: moment(rangeData[0]).format('YYYY-MM-DD'), END_DATE: moment(rangeData[1]).format('YYYY-MM-DD') } },
      // },
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
    const nData =
      (treeSelectData &&
        treeSelectData.categoryMapList &&
        getCategoryMapListAsTree(treeSelectData.categoryMapList, 1831)) ||
      [];
    this.setState({ nData, list });
  };

  search = () => {
    const { sagaKey: id, getCallDataHandler, spinningOn } = this.props;
    const { rangeData, DANGRAD, SDIV_ID, DIV_ID, PLACE_ID, PROCESS_ID, EQUIP_ID } = this.state;
    spinningOn();
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
      spinningOff,
    } = this.props;
    const list = dangerDanestAdmin && dangerDanestAdmin.list;
    spinningOff();
    if (list && list.length > 0) {
      this.setState({ list });
    } else {
      message.info(<MessageContent>검색된 데이터가 없습니다.</MessageContent>);
    }
  };

  // onModalChange = () => {
  //   const { isModal } = this.state;
  //   this.setState({ isModal: !isModal });
  // };

  // onClickRow = record => {
  //   this.setState({ recordByState: record });
  //   this.onModalChange();
  // };

  onChangeTreeSelect = (value, label, extra) => {
    switch (extra && extra.triggerNode && extra.triggerNode.props && extra.triggerNode.props.level) {
      case 3:
        return this.setState({
          SDIV_ID: value,
          DIV_ID: undefined,
          PLACE_ID: undefined,
          PROCESS_ID: undefined,
          EQUIP_ID: undefined,
        });
      case 4:
        return this.setState({
          SDIV_ID: undefined,
          DIV_ID: value,
          PLACE_ID: undefined,
          PROCESS_ID: undefined,
          EQUIP_ID: undefined,
        });
      case 5:
        return this.setState({
          SDIV_ID: undefined,
          DIV_ID: undefined,
          PLACE_ID: value,
          PROCESS_ID: undefined,
          EQUIP_ID: undefined,
        });
      case 6:
        return this.setState({
          SDIV_ID: undefined,
          DIV_ID: undefined,
          PLACE_ID: undefined,
          PROCESS_ID: value,
          EQUIP_ID: undefined,
        });
      case 7:
        return this.setState({
          SDIV_ID: undefined,
          DIV_ID: undefined,
          PLACE_ID: undefined,
          PROCESS_ID: undefined,
          EQUIP_ID: value,
        });
      default:
        return this.setState({
          SDIV_ID: undefined,
          DIV_ID: undefined,
          PLACE_ID: undefined,
          PROCESS_ID: undefined,
          EQUIP_ID: undefined,
        });
    }
  };

  dateChange = rangeData => {
    this.setState({ rangeData });
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
      width: 150,
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
      title: '재평가내역',
      align: 'center',
      dataIndex: 'HISTORY',
      render: (text, record) => (
        <StyledButton className="btn-link btn-sm" onClick={e => this.historyModalVisible(e, record)}>
          {text}
        </StyledButton>
      ),
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

  historyModalVisible = (event, record) => {
    event.stopPropagation();

    const { sagaKey: id, getCallDataHandler, spinningOn, spinningOff } = this.props;
    spinningOn();
    const apiAry = [
      {
        key: 'dangerDanestAdmin',
        type: 'GET',
        url: `/api/eshs/v1/common/dangerDanestAdmin?REG_NO=${record.REG_NO}`,
      },
    ];
    getCallDataHandler(id, apiAry, () => {
      const { result } = this.props;
      const dangerDanestAdminSubFile = (result && result.dangerDanestAdmin && result.dangerDanestAdmin.fileList) || [];
      const reAppriseList = (result && result.dangerDanestAdmin && result.dangerDanestAdmin.reAppriseList) || [];
      spinningOff();
      this.modalVisible(`재평가 목록 [평가번호 ${record.REG_NO}]`, [
        <ReAppriseList
          key="ReAppriseList"
          reAppriseList={reAppriseList}
          dangerDanestAdminSubFile={dangerDanestAdminSubFile}
        />,
      ]);
    });
  };

  modalVisible = (title = '', content = []) => {
    const {
      modalObj: { visible },
    } = this.state;

    return this.setState({
      modalObj: {
        visible: !visible,
        title,
        content,
      },
    });
  };

  render() {
    const { list, nData, modalObj } = this.state;
    return (
      <StyledContentsWrapper>
        <StyledCustomSearchWrapper className="search-wrapper-inline">
          <div className="search-input-area">
            <span className="text-label">등록일</span>
            <AntdRangePicker
              style={{ width: 250 }}
              className="ant-picker-sm mr5"
              defaultValue={[
                moment(this.state.rangeData[0], 'YYYY-MM-DD'),
                moment(this.state.rangeData[1], 'YYYY-MM-DD'),
              ]}
              format={['YYYY-MM-DD', 'YYYY-MM-DD']}
              allowClear={false}
              onChange={(date, dateStrings) => this.dateChange(dateStrings)}
              onPressEnter={this.search}
            />
            <AntdSelect
              style={{ width: 150 }}
              className="select-sm"
              placeholder="위험등급 전체"
              allowClear
              onChange={value => this.setState({ DANGRAD: value })}
            >
              <Option value="A">A</Option>
              <Option value="B">B</Option>
              <Option value="C">C</Option>
              <Option value="D">D</Option>
              <Option value="E">E</Option>
              <Option value="F">F</Option>
            </AntdSelect>
            <AntdTreeSelect
              style={{ width: 250, marginLeft: 11 }}
              className="select-sm"
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={nData || []}
              placeholder="분류 전체"
              allowClear
              onChange={this.onChangeTreeSelect}
            />
          </div>
          <StyledButtonWrapper className="btn-area">
            <StyledButton className="btn-gray btn-first btn-sm" onClick={this.search}>
              검색
            </StyledButton>
            <ExcelDownloadComp
              isBuilder={false}
              fileName={`DE_AdminList${moment().format('YYYYMMDD')}`}
              className="testClassName"
              btnText="엑셀받기"
              sheetName={`DE_AdminList${moment().format('YYYYMMDD')}`}
              listData={list}
              btnSize="btn-sm btn-first"
              fields={this.columns.map(item => ({
                field: item.dataIndex,
                style: {
                  font: { sz: '12' },
                  alignment: { vertical: item.excelAlign || 'center', horizontal: item.excelAlign || 'center' },
                },
              }))}
              columns={this.columns.map(item => ({
                ...item,
                field: item.dataIndex,
                filter: 'agTextColumnFilter',
                width: item.width ? { wpx: item.width * 2 } : { wpx: 150 },
                style: {
                  fill: { fgColor: { rgb: 'D6EBFF' } },
                  font: { sz: '', bold: true },
                  alignment: { vertical: 'center', horizontal: 'center' },
                },
              }))}
            />
          </StyledButtonWrapper>
        </StyledCustomSearchWrapper>
        <AntdTable
          key="DA_REG_NO,SEQ"
          dataSource={list}
          columns={this.columns}
          onRow={record => ({
            onClick: () => {
              this.modalVisible('위험성 평가', [
                <DanestAdmin
                  key="DanestAdmin"
                  sagaKey="DanestAdmin_test"
                  improveDanger={{ REG_NO: record.REG_NO, REG_DTTM: record.REG_DTTM, IMPROVE: true }}
                />,
              ]);
            },
          })}
          bordered
          // pagination={false}
          scroll={{ x: '100%' }}
        />
        <AntdModal
          width={1100}
          visible={modalObj.visible}
          title={modalObj.title}
          onCancel={() => this.modalVisible('', [])}
          footer={null}
        >
          {/* {this.state.isModal && <DanestAdmin improveDanger={{ REG_NO: recordByState.REG_NO, REG_DTTM: recordByState.REG_DTTM, IMPROVE: true }} />} */}
          {modalObj.content}
        </AntdModal>
      </StyledContentsWrapper>
    );
  }
}

List.propTypes = {
  getCallDataHandler: PropTypes.func,
  sagaKey: PropTypes.string,
  result: PropTypes.object,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
};

List.defaultProps = {
  getCallDataHandler: () => {},
  spinningOn: () => {},
  spinningOff: () => {},
};

export default List;
