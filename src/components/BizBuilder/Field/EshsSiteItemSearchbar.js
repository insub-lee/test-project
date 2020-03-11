import * as PropTypes from 'prop-types';
import React from 'react';
import { Input, Button, Modal, Table, Select, message } from 'antd';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import { CustomStyledAntdTable as StyledAntdTable } from 'components/CommonStyled/StyledAntdTable';

const AntdTable = StyledAntdTable(Table);
const { Option } = Select;

class EshsSiteItemSearchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      siteList: [],
      listData: [],
      siteItemList: [],
    };
  }

  componentDidMount() {
    this.apiData();
  }

  apiData = () => {
    const { getExtraApiData, sagaKey: id } = this.props;
    const apiArray = [
      { key: 'site', url: '/api/admin/v1/common/categoryMapList?MAP_ID=65', type: 'GET' },
      { key: 'item', url: '/api/eshs/v1/common/eshsWMItem?ORDER_BY=2', type: 'GET' },
      { key: 'siteItem', url: '/api/builder/v1/work/taskList/4521', type: 'POST' },
    ];
    getExtraApiData(id, apiArray, this.initData);
  };

  initData = () => {
    const { extraApiData, sagaKey: id } = this.props;
    this.setState({
      siteList: extraApiData && extraApiData.site && extraApiData.site.categoryMapList.filter(f => f.LVL === 3 && f.PARENT_NODE_ID === 635 && f.USE_YN === 'Y'),
      listData: extraApiData && extraApiData.item && extraApiData.item.list,
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

  onChangeSave = type => {
    const { saveTask, modifyTask, deleteTask, sagaKey: id, changeViewPage, viewPageData } = this.props;
    if (type === 'S') {
      saveTask(id, id, this.saveTaskAfter);
    } else if (type === 'M') {
      modifyTask(id, this.saveTaskAfter);
    } else if (type === 'D') {
      deleteTask(id, id, viewPageData.workSeq, viewPageData.taskSeq, changeViewPage, this.deleteCallBack);
    }
  };

  deleteCallBack = () => {
    const { sagaKey: id, changeViewPage, viewPageData } = this.props;
    changeViewPage(id, viewPageData.workSeq, -1, 'INPUT');
  };

  saveTaskAfter = (id, workSeq, taskSeq, formData) => {
    const { changeViewPage } = this.props;
    changeViewPage(id, workSeq, taskSeq, 'MODIFY');
  };

  modalTableRender = () => {
    const { columns, sagaKey: id } = this.props;
    const { listData } = this.state;
    return (
      <AntdTable
        rowKey={listData && listData.ITEM_CD}
        key={listData && listData.ITEM_CD}
        columns={columns}
        dataSource={listData || []}
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

  ButtonRender() {
    const { viewPageData, sagaKey: id, changeViewPage } = this.props;
    let buttonGruop;
    switch (viewPageData && viewPageData.viewType.toUpperCase()) {
      case 'INPUT':
        buttonGruop = (
          <>
            <StyledButton className="btn-primary" onClick={() => this.onChangeSave('S')}>
              등록
            </StyledButton>
            <StyledButton className="btn-primary" onClick={() => changeViewPage(id, viewPageData.workSeq, -1, 'INPUT')}>
              Reset
            </StyledButton>
          </>
        );
        break;
      case 'MODIFY':
        buttonGruop = (
          <>
            <StyledButton className="btn-primary" onClick={() => this.onChangeSave('M')}>
              저장
            </StyledButton>
            <StyledButton className="btn-primary" onClick={() => this.onChangeSave('D')}>
              삭제
            </StyledButton>
            <StyledButton className="btn-primary" onClick={() => changeViewPage(id, viewPageData.workSeq, -1, 'INPUT')}>
              Reset
            </StyledButton>
          </>
        );
        break;
      default:
        buttonGruop = '';
        break;
    }
    return buttonGruop;
  }

  render() {
    const { CONFIG, visible, colData, viewPageData, sagaKey: id, changeViewPage, changeFormData, formData } = this.props;
    const { siteList } = this.state;
    console.log(this.state, 'state state');
    return visible ? (
      <div>
        지역
        <Select style={{ width: '100px', margin: '10px' }} onChange={value => changeFormData(id, 'SITE', value)} value={Number(formData.SITE) || ''}>
          {siteList.map(item => (
            <Option value={item.NODE_ID} key="site">
              {item.NAME_KOR}
            </Option>
          ))}
        </Select>
        <Input value={colData} readOnly className={CONFIG.property.className || ''} style={{ width: 150 }} onClick={this.handleModalVisible} />
        <Button shape="circle" icon="search" onClick={this.handleModalVisible} />
        {this.ButtonRender()}
        <Modal visible={this.state.modal} width={800} onCancel={this.handleModalVisible} footer={[]}>
          {this.state.modal && this.modalTableRender()}
        </Modal>
      </div>
    ) : (
      ''
    );
  }
}

EshsSiteItemSearchbar.propTypes = {
  CONFIG: PropTypes.any,
  colData: PropTypes.string,
  sagaKey: PropTypes.string,
  compProps: PropTypes.any,
  visible: PropTypes.bool,
  viewPageData: PropTypes.func,
  changeViewPage: PropTypes.func,
  setViewPageData: PropTypes.func,
  saveTask: PropTypes.func,
  modifyTask: PropTypes.func,
  deleteTask: PropTypes.func,
  columns: PropTypes.array,
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
