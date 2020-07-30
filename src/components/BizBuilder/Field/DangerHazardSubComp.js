import React from 'react';
import * as PropTypes from 'prop-types';
import { Modal, Table, Input, Select, Popover, Popconfirm } from 'antd';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import System from 'apps/eshs/admin/safety/Danger/hazard/image/System.JPG';
import DangerHazardSubModalComp from './DangerHazardSubModalComp';

const AntdTable = StyledAntdTable(Table);
const AntdTextarea = StyledTextarea(Input.TextArea);
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdModal = StyledModal(Modal);

const { Option } = Select;

const setColumns = (treeData, aotList, aocList, onChangeData) => [
  {
    title: '구분',
    align: 'center',
    children: [
      {
        title: '부서',
        dataIndex: 'DIV_ID',
        width: '80px',
        align: 'center',
        render: text => treeData && treeData.find(item => item.NODE_ID === Number(text)) && treeData.find(item => item.NODE_ID === Number(text)).NAME_KOR,
      },
      {
        title: '공정(장소)',
        dataIndex: 'PLACE_ID',
        width: '80px',
        align: 'center',

        render: text => treeData && treeData.find(item => item.NODE_ID === Number(text)) && treeData.find(item => item.NODE_ID === Number(text)).NAME_KOR,
      },
      {
        title: '세부공정',
        dataIndex: 'PROCESS_ID',
        width: '80px',
        align: 'center',
        render: text => treeData && treeData.find(item => item.NODE_ID === Number(text)) && treeData.find(item => item.NODE_ID === Number(text)).NAME_KOR,
      },
      {
        title: '장비(설비)',
        dataIndex: 'EQUIP_ID',
        width: '80px',
        align: 'center',
        render: text => treeData && treeData.find(item => item.NODE_ID === Number(text)) && treeData.find(item => item.NODE_ID === Number(text)).NAME_KOR,
      },
      {
        title: '위험요인',
        dataIndex: 'WORK_NM',
        width: '140px',
        align: 'center',
        render: (text, record) => <AntdTextarea value={text} onChange={e => onChangeData('WORK_NM', e.target.value, record)} />,
      },
    ],
  },
  {
    title: (
      <Popover placement="topLeft" title="사고의 발생원인" content={<img src={System} alt="사고의 발생원인" width="800px" height="400px" />} trigger="hover">
        사고의 발생원인
      </Popover>
    ),
    align: 'center',
    dataIndex: 'AOC_ID',
    width: '130px',
    render: (text, record) => (
      <AntdSelect
        mode="multiple"
        className="select-xs"
        value={Array.isArray(text) ? text : JSON.parse(text)}
        onChange={value => onChangeData('AOC_ID', value, record)}
        style={{ width: '100%' }}
      >
        {aocList && aocList.map(item => <Option value={item.NODE_ID}>{item.NAME_KOR}</Option>)}
      </AntdSelect>
    ),
  },
  {
    title: '사고의 발생유형',
    dataIndex: 'AOT_ID',
    width: '130px',
    align: 'center',
    render: (text, record) => (
      <>
        <AntdSelect className="select-xs" style={{ width: '100%' }} value={text} onChange={value => onChangeData('AOT_ID', value, record)}>
          {aotList && aotList.map(item => <Option value={item.NODE_ID}>{item.NAME_KOR}</Option>)}
        </AntdSelect>
        {Number(text) === 30450 ? (
          <AntdInput className="ant-input-sm ant-input-inline" value={record.OTHER_CASE} onChange={e => onChangeData('OTHER_CASE', e.target.value, record)} />
        ) : (
          ''
        )}
      </>
    ),
  },
  {
    title: 'R/A 실시여부',
    dataIndex: 'RA_YN',
    width: '50px',
    align: 'center',
    render: (text, record) => (
      <AntdSelect className="select-xs" value={text} onChange={value => onChangeData('RA_YN', value, record)} style={{ width: '100%' }}>
        <Option value="Y">Y</Option>
        <Option value="N">N</Option>
      </AntdSelect>
    ),
  },
];

class DangerHazardSubComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      columns: [],
      deleteTempList: [],
    };
  }

  componentDidMount() {
    const { getExtraApiData, sagaKey: id, viewPageData } = this.props;
    const apiArray = [
      {
        key: 'codeData',
        url: `/api/admin/v1/common/categoryChildrenListUseYn`,
        type: 'POST',
        params: { PARAM: { NODE_ID: 30431, USE_YN: 'Y' } },
      },
      {
        key: 'treeData',
        url: `/api/admin/v1/common/categoryChildrenListUseYn`,
        type: 'POST',
        params: { PARAM: { NODE_ID: 1831, USE_YN: 'Y' } },
      },
    ];
    getExtraApiData(id, apiArray, this.initData);
    this.subList();
  }

  initData = () => {
    const {
      extraApiData: { codeData, treeData },
    } = this.props;
    const aotList = codeData.categoryMapList.filter(item => item.PARENT_NODE_ID === 30432);
    const aocList = codeData.categoryMapList.filter(item => item.PARENT_NODE_ID === 30433);
    this.setState({
      aotList,
      aocList,
      treeData: treeData && treeData.categoryMapList,
      columns: setColumns(treeData && treeData.categoryMapList, aotList, aocList, this.onChangeData),
    });
  };

  subList = () => {
    const { getExtraApiData, sagaKey: id, viewPageData } = this.props;
    const apiArray = [
      {
        key: 'hazardSubList',
        url: `/api/eshs/v1/common/dangerHazard?TASK_SEQ=${viewPageData.taskSeq}`,
        type: 'GET',
      },
    ];
    getExtraApiData(id, apiArray, this.subListData);
  };

  subListData = () => {
    const { extraApiData, changeFormData, sagaKey: id } = this.props;

    const subList = (extraApiData && extraApiData.hazardSubList && extraApiData.hazardSubList.list) || [];
    changeFormData(
      id,
      'HAZARD_LIST',
      subList.map(item => ({ ...item, CHK: 'Y' })),
    );
    this.onSelectedRowKeys(subList.map((item, index) => index));
  };

  onChangeModal = () => {
    const { modal } = this.state;

    this.setState({ modal: !modal });
  };

  onChangeData = (name, value, record) => {
    const { formData, changeFormData, sagaKey: id } = this.props;
    const temp = formData.HAZARD_LIST.map(changeItem => {
      if (changeItem.EQUIP_ID === record.EQUIP_ID && changeItem.SEQ === record.SEQ && name === 'AOC_ID') {
        return { ...changeItem, [name]: JSON.stringify(value) };
      }
      if (changeItem.EQUIP_ID === record.EQUIP_ID && changeItem.SEQ === record.SEQ) {
        return { ...changeItem, [name]: value };
      }
      return changeItem;
    });
    changeFormData(id, 'HAZARD_LIST', temp);
  };

  onSelectedRowKeys = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  deleteList = () => {
    // const { sagaKey: id, changeFormData, formData, submitExtraHandler } = this.props;
    // const { selectedRowKeys } = this.state;
    // const { HAZARD_LIST } = formData;

    // if (selectedRowKeys && selectedRowKeys.length > 0 && HAZARD_LIST && HAZARD_LIST.length > 0) {
    //   const tempList = HAZARD_LIST.filter((selected, index) => selectedRowKeys.findIndex(rowKey => index === rowKey) === -1);
    //   const deleteList = HAZARD_LIST.filter((selected, index) => selectedRowKeys.findIndex(rowKey => index === rowKey) !== -1 && selected.REG_NO);
    //   const submitData = { PARAM: { DELETE_LIST: deleteList } };
    //   if (deleteList && deleteList.length) {
    //     submitExtraHandler(id, 'DELETE', `/api/eshs/v1/common/dangerHazard`, submitData, this.subList);
    //   }
    //   changeFormData(id, 'HAZARD_LIST', tempList);
    //   this.setState({ selectedRowKeys: [] });
    // } else {
    //   message.info(<MessageContent>삭제할 항목을 선택해주세요.</MessageContent>);
    // }

    const { sagaKey: id, setFormData, formData } = this.props;

    const hazardList = (formData && formData.HAZARD_LIST) || [];
    const deleteTempList = (formData && formData.DELETE_TEMP_LIST) || [];
    const { selectedRowKeys } = this.state;
    if (selectedRowKeys && selectedRowKeys.length > 0 && hazardList.length > 0) {
      setFormData(id, {
        ...formData,
        HAZARD_LIST: hazardList.filter(item => item.CHK !== 'Y').map(item => ({ ...item, CHK: 'N' })),
        DELETE_TEMP_LIST: deleteTempList.concat(hazardList.filter(item => item.CHK === 'Y')),
      });
      this.setState({ selectedRowKeys: [] });
    } else {
      message.info(<MessageContent>삭제할 항목을 선택해주세요.</MessageContent>);
    }
  };

  onSelectAll = selected => {
    const { sagaKey: id, changeFormData, formData } = this.props;
    const { HAZARD_LIST } = formData;
    changeFormData(
      id,
      'HAZARD_LIST',
      HAZARD_LIST.map(item => ({ ...item, CHK: selected ? 'Y' : 'N' })),
    );
  };

  render() {
    const { formData, visible, changeFormData, sagaKey: id } = this.props;
    const { selectedRowKeys, treeData, columns } = this.state;
    const { HAZARD_LIST } = formData;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeys,
      onSelect: (record, selected) => this.onChangeData('CHK', selected ? 'Y' : 'N', record),
      onSelectAll: this.onSelectAll,
    };

    return visible ? (
      <>
        {treeData ? (
          <>
            <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10 btn-wrap-mt-10">
              <StyledButton className="btn-primary btn-first btn-sm" onClick={this.onChangeModal}>
                추가
              </StyledButton>
              <Popconfirm title="정말로 삭제하시겠습니까?" onConfirm={this.deleteList} okText="Yes" cancelText="No">
                <StyledButton className="btn-light btn-first btn-sm">삭제</StyledButton>
              </Popconfirm>
            </StyledButtonWrapper>
            <AntdTable
              rowKey={HAZARD_LIST && `${HAZARD_LIST.REG_NO}_${HAZARD_LIST.SEQ}`}
              key={HAZARD_LIST && `${HAZARD_LIST.REG_NO}_${HAZARD_LIST.SEQ}`}
              columns={columns}
              dataSource={HAZARD_LIST || []}
              rowSelection={rowSelection}
              scroll={{ y: 400 }}
              pagination={false}
            />
          </>
        ) : (
          ''
        )}

        <AntdModal
          className="modal-table-pad"
          title="위험요인 LIST"
          visible={this.state.modal}
          width={800}
          onCancel={this.onChangeModal}
          footer={null}
          destroyOnClose
        >
          {this.state.modal && (
            <DangerHazardSubModalComp
              treeData={treeData}
              sagaKey={id}
              formData={formData}
              changeFormData={changeFormData}
              onChangeModal={this.onChangeModal}
              onSelectedRowKeys={this.onSelectedRowKeys}
            />
          )}
        </AntdModal>
      </>
    ) : (
      ''
    );
  }
}

DangerHazardSubComp.propTypes = {
  sagaKey: PropTypes.string,
  extraApiData: PropTypes.func,
  formData: PropTypes.object,
  viewPageData: PropTypes.object,
  getExtraApiData: PropTypes.func,
  visible: PropTypes.bool,
  changeFormData: PropTypes.func,
  submitExtraHandler: PropTypes.func,
  setFormData: PropTypes.func,
};

DangerHazardSubComp.defaultProps = {};
export default DangerHazardSubComp;
