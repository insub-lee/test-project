import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import StyledButton from 'components/BizBuilder/styled/StyledButton';

import { debounce } from 'lodash';
import { Select, Input, Button, Row, Col, message } from 'antd';
const { Option } = Select;
let rowKey = 0;
class SearchComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchGrid: [],
      hrRow: key => (
        <Row key={key}>
          <Col span={24}>
            <hr />
          </Col>
        </Row>
      ),
      selectObj: {},
      searchBtn: (
        <StyledButton className="btn-primary" onClick={() => this.props.handleSearch()}>
          검색
        </StyledButton>
      ),
      searchGroupData: { type: 'all', text: '' },
    };
    this.debounceHandelChangeSearchData = debounce(this.debounceHandelChangeSearchData, 300);
  }

  componentDidMount() {
    const { extraApiData } = this.props;
    const selectSite =
      (extraApiData &&
        extraApiData.select_site &&
        extraApiData.select_site.categoryMapList &&
        extraApiData.select_site.categoryMapList.filter(s => s.LVL > 2 && s.USE_YN === 'Y')) ||
      [];
    const selectFab =
      (extraApiData &&
        extraApiData.select_fab &&
        extraApiData.select_fab.categoryMapList &&
        extraApiData.select_fab.categoryMapList.filter(s => s.LVL > 2 && s.USE_YN === 'Y')) ||
      [];
    const selectArea =
      (extraApiData &&
        extraApiData.select_area &&
        extraApiData.select_area.categoryMapList &&
        extraApiData.select_area.categoryMapList.filter(s => s.LVL > 2 && s.USE_YN === 'Y')) ||
      [];

    const selectQualReq = []; // 장비검토
    const selectIsQual = []; // 인허가대상
    const selectSearchNm = []; // 검색구분
    const selectIsInput = []; // inout
    const selectExhaust = []; // Exhaust
    const selectWastewater = []; // 폐수계통
    const selectRecovwater = []; // 회수계통

    extraApiData &&
      extraApiData.select_qual &&
      extraApiData.select_qual.categoryMapList &&
      extraApiData.select_qual.categoryMapList.forEach(s => {
        if (s.USE_YN === 'Y') {
          switch (s.PARENT_NODE_ID) {
            case 1726: // 장비검토
              selectQualReq.push(s);
              break;
            case 1730: // 인허가대상
              selectIsQual.push(s);
              break;
            case 1734: // 검색구분
              selectSearchNm.push(s);
              break;
            case 1756: // inout
              selectIsInput.push(s);
              break;
            case 707: // Exhaust
              selectExhaust.push(s);
              break;
            case 703: // 폐수계통
              selectWastewater.push(s);
              break;
            case 704: // 회수계통
              selectRecovwater.push(s);
              break;
            default:
              break;
          }
        }
      });

    const selectObj = {
      selectSite,
      selectFab,
      selectArea,
      selectQualReq,
      selectIsQual,
      selectSearchNm,
      selectIsInput,
      selectExhaust,
      selectWastewater,
      selectRecovwater,
    };

    this.setState({ selectObj });
    this.handleSetSearchGrid(selectObj);
  }

  handleSetSearchGrid = (selectObj = this.state.selectObj) => {
    const {
      SearchConfig: { SearchRow1, SearchRow2, SearchRow3 },
    } = this.props;
    const { hrRow, searchBtn } = this.state;
    const searchGrid = [];
    SearchRow1 && searchGrid.push(this.handleMakeRow1(selectObj));
    searchGrid.push(hrRow(rowKey++));
    SearchRow2 && searchGrid.push(this.handleMakeRow2(selectObj));
    searchGrid.push(hrRow(rowKey++));
    SearchRow3 && searchGrid.push(this.handleMakeRow3(selectObj));
    searchGrid.push(hrRow(rowKey++));

    searchGrid.push(searchBtn);
    this.setState({ searchGrid });
  };

  handleMakeRow1 = ({ selectSite = [], selectFab = [], selectArea = [] }) => (
    <Row gutter={[0, 8]} key={rowKey++}>
      <Col span={2} align="right">
        <span>설비위치</span>
      </Col>
      <Col span={2}>
        <Select
          defaultValue="all"
          style={{ width: '100%' }}
          onChange={value => this.handleChangeSearchData('selectArea', value === 'all' ? 'AND 1 = 1' : `AND MM.SITE = '${value}'`)}
        >
          <Option value="all">지역전체</Option>
          {selectSite.length > 0 &&
            selectSite.map(s => (
              <Option value={s.NAME_KOR} key={s.NODE_ID}>
                {s.NAME_KOR}
              </Option>
            ))}
        </Select>
      </Col>
      <Col span={2}>
        <Select
          defaultValue="all"
          style={{ width: '100%' }}
          onChange={value => this.handleChangeSearchData('selectFab', value === 'all' ? 'AND 1 = 1' : `AND MM.FAB = '${value}'`)}
        >
          <Option value="all">FAB전체</Option>
          {selectFab.length > 0 &&
            selectFab.map(s => (
              <Option value={s.NAME_KOR} key={s.NODE_ID}>
                {s.NAME_KOR}
              </Option>
            ))}
        </Select>
      </Col>
      <Col span={2}>
        <Select
          defaultValue="all"
          style={{ width: '100%' }}
          onChange={value => this.handleChangeSearchData('selectArea', value === 'all' ? 'AND 1 = 1' : `AND W.AREA = '${value}'`)}
        >
          <Option value="all">공정전체</Option>
          {selectArea.length > 0 &&
            selectArea.map(s => (
              <Option value={s.NODE_ID} key={s.NODE_ID}>
                {s.NAME_KOR}
              </Option>
            ))}
        </Select>
      </Col>
      <Col span={2} align="right">
        <span>Maker</span>
      </Col>
      <Col span={2}>MakerComp</Col>
      <Col span={2}>Model</Col>
      <Col span={2}>
        <Input
          defaultValue=""
          name="MODEL"
          width="100%"
          onChange={e => this.handleChangeSearchData(e.target.name, e.target.value === '' ? 'AND 1 = 1' : `AND W.MODEL LIKE '${e.target.value}%'`)}
        />
      </Col>
      <Col span={8}></Col>
    </Row>
  );

  handleMakeRow2 = ({ selectQualReq = [], selectIsQual = [], selectSearchNm = [] }) => (
    <Row gutter={[0, 8]} key={rowKey++}>
      <Col span={2} align="right">
        <span>신청구분</span>
      </Col>
      <Col span={2}>
        <Select defaultValue="EQ" style={{ width: '100%' }} onChange={value => message.warning(`승인관련 미구현...  value [ ${value} ]`)}>
          {selectQualReq.length > 0 &&
            selectQualReq.map(s => (
              <Option value={s.CODE} key={s.NODE_ID}>
                {s.NAME_KOR}
              </Option>
            ))}
        </Select>
      </Col>
      <Col span={2} align="right">
        <span>인허가대상</span>
      </Col>
      <Col span={2}>
        <Select
          defaultValue="all"
          style={{ width: '100%' }}
          onChange={value => this.handleChangeSearchData('selectIsQual', value === 'all' ? 'AND 1 = 1' : `AND W.IS_QUAL = '${value}'`)}
        >
          {selectIsQual.length > 0 &&
            selectIsQual.map(s => (
              <Option value={s.CODE} key={s.NODE_ID}>
                {s.NAME_KOR}
              </Option>
            ))}
        </Select>
      </Col>
      <Col span={2} align="right">
        <span>검색구분</span>
      </Col>
      <Col span={2}>
        <Select
          defaultValue="all"
          style={{ width: '100%' }}
          onChange={value => {
            const { text } = this.state.searchGroupData;
            this.setState({ searchGroupData: { text, type: value } });
            this.handleChangeSearchData('searchGroupData', value === 'all' ? 'AND 1 = 1' : `AND W.${value} LIKE UPPER('%${text}%')`);
          }}
        >
          {selectSearchNm.length > 0 &&
            selectSearchNm.map(s => (
              <Option value={s.CODE} key={s.NODE_ID}>
                {s.NAME_KOR}
              </Option>
            ))}
        </Select>
      </Col>
      <Col span={2}>
        <Input
          defaultValue=""
          onChange={e => {
            const { type } = this.state.searchGroupData;
            this.setState({ searchGroupData: { type, text: e.target.value } });
            this.handleChangeSearchData('searchGroupData', type === 'all' ? 'AND 1 = 1' : `AND W.${type} LIKE UPPER('%${e.target.value}%')`);
          }}
        />
      </Col>
      <Col span={10}></Col>
    </Row>
  );

  handleMakeRow3 = ({ selectIsInput = [], selectExhaust = [], selectWastewater = [], selectRecovwater = [] }) => (
    <Row gutter={[0, 8]} key={rowKey++}>
      <Col span={2} align="right">
        <span>Material</span>
      </Col>
      <Col span={2}>
        <Select
          defaultValue="all"
          style={{ width: '100%' }}
          onChange={value => this.handleChangeSearchData('selectIsInput', value === 'all' ? 'AND 1 = 1' : `AND ${value} IS NOT NULL`)}
        >
          {selectIsInput.length > 0 &&
            selectIsInput.map(s => (
              <Option value={s.CODE} key={s.NODE_ID}>
                {s.NAME_KOR}
              </Option>
            ))}
        </Select>
      </Col>
      <Col span={2} align="right">
        <span>-코드 미구현</span>
      </Col>
      <Col span={2}>
        <Select defaultValue="all" style={{ width: '100%' }} onChange={value => message.warning(`sqtb_mtrl 테이블에서 조회 미구현...  value [ ${value} ]`)}>
          <Option value="all">폐수계통전체</Option>
          {selectWastewater.length > 0 &&
            selectWastewater.map(s => (
              <Option value={s.CODE} key={s.NODE_ID}>
                {s.NAME_KOR}
              </Option>
            ))}
        </Select>
      </Col>
      <Col span={2}>
        <Select defaultValue="all" style={{ width: '100%' }} onChange={value => message.warning(`sqtb_mtrl 테이블에서 조회 미구현...  value [ ${value} ]`)}>
          <Option value="all">회수계통전체</Option>
          {selectRecovwater.length > 0 &&
            selectRecovwater.map(s => (
              <Option value={s.CODE} key={s.NODE_ID}>
                {s.NAME_KOR}
              </Option>
            ))}
        </Select>
      </Col>
      <Col span={2}>
        <Select defaultValue="all" style={{ width: '100%' }} onChange={value => message.warning(`sqtb_mtrl 테이블에서 조회 미구현...  value [ ${value} ]`)}>
          <Option value="all">Exhaust전체</Option>
          {selectExhaust.length > 0 &&
            selectExhaust.map(s => (
              <Option value={s.CODE} key={s.NODE_ID}>
                {s.NAME_KOR}
              </Option>
            ))}
        </Select>
      </Col>
      <Col span={12}></Col>
    </Row>
  );

  handleChangeSearchData = (name, value) => {
    this.debounceHandelChangeSearchData(name, value);
  };

  debounceHandelChangeSearchData = (name, value) => {
    const { id, changeSearchData } = this.props;
    changeSearchData(id, `${name}`, value);
  };

  render() {
    const { searchGrid, selectObj, aaa = 0, searchGroupData } = this.state;
    console.debug('여기는 render', selectObj);
    console.debug('searchGroupData', searchGroupData);
    return <>{searchGrid}</>;
  }
}

SearchComp.propTypes = {
  SearchConfig: PropTypes.object,
  id: PropTypes.string,
  changeSearchData: PropTypes.func,
  handleSearch: PropTypes.func,
  extraApiData: PropTypes.object,
};

SearchComp.defaultProps = {
  SearchConfig: {
    SearchRow1: false,
    SearchRow2: false,
    SearchRow3: false,
  },
  id: '',
  changeSearchData: () => {
    console.debug('changeSearchData Props가 없습니다.');
  },
  extraApiData: {},
  handleSearch: () => {},
};
export default SearchComp;
