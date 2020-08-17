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
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';

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

  componentWillUnmount() {
    const { sagaKey: id, removeReduxState } = this.props;
    removeReduxState(id);
  }

  appStart = () => {
    const { result, spinningOff } = this.props;

    const treeData = (result && result.treeData && result.treeData.categoryMapList) || [];

    const tempList =
      treeData &&
      treeData
        .filter(item => item.LVL === 7)
        .map(item => {
          const nodeObj = this.nodeFind(item.PARENT_NODE_ID);
          nodeObj.EQUIP_ID = item.NODE_ID;
          nodeObj.EQUIP_NM = item.NAME_KOR;
          nodeObj.EQUIP_CD = item.CODE;
          return {
            ...item,
            ...nodeObj,
            NUM: 1,
          };
        });

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

  nodeFind = nodeId => {
    const { result } = this.props;
    const treeData = (result && result.treeData && result.treeData.categoryMapList) || [];

    const processIdx = treeData.findIndex(detail => detail.NODE_ID === nodeId);
    const placeIdx = processIdx > -1 ? treeData.findIndex(detail => detail.NODE_ID === treeData[processIdx].PARENT_NODE_ID) : -1;
    const divIdx = placeIdx > -1 ? treeData.findIndex(detail => detail.NODE_ID === treeData[placeIdx].PARENT_NODE_ID) : -1;
    const sdivIdx = divIdx > -1 ? treeData.findIndex(detail => detail.NODE_ID === treeData[divIdx].PARENT_NODE_ID) : -1;

    const nodeObj = {};

    if (processIdx > -1) {
      nodeObj.PROCESS_ID = treeData[processIdx].NODE_ID;
      nodeObj.PROCESS_NM = treeData[processIdx].NAME_KOR;
      nodeObj.PROCESS_CD = treeData[processIdx].CODE;
    }
    if (placeIdx > -1) {
      nodeObj.PLACE_ID = treeData[placeIdx].NODE_ID;
      nodeObj.PLACE_NM = treeData[placeIdx].NAME_KOR;
      nodeObj.PLACE_CD = treeData[placeIdx].CODE;
    }
    if (divIdx > -1) {
      nodeObj.DIV_ID = treeData[divIdx].NODE_ID;
      nodeObj.DIV_NM = treeData[divIdx].NAME_KOR;
      nodeObj.DIV_CD = treeData[divIdx].CODE;
    }
    if (sdivIdx > -1) {
      nodeObj.SDIV_ID = treeData[sdivIdx].NODE_ID;
      nodeObj.SDIV_NM = treeData[sdivIdx].NAME_KOR;
      nodeObj.SDIV_CD = treeData[sdivIdx].CODE;
    }

    return nodeObj;
  };

  columns = [
    {
      title: '부서',
      dataIndex: 'DIV_NM',
      align: 'center',
      width: '25%',
    },
    {
      title: '공정(장소)',
      dataIndex: 'PLACE_NM',
      align: 'center',
      width: '25%',
    },
    {
      title: '세부공정',
      dataIndex: 'PROCESS_NM',
      align: 'center',
      width: '25%',
    },
    {
      title: '장비(설비)',
      dataIndex: 'EQUIP_NM',
      align: 'center',
      width: '25%',
    },
  ];

  render() {
    const { modalVisible, onClickRow } = this.props;
    const { nTreeData, listData, tempList } = this.state;

    return (
      <StyledContentsWrapper>
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
          columns={this.columns}
          dataSource={listData || []}
          scroll={{ y: 400 }}
          pagination={false}
          onRow={record => ({
            onClick: () => {
              onClickRow(record);
              modalVisible();
            },
          })}
        />
      </StyledContentsWrapper>
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
