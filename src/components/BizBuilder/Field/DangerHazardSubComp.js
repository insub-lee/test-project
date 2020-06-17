import * as PropTypes from 'prop-types';
import React from 'react';
import { Modal, Table, message, Input, TreeSelect, Select, Popover, Popconfirm } from 'antd';

import { getTreeFromFlatData } from 'react-sortable-tree';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledTreeSelect from 'components/BizBuilder/styled/Form/StyledTreeSelect';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import System from 'apps/eshs/admin/safety/Danger/hazard/image/System.JPG';

const AntdTable = StyledAntdTable(Table);
const AntdTextarea = StyledTextarea(Input.TextArea);
const AntdInput = StyledInput(Input);
const AntdTreeSelect = StyledTreeSelect(TreeSelect);
const AntdSelect = StyledSelect(Select);
const AntdModal = StyledModal(Modal);

const { Option } = Select;

const getCategoryMapListAsTree = (flatData, rootkey) =>
  getTreeFromFlatData({
    flatData: flatData.map(item => ({
      title: item.NAME_KOR,
      value: item.NODE_ID,
      key: item.NODE_ID,
      parentValue: item.PARENT_NODE_ID,
      selectable: item.LVL === 7,
    })),
    getKey: node => node.key,
    getParentKey: node => node.parentValue,
    rootKey: rootkey || 0,
  });

class DangerHazardSubComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      hazardData: { AOC_ID: [], RA_YN: 'Y' },
    };
  }

  componentDidMount() {
    const { getExtraApiData, sagaKey: id, viewPageData, viewType } = this.props;
    const apiArray = [
      {
        key: 'codeData',
        url: `/api/admin/v1/common/categoryMapList`,
        type: 'POST',
        params: { PARAM: { NODE_ID: 30431 } },
      },
      {
        key: 'treeData',
        url: `/api/admin/v1/common/categoryMapList`,
        type: 'POST',
        params: { PARAM: { NODE_ID: 1831 } },
      },
      viewPageData.viewType === 'MODIFY' && {
        key: 'hazardSubList',
        url: `/api/eshs/v1/common/dangerHazard?TASK_SEQ=${viewPageData.taskSeq}`,
        type: 'GET',
      },
    ];
    if (viewType !== 'VIEW' || viewType !== 'LIST') getExtraApiData(id, apiArray, this.initData);
  }

  initData = () => {
    const {
      extraApiData: { codeData, treeData, hazardSubList },
      changeFormData,
      sagaKey: id,
      viewPageData,
    } = this.props;
    const aotList = codeData.categoryMapList.filter(item => item.PARENT_NODE_ID === 30432);
    const aocList = codeData.categoryMapList.filter(item => item.PARENT_NODE_ID === 30433);
    const tempTree =
      treeData &&
      treeData.categoryMapList.map(item => {
        if (item.USE_YN === 'Y') {
          switch (item.LVL) {
            case 3:
              return { ...item, NAME_KOR: `${item.NAME_KOR}(분류)` };
            case 4:
              return { ...item, NAME_KOR: `${item.NAME_KOR}(부서)` };
            case 5:
              return { ...item, NAME_KOR: `${item.NAME_KOR}(장소)` };
            case 6:
              return { ...item, NAME_KOR: `${item.NAME_KOR}(공정)` };
            case 7:
              return { ...item, NAME_KOR: `${item.NAME_KOR}(장비, 설비)` };
            default:
              return { ...item };
          }
        }
        return '';
      });
    const nTreeData = (tempTree && getCategoryMapListAsTree(tempTree, 1831)) || [];
    changeFormData(id, 'HAZARD_LIST', viewPageData.viewType === 'MODIFY' ? hazardSubList && hazardSubList.list : []);
    this.setState({ aotList, aocList, nTreeData });
  };

  onChangeModal = () => {
    const { formData } = this.props;
    const { modal } = this.state;
    this.setState({ modal: !modal });
    if (!modal) {
      this.setState({ hazardList: formData.HAZARD_LIST || [] });
    }
  };

  onChangeTreeData = (name, value) => {
    const {
      extraApiData: { treeData },
    } = this.props;
    const { hazardData } = this.state;
    if (value) {
      const nTreeData = treeData && treeData.categoryMapList;
      const equpeId = nTreeData.find(f => f.NODE_ID === value);
      const processId = nTreeData.find(f => f.NODE_ID === equpeId.PARENT_NODE_ID);
      const placeId = nTreeData.find(f => f.NODE_ID === processId.PARENT_NODE_ID);
      const divId = nTreeData.find(f => f.NODE_ID === placeId.PARENT_NODE_ID);
      const sdivId = nTreeData.find(f => f.NODE_ID === divId.PARENT_NODE_ID);
      this.setState({
        hazardData: {
          ...hazardData,
          [name]: value,
          PROCESS_ID: processId.NODE_ID,
          PLACE_ID: placeId.NODE_ID,
          DIV_ID: divId.NODE_ID,
          SDIV_ID: sdivId.NODE_ID,
        },
      });
    } else {
      this.setState({
        hazardData: {
          ...hazardData,
          [name]: null,
          PROCESS_ID: null,
          PLACE_ID: null,
          DIV_ID: null,
          SDIV_ID: null,
        },
      });
    }
  };

  onChangeData = (name, value) => {
    const { hazardData } = this.state;
    this.setState({ hazardData: { ...hazardData, [name]: value } });
  };

  modalInsert = () => {
    const { hazardData, hazardList } = this.state;
    const { sagaKey: id, changeFormData } = this.props;
    if (hazardData.EQUIP_ID) {
      changeFormData(id, 'HAZARD_LIST', hazardList.concat(hazardData));
      this.setState({ hazardData: { AOC_ID: [], RA_YN: 'Y' }, selectedRowKeys: [], listOfDeleteExclusion: [] });
      this.onChangeModal();
    } else {
      message.warning('징비(설비)를 선택해주세요');
    }
  };

  onSelectChangeModal = selectedRowKeys => {
    const { formData } = this.props;
    const nData = formData.HAZARD_LIST && formData.HAZARD_LIST.filter((item, index) => selectedRowKeys.findIndex(i => i === index) === -1);
    this.setState({ selectedRowKeys, listOfDeleteExclusion: nData });
  };

  deleteList = () => {
    const { sagaKey: id, changeFormData } = this.props;
    const { listOfDeleteExclusion } = this.state;
    changeFormData(id, 'HAZARD_LIST', listOfDeleteExclusion);
    this.setState({ selectedRowKeys: [], listOfDeleteExclusion: [] });
  };

  modalSelected = record => {
    this.setState({ hazardData: { ...record, AOC_ID: JSON.parse(record.AOC_ID) } });
    this.onChangeModal();
  };

  modalRender = (nTreeData, aocList, aotList, formData, hazardData) => (
    <StyledHtmlTable>
      <table>
        <tbody>
          <tr>
            <td>분류</td>
            <td>
              <AntdTreeSelect
                style={{ width: '100%' }}
                className="mr5 select-sm"
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="장비(설비)를 선택해주세요"
                defaultValue={hazardData.EQUIP_ID}
                treeData={nTreeData || []}
                onChange={value => this.onChangeTreeData('EQUIP_ID', value)}
                allowClear
              />
            </td>
          </tr>
          <tr>
            <td>위험요인</td>
            <td>
              <AntdTextarea defaultValue={hazardData.WORK_NM} onChange={e => this.onChangeData('WORK_NM', e.target.value)} />
            </td>
          </tr>
          <tr>
            <td>사고의 발생원인</td>
            <td>
              <AntdSelect
                mode="multiple"
                className="select-sm mr5"
                defaultValue={hazardData.AOC_ID}
                onChange={value => this.onChangeData('AOC_ID', value)}
                style={{ width: '100%' }}
              >
                {aocList && aocList.map(item => <Option value={item.NODE_ID}>{item.NAME_KOR}</Option>)}
              </AntdSelect>
            </td>
          </tr>
          <tr>
            <td>사고의 발생유형</td>
            <td>
              <AntdSelect
                className="select-sm mr5"
                style={{ width: '100%' }}
                defaultValue={hazardData.AOT_ID}
                onChange={value => this.onChangeData('AOT_ID', value)}
              >
                {aotList && aotList.map(item => <Option value={item.NODE_ID}>{item.NAME_KOR}</Option>)}
              </AntdSelect>
              {hazardData.AOT_ID === 30450 ? (
                <AntdInput
                  className="ant-input-sm ant-input-inline"
                  defaultValue={hazardData.OTHER_CASE}
                  onChange={e => this.onChangeData('OTHER_CASE', e.target.value)}
                />
              ) : (
                ''
              )}
            </td>
          </tr>
          <tr>
            <td>R/A 실시여부</td>
            <td>
              <AntdSelect
                className="select-sm mr5"
                defaultValue={hazardData.RA_YN}
                onChange={value => this.onChangeData('RA', value)}
                style={{ width: '100%' }}
              >
                <Option value="Y">Y</Option>
                <Option value="N">N</Option>
              </AntdSelect>
            </td>
          </tr>
        </tbody>
      </table>
      <StyledButtonWrapper className="btn-wrap-center">
        <StyledButton className="btn-primary btn-first btn-sm" onClick={this.modalInsert}>
          저장
        </StyledButton>
        <StyledButton className="btn-primary btn-first btn-sm" onClick={this.onChangeModal}>
          취소
        </StyledButton>
      </StyledButtonWrapper>
    </StyledHtmlTable>
  );

  render() {
    const {
      formData,
      visible,
      extraApiData: { treeData },
    } = this.props;
    const { aotList, aocList, nTreeData, hazardData, selectedRowKeys } = this.state;
    const tableFindList = treeData && treeData.categoryMapList;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChangeModal,
    };
    const columns = [
      {
        title: '구분',
        align: 'center',
        children: [
          {
            title: '부서',
            dataIndex: 'SDIV_ID',
            render: text => tableFindList.find(item => item.NODE_ID === Number(text)) && tableFindList.find(item => item.NODE_ID === Number(text)).NAME_KOR,
          },
          {
            title: '공정(장소)',
            dataIndex: 'PLACE_ID',
            render: text => tableFindList.find(item => item.NODE_ID === Number(text)) && tableFindList.find(item => item.NODE_ID === Number(text)).NAME_KOR,
          },
          {
            title: '세부공정',
            dataIndex: 'PROCESS_ID',
            render: text => tableFindList.find(item => item.NODE_ID === Number(text)) && tableFindList.find(item => item.NODE_ID === Number(text)).NAME_KOR,
          },
          {
            title: '장비(설비)',
            dataIndex: 'EQUIP_ID',
            render: text => tableFindList.find(item => item.NODE_ID === Number(text)) && tableFindList.find(item => item.NODE_ID === Number(text)).NAME_KOR,
          },
          {
            title: '위험요인',
            dataIndex: 'WORK_NM',
            render: text => <AntdTextarea value={text} readOnly />,
          },
        ],
      },
      {
        title: (
          <Popover
            placement="topLeft"
            title="사고의 발생원인"
            content={<img src={System} alt="사고의 발생원인" width="800px" height="400px" />}
            trigger="hover"
          >
            사고의 발생원인
          </Popover>
        ),
        align: 'center',
        dataIndex: 'AOC_ID',
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
        render: (text, record) =>
          text === 30450
            ? `${aotList && aotList.find(i => i.NODE_ID === text) && aotList.find(i => i.NODE_ID === text).NAME_KOR}(${record.OTHER_CASE})`
            : aotList && aotList.find(i => i.NODE_ID === text) && aotList.find(i => i.NODE_ID === text).NAME_KOR,
      },
      {
        title: 'R/A 실시여부',
        dataIndex: 'RA_YN',
      },
    ];

    return visible ? (
      <>
        <StyledButtonWrapper className="btn-wrap-center">
          <StyledButton className="btn-primary btn-first btn-sm" onClick={this.onChangeModal}>
            추가
          </StyledButton>
          <Popconfirm title="정말로 삭제하시겠습니까?" onConfirm={this.deleteList} okText="Yes" cancelText="No">
            <StyledButton className="btn-primary btn-first btn-sm">삭제</StyledButton>
          </Popconfirm>
        </StyledButtonWrapper>
        <AntdTable
          rowKey="INDEX"
          columns={columns}
          dataSource={formData.HAZARD_LIST || []}
          rowSelection={rowSelection}
          onRow={record => ({
            onClick: () => {
              this.modalSelected(record);
            },
          })}
        />
        <AntdModal
          className="modal-table-pad"
          title="위험요인 LIST"
          visible={this.state.modal}
          width={800}
          onCancel={this.onChangeModal}
          footer={null}
          destroyOnClose
        >
          {this.state.modal && this.modalRender(nTreeData, aocList, aotList, formData, hazardData)}
        </AntdModal>
      </>
    ) : (
      ''
    );
  }
}

DangerHazardSubComp.propTypes = {
  sagaKey: PropTypes.string,
  viewType: PropTypes.string,
  extraApiData: PropTypes.object,
  formData: PropTypes.object,
  viewPageData: PropTypes.object,
  getExtraApiData: PropTypes.func,
  visible: PropTypes.bool,
  changeFormData: PropTypes.func,
};

DangerHazardSubComp.defaultProps = {};
export default DangerHazardSubComp;
