import * as PropTypes from 'prop-types';
import React from 'react';
import { Table, InputNumber, TreeSelect } from 'antd';

import { getTreeFromFlatData } from 'react-sortable-tree';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';
import StyledTreeSelect from 'components/BizBuilder/styled/Form/StyledTreeSelect';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';

const AntdTable = StyledAntdTable(Table);
const AntdInputNumber = StyledInputNumber(InputNumber);
const AntdTreeSelect = StyledTreeSelect(TreeSelect);

const getCategoryMapListAsTree = (flatData, rootkey) =>
  getTreeFromFlatData({
    flatData: flatData.map(item => ({
      title: item.NAME_KOR,
      value: item.NODE_ID,
      key: item.NODE_ID,
      parentValue: item.PARENT_NODE_ID,
      selectable: item.LVL === 6,
    })),
    getKey: node => node.key,
    getParentKey: node => node.parentValue,
    rootKey: rootkey || 0,
  });

class DangerHazardSubComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  nodeFind = (name, value) => {
    const { treeData } = this.props;
    const placeNode = treeData.find(detail => detail.NODE_ID === value) && treeData.find(detail => detail.NODE_ID === value).PARENT_NODE_ID;
    const divNode = treeData.find(detail => detail.NODE_ID === placeNode) && treeData.find(detail => detail.NODE_ID === placeNode).PARENT_NODE_ID;
    const sdivNode = treeData.find(detail => detail.NODE_ID === divNode) && treeData.find(detail => detail.NODE_ID === divNode).PARENT_NODE_ID;
    if (name === 'SDIV_ID') {
      return sdivNode;
    }
    if (name === 'DIV_ID') {
      return divNode;
    }
    return placeNode;
  };

  componentDidMount() {
    const { treeData } = this.props;
    const tempList =
      treeData &&
      treeData
        .filter(item => item.LVL === 7)
        .map(item => ({
          ...item,
          PROCESS_ID: item.PARENT_NODE_ID,
          PLACE_ID: this.nodeFind('PLACE_ID', item.PARENT_NODE_ID),
          DIV_ID: this.nodeFind('DIV_ID', item.PARENT_NODE_ID),
          SDIV_ID: this.nodeFind('SDIV_ID', item.PARENT_NODE_ID),
          EQUIP_ID: item.NODE_ID,
          NUM: 1,
        }));
    const tempTree =
      treeData &&
      treeData.map(item => {
        if (item.LVL < 7) {
          switch (item.LVL) {
            case 3:
              return { ...item, NAME_KOR: `${item.NAME_KOR}(분류)` };
            case 4:
              return { ...item, NAME_KOR: `${item.NAME_KOR}(부서)` };
            case 5:
              return { ...item, NAME_KOR: `${item.NAME_KOR}(공정)` };
            case 6:
              return { ...item, NAME_KOR: `${item.NAME_KOR}(세부공정)` };
            case 7:
              return { ...item, NAME_KOR: `${item.NAME_KOR}(장비, 설비)` };
            default:
              return { ...item };
          }
        }
        return '';
      });
    const nTreeData = (tempTree && getCategoryMapListAsTree(tempTree, 1831)) || [];
    this.setState({ nTreeData, tempList });
  }

  onChangeData = (record, value) => {
    const { listData } = this.state;
    const temp = listData.map(find => {
      if (find.NODE_ID === record.NODE_ID) {
        return { ...find, NUM: value };
      }
      return { ...find };
    });
    this.setState({ listData: temp });
  };

  onSelectChangeModal = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  modalInsert = () => {
    const { selectedRowKeys, listData } = this.state;
    const { sagaKey: id, changeFormData, formData, onChangeModal } = this.props;
    const { HAZARD_LIST, REG_NO, TASK_SEQ } = formData;
    if (selectedRowKeys && selectedRowKeys.length) {
      const tempList = listData && listData.filter(selectd => selectedRowKeys.findIndex(rowKey => selectd.NODE_ID === rowKey) !== -1);
      const hazardListLength = HAZARD_LIST.lengt || 0;
      const realList = [];
      tempList.forEach(item => {
        for (let index = 0; index < item.NUM; index += 1) {
          realList.push({
            ...item,
            WORK_NM: '',
            AOC_ID: JSON.stringify([]),
            AOT_ID: undefined,
            RA_YN: undefined,
            SEQ: index + hazardListLength + 1,
            REG_NO,
            TASK_SEQ,
          });
        }
      });
      changeFormData(id, 'HAZARD_LIST', HAZARD_LIST.concat(realList));
      onChangeModal();
    } else {
      message.info(<MessageContent>선택된 장비가 없습니다.</MessageContent>);
    }
  };

  render() {
    const { treeData, onChangeModal } = this.props;
    const { selectedRowKeys, nTreeData, listData, tempList } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChangeModal,
    };
    const columns = [
      {
        title: '부서',
        dataIndex: 'DIV_ID',
        render: text => treeData.find(item => item.NODE_ID === Number(text)) && treeData.find(item => item.NODE_ID === Number(text)).NAME_KOR,
      },
      {
        title: '공정(장소)',
        dataIndex: 'PLACE_ID',
        render: text => treeData.find(item => item.NODE_ID === Number(text)) && treeData.find(item => item.NODE_ID === Number(text)).NAME_KOR,
      },
      {
        title: '세부공정',
        dataIndex: 'PROCESS_ID',
        render: text => treeData.find(item => item.NODE_ID === Number(text)) && treeData.find(item => item.NODE_ID === Number(text)).NAME_KOR,
      },
      {
        title: '장비(설비)',
        dataIndex: 'NAME_KOR',
      },
      {
        title: '생성 수량',
        dataIndex: 'NUM',
        render: (text, record) => (
          <AntdInputNumber className="ant-input-number-xs" defaultValue={1} min={1} onChange={value => this.onChangeData(record, value)} />
        ),
      },
    ];
    return (
      <>
        <StyledCustomSearchWrapper>
          <div className="search-input-area">
            <AntdTreeSelect
              style={{ width: '100%' }}
              className="mr5 select-sm"
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="세부공정을 선택해주세요"
              treeData={nTreeData || []}
              onChange={value => this.setState({ listData: tempList && tempList.filter(list => list.PARENT_NODE_ID === Number(value)) })}
              allowClear
            />
          </div>
        </StyledCustomSearchWrapper>
        <AntdTable
          rowKey="NODE_ID"
          key="NODE_ID"
          columns={columns}
          dataSource={listData || []}
          rowSelection={rowSelection}
          scroll={{ y: 400 }}
          pagination={false}
        />
        <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
          <StyledButton className="btn-primary btn-first btn-sm" onClick={this.modalInsert}>
            생성
          </StyledButton>
          <StyledButton className="btn-light btn-first btn-sm" onClick={onChangeModal}>
            취소
          </StyledButton>
        </StyledButtonWrapper>
      </>
    );
  }
}

DangerHazardSubComp.propTypes = {
  sagaKey: PropTypes.string,
  formData: PropTypes.object,
  treeData: PropTypes.array,
  changeFormData: PropTypes.func,
  onChangeModal: PropTypes.func,
};

DangerHazardSubComp.defaultProps = {};
export default DangerHazardSubComp;
