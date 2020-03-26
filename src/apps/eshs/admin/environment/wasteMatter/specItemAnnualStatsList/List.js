import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table, Select, message } from 'antd';
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
      site: 716,
      selectedYear: Number(Moment().format('YYYY')),
      specItems: [],
      siteList: [],
      arrayYear: [],
    };
  }

  componentDidMount() {
    this.initDataApi();
  }

  initDataApi() {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const { site, selectedYear } = this.state;
    const apiAry = [
      {
        key: 'specItem',
        url: `/api/eshs/v1/common/eshsSpecItemList?SITE=${site}&SELECTED_YEAR=${selectedYear}`,
        type: 'GET',
      },
      {
        key: 'site',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=65',
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry, this.initData);
  }

  initData = () => {
    const { result } = this.props;
    this.setState({
      specItems: result && result.specItem && result.specItem.list,
      siteList: result && result.site && result.site.categoryMapList.filter(f => f.LVL === 3 && f.PARENT_NODE_ID === 635 && f.USE_YN === 'Y'),
    });
    const startYear = Number(Moment().format('YYYY')) - 20;
    const endYear = startYear + 21;
    const arrayYear = [];
    for (let index = startYear; index < endYear; index++) {
      arrayYear.push(index);
    }
    this.setState({ arrayYear });
  };

  searchData = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const { site, selectedYear } = this.state;
    const apiAry = [
      {
        key: 'specItem',
        url: `/api/eshs/v1/common/eshsSpecItemList?SITE=${site}&SELECTED_YEAR=${selectedYear}`,
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry, this.searchDataSet);
  };

  searchDataSet = () => {
    const { result } = this.props;
    this.setState({ specItems: result && result.specItem && result.specItem.list });
  };

  changeSelectValue = (value, option) => {
    this.setState({
      [option.key]: value,
    });
  };

  excel = () => {
    message.info('개발중입니다.');
  };

  render() {
    const { columns } = this.props;
    const { siteList, specItems, arrayYear } = this.state;
    return (
      <div style={{ padding: '10px 15px', backgroundColor: 'white' }}>
        <StyledViewDesigner>
          <Sketch>
            <Group>
              <Row>
                <Col span={12}>
                  <Select style={{ width: '100px' }} onChange={(value, option) => this.changeSelectValue(value, option)} value={this.state.selectedYear}>
                    {arrayYear &&
                      arrayYear.map(val => (
                        <Option value={val} key="selectedYear">
                          {val}
                        </Option>
                      ))}
                  </Select>
                  년
                  <Select style={{ width: '100px' }} onChange={(value, option) => this.changeSelectValue(value, option)} value={this.state.site || 0}>
                    {siteList &&
                      siteList.map(itme => (
                        <Option value={itme.NODE_ID} key="site">
                          {itme.NAME_KOR}
                        </Option>
                      ))}
                  </Select>
                  <StyledButton className="btn-primary btn-first" onClick={() => this.searchData()}>
                    검색
                  </StyledButton>
                  <StyledButton className="btn-primary btn-first" onClick={() => this.excel()}>
                    엑셀받기
                  </StyledButton>
                </Col>
              </Row>
              <AntdTable
                rowKey={specItems && specItems.WAREHOUSE_CD}
                columns={columns}
                dataSource={specItems || []}
                bordered
                scroll={{ y: 600 }}
                footer={() => <div style={{ textAlign: 'center' }}>{`${specItems && specItems.length} 건`}</div>}
              />
            </Group>
          </Sketch>
        </StyledViewDesigner>
      </div>
    );
  }
}

List.propTypes = {
  columns: PropTypes.array,
  result: PropTypes.any,
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
};

List.defaultProps = {
  getCallDataHandler: () => {},
  columns: [
    {
      title: '종류(분류번호)(회사명)',
      align: 'center',
      render: rowData => <span>{`${rowData.WASTE_KIND_NM}(${rowData.WASTE_KIND_CODE})`}</span>,
    },
    {
      title: '배출량',
      dataIndex: 'WEIGH',
      align: 'center',
      render: key => <span>{(key / 1000).toFixed(2)}</span>,
    },
    {
      title: '성상(코드)',
      dataIndex: 'SHAPE_NM',
      align: 'center',
      render: (key, rowData) => <span>{`${key}(${rowData.SHAPE_CD})`}</span>,
    },
    {
      title: '위탁처리',
      align: 'center',
      children: [
        {
          title: '처리방법(코드)',
          dataIndex: 'CONSIGN_METHOD_NM',
          align: 'center',
          render: (key, rowData) => <span>{`${key}(${rowData.CONSIGN_METHOD_CD})`}</span>,
        },
        {
          title: '처리자구분(코드)',
          dataIndex: 'DISP_VENDOR_GUBUN_NM',
          align: 'center',
          render: (key, rowData) => <span>{`${key}(${rowData.DISP_VENDOR_GUBUN_CD})`}</span>,
        },
        {
          title: '처리업체',
          dataIndex: 'DISP_VENDOR_NM',
          align: 'center',
        },
      ],
    },
  ],
};

export default List;
