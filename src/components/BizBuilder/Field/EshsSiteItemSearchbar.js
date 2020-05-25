import React from 'react';
import * as PropTypes from 'prop-types';

import { Input, Modal, Table, Select, message } from 'antd';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

const AntdSelect = StyledSelect(Select);
const AntdSearch = StyledSearchInput(Input.Search);
const AntdModal = StyledModal(Modal);
const AntdTable = StyledAntdTable(Table);

const { Option } = Select;

class EshsSiteItemSearchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      siteList: [],
      itemData: [],
      siteItemList: [],
    };
  }

  componentDidMount() {
    this.apiData();
  }

  apiData = () => {
    const { getExtraApiData, sagaKey: id } = this.props;
    const apiArray = [
      {
        key: 'site',
        type: 'POST',
        url: '/api/admin/v1/common/categoryMapList',
        params: { PARAM: { NODE_ID: 635 } },
      },
      { key: 'item', url: '/api/eshs/v1/common/eshsWMItem?ORDER_BY=2', type: 'GET' },
      { key: 'siteItem', url: '/api/builder/v1/work/taskList/4521', type: 'POST' },
    ];
    getExtraApiData(id, apiArray, this.initData);
  };

  initData = () => {
    const { extraApiData } = this.props;
    this.setState({
      siteList: extraApiData && extraApiData.site && extraApiData.site.categoryMapList.filter(f => f.LVL === 3 && f.PARENT_NODE_ID === 635 && f.USE_YN === 'Y'),
      itemData: extraApiData && extraApiData.item && extraApiData.item.list,
      siteItemList: extraApiData && extraApiData.siteItem && extraApiData.siteItem.list,
    });
  };

  handleModalVisible = () => {
    const { modal } = this.state;
    const { formData } = this.props;
    if (formData && formData.SITE) {
      this.setState({
        modal: !modal,
      });
    } else {
      message.warning('지역을 먼저 선택해주세요.');
    }
  };

  modalTableRender = () => {
    const { columns } = this.props;
    const { itemData } = this.state;
    return (
      <AntdTable
        rowKey={itemData && itemData.ITEM_CD}
        key={itemData && itemData.ITEM_CD}
        columns={columns}
        dataSource={itemData || []}
        onRow={record => ({
          onClick: () => {
            this.modalSelected(record);
          },
        })}
      />
    );
  };

  modalSelected = record => {
    const { changeFormData, sagaKey: id, COMP_FIELD, formData, viewPageData, changeViewPage } = this.props;
    const { siteItemList } = this.state;
    const overlab = siteItemList.findIndex(item => item[COMP_FIELD] === record[COMP_FIELD] && item.SITE === String(formData.SITE));
    if (overlab > -1) {
      changeViewPage(id, viewPageData.workSeq, siteItemList[overlab].TASK_SEQ, 'MODIFY');
    } else if (viewPageData && viewPageData.viewType === 'INPUT') {
      changeFormData(id, COMP_FIELD, record.ITEM_CD);
      changeFormData(id, 'SHAPE', record.SHAPE);
      changeFormData(id, 'UNIT', record.UNIT);
    } else {
      changeViewPage(id, viewPageData.workSeq, -1, 'INPUT');
    }
    this.handleModalVisible();
  };

  render() {
    const { CONFIG, visible, colData, viewPageData, sagaKey: id, changeViewPage, changeFormData, formData } = this.props;
    const { siteList } = this.state;
    return visible ? (
      <>
        {/* builderWrapper CSS 정해지면 수정 */}
        <span style={{ display: 'inline-block', verticalAlign: 'middle', padding: '0 12px' }}>지역</span>
        <AntdSelect
          style={{ width: '150px' }}
          className="select-mid mr5"
          onChange={value => changeFormData(id, 'SITE', value)}
          value={Number(formData.SITE) || ''}
        >
          {siteList.map(item => (
            <Option value={item.NODE_ID} key="site">
              {item.NAME_KOR}
            </Option>
          ))}
        </AntdSelect>
        <AntdSearch
          value={colData}
          readOnly
          className="ant-search-inline input-search-mid mr5"
          style={{ width: 150, display: 'inline-block' }}
          onClick={this.handleModalVisible}
          onSearch={this.handleModalVisible}
        />
        <StyledButtonWrapper className="btn-wrap-inline">
          <StyledButton className="btn-primary" onClick={() => changeViewPage(id, viewPageData.workSeq, -1, 'INPUT')}>
            Reset
          </StyledButton>
        </StyledButtonWrapper>
        <AntdModal title="품목 검색" visible={this.state.modal} width={800} onCancel={this.handleModalVisible} footer={[]}>
          {this.state.modal && this.modalTableRender()}
        </AntdModal>
      </>
    ) : (
      ''
    );
  }
}

EshsSiteItemSearchbar.propTypes = {
  CONFIG: PropTypes.any,
  colData: PropTypes.string,
  sagaKey: PropTypes.string,
  COMP_FIELD: PropTypes.string,
  visible: PropTypes.bool,
  viewPageData: PropTypes.func,
  changeViewPage: PropTypes.func,
  getExtraApiData: PropTypes.func,
  changeFormData: PropTypes.func,
  columns: PropTypes.array,
  formData: PropTypes.object,
  extraApiData: PropTypes.object,
};
EshsSiteItemSearchbar.defaultProps = {
  columns: [
    {
      title: '품목코드',
      dataIndex: 'ITEM_CD',
      align: 'center',
      width: 100,
    },
    {
      title: '품목명',
      dataIndex: 'ITEM_NM',
      align: 'left',
      width: 250,
    },
  ],
};
export default EshsSiteItemSearchbar;
