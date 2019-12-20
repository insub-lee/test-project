import React from 'react';
import PropTypes from 'prop-types';
import JSONInput from 'react-json-editor-ajrm/index';
import { Drawer } from 'antd';
import styled from 'styled-components';

import Row from 'components/BizBuilder/Row/BasedHtml';
import Col from 'components/BizBuilder/Col/BasedHtml';
import ActionButton from 'components/BizBuilder/ActionButton';
import Contents from 'components/BizBuilder/Cell';
import ShadowWrapper from 'components/BizBuilder/ShadowWrapper';
import StyleEditor from 'components/BizBuilder/StyleEditor';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import GroupTitle from 'components/BizBuilder/Sketch/GroupTitle';

import CompRender from './compRender';

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

const StyleDesign = ({ isShowEditor, groups, selectedKeys, action, bodyStyle, tabBodyHeight }) => (
  <div>
    <StyledActionBar>
      <div className="button--group--left">
        <StyleEditor
          style={bodyStyle}
          action={{
            updateBodyStyle: action.updateBodyStyle,
          }}
        />
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
      <Sketch {...bodyStyle}>
        {groups.map((group, groupIndex) => (
          <div key={group.key}>
            {group.useTitle && <GroupTitle title={group.title} />}
            <Group key={group.key} className={`view-designer-group group-${groupIndex}`}>
              {group.rows.map((row, rowIndex) => (
                <ShadowWrapper key={row.key}>
                  <Row gutter={row.gutter || [0, 0]} className={`view-designer-row row-${rowIndex}`}>
                    {row.cols &&
                      row.cols.map((col, colIndex) => (
                        <Col
                          key={col.key}
                          {...col}
                          selected={selectedKeys.includes(`${groupIndex}-${rowIndex}-${colIndex}`)}
                          className={`view-designer-col col-${colIndex}${col.className && col.className.length > 0 ? ` ${col.className}` : ''}`}
                        >
                          <Contents
                            selected={selectedKeys.includes(`${groupIndex}-${rowIndex}-${colIndex}`)}
                            action={{
                              selectCell: () => action.selectCell(groupIndex, rowIndex, colIndex),
                              updateStyleWidth: (width, diff) => action.updateStyleWidth(groupIndex, rowIndex, colIndex, width, diff),
                              updateStyleHeight: height => action.updateStyleHeight(groupIndex, rowIndex, colIndex, height),
                              updateStyleRowHeight: () => action.updateStyleRowHeight(groupIndex, rowIndex, colIndex),
                            }}
                            widthOption={{
                              current: col.style.width,
                              diffTarget: row.cols[row.cols.length - 1 === colIndex ? colIndex - 1 : colIndex + 1]
                                ? row.cols[row.cols.length - 1 === colIndex ? colIndex - 1 : colIndex + 1].style.width
                                : '0%',
                            }}
                            option={{ style: col.style }}
                          >
                            {col.comp && <CompRender comp={col.comp} />}
                            {/* {col.comp && <AsyncComponent comp={col.comp} />} */}
                          </Contents>
                        </Col>
                      ))}
                  </Row>
                </ShadowWrapper>
              ))}
            </Group>
          </div>
        ))}
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

StyleDesign.propTypes = {
  isShowEditor: PropTypes.bool,
  groups: PropTypes.arrayOf(PropTypes.object),
  selectedKeys: PropTypes.arrayOf(PropTypes.string),
  bodyStyle: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
  }),
  action: PropTypes.shape({
    openJsonCodeEditor: PropTypes.func,
    closeJsonCodeEditor: PropTypes.func,
    updateJsonCode: PropTypes.func,
    updateStyleWidth: PropTypes.func,
    updateStyleHeight: PropTypes.func,
    updateStyleSize: PropTypes.func,
    updateStyleRowHeight: PropTypes.func,
    updateBodyStyle: PropTypes.func,
    selectCell: PropTypes.func,
  }),
  tabBodyHeight: PropTypes.number,
};

StyleDesign.defaultProps = {
  isShowEditor: false,
  groups: [],
  selectedKeys: [],
  bodyStyle: {
    width: '10%',
    height: '10%',
  },
  action: {
    openJsonCodeEditor: () => {},
    closeJsonCodeEditor: () => {},
    updateJsonCode: () => {},
    updateStyleWidth: () => {},
    updateStyleHeight: () => {},
    updateStyleSize: () => {},
    updateStyleRowHeight: () => {},
    updateBodyStyle: () => {},
    selectCell: () => {},
  },
  tabBodyHeight: 0,
};

export default StyleDesign;
