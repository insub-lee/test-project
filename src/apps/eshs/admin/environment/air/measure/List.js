import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Select, message } from 'antd';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledButton from 'commonStyled/Buttons/StyledButton';

import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledSelect from 'commonStyled/Form/StyledSelect';

import Moment from 'moment';

const AntdLineTable = StyledLineTable(Table);
const AntdSelect = StyledSelect(Select);
const { Option } = Select;
Moment.locale('ko');

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnsPlus: [],
      siteList: [],
      measureList: [],
      yyyy: Moment().format('YYYY'),
      mm: Moment().format('MM'),
      seq: '1',
      site: 716,
      selectGubun: '1',
      monthArray: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    };
  }

  componentDidMount() {
    this.listDataApi();
    this.yearOption();
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
    const { yyyy, mm, seq, site } = this.state;
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
      {
        key: 'measure',
        url: `/api/eshs/v1/common/eshsmeasure?YYYY=${yyyy}&MM=${mm}&SEQ=${seq}&SITE=${site}`,
        type: 'GET',
      },
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
    this.setState({ measureList: result && result.measure && result.measure.list });
  };

  chagneSelect = (value, option) => {
    this.setState({
      [option.key]: value,
    });
  };

  yearOption = () => {
    const yearArray = [];
    const startYear = 2005;
    const endYear = Number(Moment().format('YYYY')) + 1;
    for (let i = startYear; i <= endYear; i += 1) {
      yearArray.push(i);
    }
    this.setState({ yearArray });
  };

  isExcelUpload = () => {
    message.info('개발 중 입니다.');
  };

  render() {
    const { measureList, columnsPlus, siteList, yearArray, monthArray } = this.state;

    return (
      <ContentsWrapper>
        <div className="selSaveWrapper alignLeft">
          <span className="textLabel">조회구분</span>
          <AntdSelect
            className="select-mid"
            style={{ width: '100px' }}
            onChange={(value, option) => this.chagneSelect(value, option)}
            value={this.state.selectGubun}
          >
            <Option value="1" key="selectGubun">
              농도
            </Option>
            <Option value="2" key="selectGubun">
              중량
            </Option>
          </AntdSelect>
          <span className="textLabel">지역</span>
          <AntdSelect style={{ width: '100px' }} onChange={(value, option) => this.chagneSelect(value, option)} value={this.state.site}>
            {siteList &&
              siteList.map(item => (
                <Option value={item.NODE_ID} key="site">
                  {item.NAME_KOR}
                </Option>
              ))}
          </AntdSelect>
          <span className="textLabel">기간(년 월)</span>
          <AntdSelect className="select-mid" style={{ width: '100px' }} onChange={(value, option) => this.chagneSelect(value, option)} value={this.state.yyyy}>
            {yearArray &&
              yearArray.map(item => (
                <Option value={`${item}`} key="yyyy">
                  {item}
                </Option>
              ))}
          </AntdSelect>
          <AntdSelect className="select-mid" style={{ width: '100px' }} onChange={(value, option) => this.chagneSelect(value, option)} value={this.state.mm}>
            {monthArray.map(i => (
              <Option value={i} key="mm">
                {`${i}월`}
              </Option>
            ))}
          </AntdSelect>
          <span className="textLabel">측정회차(월)</span>
          <AntdSelect className="select-mid" onChange={(value, option) => this.chagneSelect(value, option)} value={this.state.seq}>
            <Option value="1" key="seq">
              1
            </Option>
            <Option value="2" key="seq">
              2
            </Option>
          </AntdSelect>
          <StyledButtonWrapper className="btn-wrap-inline">
            <StyledButton className="btn-primary btn-first" onClick={() => this.isSearch()}>
              검색
            </StyledButton>
            <StyledButton className="btn-primary" onClick={() => this.isExcelUpload()}>
              엑셀 올리기
            </StyledButton>
          </StyledButtonWrapper>
        </div>
        <AntdLineTable
          className="tableWrapper"
          rowKey={measureList && `${(measureList.YYYY, measureList.MM, measureList.SEQ, measureList.STACK_CD)}`}
          columns={columnsPlus}
          dataSource={measureList || []}
          scroll={{ x: columnsPlus.length * 150 }}
          footer={() => <div style={{ textAlign: 'center' }}>{`${measureList && measureList[0] ? measureList.length : 0} 건`}</div>}
        />
      </ContentsWrapper>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.any,
  columns: PropTypes.array,
};

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
