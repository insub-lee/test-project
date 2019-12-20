import React from 'react';
import PropTypes from 'prop-types';
// import JSONInput from 'react-json-editor-ajrm';
import { Divider, Drawer } from 'antd';
import styled from 'styled-components';

import Row from '../components/Row/BasedAntd';
import Col from '../components/Col/BasedAntd';
import ActionButton, { CircleActionButton } from '../components/ActionButton';
import Contents from '../components/Contents/Contents';
import ShadowWrapper from '../components/ShadowWrapper';
import Sketch from '../components/Sketch';
import Group from '../components/Sketch/Group';
import GroupTitle from '../components/Sketch/GroupTitle';

import CompItem from '../CompItem';

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

const StructureDesign = ({ isShowEditor, canMerge, groups, selectedKeys, action }) => (
  <div>
    <StyledActionBar>
      <div className="button--group--left">
        <ActionButton type="button" onClick={action.mergeCell} disabled={!canMerge}>
          Merge
        </ActionButton>
        <Divider type="vertical" />
        <ActionButton type="button" onClick={action.divideCell} disabled={selectedKeys.length < 1}>
          Divide
        </ActionButton>
        <Divider type="vertical" />
        <ActionButton type="button" onClick={action.addGroup}>
          Add Group
        </ActionButton>
      </div>
      <div className="button--group--right">
        {/* <ActionButton type="button" onClick={() => action.openJsonCodeEditor()}>
          Open Json Editor
        </ActionButton> */}
      </div>
    </StyledActionBar>
    <hr />
    <Sketch>
      {groups.map((group, groupIndex) => (
        <Group key={group.key} className={`group-${groupIndex}`}>
          <GroupTitle
            title={group.title}
            useTitle={group.useTitle}
            useOption
            onChange={title => action.changeGroupTitle(groupIndex, title)}
            onChangeUseTitle={useTitle => action.changeUseGroupTitle(groupIndex, useTitle)}
          />
          {group.rows.map((row, rowIndex) => (
            <ShadowWrapper key={row.key}>
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
                        <CompItem col={col} groupIndex={groupIndex} rowIndex={rowIndex} colIndex={colIndex} changeCompData={action.changeCompData} />
                      </Contents>
                    </Col>
                  ))}
              </Row>
            </ShadowWrapper>
          ))}
        </Group>
      ))}
    </Sketch>
    {/* <Drawer
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
    </Drawer> */}
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
  }),
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
  },
};

export default StructureDesign;
