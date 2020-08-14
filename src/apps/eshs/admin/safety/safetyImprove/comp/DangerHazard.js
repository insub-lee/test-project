import * as PropTypes from 'prop-types';
import React from 'react';
import { Table, TreeSelect } from 'antd';
import BizMicroDevBase from 'components/BizMicroDevBase';

import { getTreeFromFlatData } from 'react-sortable-tree';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledTreeSelect from 'components/BizBuilder/styled/Form/StyledTreeSelect';

import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';

const AntdTable = StyledAntdTable(Table);
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

class Comp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    const { sagaKey: id, getCallDataHandler, spinningOn } = this.props;

    spinningOn();
    const apiAry = [
      {
        key: 'treeData',
        url: `/api/admin/v1/common/categoryChildrenListUseYn`,
        type: 'POST',
        params: { PARAM: { NODE_ID: 1831, USE_YN: 'Y' } },
      },
    ];

    getCallDataHandler(id, apiAry, this.appStart);
  };

  appStart = () => {
    const { result, spinningOff } = this.props;

    const treeData = (result && result.treeData && result.treeData.categoryMapList) || [];

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
    this.setState({ nTreeData, tempList }, spinningOff);
  };

  nodeFind = (name, value) => {
    const { result } = this.props;
    const treeData = (result && result.treeData && result.treeData.categoryMapList) || [];
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

  render() {
    const { result, modalVisible, onClickRow } = this.props;
    const { nTreeData, listData, tempList } = this.state;

    const treeData = (result && result.treeData && result.treeData.categoryMapList) || [];

    const columns = [
      {
        title: '부서',
        dataIndex: 'DIV_ID',
        render: text => treeData.find(item => item.NODE_ID === Number(text)) && treeData.find(item => item.NODE_ID === Number(text)).NAME_KOR,
        align: 'center',
        width: '25%',
      },
      {
        title: '공정(장소)',
        dataIndex: 'PLACE_ID',
        render: text => treeData.find(item => item.NODE_ID === Number(text)) && treeData.find(item => item.NODE_ID === Number(text)).NAME_KOR,
        align: 'center',
        width: '25%',
      },
      {
        title: '세부공정',
        dataIndex: 'PROCESS_ID',
        render: text => treeData.find(item => item.NODE_ID === Number(text)) && treeData.find(item => item.NODE_ID === Number(text)).NAME_KOR,
        align: 'center',
        width: '25%',
      },
      {
        title: '장비(설비)',
        dataIndex: 'NAME_KOR',
        align: 'center',
        width: '25%',
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
          scroll={{ y: 400 }}
          pagination={false}
          onRow={record => ({
            onClick: () => {
              onClickRow({
                ...record,
                SDIV_NM:
                  treeData.find(item => item.NODE_ID === Number(record.SDIV_ID)) && treeData.find(item => item.NODE_ID === Number(record.SDIV_ID)).NAME_KOR,
                DIV_NM: treeData.find(item => item.NODE_ID === Number(record.DIV_ID)) && treeData.find(item => item.NODE_ID === Number(record.DIV_ID)).NAME_KOR,
                PLACE_NM:
                  treeData.find(item => item.NODE_ID === Number(record.PLACE_ID)) && treeData.find(item => item.NODE_ID === Number(record.PLACE_ID)).NAME_KOR,
                PROCESS_NM:
                  treeData.find(item => item.NODE_ID === Number(record.PROCESS_ID)) &&
                  treeData.find(item => item.NODE_ID === Number(record.PROCESS_ID)).NAME_KOR,
                EQUIP_NM: record.NAME_KOR,
              });
              modalVisible();
            },
          })}
        />
        <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
          <StyledButton className="btn-light btn-first btn-sm" onClick={modalVisible}>
            닫기
          </StyledButton>
        </StyledButtonWrapper>
      </>
    );
  }
}

const DangerHazard = ({ onClickRow, modalVisible }) => (
  <BizMicroDevBase sagaKey="DangerHazardModalContent" onClickRow={onClickRow} modalVisible={modalVisible} component={Comp}></BizMicroDevBase>
);

DangerHazard.propTypes = {
  onClickRow: PropTypes.func,
  modalVisible: PropTypes.func,
};

DangerHazard.defaultProps = {
  onClickRow: () => {},
  modalVisible: () => {},
};
Comp.propTypes = {
  sagaKey: PropTypes.string,
  onClickRow: PropTypes.func,
  modalVisible: PropTypes.func,
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
};

Comp.defaultProps = {
  result: {},
  getCallDataHandler: () => {},
  spinningOn: () => {},
  spinningOff: () => {},
};

export default DangerHazard;
