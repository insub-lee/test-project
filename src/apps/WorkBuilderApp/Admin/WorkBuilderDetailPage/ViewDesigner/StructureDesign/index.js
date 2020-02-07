import React from 'react';
import PropTypes from 'prop-types';
import JSONInput from 'react-json-editor-ajrm/index';
import { Divider, Drawer, Checkbox } from 'antd';
import styled from 'styled-components';

import Row from 'components/BizBuilder/Row/BasedAntd';
import Col from 'components/BizBuilder/Col/BasedAntd';
import ActionButton, { CircleActionButton } from 'components/BizBuilder/ActionButton';
import Contents from 'components/BizBuilder/Contents/Contents';
import ShadowWrapper from 'components/BizBuilder/ShadowWrapper';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import GroupTitle from 'components/BizBuilder/Sketch/GroupTitle';

import CompItem from '../CompItem';
import HiddenComp from '../CompItem/HiddenComp';

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

const StructureDesign = ({ isShowEditor, canMerge, groups, selectedKeys, action, tabBodyHeight, viewType, compPoolList, viewField, hiddenField }) => (
  <div key={viewField}>
    <StyledActionBar>
      <div className="button--group--left">
        <ActionButton type="button" onClick={action.mergeCell} disabled={!canMerge}>
          Merge
        </ActionButton>
        <Divider type="vertical" />
        <ActionButton type="button" onClick={action.divideCell} disabled={selectedKeys.length < 1}>
          Divide
        </ActionButton>
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
                useOption
                onChange={title => action.changeGroupTitle(groupIndex, title)}
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
              {group.rows.map((row, rowIndex) => (
                <ShadowWrapper key={row.key}>
                  {group.type !== 'listGroup' && (
                    <div className="actions">
                      <CircleActionButton type="button" onClick={() => action.addRow(groupIndex, rowIndex)}>
                        <i className="fa fa-plus" />
                      </CircleActionButton>
                      {group.rows.length > 1 && (
                        <>
                          <br />
                          <CircleActionButton type="button" onClick={() => action.removeRow(groupIndex, rowIndex)}>
                            <i className="fa fa-minus" />
                          </CircleActionButton>
                        </>
                      )}
                    </div>
                  )}
                  <Row key={row.key} gutter={row.gutter || [0, 0]} type="flex">
                    {row.cols &&
                      row.cols.map((col, colIndex) => (
                        <Col key={col.key} span={col.span || 0}>
                          <Contents
                            selected={selectedKeys.includes(`${groupIndex}-${rowIndex}-${colIndex}`)}
                            action={{
                              selectCell: e => action.selectCell(e, groupIndex, rowIndex, colIndex),
                              mergeCell: () => action.mergeCell(groupIndex, rowIndex, colIndex),
                              divideCell: () => action.divideCell(groupIndex, rowIndex, colIndex),
                            }}
                          >
                            <CompItem
                              key={`structureDesign_compItem_${groupIndex}_${rowIndex}_${colIndex}`}
                              col={col}
                              groupIndex={groupIndex}
                              rowIndex={rowIndex}
                              colIndex={colIndex}
                              viewType={viewType}
                              groupType={group.type}
                              action={action}
                              compPoolList={compPoolList}
                            />
                          </Contents>
                        </Col>
                      ))}
                  </Row>
                </ShadowWrapper>
              ))}
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
        <div key="heiddenFieldDiv"></div>
        <GroupTitle title="Hidden Field" onChange={() => false} onChangeUseTitle={() => false} />
        <Group key="heiddenFieldGroup" className="group-999">
          <Contents
            selected={selectedKeys.includes(`999-0-0`)}
            action={{
              selectCell: e => action.selectCell(e, 999, 0, 0),
              mergeCell: () => false,
              divideCell: () => false,
            }}
          >
            <Row key="heiddenFieldRow" gutter={[0, 0]} type="flex" style={{ width: '100%' }}>
              {hiddenField.map((node, index) => (
                <Col key={`heiddenFieldCol_${index}`} className="heiddenFieldCol" span={8}>
                  <HiddenComp key={`heiddenFieldComp_${index}`} compItem={node} compIndex={index} removeHiddenComp={action.removeHiddenComp} />
                </Col>
              ))}
            </Row>
          </Contents>
        </Group>
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
  </div>
);

StructureDesign.propTypes = {
  isShowEditor: PropTypes.bool,
  canMerge: PropTypes.bool,
  groups: PropTypes.arrayOf(PropTypes.object),
  selectedKeys: PropTypes.arrayOf(PropTypes.string),
  action: PropTypes.shape({
    openJsonCodeEditor: PropTypes.func,
    closeJsonCodeEditor: PropTypes.func,
    updateJsonCode: PropTypes.func,
    addRow: PropTypes.func,
    removeRow: PropTypes.func,
    mergeCell: PropTypes.func,
    divideCell: PropTypes.func,
    addGroup: PropTypes.func,
    selectCell: PropTypes.func,
    changeGroupTitle: PropTypes.func,
    changeUseGroupTitle: PropTypes.func,
    removeHiddenComp: PropTypes.func,
    changeGroupData: PropTypes.func,
  }),
  tabBodyHeight: PropTypes.number,
  hiddenFields: PropTypes.arrayOf(PropTypes.object),
};

StructureDesign.defaultProps = {
  isShowEditor: false,
  canMerge: false,
  groups: [],
  selectedKeys: [],
  action: {
    openJsonCodeEditor: () => {},
    closeJsonCodeEditor: () => {},
    updateJsonCode: () => {},
    addRow: () => {},
    removeRow: () => {},
    mergeCell: () => {},
    divideCell: () => {},
    addGroup: () => {},
    selectCell: () => {},
    changeGroupTitle: () => {},
    changeUseGroupTitle: () => {},
    removeHiddenComp: () => {},
    changeGroupData: () => {},
  },
  tabBodyHeight: 0,
  hiddenFields: [],
};

export default StructureDesign;
