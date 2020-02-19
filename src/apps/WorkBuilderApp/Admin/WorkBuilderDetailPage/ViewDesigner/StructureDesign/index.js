import React, { useState } from 'react';
import PropTypes from 'prop-types';
import JSONInput from 'react-json-editor-ajrm/index';
import { Divider, Drawer, Checkbox, Modal } from 'antd';
import styled from 'styled-components';
import { ContextMenu, MenuItem, ContextMenuTrigger, SubMenu } from 'react-contextmenu';

import Row from 'components/BizBuilder/Row/BasedHtmlTable';
import Col from 'components/BizBuilder/Col/BasedHtmlTable';
import ActionButton from 'components/BizBuilder/ActionButton';
import Contents from 'components/BizBuilder/Contents/Contents';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import GroupTitle from 'components/BizBuilder/Sketch/GroupTitle';
import TableGroup from 'components/BizBuilder/Sketch/BasedHtmlTableGroup';

import CompItem from '../CompItem';
import HiddenComp from '../CompItem/HiddenComp';
import CompModal from '../CompItem/CompModal';

const StyledActionBar = styled.div`
  position: relative;
  height: 30px;

  .button--group--left {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    text-align: left;
  }
  .button--group--right {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    text-align: right;
  }
`;

const getMaxColSizeByRows = rows => Math.max(...rows.map(row => row.cols.map(col => (col ? col.span || 1 : 0)).reduce((acc, cur) => acc + cur)));

const getCollect = ({ groupIndex, rowIndex, colIndex }) => ({
  groupIndex,
  rowIndex,
  colIndex,
});

const StructureDesign = ({
  isShowEditor,
  canMerge,
  canDivide,
  groups,
  selectedKeys,
  action,
  tabBodyHeight,
  viewType,
  compPoolList,
  compGroupList,
  viewField,
  hiddenField,
  compList,
}) => {
  const [isShowCompConfigModal, setIsShowCompConfigModal] = useState(false);
  const [compConfigType, setCompConfigType] = useState('');
  const [compConfigProps, setCompConfigProps] = useState({});
  const setCompConfigModal = (cFlag, cType, cProp) => {
    setIsShowCompConfigModal(cFlag);
    setCompConfigType(cType);
    setCompConfigProps(cProp);
  };
  return (
    <div key={viewField}>
      <StyledActionBar>
        <div className="button--group--left">
          {viewType !== 'LIST' && (
            <>
              <Divider type="vertical" />
              <ActionButton type="button" onClick={action.addGroup}>
                Add Group
              </ActionButton>
            </>
          )}
        </div>
        <div className="button--group--right">
          <ActionButton type="button" onClick={() => action.openJsonCodeEditor()}>
            Open Json Editor
          </ActionButton>
        </div>
      </StyledActionBar>
      <hr />
      {/* <div style={{ height: tabBodyHeight > 42 ? tabBodyHeight - 42 : 0 }}> */}
      <div>
        <Sketch className="sketch">
          {groups.map((group, groupIndex) => (
            <div key={group.key}>
              {group.type !== 'group' && (group.type === 'searchGroup' ? 'Search Area' : 'List Area')}
              {group.type === 'group' && (
                <GroupTitle
                  title={group.title}
                  useTitle={group.useTitle}
                  tableSize={[group.rows.length, group.rows[0].cols.length]}
                  useOption
                  onChange={title => action.changeGroupTitle(groupIndex, title)}
                  onChangeTableSize={tableSize => action.onChangeTableSize(groupIndex, tableSize)}
                  onChangeUseTitle={useTitle => action.changeUseGroupTitle(groupIndex, useTitle)}
                />
              )}
              {group.type === 'searchGroup' && (
                <div className="group-search-options">
                  <Checkbox defaultChecked={group.useSearch || false} onChange={e => action.changeGroupData(groupIndex, 'useSearch', e.target.checked)}>
                    Use Search
                  </Checkbox>
                </div>
              )}
              <Group key={group.key} className={`group-${groupIndex}`}>
                <TableGroup maxColSize={getMaxColSizeByRows(group.rows)}>
                  {group.rows.map((row, rowIndex) => (
                    <Row key={row.key}>
                      {(row.cols || []).map((col, colIndex) => {
                        if (col === null) {
                          return null;
                        }
                        return (
                          <Col key={col.key} rowSpan={col.rowSpan || 1} colSpan={col.span || 1} height={`calc(80px * ${col.rowSpan || 1})`}>
                            <ContextMenuTrigger
                              id="structure-design-context-menu"
                              groupIndex={groupIndex}
                              rowIndex={rowIndex}
                              colIndex={colIndex}
                              collect={getCollect}
                            >
                              <Contents
                                selected={selectedKeys.includes(`${groupIndex}-${rowIndex}-${colIndex}`)}
                                action={{
                                  selectCell: e => action.selectCell(e, groupIndex, rowIndex, colIndex),
                                }}
                                size={[col.rowSpan || 1, col.span || 1]}
                              >
                                <CompItem
                                  col={col}
                                  groupIndex={groupIndex}
                                  rowIndex={rowIndex}
                                  colIndex={colIndex}
                                  viewType={viewType}
                                  groupType={group.type}
                                  action={action}
                                  compPoolList={compPoolList}
                                  setCompConfigModal={setCompConfigModal}
                                />
                              </Contents>
                            </ContextMenuTrigger>
                          </Col>
                        );
                      })}
                    </Row>
                  ))}
                </TableGroup>
                {group.type === 'group' && (
                  <div className="group-actions">
                    <ActionButton type="button" onClick={() => action.removeGroup(groupIndex)}>
                      <i className="fa fa-times" />
                    </ActionButton>
                  </div>
                )}
              </Group>
            </div>
          ))}
          <div key="heiddenFieldDiv" />
          <GroupTitle title="Hidden Field" onChange={() => false} onChangeUseTitle={() => false} />
          <Group key="heiddenFieldGroup" className="group-999">
            <TableGroup maxColSize={1}>
              <Contents
                selected={selectedKeys.includes(`999-0-0`)}
                action={{
                  selectCell: e => action.selectCell(e, 999, 0, 0),
                  mergeCell: () => false,
                  divideCell: () => false,
                }}
              >
                <Row key="heiddenFieldRow" gutter={[0, 0]} type="flex" style={{ width: '100%', minHeight: '44px' }}>
                  <Col key="heiddenFieldCol_" className="heiddenFieldCol" span={1}>
                    {hiddenField.map((node, index) => (
                      <HiddenComp key={`heiddenFieldComp_${index}`} compItem={node} compIndex={index} removeHiddenComp={action.removeHiddenComp} />
                    ))}
                  </Col>
                </Row>
              </Contents>
            </TableGroup>
          </Group>
          <ContextMenu id="structure-design-context-menu">
            <SubMenu title="행" preventCloseOnClick>
              <MenuItem onClick={action.addRowToUp}>
                <i className="xi-arrow-up" /> 위에 추가
              </MenuItem>
              <MenuItem onClick={action.addRowToDown}>
                <i className="xi-arrow-down" /> 아래에 추가
              </MenuItem>
              <MenuItem onClick={action.removeRow}>
                <i className="xi-eraser" /> 삭제
              </MenuItem>
            </SubMenu>
            <MenuItem divider />
            <SubMenu title="열" preventCloseOnClick>
              <MenuItem onClick={action.addColToLeft}>
                <i className="xi-arrow-left" /> 왼쪽에 추가
              </MenuItem>
              <MenuItem onClick={action.addColToRight}>
                <i className="xi-arrow-right" /> 오른쪽에 추가
              </MenuItem>
              <MenuItem onClick={action.removeCol}>
                <i className="xi-eraser" /> 삭제
              </MenuItem>
            </SubMenu>
            {canMerge.row && (
              <>
                <MenuItem divider />
                <MenuItem onClick={action.mergeRow}>
                  <i className="xi-border-outer" /> 병합
                </MenuItem>
              </>
            )}
            {canMerge.col && (
              <>
                <MenuItem divider />
                <MenuItem onClick={action.mergeCol}>
                  <i className="xi-border-outer" /> 병합
                </MenuItem>
              </>
            )}
            {canDivide.row && (
              <>
                <MenuItem divider />
                <MenuItem onClick={action.divideRow}>
                  <i className="xi-border-outer" /> 행 분할
                </MenuItem>
              </>
            )}
            {canDivide.col && (
              <>
                <MenuItem divider />
                <MenuItem onClick={action.divideCol}>
                  <i className="xi-border-outer" /> 열 분할
                </MenuItem>
              </>
            )}
          </ContextMenu>
        </Sketch>
      </div>
      <Drawer
        title="JSON Editor"
        placement="right"
        width={640}
        onClose={() => action.closeJsonCodeEditor()}
        visible={isShowEditor}
        getContainer={false}
        maskClosable={false}
      >
        <JSONInput
          placeholder={groups}
          onChange={({ jsObject, error }) => {
            if (!error) {
              action.updateJsonCode(jsObject);
            }
          }}
          theme="dark_vscode_tribute"
          colors={{
            string: '#daa520',
          }}
          height="100%"
          width="100%"
        />
      </Drawer>
      <Modal destroyOnClose footer={null} visible={isShowCompConfigModal} bodyStyle={{ padding: '1px' }} onCancel={() => setCompConfigModal(false, '', {})}>
        <CompModal
          configType={compConfigType}
          configProps={compConfigProps}
          action={action}
          compPoolList={compPoolList}
          compGroupList={compGroupList}
          groups={groups}
        />
      </Modal>
    </div>
  );
};

StructureDesign.propTypes = {
  isShowEditor: PropTypes.bool,
  // canMerge: PropTypes.bool,
  groups: PropTypes.arrayOf(PropTypes.object),
  selectedKeys: PropTypes.arrayOf(PropTypes.string),
  action: PropTypes.shape({
    openJsonCodeEditor: PropTypes.func,
    closeJsonCodeEditor: PropTypes.func,
    updateJsonCode: PropTypes.func,
    addRow: PropTypes.func,
    // mergeCell: PropTypes.func,
    divideCell: PropTypes.func,
    addGroup: PropTypes.func,
    selectCell: PropTypes.func,
    changeGroupTitle: PropTypes.func,
    changeUseGroupTitle: PropTypes.func,
    removeHiddenComp: PropTypes.func,
    changeGroupData: PropTypes.func,
    removeGroup: PropTypes.func,
    addCell: PropTypes.func,
    increaseRow: PropTypes.func,
    decreaseRow: PropTypes.func,
    increaseCol: PropTypes.func,
    decreaseCol: PropTypes.func,
    addRowToUp: PropTypes.func,
    addRowToDown: PropTypes.func,
    removeRow: PropTypes.func,
    addColToLeft: PropTypes.func,
    addColToRight: PropTypes.func,
    removeCol: PropTypes.func,
    mergeRow: PropTypes.func,
    mergeCol: PropTypes.func,
    divideRow: PropTypes.func,
    divideCol: PropTypes.func,
    onChangeTableSize: PropTypes.func,
  }),
  tabBodyHeight: PropTypes.number,
  hiddenField: PropTypes.arrayOf(PropTypes.object),
  canMerge: PropTypes.shape({
    row: PropTypes.bool,
    col: PropTypes.bool,
  }),
  canDivide: PropTypes.shape({
    row: PropTypes.bool,
    col: PropTypes.bool,
  }),
};

StructureDesign.defaultProps = {
  isShowEditor: false,
  // canMerge: false,
  groups: [],
  selectedKeys: [],
  action: {
    openJsonCodeEditor: () => {},
    closeJsonCodeEditor: () => {},
    updateJsonCode: () => {},
    addRow: () => {},
    removeRow: () => {},
    // mergeCell: () => {},
    divideCell: () => {},
    addGroup: () => {},
    selectCell: () => {},
    changeGroupTitle: () => {},
    changeUseGroupTitle: () => {},
    removeHiddenComp: () => {},
    changeGroupData: () => {},
    removeGroup: () => {},
    addCell: () => {},
    increaseRow: () => {},
    decreaseRow: () => {},
    increaseCol: () => {},
    decreaseCol: () => {},
    addRowToUp: () => {},
    addRowToDown: () => {},
    addColToLeft: () => {},
    addColToRight: () => {},
    removeCol: () => {},
    mergeRow: () => {},
    mergeCol: () => {},
    divideRow: () => {},
    divideCol: () => {},
    onChangeTableSize: () => {},
  },
  tabBodyHeight: 0,
  hiddenField: [],
  canMerge: {
    row: false,
    col: false,
  },
  canDivide: {
    row: false,
    col: false,
  },
};

export default StructureDesign;
