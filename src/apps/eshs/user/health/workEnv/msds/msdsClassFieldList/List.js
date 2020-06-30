import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Select, Input, Modal } from 'antd';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';

import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import BizBuilderBase from 'components/BizBuilderBase';

import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

const { Option } = Select;
const AntdModal = StyledAntdModal(Modal);

const AntdTable = StyledAntdTable(Table);
const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);

const columns = [
  { title: '물질명', align: 'center', width: 230, dataIndex: 'MTRL_NM', fixed: 'left' },
  {
    title: 'NFPA CODE',
    align: 'center',
    width: 350,
    children: [
      { title: '보건', align: 'center', width: 70, dataIndex: 'NFPA_B' },
      { title: '화재', align: 'center', width: 70, dataIndex: 'NFPA_A' },
      { title: '반응성', align: 'center', width: 70, dataIndex: 'NFPA_C' },
      { title: '특별위험', align: 'center', width: 140, dataIndex: 'NFPA_D_NAME' },
    ],
  },
  {
    title: '유해/위험성',
    align: 'center',
    width: 660,
    children: [
      {
        title: '독성',
        align: 'center',
        width: 70,
        render: (text, record) => (record && record.IS_HAZARD_NAME ? record.IS_HAZARD_NAME.split(', ').find(item => item === '독성') && 'O' : ''),
      },
      {
        title: '부식성',
        align: 'center',
        width: 70,
        render: (text, record) => (record && record.IS_HAZARD_NAME ? record.IS_HAZARD_NAME.split(', ').find(item => item === '부식성') && 'O' : ''),
      },
      {
        title: '가연성',
        align: 'center',
        width: 70,
        render: (text, record) => (record && record.IS_HAZARD_NAME ? record.IS_HAZARD_NAME.split(', ').find(item => item === '가연성') && 'O' : ''),
      },
      {
        title: '폭발성',
        align: 'center',
        width: 70,
        render: (text, record) => (record && record.IS_HAZARD_NAME ? record.IS_HAZARD_NAME.split(', ').find(item => item === '폭발성') && 'O' : ''),
      },
      {
        title: '지연성',
        align: 'center',
        width: 70,
        render: (text, record) => (record && record.IS_HAZARD_NAME ? record.IS_HAZARD_NAME.split(', ').find(item => item === '지연성') && 'O' : ''),
      },
      {
        title: '환경유해',
        align: 'center',
        width: 70,
        render: (text, record) => (record && record.IS_HAZARD_NAME ? record.IS_HAZARD_NAME.split(', ').find(item => item === '환경유해') && 'O' : ''),
      },
      {
        title: '자극성',
        align: 'center',
        width: 70,
        render: (text, record) => (record && record.IS_HAZARD_NAME ? record.IS_HAZARD_NAME.split(', ').find(item => item === '유해/자극성') && 'O' : ''),
      },
      {
        title: '발암성',
        align: 'center',
        width: 70,
        render: (text, record) => (record && record.IS_HAZARD_NAME ? record.IS_HAZARD_NAME.split(', ').find(item => item === '발암성') && 'O' : ''),
      },
      {
        title: '생식독성/변이성',
        align: 'center',
        width: 100,
        render: (text, record) => (record && record.IS_HAZARD_NAME ? record.IS_HAZARD_NAME.split(', ').find(item => item === '생식독성/변이성') && 'O' : ''),
      },
    ],
  },
  {
    title: '법적규제',
    align: 'center',
    width: 300,
    children: [
      { title: '환경', align: 'center', width: 100, dataIndex: 'E_POISON_NM' },
      { title: '안전', align: 'center', width: 100, dataIndex: 'S_GUBUN_NM' },
      { title: '보건', align: 'center', width: 100, dataIndex: 'H_GUBUN_NM' },
    ],
  },
];
class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initLoading: true,
      modalObj: { visible: false, content: [], title: '' },
    };
  }

  componentDidMount = () => {};

  handleModalVisible = (viewType, taskSeq = -1, itemCd = '') => {
    const { modalObj } = this.state;
    const { visible } = modalObj;
    if (visible) {
      return this.setState({
        modalObj: {
          visible: !visible,
          content: [],
        },
      });
    }
    return this.setState({
      modalObj: {
        visible: !visible,
        content: [
          <BizBuilderBase
            sagaKey="MsdsListModal"
            workSeq={3161}
            taskSeq={taskSeq}
            ListCustomButtons={() => null}
            ViewCustomButtons={() => null}
            viewType={viewType}
            listMetaSeq={4141}
          />,
        ],
        title: viewType === 'LIST' ? 'MSDS 검색' : `MSDS 조회 코드 [ ${itemCd} ] `,
      },
    });
  };

  handleOnChangeSearchData = (target, value, callBack) => {
    this.setState(
      {
        [target]: value,
      },
      () => (typeof callBack === 'function' ? callBack() : undefined),
    );
  };

  render = () => {
    const { sagaKey: id, formData, loadingComplete, getListData, workSeq, listData, changeSearchData } = this.props;
    const { modalObj } = this.state;

    const selectedRowItemCode = (formData && formData.selectedRowItemCode) || '';
    if (selectedRowItemCode) {
      this.handleInputChange(selectedRowItemCode);
    }

    // 로딩
    if (this.props.isLoading === false && this.state.initLoading) {
      this.setState(
        {
          initLoading: false,
        },
        () => loadingComplete(),
      );
    }
    return (
      <StyledContentsWrapper>
        <StyledCustomSearchWrapper className="search-wrapper-inline">
          <div>
            <AntdSelect
              style={{ width: 120 }}
              allowClear
              className="select-sm mr5"
              onChange={value => changeSearchData(id, 'andSearch_1', value ? `AND W.SITE = '${value}'` : ' AND 1 = 1')}
              placeholder="지역전체"
            >
              <Option value="317">청주</Option>
              <Option value="318">구미</Option>
            </AntdSelect>
            <AntdSelect
              placeholder="검색구분"
              allowClear
              className="select-sm"
              style={{ width: 150 }}
              onChange={value =>
                this.handleOnChangeSearchData('searchType', value, () => {
                  const { searchType, searchText } = this.state;
                  return changeSearchData(id, 'andSearch_2', searchType && searchText ? `AND ${searchType} LIKE '%${searchText}%'` : 'AND 1 = 1');
                })
              }
            >
              <Option value="W.MTRL_NM">물질명</Option>
              <Option value="W.ITEM_NM">제품명</Option>
              <Option value="W.MOLECULAR_FORMULA">분자식</Option>
              <Option value="W.CAS_NO">CAS_NO</Option>
              <Option value="W.UN_NO">UN_NO</Option>
              <Option value="W.ITEM_CD">MSDS코드</Option>
              <Option value="Y.WRK_CMPNY_NM">Vendor</Option>
            </AntdSelect>
            <AntdInput
              style={{ width: 150 }}
              placeholder="검색어"
              allowClear
              className="ant-input-sm ant-input-inline mr5"
              onPressEnter={() => getListData(id, workSeq)}
              onChange={e =>
                this.handleOnChangeSearchData('searchText', e.target.value, () => {
                  const { searchType, searchText } = this.state;
                  return changeSearchData(id, 'andSearch_2', searchType && searchText ? `AND ${searchType} LIKE '%${searchText}%'` : 'AND 1 = 1');
                })
              }
            />
            <AntdSelect
              style={{ width: 120 }}
              allowClear
              className="select-sm mr5"
              onChange={value =>
                this.handleOnChangeSearchData('napaTarget', value, () => {
                  const { napaTarget, nfpaValue } = this.state;
                  return changeSearchData(id, 'andSearch_3', napaTarget && nfpaValue ? `AND ${napaTarget} = '${nfpaValue}'` : 'AND 1 = 1');
                })
              }
              placeholder="NFPA항목"
            >
              <Option value="NFPA_B">보건</Option>
              <Option value="NFPA_A">화재</Option>
              <Option value="NFPA_C">반응성</Option>
            </AntdSelect>
            <AntdSelect
              style={{ width: 120 }}
              allowClear
              className="select-sm mr5"
              onChange={value =>
                this.handleOnChangeSearchData('nfpaValue', value, () => {
                  const { napaTarget, nfpaValue } = this.state;
                  return changeSearchData(id, 'andSearch_3', napaTarget && nfpaValue ? `AND W.${napaTarget} = '${nfpaValue}'` : 'AND 1 = 1');
                })
              }
              placeholder="NFPA등급"
            >
              <Option value="0">0</Option>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
            </AntdSelect>
            {/* IS_HAZARD */}
            <AntdSelect
              style={{ width: 150 }}
              allowClear
              className="select-sm mr5"
              onChange={value => changeSearchData(id, 'andSearch_4', value ? `AND SUBSTR(W.IS_HAZARD, ${value}, 1) = '1'` : 'AND 1 = 1')}
              placeholder="유해성전체"
            >
              <Option value={1}>독성</Option>
              <Option value={2}>부식성</Option>
              <Option value={3}>가연성</Option>
              <Option value={4}>폭발성</Option>
              <Option value={5}>지연성</Option>
              <Option value={6}>환경유해</Option>
              <Option value={7}>자극성</Option>
              <Option value={8}>발암성</Option>
              <Option value={9}>생식독성/변이성</Option>
            </AntdSelect>
            <StyledButton className="btn-gray btn-sm mr5" onClick={() => getListData(id, workSeq)}>
              검색
            </StyledButton>
          </div>
        </StyledCustomSearchWrapper>
        <AntdTable
          rowKey="TASK_SEQ"
          columns={columns}
          dataSource={listData || []}
          scroll={{ x: '100%' }}
          bordered
          onRow={record => ({
            onClick: () => this.handleModalVisible('VIEW', record.TASK_SEQ, record.ITEM_CD),
          })}
        />
        <AntdModal width={850} visible={modalObj.visible} title={modalObj.title} onCancel={this.handleModalVisible} destroyOnClose footer={null}>
          {modalObj.content}
        </AntdModal>
      </StyledContentsWrapper>
    );
  };
}

ListPage.propTypes = {
  sagaKey: PropTypes.string,
  formData: PropTypes.object,
  isLoading: PropTypes.bool,
  loadingComplete: PropTypes.func,
  changeSearchData: PropTypes.func,
  getListData: PropTypes.func,
  workSeq: PropTypes.number,
  listData: PropTypes.array,
};

ListPage.defaultProps = {
  loadingComplete: () => {},
  getListData: () => {},
  listData: [],
};

export default ListPage;
