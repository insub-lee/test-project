import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, message, Select, Row, DatePicker, Input, Button, Modal } from 'antd';

import StyledButton from 'apps/mdcs/styled/StyledButton';
import Moment from 'moment';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import { CustomStyledAntdTable as StyledAntdTable } from 'components/CommonStyled/StyledAntdTable';

const { RangePicker } = DatePicker;
const AntdTable = StyledAntdTable(Table);
const { Option } = Select;
Moment.locale('ko');

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnsPlus: [],
      siteList: [],
      fabList: [],
      msList: [],
      measureRefList: [],
      gasTypeList: [],
      gasType: '',
      ref: 1,
      mm: '',
      site: '',
      msOption: '',
      fab: '',
      selectGubun: 1,
      startY: Moment().format('YYYY'),
      endY: Moment().format('YYYY'),
      startM: Moment().format('MM'),
      endM: Moment().format('MM'),
      rangeDate: [Moment(), Moment()],
    };
  }

  componentDidMount() {
    this.listDataApi();
  }

  initData = () => {
    const { result } = this.props;
    this.setState({
      siteList: result && result.introCode && result.introCode.categoryMapList.filter(f => f.LVL === 3 && f.PARENT_NODE_ID === 635 && f.USE_YN === 'Y'),
      fabList: result && result.introCode && result.introCode.categoryMapList.filter(f => f.LVL === 3 && f.PARENT_NODE_ID === 638 && f.USE_YN === 'Y'),
      msList: result && result.envConde && result.envConde.categoryMapList.filter(f => f.LVL === 3 && f.PARENT_NODE_ID === 864 && f.USE_YN === 'Y'),
      gasTypeList: result && result.gasTypeList && result.gasTypeList.list,
    });
  };

  listDataApi = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'introCode',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=65',
        type: 'GET',
      },
      {
        key: 'envConde',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=47',
        type: 'GET',
      },
      {
        key: 'gasTypeList',
        url: '/api/eshs/v1/common/eshsgastype',
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry, this.initData);
  };

  isSearch = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    console.log('searchsearchsearchsearchsearch');
    const { gasType, startY, endY, startM, endM, fab, site, msOption, ref, rangeDate } = this.state;
    let param = `REF=${ref}&GAS_CD=${gasType}&START_Y=${startY}&END_Y=${endY}&START_M=${startM}&END_M=${endM}`;
    param += `&SITE=${site}&FAB=${fab}&GUBUN=${msOption}&START_DATE=${rangeDate[0].format('YYYY--MM-DD')}&END_DATE=${rangeDate[1].format('YYYY--MM-DD')}`;
    if (gasType && Number(startY) <= Number(endY)) {
      const apiAry = [
        {
          key: 'measureRef',
          url: `/api/eshs/v1/common/measureRef?${param}`,
          type: 'GET',
        },
      ];
      getCallDataHandler(id, apiAry, this.listData);
    } else if (gasType) {
      message.warning('연도를 올바르게 선택해주세요.');
    } else {
      message.warning('가스 종류를 선택해주세요.');
    }
  };

  listData = () => {
    const { result, columns } = this.props;
    this.setState({
      // columnsPlus: columns,
      columnsPlus: [
        {
          title: '지역',
          dataIndex: 'SITE_NM',
          align: 'center',
        },
        {
          title: 'Fab',
          dataIndex: 'FAB_NM',
          align: 'center',
        },
        {
          title: '종류',
          dataIndex: 'GUBUN_NM',
          align: 'center',
        },
        {
          title: 'Stack#(관리)',
          dataIndex: 'CONTROL_STACK_CD',
          align: 'center',
        },
        {
          title: '용량(CMM)',
          dataIndex: 'CMM_CAPA',
          align: 'center',
        },
      ],
    });
    const { columnsPlus } = this.state;
    console.log(columnsPlus, 'columnsPluscolumnsPlus');
    const fieldList = result && result.measureRef && result.measureRef.fieldList;
    fieldList.forEach(itme => {
      columnsPlus.push({
        dataIndex: itme,
        title: itme,
        align: 'center',
      });
    });
    this.setState(
      {
        measureRefList: result && result.measureRef && result.measureRef.list,
        columnsPlus,
      },
      () => this.renderTable(),
    );
  };

  chagneSelect = (value, option) => {
    this.setState({
      [option.key]: value,
    });
    if (option.key === 'ref') {
      this.setState({
        startY: Moment().format('YYYY'),
        endY: Moment().format('YYYY'),
        startM: Moment().format('MM'),
        endM: Moment().format('MM'),
        rangeDate: [Moment(), Moment()],
      });
    }
  };

  renderTable = () => {
    const { measureRefList, columnsPlus } = this.state;

    return (
      <AntdTable
        style={{ cursor: 'pointer' }}
        rowKey={measureRefList && `${(measureRefList.FAB, measureRefList.GUBUN, measureRefList.CONTROL_STACK_CD, measureRefList.CMM_CAPA)}`}
        columns={columnsPlus}
        dataSource={measureRefList || []}
        bordered
        pagination={{ pageSize: 100 }}
        scroll={{ y: 500 }}
        footer={() => <div style={{ textAlign: 'center' }}>{`${measureRefList && measureRefList[0] ? measureRefList.length : 0} 건`}</div>}
      />
    );
  };

  siteOption = () => {
    const { siteList } = this.state;
    const site = siteList.map(item => (
      <Option value={item.NODE_ID} key="site">
        {item.NAME_KOR}
      </Option>
    ));
    return site;
  };

  fabOption = () => {
    const { fabList } = this.state;
    const fab = fabList.map(item => (
      <Option value={item.NODE_ID} key="fab">
        {item.NAME_KOR}
      </Option>
    ));
    return fab;
  };

  msOption = () => {
    const { msList } = this.state;
    const ms = msList.map(item => (
      <Option value={item.NODE_ID} key="msOption">
        {item.NAME_KOR}
      </Option>
    ));
    return ms;
  };

  refRender = () => {
    const startYear = 2000;
    const endYear = 2015;
    let ref;
    const gubunSelect = (
      <Select style={{ width: '100px' }} onChange={(value, option) => this.chagneSelect(value, option)} value={this.state.selectGubun}>
        <Option value={1} key="selectGubun">
          농도
        </Option>
        <Option value={2} key="selectGubun">
          중량
        </Option>
      </Select>
    );
    const yearSelect = key => {
      const tempYear = [];
      for (let i = startYear; i <= endYear; i += 1) {
        tempYear.push(i);
      }
      return (
        <Select style={{ width: '100px' }} onChange={(value, option) => this.chagneSelect(value, option)} value={this.state[key]}>
          {tempYear.map(item => (
            <Option value={`${item}`} key={key}>
              {item}
            </Option>
          ))}
        </Select>
      );
    };

    const monthSelect = key => {
      const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      return (
        <Select style={{ width: '100px' }} onChange={(value, option) => this.chagneSelect(value, option)} value={this.state[key]}>
          {month.map(i => (
            <Option value={i < 10 ? `0${i}` : i} key={key}>
              {i < 10 ? `0${i}` : i}
            </Option>
          ))}
        </Select>
      );
    };

    switch (this.state.ref) {
      case 2:
        ref = (
          <>
            {gubunSelect}
            {yearSelect('startY')}
            {monthSelect('startM')}

            {'  ~  '}
            {yearSelect('endY')}
            {monthSelect('endM')}
          </>
        );
        break;
      case 3:
        ref = (
          <>
            {gubunSelect}
            {yearSelect('startY')}
            {'  ~  '}
            {yearSelect('endY')}
          </>
        );
        break;
      default:
        ref = (
          <>
            <RangePicker
              value={this.state.rangeDate}
              renderExtraFooter={() => 'extra footer'}
              onChange={e =>
                this.setState({
                  rangeDate: e,
                  startY: e[0].format('YYYY'),
                  endY: e[1].format('YYYY'),
                  startM: e[0].format('MM'),
                  endM: e[1].format('MM'),
                })
              }
            />
          </>
        );
        break;
    }
    return ref;
  };

  isExcelUpload = () => {
    message.info('개발 중 입니다.');
  };

  handleModalVisible = () => {
    const { modal } = this.state;
    this.setState({
      modal: !modal,
    });
  };

  modalRender = () => {
    const { gasTypeList } = this.state;
    const columns = [
      {
        title: '가스종류명',
        dataIndex: 'GAS_NM',
        align: 'center',
      },
      {
        title: '가스분자량',
        dataIndex: 'PERMISSION_DENSITY',
        align: 'right',
      },
      {
        title: '법적허용 농도(PPM)',
        dataIndex: 'GAS_WEIGHT',
        align: 'center',
      },
      {
        title: '단위',
        dataIndex: 'UNIT',
        align: 'left',
      },
    ];
    return (
      <AntdTable
        style={{ cursor: 'pointer' }}
        rowKey={gasTypeList && gasTypeList.GAS_CD}
        columns={columns}
        dataSource={gasTypeList || []}
        bordered
        onRow={record => ({
          onClick: () => {
            this.selectedModalRecord(record);
          },
        })}
        pagination={{ pageSize: 100 }}
        scroll={{ y: 500 }}
        footer={() => <div style={{ textAlign: 'center' }}>{`${gasTypeList.length - 1 || 0} 건`}</div>}
      />
    );
  };

  selectedModalRecord = record => {
    this.setState({
      gasType: record.GAS_CD,
    });
    this.handleModalVisible();
  };

  render() {
    console.log(this.props.result, 'result');
    console.log(this.props, 'props');
    console.log(this.state, 'state');
    return (
      <div style={{ padding: '10px 15px', backgroundColor: 'white' }}>
        <StyledViewDesigner>
          <Sketch>
            <Group>
              <Row>
                가스종류
                <Input readOnly style={{ width: 150 }} onClick={this.handleModalVisible} value={this.state.gasType} />
                <Button shape="circle" icon="search" onClick={this.handleModalVisible} />
                <Select style={{ width: '100px' }} onChange={(value, option) => this.chagneSelect(value, option)} value={this.state.site}>
                  <Option value="" key="site">
                    지역전체
                  </Option>
                  {this.siteOption()}
                </Select>
                <Select style={{ width: '100px' }} onChange={(value, option) => this.chagneSelect(value, option)} value={this.state.fab}>
                  <Option value="" key="fab">
                    FAB전체
                  </Option>
                  {this.fabOption()}
                </Select>
                Stack
                <Select style={{ width: '100px' }} onChange={(value, option) => this.chagneSelect(value, option)} value={this.state.msOption}>
                  <Option value="" key="msOption">
                    전체
                  </Option>
                  {this.msOption()}
                </Select>
                선택
                <Select style={{ width: '100px' }} onChange={(value, option) => this.chagneSelect(value, option)} value={this.state.ref}>
                  <Option value={1} key="ref">
                    회차별
                  </Option>
                  <Option value={2} key="ref">
                    월별
                  </Option>
                  <Option value={3} key="ref">
                    년별
                  </Option>
                </Select>
              </Row>
              <Row>
                {this.refRender()}
                <StyledButton className="btn-primary btn-first" onClick={() => this.isSearch()}>
                  검색
                </StyledButton>
                <StyledButton className="btn-primary btn-first" onClick={() => this.isExcelUpload()}>
                  엑셀 올리기
                </StyledButton>
                <StyledButton className="btn-primary btn-first" onClick={() => this.isExcelUpload()}>
                  그래프
                </StyledButton>
              </Row>
              {this.renderTable()}
              <Modal visible={this.state.modal} width={800} height={600} onCancel={this.handleModalVisible} footer={[null]}>
                {this.state.modal && this.modalRender()}
              </Modal>
            </Group>
          </Sketch>
        </StyledViewDesigner>
      </div>
    );
  }
}

List.propTypes = {};

List.defaultProps = {
  // columns: [
  //   {
  //     title: '지역',
  //     dataIndex: 'SITE_NM',
  //     align: 'center',
  //   },
  //   {
  //     title: 'Fab',
  //     dataIndex: 'FAB_NM',
  //     align: 'center',
  //   },
  //   {
  //     title: '종류',
  //     dataIndex: 'GUBUN_NM',
  //     align: 'center',
  //   },
  //   {
  //     title: 'Stack#(관리)',
  //     dataIndex: 'CONTROL_STACK_CD',
  //     align: 'center',
  //   },
  //   {
  //     title: '용량(CMM)',
  //     dataIndex: 'CMM_CAPA',
  //     align: 'center',
  //   },
  // ],
};

export default List;
