import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Modal, Select, DatePicker, TreeSelect } from 'antd';
import moment from 'moment';

import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsModal from 'commonStyled/EshsStyled/Modal/StyledContentsModal';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledTreeSelect from 'components/BizBuilder/styled/Form/StyledTreeSelect';

import { getTreeFromFlatData } from 'react-sortable-tree';

const getCategoryMapListAsTree = (flatData, flag, viewLang, rootkey = 0) =>
  getTreeFromFlatData({
    flatData: flatData.map(item => ({
      title: item[`NAME_${viewLang && viewLang.length > 0 ? viewLang : 'KOR'}`],
      value: item.NODE_ID,
      key: item.NODE_ID,
      parentValue: item.PARENT_NODE_ID,
      selectable: flag === 'Y' || item.CHILDREN_CNT === 0,
    })),

    getKey: node => node.key,
    getParentKey: node => node.parentValue,
    rootKey: rootkey || 0,
  });

const AntdTable = StyledAntdTable(Table);
const StyledButton = StyledAntdButton(Button);
const AntdModal = StyledContentsModal(Modal);
const AntdSelect = StyledSelect(Select);
const AntdTreeSelect = StyledTreeSelect(TreeSelect);
const AntdRangeDatePicker = StyledDatePicker(DatePicker.RangePicker);

class CustomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalContent: [],
      modalVisible: false,
      siteFabBayTree: [],
    };
  }

  componentDidMount = () => {
    const { getExtraApiData, sagaKey: id } = this.props;
    const apiArray = [{ key: 'siteFabBay', url: '/api/admin/v1/common/categoryMapList?MAP_ID=76', type: 'GET' }];
    getExtraApiData(id, apiArray, this.appStart);
  };

  appStart = () => {
    const { extraApiData } = this.props;
    const area = (extraApiData && extraApiData.area) || {};
    const siteFabBay = (extraApiData && extraApiData.siteFabBay) || {};
    const areaOptions =
      (area &&
        area.categoryMapList &&
        getCategoryMapListAsTree(
          area.categoryMapList.filter(x => x.USE_YN === 'Y'),
          'N',
          '',
          1048,
        )) ||
      [];

    const siteFabBayTree =
      (siteFabBay &&
        siteFabBay.categoryMapList &&
        getCategoryMapListAsTree(
          siteFabBay.categoryMapList.filter(x => x.USE_YN === 'Y'),
          'Y',
          '',
        )) ||
      [];

    this.setState({ siteFabBayTree: siteFabBayTree.length > 0 ? siteFabBayTree[0] : [] });
  };

  columns = [
    {
      dataIndex: 'REQ_CD',
      title: '신청번호',
      align: 'center',
      width: 130,
      fixed: 'left',
      render: (text, record) => (
        <span style={{ cursor: 'pointer' }} onClick={() => this.setState({ modalContent: this.props.ConfirmView(record.TASK_SEQ) }, this.handleModalVisible)}>
          {text}
        </span>
      ),
    },
    {
      dataIndex: 'F_QUAL_DT',
      title: '조건부승인일',
      align: 'center',
      width: 100,
      render: text => (text ? moment(text).format('YYYY-MM-DD') : ''),
    },
    { dataIndex: 'APP_STATUS_NM', title: '승인', align: 'center', width: 60 },
    {
      dataIndex: 'QUAL_DT',
      title: '승인일',
      align: 'center',
      width: 100,
      render: text => (text ? moment(text).format('YYYY-MM-DD') : ''),
    },
    { dataIndex: 'EQUIP_CD', title: '장비코드', align: 'center', width: 80 },
    { dataIndex: 'EQUIP_NM', title: '장비명', align: 'center', width: 250 },
    { dataIndex: 'SITE_NM', title: '지역', align: 'center', width: 80 },
    { dataIndex: 'FAB_NM', title: 'FAB', align: 'center', width: 80 },
    { dataIndex: 'AREA_NM', title: '공정', align: 'center', width: 100 },
    { dataIndex: 'REG_DEPT_NAME', title: '소속', align: 'center', width: 200 },
  ];

  getListData = () => {
    const { sagaKey: id, getListData, workSeq } = this.props;
    return getListData(id, workSeq);
  };

  handleModalVisible = () => {
    const { modalVisible } = this.state;
    if (modalVisible) return this.setState({ modalVisible: !modalVisible, modalContent: [] });
    return this.setState({ modalVisible: !modalVisible });
  };

  handleChangeSearchData = (target, value) => {
    const { sagaKey: id, changeSearchData } = this.props;

    return changeSearchData(id, target, value);
  };

  handleOnChangeTreeSelect = value => {
    const { extraApiData } = this.props;

    const siteFabBay = (extraApiData && extraApiData.siteFabBay) || {};

    let searchText = '';
    siteFabBay &&
      siteFabBay.categoryMapList &&
      siteFabBay.categoryMapList.forEach(option => {
        if (option.FULLPATH.indexOf(String(value)) != -1) {
          if (!searchText) {
            searchText += `('${option.NODE_ID}'`;
          } else {
            searchText += `, '${option.NODE_ID}'`;
          }
        }
      });
    searchText += ' )';
    return searchText;
  };

  render = () => {
    const { customOnRowClick, listData } = this.props;
    const { modalContent, modalTitle, modalVisible, siteFabBayTree } = this.state;

    return (
      <StyledContentsWrapper>
        <StyledCustomSearchWrapper className="search-wrapper-inline">
          <div>
            <AntdSelect
              className="select-sm mr5"
              style={{ width: 150 }}
              placeholder="현재판정"
              allowClear
              onChange={value => this.handleChangeSearchData('QUAL_STATUS', value ? `AND W.QUAL_STATUS = '${value}'` : '')}
            >
              <AntdSelect.Option value="1">승인</AntdSelect.Option>
              <AntdSelect.Option value="2">조건부 승인</AntdSelect.Option>
            </AntdSelect>
            <AntdRangeDatePicker
              className="ant-picker-sm mr5"
              format="YYYY-MM-DD"
              style={{ width: 300 }}
              placeholder={['[신청기간] Start date', 'End date']}
              allowClear
              onChange={(val1, val2) => this.handleChangeSearchData('QUAL_DT', val2[0] && val2[1] ? `AND W.QUAL_DT BETWEEN '${val2[0]}' and '${val2[1]}'` : '')}
            />
            <AntdTreeSelect
              style={{ width: 200 }}
              className="select-sm mr5"
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={siteFabBayTree.children}
              placeholder="설비위치 전체"
              allowClear
              onChange={value => this.handleChangeSearchData('SITE_FAB_BAY', value ? `AND W.SITE_FAB_BAY IN ${this.handleOnChangeTreeSelect(value)}` : '')}
            />
            <StyledButton className="btn-gray btn-sm" onClick={this.getListData}>
              검색
            </StyledButton>
          </div>
        </StyledCustomSearchWrapper>

        <AntdTable
          bordered
          rowKey="TASK_SEQ"
          columns={this.columns}
          dataSource={listData || []}
          onRow={record => ({ onClick: () => (typeof customOnRowClick === 'function' ? customOnRowClick(record) : undefined) })}
          scroll={{ x: '100%' }}
        />
        <AntdModal title={modalTitle || ' '} visible={modalVisible} width={1000} onCancel={() => this.handleModalVisible('CANCEL')} footer={[null]}>
          {modalContent}
        </AntdModal>
      </StyledContentsWrapper>
    );
  };
}

CustomList.propTypes = {
  sagaKey: PropTypes.string,
  customOnRowClick: PropTypes.any,
  listData: PropTypes.array,
  getListData: PropTypes.func,
  changeSearchData: PropTypes.func,
  getExtraApiData: PropTypes.func,
  extraApiData: PropTypes.object,
  ConfirmView: PropTypes.func,
  workSeq: PropTypes.func,
};

CustomList.defaultProps = {
  customOnRowClick: undefined,
  listData: [],
  getListData: () => {},
  changeSearchData: () => {},
  getExtraApiData: () => {},
  extraApiData: {},
  ConfirmView: () => {},
  workSeq: () => {},
};
export default CustomList;
