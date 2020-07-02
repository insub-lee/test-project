import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Modal, Input, Select, DatePicker, TreeSelect } from 'antd';
import moment from 'moment';
import ExcelDownloadComp from 'components/BizBuilder/Field/ExcelDownloadComp';

import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsModal from 'commonStyled/EshsStyled/Modal/StyledContentsModal';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
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
const AntdInput = StyledInput(Input);
const AntdTreeSelect = StyledTreeSelect(TreeSelect);
const AntdRangeDatePicker = StyledDatePicker(DatePicker.RangePicker);

class CustomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalContent: [],
      modalVisible: false,
      modalTitle: '',
      areaOptions: [],
      siteFabBayTree: [],
    };
  }

  componentDidMount = () => {
    const { getExtraApiData, sagaKey: id } = this.props;
    const apiArray = [
      { key: 'siteFabBay', url: '/api/admin/v1/common/categoryMapList?MAP_ID=76', type: 'GET' },
      {
        key: `area`,
        url: `/api/admin/v1/common/categoryMapList`,
        type: 'POST',
        params: { PARAM: { NODE_ID: Number(1048) } },
      },
    ];

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

    this.setState({ areaOptions, siteFabBayTree: siteFabBayTree.length > 0 ? siteFabBayTree[0] : [] });
  };

  columns = [
    { dataIndex: 'REQ_CD', title: '신청번호', width: 130, align: 'center', fixed: 'left' },
    {
      dataIndex: 'REQ_STATUS_NM',
      title: '신청',
      align: 'center',
      width: 60,
      render: (text, record) => (
        <span style={{ cursor: 'pointer' }} onClick={() => this.setModalContent('신청', record.TASK_SEQ, record.GUBUN)}>
          {text}
        </span>
      ),
    },
    {
      dataIndex: 'REQ_DT',
      title: '신청일',
      width: 80,
      align: 'center',
      render: text => (text ? moment(text).format('YYYY-MM-DD') : ''),
      excelRender: text => (text ? moment(text).format('YYYY-MM-DD') : ''),
    },
    {
      dataIndex: 'APP_STATUS_NM',
      title: '승인',
      align: 'center',
      width: 60,
      render: (text, record) => (
        <span style={{ cursor: 'pointer' }} onClick={() => this.setModalContent('승인', record.TASK_SEQ, record.GUBUN)}>
          {text}
        </span>
      ),
    },
    {
      dataIndex: 'QUAL_DT',
      title: '승인일',
      width: 80,
      align: 'center',
      render: text => (text ? moment(text).format('YYYY-MM-DD') : ''),
      excelRender: text => (text ? moment(text).format('YYYY-MM-DD') : ''),
    },
    { dataIndex: 'QUAL_STATUS_NM', title: '판정', align: 'center', width: 80 },
    { dataIndex: 'REG_USER_NAME', title: '신청자', align: 'center', width: 60 },
    { dataIndex: 'EQUIP_CD', title: '장비코드', align: 'center', width: 80 },
    { dataIndex: 'EQUIP_NM', title: '장비명', align: 'center', width: 250 },
    { dataIndex: 'SITE_NM', title: '지역', align: 'center', width: 60 },
    { dataIndex: 'FAB_NM', title: 'FAB', align: 'center', width: 80 },
    { dataIndex: 'AREA_NM', title: '공정', align: 'center', width: 100 },
    { dataIndex: 'MAKER_NM', title: 'Maker', align: 'center', width: 250 },
    { dataIndex: 'MODEL', title: 'Model', align: 'center', width: 200 },
  ];

  getListData = () => {
    const { sagaKey: id, getListData } = this.props;
    return getListData(id, 6821);
  };

  setModalContent = (title, taskSeq, gubun) => {
    const { ConfirmRequest, ConfirmResult, InterLockRequest, InterLockResult } = this.props;
    let modalContent = [];
    let modalTitle = '';
    if (title === '신청') {
      if (gubun === 'CF') {
        modalContent = [ConfirmRequest(taskSeq, 'MODIFY')];
        modalTitle = '[ESH Qual 확인신청]';
      } else if (gubun === 'IL') {
        modalContent = [InterLockRequest(taskSeq, 'MODIFY')];
        modalTitle = '[InterLock 해제신청]';
      }
    } else if (title === '승인') {
      if (gubun === 'CF') {
        modalContent = [ConfirmResult(taskSeq)];
        modalTitle = '[ESH Qual 확인결과]';
      } else if (gubun === 'IL') {
        modalTitle = '[InterLock 해제결과]';
        modalContent = [InterLockResult(taskSeq)];
      }
    }
    this.setState(
      {
        modalContent,
        modalTitle,
      },
      this.handleModalVisible,
    );
  };

  handleModalVisible = () => {
    const { modalVisible } = this.state;
    if (modalVisible) return this.setState({ modalVisible: !modalVisible, modalContent: [], modalTitle: '' });
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
    const { modalContent, modalTitle, modalVisible, siteFabBayTree, areaOptions } = this.state;

    return (
      <StyledContentsWrapper>
        <StyledCustomSearchWrapper>
          <div className="search-input-area mb10">
            <AntdInput
              className="ant-input-sm mr5"
              style={{ width: 150 }}
              placeholder="신청번호"
              allowClear
              onPressEnter={this.getListData}
              onChange={e => this.handleChangeSearchData('REQ_CD', e.target.value ? `AND W.REQ_CD LIKE '%${e.target.value}%'` : '')}
            />
            <AntdSelect
              className="select-sm mr5"
              style={{ width: 150 }}
              placeholder="판정전체"
              allowClear
              onChange={value => this.handleChangeSearchData('QUAL_STATUS', value ? `AND W.QUAL_STATUS = '${value}'` : '')}
            >
              <AntdSelect.Option value="1">승인</AntdSelect.Option>
              <AntdSelect.Option value="2">조건부 승인</AntdSelect.Option>
              <AntdSelect.Option value="3">미승인</AntdSelect.Option>
            </AntdSelect>
            <AntdSelect
              className="select-sm mr5"
              style={{ width: 150 }}
              placeholder="신청구분 전체"
              allowClear
              onChange={value => this.handleChangeSearchData('GUBUN', value ? `AND W.GUBUN = '${value}'` : '')}
            >
              <AntdSelect.Option value="CF">확인</AntdSelect.Option>
              <AntdSelect.Option value="IL">InterLock 해제</AntdSelect.Option>
            </AntdSelect>
            <AntdTreeSelect
              style={{ width: 200 }}
              className="select-sm mr5"
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={siteFabBayTree.children}
              placeholder="설비위치 전체"
              allowClear
              onChange={value => this.handleChangeSearchData('SITE_FAB_BAY', value ? `AND W.SITE_FAB_BAY IN ${this.handleOnChangeTreeSelect(value)}` : '')}
            />
          </div>
          <div className="search-input-area">
            <AntdTreeSelect
              style={{ width: 150 }}
              className="select-sm mr5"
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={areaOptions}
              placeholder="공정 전체"
              allowClear
              onChange={value => this.handleChangeSearchData('AREA', value ? `AND W.AREA = '${value}'` : '')}
            />
            <AntdRangeDatePicker
              className="ant-picker-sm mr5"
              format="YYYY-MM-DD"
              style={{ width: 300 }}
              placeholder={['[신청기간] Start date', 'End date']}
              allowClear
              onChange={(val1, val2) => this.handleChangeSearchData('REQ_DT', val2[0] && val2[1] ? `AND W.REQ_DT BETWEEN '${val2[0]}' and '${val2[1]}'` : '')}
            />
            <AntdRangeDatePicker
              className="ant-picker-sm mr5"
              format="YYYY-MM-DD"
              style={{ width: 300 }}
              placeholder={['[승인기간] Start date', 'End date']}
              allowClear
              onChange={(val1, val2) => this.handleChangeSearchData('QUAL_DT', val2[0] && val2[1] ? `AND W.QUAL_DT BETWEEN '${val2[0]}' and '${val2[1]}'` : '')}
            />
          </div>

          <div className="btn-area">
            <StyledButton className="btn-gray btn-sm btn-first" onClick={this.getListData}>
              검색
            </StyledButton>
            <ExcelDownloadComp
              isBuilder={false}
              fileName="ESH_QualList"
              className="testClassName"
              btnText="엑셀 받기"
              sheetName="ESH_QualList"
              listData={listData.map(row => {
                const result = {};
                this.columns.forEach(col => {
                  result[col.dataIndex] =
                    (row[col.dataIndex] && typeof col.excelRender === 'function' && col.excelRender(row[col.dataIndex], row)) || row[col.dataIndex];
                });

                return { ...row, ...result };
              })}
              btnSize="btn-sm btn-first mr5"
              fields={this.columns.map(item => ({
                field: item.dataIndex,
                style: { font: { sz: '12' }, alignment: { vertical: item.excelAlign || 'center', horizontal: item.excelAlign || 'center', wrapText: true } },
              }))}
              columns={this.columns.map(item => ({
                ...item,
                field: item.dataIndex,
                filter: 'agTextColumnFilter',
                width: { wpx: item.width },
                style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '', bold: true }, alignment: { vertical: 'center', horizontal: 'center' } },
              }))}
            />
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
  ConfirmRequest: PropTypes.func,
  ConfirmResult: PropTypes.func,
  InterLockRequest: PropTypes.func,
  InterLockResult: PropTypes.func,
  listData: PropTypes.array,
  getListData: PropTypes.func,
  changeSearchData: PropTypes.func,
  getExtraApiData: PropTypes.func,
  extraApiData: PropTypes.object,
};

CustomList.defaultProps = {
  customOnRowClick: undefined,
  ConfirmRequest: () => {},
  ConfirmResult: () => {},
  InterLockRequest: () => {},
  InterLockResult: () => {},
  listData: [],
  getListData: () => {},
  changeSearchData: () => {},
  getExtraApiData: () => {},
  extraApiData: {},
};

export default CustomList;
