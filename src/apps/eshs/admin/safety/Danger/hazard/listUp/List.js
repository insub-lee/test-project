import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getTreeFromFlatData } from 'react-sortable-tree';
import { Table, TreeSelect, Select, message, Modal } from 'antd';

import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledCustomSearch from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import ContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledLineTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledTreeSelect from 'components/BizBuilder/styled/Form/StyledTreeSelect';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

import BizBuilderBase from 'components/BizBuilderBase';
import moment from 'moment';
import ExcelDownloader from './Excel';

const AntdModal = StyledAntdModal(Modal);
const AntdSelect = StyledSelect(Select);
const AntdTreeSelect = StyledTreeSelect(TreeSelect);
const AntdLineTable = StyledLineTable(Table);

const { Option } = Select;

const getCategoryMapListAsTree = (flatData, rootkey) =>
  getTreeFromFlatData({
    flatData: flatData.map(item => ({
      title: item.NAME_KOR,
      value: item.NODE_ID,
      key: item.NODE_ID,
      parentValue: item.PARENT_NODE_ID,
      selectable: true,
      depth: item.LVL,
    })),
    getKey: node => node.key,
    getParentKey: node => node.parentValue,
    rootKey: rootkey || 0,
    depth: node => node.depth,
  });

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: Number(moment().year()),
      isModal: false,
    };
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'treeSelectData',
        type: 'POST',
        url: '/api/admin/v1/common/categoryMapList',
        params: { PARAM: { NODE_ID: 1831 } },
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
      result: { treeSelectData, codeData },
    } = this.props;
    const tableFindList = treeSelectData && treeSelectData.categoryMapList;
    const nData = (tableFindList && getCategoryMapListAsTree(tableFindList, 1831)) || [];
    const aotList = codeData.categoryMapList.filter(item => item.PARENT_NODE_ID === 30432);
    const aocList = codeData.categoryMapList.filter(item => item.PARENT_NODE_ID === 30433);
    const currentYear = this.state.year;
    const yearList = [];
    for (let i = currentYear - 20; i <= currentYear; i += 1) {
      yearList.push(i.toString());
    }
    this.setState({ nData, aotList, aocList, tableFindList, yearList });
  };

  searchList = () => {
    const { levelName, searchValue, year } = this.state;
    const { sagaKey: id, getCallDataHandler } = this.props;
    if (levelName && searchValue && year) {
      const apiAry = [
        {
          key: 'listUp',
          type: 'GET',
          url: `/api/eshs/v1/common/dangerHazard?${levelName}=${searchValue}&&YEAR=${year}`,
        },
      ];
      getCallDataHandler(id, apiAry, this.searchData);
    } else {
      message.warning('검색조건이 옳바르지 않습니다.');
    }
  };

  searchData = () => {
    const {
      result: { listUp },
    } = this.props;
    if (listUp && listUp.list && listUp.list.length > 0) {
      this.setState({ listData: listUp.list });
    } else {
      message.warning('검색 데이터가 없습니다.');
    }
  };

  onChangeSelect = value => {
    const {
      result: { treeSelectData },
    } = this.props;
    const temp = treeSelectData && treeSelectData.categoryMapList.find(item => item.NODE_ID === value);
    switch (temp && temp.LVL) {
      case 3:
        return this.setState({ levelName: 'SDIV_ID', searchValue: value });
      case 4:
        return this.setState({ levelName: 'DIV_ID', searchValue: value });
      case 5:
        return this.setState({ levelName: 'PLACE_ID', searchValue: value });
      case 6:
        return this.setState({ levelName: 'PROCESS_ID', searchValue: value });
      case 7:
        return this.setState({ levelName: 'EQUIP_ID', searchValue: value });
      default:
        return '';
    }
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
    const { nData, yearList, listData, aotList, aocList, tableFindList } = this.state;
    const columns = [
      {
        title: '구분',
        align: 'center',
        width: '70%',
        children: [
          {
            title: '부서',
            dataIndex: 'SDIV_ID',
            width: '8.75%',
            render: text => tableFindList.find(item => item.NODE_ID === Number(text)) && tableFindList.find(item => item.NODE_ID === Number(text)).NAME_KOR,
          },
          {
            title: '공정(장소)',
            dataIndex: 'PLACE_ID',
            width: '8.75%',
            render: text => tableFindList.find(item => item.NODE_ID === Number(text)) && tableFindList.find(item => item.NODE_ID === Number(text)).NAME_KOR,
          },
          {
            title: '세부공정',
            dataIndex: 'PROCESS_ID',
            width: '8.75%',
            render: text => tableFindList.find(item => item.NODE_ID === Number(text)) && tableFindList.find(item => item.NODE_ID === Number(text)).NAME_KOR,
          },
          {
            title: '장비(설비)',
            dataIndex: 'EQUIP_ID',
            width: '8.75%',
            render: text => tableFindList.find(item => item.NODE_ID === Number(text)) && tableFindList.find(item => item.NODE_ID === Number(text)).NAME_KOR,
          },
          {
            title: '위험요인',
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
            ? text.map(item => aocList && aocList.find(i => i.NODE_ID === item) && aocList.find(i => i.NODE_ID === item).NAME_KOR).toString()
            : JSON.parse(text) &&
              JSON.parse(text)
                .map(item => aocList && aocList.find(i => i.NODE_ID === item) && aocList.find(i => i.NODE_ID === item).NAME_KOR)
                .toString(),
      },
      {
        title: '사고의 발생유형',
        dataIndex: 'AOT_ID',
        width: '10%',
        render: (text, record) =>
          text === 30450
            ? `${aotList && aotList.find(i => i.NODE_ID === text) && aotList.find(i => i.NODE_ID === text).NAME_KOR}(${record.OTHER_CASE})`
            : aotList && aotList.find(i => i.NODE_ID === text) && aotList.find(i => i.NODE_ID === text).NAME_KOR,
      },
      {
        title: 'R/A 실시여부',
        dataIndex: 'RA_YN',
        width: '10%',
      },
    ];
    return (
      <ContentsWrapper>
        <StyledCustomSearch className="search-wrapper-inline">
          <div className="search-input-area">
            <AntdSelect className="select-sm mr5" style={{ width: 100 }} onChange={value => this.onChangeValue('year', value)} defaultValue={this.state.year}>
              {yearList && yearList.map(item => <Option value={item}>{item}</Option>)}
            </AntdSelect>
            <AntdTreeSelect
              style={{ width: '300px' }}
              className="mr5 select-sm"
              defultValue={this.state.changeSelectValue}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={nData || []}
              placeholder="Please select"
              allowClear
              onSelect={value => this.onChangeSelect(value)}
            />
          </div>
          <div className="btn-area">
            <StyledButton className="btn-primary btn-first btn-sm" onClick={this.searchList}>
              검색
            </StyledButton>
            {listData && listData.length > 0 && <ExcelDownloader dataList={listData} excelNm="위험요인List-Up" />}
          </div>
        </StyledCustomSearch>
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
  result: PropTypes.any,
};

List.defaultProps = {
  getCallDataHandler: () => {},
};

export default List;
