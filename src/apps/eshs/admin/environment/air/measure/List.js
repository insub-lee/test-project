import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, message, Select } from 'antd';

import StyledButton from 'apps/mdcs/styled/StyledButton';

import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import { CustomStyledAntdTable as StyledAntdTable } from 'components/CommonStyled/StyledAntdTable';

const AntdTable = StyledAntdTable(Table);
const { Option } = Select;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnsPlus: [],
      siteList: [],
      measureList: [],
      yyyy: '',
      mm: '',
      seq: '',
      site: '',
      selectGubun: '',
    };
  }

  componentDidMount() {
    this.listDataApi();
  }

  initData = () => {
    const { result, columns } = this.props;
    const colPlus = result && result.gasType && result.gasType.list;
    const setCol = columns;
    colPlus.forEach(itme => {
      setCol.push({
        dataIndex: itme.GAS_CD.toLowerCase(),
        title: itme.GAS_NM,
        align: 'center',
      });
    });

    this.setState({
      siteList: result && result.site && result.site.categoryMapList.filter(f => f.LVL === 3 && f.PARENT_NODE_ID === 635 && f.USE_YN === 'Y'),
      measureList: result && result.measure && result.measure.list,
      columnsPlus: setCol,
    });
  };

  listDataApi = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    // const { yyyy, mm, seq, site } = this.state;
    const apiAry = [
      {
        key: 'site',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=65',
        type: 'GET',
      },
      {
        key: 'gasType',
        url: '/api/eshs/v1/common/eshsgastype',
        type: 'GET',
      },
      // {
      //   key: 'measure',
      //   url: `/api/eshs/v1/common/eshsmeasure?YYYY=${yyyy}&MM=${mm}&SEQ=${seq}&SITE=${site}`,
      //   type: 'GET',
      // },
    ];
    getCallDataHandler(id, apiAry, this.initData);
  };

  isSearch = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const { yyyy, mm, seq, site, selectGubun } = this.state;
    const apiAry = [
      {
        key: 'measure',
        url: `/api/eshs/v1/common/eshsmeasure?YYYY=${yyyy}&MM=${mm}&SEQ=${seq}&SITE=${site}&WEIGHT=${selectGubun}`,
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry, this.listData);
  };

  listData = () => {
    const { result } = this.props;
    this.setState(
      {
        measureList: result && result.measure && result.measure.list,
      },
      () => this.renderTable(),
    );
  };

  chagneSelect = (value, option) => {
    this.setState({
      [option.key]: value,
    });
  };

  renderTable = () => {
    const { measureList, columnsPlus } = this.state;
    const { result } = this.props;

    return (
      <AntdTable
        style={{ cursor: 'pointer' }}
        rowKey={measureList && `${(measureList.YYYY, measureList.MM, measureList.SEQ, measureList.STACK_CD)}`}
        columns={columnsPlus}
        dataSource={measureList || []}
        bordered
        onRow={record => ({
          onClick: () => {
            console.log(record, 'recordData');
          },
        })}
        pagination={{ pageSize: 100 }}
        scroll={{ y: 500 }}
        footer={() => <div style={{ textAlign: 'center' }}>{`${measureList && measureList[0] ? measureList.length : 0} 건`}</div>}
      />
    );
  };

  yearOption = () => {
    // as-is에서는 연도 고정값 추후 검토 요망
    const tempYear = [];
    const startYear = 2000;
    const endYear = 2015;
    for (let i = startYear; i <= endYear; i += 1) {
      tempYear.push(i);
    }
    return tempYear.map(item => (
      <Option value={`${item}`} key="yyyy">
        {item}
      </Option>
    ));
  };

  monthOption = () => {
    const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const tmpMonth = month.map(i => (
      <Option value={i < 10 ? `0${i}` : i} key="mm">
        {i < 10 ? `0${i}` : i}
      </Option>
    ));
    return tmpMonth;
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

  isExcelUpload = () => {
    message.info('개발 중 입니다.');
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
              <div>
                조회구분
                <Select style={{ width: '100px' }} onChange={(value, option) => this.chagneSelect(value, option)}>
                  <Option value="1" key="selectGubun">
                    농도
                  </Option>
                  <Option value="2" key="selectGubun">
                    중량
                  </Option>
                </Select>
                지역
                <Select style={{ width: '100px' }} onChange={(value, option) => this.chagneSelect(value, option)}>
                  {this.siteOption()}
                </Select>
                기간(년 월)
                <Select style={{ width: '100px' }} onChange={(value, option) => this.chagneSelect(value, option)}>
                  {this.yearOption()}
                </Select>
                <Select style={{ width: '100px' }} onChange={(value, option) => this.chagneSelect(value, option)}>
                  {this.monthOption()}
                </Select>
                측정회차(월)
                <Select style={{ width: '100px' }} onChange={(value, option) => this.chagneSelect(value, option)}>
                  <Option value="1" key="seq">
                    1
                  </Option>
                  <Option value="2" key="seq">
                    2
                  </Option>
                </Select>
                <StyledButton className="btn-primary btn-first" onClick={() => this.isSearch()}>
                  검색
                </StyledButton>
                <StyledButton className="btn-primary btn-first" onClick={() => this.isExcelUpload()}>
                  엑셀 올리기
                </StyledButton>
              </div>
              {this.renderTable()}
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
      title: 'Stack CD',
      dataIndex: 'STACK_CD',
      align: 'center',
    },
    {
      title: 'Control Stack CD',
      dataIndex: 'CONTROL_STACK_CD',
      align: 'center',
    },
    {
      title: '측정여부',
      dataIndex: 'IS_MEASURE',
      align: 'center',
      render: key => <span>{key === 1 ? 'Y' : 'N'}</span>,
    },
    {
      title: 'Stack종류',
      dataIndex: 'GUBUN',
      align: 'center',
    },
    {
      title: '측정일자',
      dataIndex: 'MEASURE_DT',
      align: 'center',
    },
    {
      title: '가동시간',
      dataIndex: 'DAY_WORK_TIME',
      align: 'center',
    },
    {
      title: '월조업 일수',
      dataIndex: 'WORK_DAY',
      align: 'center',
    },
    {
      title: '수분 (%)',
      dataIndex: 'WATER_RATE',
      align: 'center',
    },
    {
      title: '온도(℃)',
      dataIndex: 'TEMPERATURE',
      align: 'center',
    },
    {
      title: '유속 (m/sec)',
      dataIndex: 'FLOWSPEED',
      align: 'center',
    },
    {
      title: '유량(S㎥/hr)',
      dataIndex: 'HOUR_WEIGHT',
      align: 'center',
    },
  ],
};

export default List;
