import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, message, Select, Row, Input, Button, Modal } from 'antd';

import StyledButton from 'apps/mdcs/styled/StyledButton';
import Moment from 'moment';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import { CustomStyledAntdTable as StyledAntdTable } from 'components/CommonStyled/StyledAntdTable';

const AntdTable = StyledAntdTable(Table);
const { Option } = Select;
Moment.locale('ko');

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startYear: 2000,
      endYear: 2015,
      monthArr: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      yearArr: [],
      siteList: [],
      semesterMeasureList: [],
      gasTypeList: [],
      site: '',
      year: Moment().format('YYYY'),
      mm: Moment().format('MM'),
      gasType: '',
    };
  }

  componentDidMount() {
    this.listDataApi();
  }

  listDataApi = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'introCode',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=65',
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

  initData = () => {
    const { result } = this.props;
    const { startYear, endYear, yearArr } = this.state;
    for (let i = startYear; i <= endYear; i += 1) {
      yearArr.push(i);
    }
    this.setState({
      siteList: result && result.introCode && result.introCode.categoryMapList.filter(f => f.LVL === 3 && f.PARENT_NODE_ID === 635 && f.USE_YN === 'Y'),
      gasTypeList: result && result.gasTypeList && result.gasTypeList.list,
      yearArr,
    });
  };

  isSearch = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const { site, year, mm, gasType } = this.state;
    console.log(site, year, mm, gasType, 'site, year, mm, gasTypesite, year, mm, gasTypesite, year, mm, gasType');
    if (gasType) {
      const apiAry = [
        {
          key: 'semesterMmeasure',
          url: `/api/eshs/v1/common/semestermeasure?`,
          type: 'GET',
        },
      ];
      getCallDataHandler(id, apiAry, this.listData);
    } else {
      message.warning('가스 종류를 선택해주세요.');
    }
  };

  listData = () => {
    const { result } = this.props;
    this.setState({ semesterMeasureList: result && result.semesterMmeasure && result.semesterMmeasure.list });
  };

  chagneSelect = (value, option) => {
    this.setState({
      [option.key]: value,
    });
  };

  renderTable = () => {
    const { columns } = this.props;
    const { semesterMeasureList } = this.state;

    return (
      <AntdTable
        style={{ cursor: 'pointer' }}
        rowKey={semesterMeasureList && `${(semesterMeasureList.STACK_CD, semesterMeasureList.STACK_CD1)}`}
        columns={columns}
        dataSource={semesterMeasureList || []}
        bordered
        pagination={{ pageSize: 100 }}
        scroll={{ y: 500 }}
        footer={() => <div style={{ textAlign: 'center' }}>{`${semesterMeasureList && semesterMeasureList[0] ? semesterMeasureList.length : 0} 건`}</div>}
      />
    );
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
    const { siteList, monthArr, yearArr } = this.state;
    return (
      <div style={{ padding: '10px 15px', backgroundColor: 'white' }}>
        <StyledViewDesigner>
          <Sketch>
            <Group>
              <Row>
                <Select style={{ width: '100px' }} onChange={(value, option) => this.chagneSelect(value, option)} value={this.state.site}>
                  <Option value="" key="site">
                    지역전체
                  </Option>
                  {siteList.map(item => (
                    <Option value={item.NODE_ID} key="site">
                      {item.NAME_KOR}
                    </Option>
                  ))}
                </Select>
                <Select style={{ width: '100px' }} onChange={(value, option) => this.chagneSelect(value, option)} value={this.state.year}>
                  {yearArr.map(item => (
                    <Option value={`${item}`} key="year">
                      {item}
                    </Option>
                  ))}
                </Select>
                <Select style={{ width: '100px' }} onChange={(value, option) => this.chagneSelect(value, option)} value={this.state.mm}>
                  {monthArr.map(i => (
                    <Option value={i} key="mm">
                      {i}
                    </Option>
                  ))}
                </Select>
                가스종류
                <Input readOnly style={{ width: 150 }} onClick={this.handleModalVisible} value={this.state.gasType} />
                <Button shape="circle" icon="search" onClick={this.handleModalVisible} />
                <StyledButton className="btn-primary btn-first" onClick={() => this.isSearch()}>
                  검색
                </StyledButton>
                <StyledButton className="btn-primary btn-first" onClick={() => this.isExcelUpload()}>
                  저장
                </StyledButton>
                <StyledButton className="btn-primary btn-first" onClick={() => this.isExcelUpload()}>
                  엑셀받기(전체)
                </StyledButton>
                <StyledButton className="btn-primary btn-first" onClick={() => this.isExcelUpload()}>
                  엑셀받기(평균)
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
  columns: [
    {
      title: 'Stack#(관리)',
      dataIndex: 'STACK_CD',
      align: 'center',
    },
    {
      title: '측정일',
      dataIndex: 'STACK_CD1',
      align: 'center',
    },
    {
      title: '농도',
      dataIndex: 'STACK_CD2',
      align: 'center',
    },
    {
      title: '시간당유량 SM3/H',
      dataIndex: 'CMM_CAPA3',
      align: 'center',
    },
    {
      title: '일평균 조업시간',
      dataIndex: 'CMM_CAPA4',
      align: 'center',
    },
    {
      title: '일일유량 SM3/H',
      dataIndex: 'CMM_CAPA5',
      align: 'center',
    },
    {
      title: '일일배출량',
      dataIndex: 'CMM_CAPA6',
      align: 'center',
    },
    {
      title: '조정된 일일배출량',
      dataIndex: 'CMM_CAPA7',
      align: 'center',
    },
    {
      title: '반기조업일 수',
      dataIndex: 'CMM_CAPA8',
      align: 'center',
    },
    {
      title: '반기 확정 배출량',
      dataIndex: 'CMM_CAPA9',
      align: 'center',
    },
  ],
};

export default List;
