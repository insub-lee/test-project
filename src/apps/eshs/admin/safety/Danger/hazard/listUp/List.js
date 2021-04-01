import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getTreeFromFlatData } from 'react-sortable-tree';
import { Table, TreeSelect, Select, message, Modal } from 'antd';

import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledCustomSearch from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import ContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledLineTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledTreeSelect from 'components/BizBuilder/styled/Form/StyledTreeSelect';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

import BizBuilderBase from 'components/BizBuilderBase';
import moment from 'moment';
import ExcelDownloader from './Excel';

const { Option } = Select;
const AntdModal = StyledAntdModal(Modal);
const AntdSelect = StyledSelect(Select);
const AntdTreeSelect = StyledTreeSelect(TreeSelect);
const AntdLineTable = StyledLineTable(Table);

// 선택된 레벨, 부모값이 일치하는 배열리턴
const getCategoryMapFilter = (type, flatData, prntCd) => {
  const result = flatData.filter(item => item.CODE !== prntCd);
  if (type === 'menu') {
    return result.map(item => ({
      title: item.CD_NAME,
      value: item.CODE,
      key: item.CODE,
      parentValue: item.PRNT_CD,
      selectable: true,
    }));
  }
  return result;
};

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModal: false,
      selectAll: false,
      // 검색에 필요한 변수
      year: moment().format('YYYY'),
      lvl1: [], // 분류 리스트
      lvl2: [], // 부서 리스트
      lvl3: [], // 공정(장소) 리스트
      lvl4: [], // 공정(장소) 리스트
      lvl5: [], // 장비 리스트
      selected1: 'M000', // 선택된 분류코드
      selected2: '', // 선택된 부서코드
      selected3: '', // 선택된 공정코드
      selected4: '', // 선택된 세부공정코드
      selected5: '', // 선택된 장비코드
    };
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandler, spinningOn } = this.props;
    spinningOn();
    const apiAry = [
      {
        key: 'getWorkStepCode',
        type: 'POST',
        url: '/api/eshs/v1/common/dangerWorkStepCode',
        params: { PARAM: { TYPE: 'GET', CODE: 'M000', DEPTH: 1, USE_YN: 'Y' } },
      },
      {
        key: 'codeData',
        type: 'POST',
        url: '/api/admin/v1/common/categoryMapList',
        params: { PARAM: { NODE_ID: 30431 } },
      },
    ];
    getCallDataHandler(id, apiAry, this.initData);
  }

  initData = () => {
    const {
      result: { getWorkStepCode, codeData },
      spinningOff,
    } = this.props;
    const { year } = this.state;
    const { workStepCode } = getWorkStepCode;
    const aotList = codeData.categoryMapList.filter(item => item.PARENT_NODE_ID === 30432);
    const aocList = codeData.categoryMapList.filter(item => item.PARENT_NODE_ID === 30433);
    // 연도선택 리스트
    const currentYear = Number(year);
    const yearList = [];
    for (let i = currentYear - 20; i <= currentYear; i += 1) {
      yearList.push(i.toString());
    }

    // 부서메뉴
    const initMenu = getCategoryMapFilter('menu', workStepCode, 'M000');

    this.setState({ aotList, aocList, yearList, lvl1: initMenu }, () => spinningOff());
  };

  // 분류, 부서, 공정(장소), 세부공정 메뉴정보 호출
  getCode = (prntCode, depth, useYn) => {
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    let lastCode = prntCode;
    let lastDepth = depth;
    if (prntCode === '') {
      switch (depth) {
        case 2:
          lastCode = this.state.selected1;
          lastDepth -= 1;
          break;
        case 3:
          lastCode = this.state.selected2;
          lastDepth -= 1;
          break;
        case 4:
          lastCode = this.state.selected3;
          lastDepth -= 1;
          break;
        case 5:
          lastCode = this.state.selected4;
          lastDepth -= 1;
          break;
        default:
          break;
      }
    }
    // 해당페이지 에선 lvl5(= 장비코드) 이후의 메뉴가 불필요.
    if (!(depth === 5 && prntCode !== '')) {
      const apiInfo = {
        key: 'getWorkStepCode',
        type: 'POST',
        url: `/api/eshs/v1/common/dangerWorkStepCode`,
        params: { PARAM: { TYPE: 'GET', CODE: lastCode, DEPTH: lastDepth, USE_YN: useYn } },
      };
      getCallDataHandlerReturnRes(id, apiInfo, this.getCodeCallback);
    } else {
      this.setState({
        selected5: prntCode,
      });
    }
  };

  getCodeCallback = (id, response) => {
    const { PARAM, workStepCode } = response;
    const { CODE: prntCd, DEPTH: depth } = PARAM;
    const menu = getCategoryMapFilter('menu', workStepCode, prntCd);
    const lastLv = prntCd === 'M000' ? depth : depth + 1;
    this.setState({
      [`lvl${lastLv}`]: menu,
      [`selected${depth}`]: prntCd,
      [`selected${depth + 1}`]: '',
    });
  };

  // 검색
  onSearch = () => {
    const { sagaKey: id, getCallDataHandlerReturnRes, spinningOn } = this.props;
    const { year } = this.state;
    spinningOn();
    // Param 설정
    const fields = ['SDIV_CD', 'DIV_CD', 'PLACE_CD', 'PROCESS_CD', 'EQUIP_CD'];
    let searchParam = {};
    let isRoof = true;
    let targetLv = 1;
    while (isRoof) {
      const target = this.state[`selected${targetLv}`];
      const field = `${fields[targetLv - 1]}`;
      switch (targetLv) {
        case 1:
          if (target && target !== 'M000') {
            searchParam = {
              ...searchParam,
              [field]: target,
            };
          } else {
            isRoof = false;
          }
          break;
        default:
          if (target && target !== '') {
            searchParam = {
              ...searchParam,
              [field]: target,
            };
          } else {
            isRoof = false;
          }
          break;
      }
      targetLv += 1;
    }
    const apiInfo = {
      key: 'listUp',
      type: 'POST',
      url: '/api/eshs/v1/common/dangerHazard',
      params: { PARAM: { YEAR: year, ...searchParam } },
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.searchCallback);
  };

  searchCallback = (id, response) => {
    const { spinningOff } = this.props;
    const { list } = response;
    const { aotList, aocList } = this.state;
    if (list && list.length > 0) {
      const excelData = list.map(item => ({
        ...item,
        AOC_ID: Array.isArray(item.AOC_ID)
          ? item.AOC_ID.map(
              find =>
                aocList && aocList.find(i => i.NODE_ID === find) && aocList.find(i => i.NODE_ID === find).NAME_KOR,
            ).toString()
          : JSON.parse(item.AOC_ID) &&
            JSON.parse(item.AOC_ID)
              .map(
                find =>
                  aocList && aocList.find(i => i.NODE_ID === find) && aocList.find(i => i.NODE_ID === find).NAME_KOR,
              )
              .toString(),
        AOT_ID:
          item.AOT_ID === 30450
            ? `${aotList &&
                aotList.find(i => i.NODE_ID === item.AOT_ID) &&
                aotList.find(i => i.NODE_ID === item.AOT_ID).NAME_KOR}(${item.OTHER_CASE})`
            : aotList &&
              aotList.find(i => i.NODE_ID === item.AOT_ID) &&
              aotList.find(i => i.NODE_ID === item.AOT_ID).NAME_KOR,
      }));
      this.setState({ listData: list, excelData }, spinningOff);
    } else {
      spinningOff();
      message.info('검색 데이터가 없습니다.');
    }
  };

  onChangeSelect = value => {
    const {
      result: { treeSelectData },
    } = this.props;
    const temp = treeSelectData && treeSelectData.categoryMapList.find(item => item.NODE_ID === value);
    switch (temp && temp.LVL) {
      case 1:
        return this.setState({ levelName: 'SDIV_ID', searchValue: value, selectAll: false });
      case 2:
        return this.setState({ levelName: 'DIV_ID', searchValue: value, selectAll: false });
      case 3:
        return this.setState({ levelName: 'PLACE_ID', searchValue: value, selectAll: false });
      case 4:
        return this.setState({ levelName: 'PROCESS_ID', searchValue: value, selectAll: false });
      case 5:
        return this.setState({ levelName: 'EQUIP_ID', searchValue: value, selectAll: false });
      default:
        break;
    }
    if (value === 1596) {
      return this.setState({ selectAll: true });
    }

    return this.setState({ selectAll: false });
  };

  onChangeValue = (name, value) => {
    this.setState({ [name]: value });
  };

  isModalBizBuilder = record => {
    this.setState({ modalTask: record.PERENTS_TASK_SEQ });
    this.onChangeModal();
  };

  onChangeModal = () => {
    const { isModal } = this.state;
    this.setState({ isModal: !isModal });
  };

  render() {
    const {
      yearList,
      listData,
      aotList,
      aocList,
      excelData,
      lvl1,
      lvl2,
      lvl3,
      lvl4,
      lvl5,
      selected1, // 선택된 분류 코드
      selected2, // 선택된 부서 코드
      selected3, // 선택된 공정(장소) 코드
      selected4, // 선택된 세부공정 코드
      selected5, // 선택된 장비코드
    } = this.state;
    const columns = [
      {
        title: '구분',
        align: 'center',
        width: '70%',
        children: [
          {
            title: '부서',
            dataIndex: 'SDIV_NM',
            align: 'center',
            width: '8.75%',
          },
          {
            title: '공정(장소)',
            dataIndex: 'PLACE_NM',
            align: 'center',
            width: '8.75%',
          },
          {
            title: '세부공정',
            dataIndex: 'PROCESS_NM',
            align: 'center',
            width: '8.75%',
          },
          {
            title: '장비(설비)',
            align: 'center',
            dataIndex: 'EQUIP_NM',
            width: '8.75%',
          },
          {
            title: '위험요인',
            align: 'center',
            dataIndex: 'WORK_NM',
            width: '35%',
          },
        ],
      },
      {
        title: '사고의 발생원인',
        align: 'center',
        dataIndex: 'AOC_ID',
        width: '10%',
        render: text =>
          Array.isArray(text)
            ? text
                .map(
                  item =>
                    aocList && aocList.find(i => i.NODE_ID === item) && aocList.find(i => i.NODE_ID === item).NAME_KOR,
                )
                .toString()
            : JSON.parse(text) &&
              JSON.parse(text)
                .map(
                  item =>
                    aocList && aocList.find(i => i.NODE_ID === item) && aocList.find(i => i.NODE_ID === item).NAME_KOR,
                )
                .toString(),
      },
      {
        title: '사고의 발생유형',
        dataIndex: 'AOT_ID',
        align: 'center',
        width: '10%',
        render: (text, record) =>
          text === 30450
            ? `${aotList && aotList.find(i => i.NODE_ID === text) && aotList.find(i => i.NODE_ID === text).NAME_KOR}(${
                record.OTHER_CASE
              })`
            : aotList && aotList.find(i => i.NODE_ID === text) && aotList.find(i => i.NODE_ID === text).NAME_KOR,
      },
      {
        title: 'R/A 실시여부',
        dataIndex: 'RA_YN',
        align: 'center',
        width: '10%',
      },
    ];
    return (
      <ContentsWrapper>
        <StyledCustomSearch className="search-wrapper-inline">
          <div className="search-input-area">
            <AntdSelect
              className="select-sm mr5"
              style={{ width: 100 }}
              onChange={value => this.onChangeValue('year', value)}
              defaultValue={this.state.year}
            >
              {yearList && yearList.map(item => <Option value={item}>{item}</Option>)}
            </AntdSelect>
            {/* 1 Depth (분류) */}
            <span className="text-label">분류</span>
            <AntdSelect
              className="select-sm mr5"
              style={{ width: '200px' }}
              onChange={value => this.getCode(value, 1, 'Y')}
              value={selected1}
            >
              <Option value="M000">전체</Option>
              {lvl1.map(item => (
                <Option value={item.value}>{item.title}</Option>
              ))}
            </AntdSelect>
            {/* 2 Depth (부서) */}
            <span className="text-label">부서</span>
            <AntdSelect
              className="select-sm mr5"
              style={{ width: '200px' }}
              onChange={value => this.getCode(value, 2, 'Y')}
              value={selected1 === 'M000' ? '' : selected2}
              disabled={selected1 === 'M000'}
            >
              <Option value="">부서전체</Option>
              {lvl2.map(item => (
                <Option value={item.value}>{item.title}</Option>
              ))}
            </AntdSelect>
            {/* 3 Depth (공정(장소)) */}
            <span className="text-label">공정(장소)</span>
            <AntdSelect
              className="select-sm mr5"
              style={{ width: '200px' }}
              onChange={value => this.getCode(value, 3, 'Y')}
              value={selected1 === 'M000' || selected2 === '' ? '' : selected3}
              disabled={selected1 === 'M000' || selected2 === ''}
            >
              <Option value="">장소전체</Option>
              {lvl3.map(item => (
                <Option value={item.value}>{item.title}</Option>
              ))}
            </AntdSelect>
            {/* 4 Depth (세부공정) */}
            <span className="text-label">세부공정</span>
            <AntdSelect
              className="select-sm mr5"
              style={{ width: '200px' }}
              onChange={value => this.getCode(value, 4, 'Y')}
              value={selected1 === 'M000' || selected2 === '' || selected3 === '' ? '' : selected4}
              disabled={selected1 === 'M000' || selected2 === '' || selected3 === ''}
            >
              <Option value="">전체</Option>
              {lvl4.map(item => (
                <Option value={item.value}>{item.title}</Option>
              ))}
            </AntdSelect>
            {/* 5 Depth (장비) */}
            <span className="text-label">장비(설비)</span>
            <AntdSelect
              className="select-sm mr5"
              style={{ width: '200px' }}
              onChange={value => this.getCode(value, 5, 'Y')}
              value={selected1 === 'M000' || selected2 === '' || selected3 === '' || selected4 === '' ? '' : selected5}
              disabled={selected1 === 'M000' || selected2 === '' || selected3 === '' || selected4 === ''}
            >
              <Option value="">전체</Option>
              {lvl5.map(item => (
                <Option value={item.value}>{item.title}</Option>
              ))}
            </AntdSelect>
          </div>
          <div className="btn-area">
            <StyledButton className="btn-gray btn-first btn-sm" onClick={this.onSearch}>
              검색
            </StyledButton>
          </div>
        </StyledCustomSearch>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          {excelData && excelData.length > 0 && <ExcelDownloader dataList={excelData} excelNm="위험요인List-Up" />}
        </StyledButtonWrapper>
        <AntdLineTable
          rowKey={listData && `${listData.REG_NO}_${listData.SEQ}`}
          key={listData && `${listData.REG_NO}_${listData.SEQ}`}
          columns={columns}
          dataSource={listData || []}
          bordered
          onRow={record => ({
            onClick: () => {
              this.isModalBizBuilder(record);
            },
          })}
          footer={() => <span>{`${(listData && listData.length) || 0} 건`}</span>}
        />
        <AntdModal
          width={800}
          visible={this.state.isModal && this.state.modalTask}
          title="위험요인"
          onCancel={this.onChangeModal}
          destroyOnClose
          footer={null}
          className="modal-table-pad"
        >
          {this.state.isModal && (
            <BizBuilderBase
              sagaKey="hazard"
              workSeq={12061}
              taskSeq={this.state.modalTask}
              viewType="MODIFY"
              ModifyCustomButtons={() => null}
              loadingComplete={this.loadingComplete}
            />
          )}
        </AntdModal>
      </ContentsWrapper>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  getCallDataHandlerReturnRes: PropTypes.func,
  result: PropTypes.any,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
};

List.defaultProps = {
  getCallDataHandler: () => {},
};

export default List;
