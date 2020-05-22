import React from 'react';
import PropTypes from 'prop-types';

import Group from 'components/BizBuilder/Sketch/Group';
import Sketch from 'components/BizBuilder/Sketch';
import GroupTitle from 'components/BizBuilder/Sketch/GroupTitle';

import StyleManager from './StyleManager/index';

const getMaxColSizeByRows = rows => Math.max(...rows.map(row => row.cols.map(col => (col ? col.span || 1 : 0)).reduce((acc, cur) => acc + cur)));

const getDefaultWidths = maxColSize => {
  const widths = [];
  for (let i = 0; i < maxColSize; i++) {
    widths.push(100 / maxColSize);
  }
  return widths;
};

const StyleDesign = ({ groups, action }) => (
  <div>
    <div>
      <Sketch>
        {groups.map((group, groupIndex) => (
          <div key={group.key}>
            {group.type !== 'group' && (group.type === 'searchGroup' ? 'Search Area' : 'List Area')}
            {group.useTitle && <GroupTitle title={group.title} />}
            <Group key={group.key} className={`group-${groupIndex}`}>
              {group.rows.length > 0 && (
                <StyleManager
                  key={group.key}
                  groupKey={group.key}
                  id={`group-table-${groupIndex}`}
                  defaultWidth={1000} // init body width
                  defaultWidthType={'px'} // init body width type ( '%' or 'px' )
                  updateBodyWidthType={type => console.debug('@ body type', type)}
                  updateBodyWidth={width => console.debug('@ body type', width)}
                  updateCellStyle={(e, rowIndex, colIndex) => {
                    const { name, value } = e.target;
                    action.updateCellStyle(groupIndex, rowIndex, colIndex, name, value);
                  }}
                  onChangeWidths={widths => action.onChangeWidths(groupIndex, widths)}
                  onChangeHeights={heights => action.onChangeHeights(groupIndex, heights)}
                  headers={group.widths || getDefaultWidths(getMaxColSizeByRows(group.rows))}
                  rows={group.rows}
                  baseComponent={<div>test</div>}
                />
              )}
            </Group>
          </div>
        ))}
      </Sketch>
    </div>
  </div>
);

StyleDesign.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.object),
  action: PropTypes.shape({
    onChangeWidths: PropTypes.func,
    onChangeHeights: PropTypes.func,
    updateCellStyle: PropTypes.func,
  }),
};

StyleDesign.defaultProps = {
  groups: [],
  action: {
    onChangeWidths: () => {},
    onChangeHeights: () => {},
    updateCellStyle: () => {},
  },
};

export default StyleDesign;
