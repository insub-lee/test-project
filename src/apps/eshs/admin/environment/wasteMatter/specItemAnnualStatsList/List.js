import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

import { Table, Select, message } from 'antd';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import ExcelDownloader from './Excel';

const AntdSelect = StyledSelect(Select);
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
    for (let index = startYear; index < endYear; index += 1) {
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

  render() {
    const { columns } = this.props;
    const { siteList, specItems, arrayYear } = this.state;
    return (
      <StyledContentsWrapper>
        <StyledCustomSearchWrapper className="search-wrapper-inline">
          <div className="search-input-area">
            <AntdSelect className="select-sm" onChange={(value, option) => this.changeSelectValue(value, option)} value={this.state.selectedYear}>
              {arrayYear &&
                arrayYear.map(val => (
                  <Option value={val} key="selectedYear">
                    {val}
                  </Option>
                ))}
            </AntdSelect>
            <span className="text-label mr5">년</span>
            <AntdSelect className="select-sm" onChange={(value, option) => this.changeSelectValue(value, option)} value={this.state.site || 0}>
              {siteList &&
                siteList.map(itme => (
                  <Option value={itme.NODE_ID} key="site">
                    {itme.NAME_KOR}
                  </Option>
                ))}
            </AntdSelect>
          </div>
          <div className="btn-area">
            <StyledButton className="btn-gray btn-sm" onClick={() => this.searchData()}>
              검색
            </StyledButton>
          </div>
        </StyledCustomSearchWrapper>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          <ExcelDownloader dataList={specItems} excelNm="지정폐기물 년간 현황" />
        </StyledButtonWrapper>
        <AntdTable
          rowKey={specItems && specItems.WAREHOUSE_CD}
          columns={columns}
          dataSource={specItems || []}
          footer={() => <span>{`${specItems && specItems.length} 건`}</span>}
        />
      </StyledContentsWrapper>
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
