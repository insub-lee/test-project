import React, { Component } from 'react';
import Group from 'components/BizBuilder/Sketch/Group';
import GroupTitle from 'components/BizBuilder/Sketch/GroupTitle';
import { CompInfo } from 'components/BizBuilder/CompInfo';
import { isJSON } from 'utils/helpers';
import Contents from '../Common/Contents';

class View extends Component {
  renderComp = (comp, colData, visible, rowClass, colClass) => {
    if (comp.CONFIG.property.COMP_SRC && comp.CONFIG.property.COMP_SRC.length > 0 && CompInfo[comp.CONFIG.property.COMP_SRC]) {
      return CompInfo[comp.CONFIG.property.COMP_SRC].renderer({
        ...comp,
        colData,
        ...this.props,
        visible,
        rowClass,
        colClass,
      });
    }
    return <div />;
  };

  render() {
    const { viewLayer, formData } = this.props;
    if (viewLayer && viewLayer.length === 1 && viewLayer[0].CONFIG && viewLayer[0].CONFIG.length > 0 && isJSON(viewLayer[0].CONFIG)) {
      const viewLayerData = JSON.parse(viewLayer[0].CONFIG).property || {};
      const {
        layer: { groups, hiddenField },
      } = viewLayerData;
      return (
        <>
          {groups.map((group, groupIndex) => (
            <div key={group.key}>
              {group.useTitle && <GroupTitle title={group.title} />}
              <Group key={group.key} className={`view-designer-group group-${groupIndex} ${viewLayer[0].COMP_FIELD}-${groupIndex}`}>
                <table className={`view-designer-table table-${groupIndex}`}>
                  <tbody>
                    {group.rows.map((row, rowIndex) =>
                      row ? (
                        <tr key={row.key} className={`view-designer-row row-${rowIndex} ${viewLayer[0].COMP_FIELD}-${groupIndex}-${rowIndex}`}>
                          {row.cols &&
                            row.cols.map((col, colIndex) =>
                              col ? (
                                <td
                                  key={col.key}
                                  {...col}
                                  comp=""
                                  colSpan={col.span}
                                  className={`view-designer-col col-${colIndex}${col.className && col.className.length > 0 ? ` ${col.className}` : ''} ${
                                    viewLayer[0].COMP_FIELD
                                  }-${groupIndex}-${rowIndex}-${colIndex}${
                                    col.addonClassName && col.addonClassName.length > 0 ? ` ${col.addonClassName.toString().replaceAll(',', ' ')}` : ''
                                  }`}
                                >
                                  <Contents>
                                    {col.comp &&
                                      this.renderComp(
                                        col.comp,
                                        col.comp.COMP_FIELD ? formData[col.comp.COMP_FIELD] : undefined,
                                        true,
                                        `${viewLayer[0].COMP_FIELD}-${groupIndex}-${rowIndex}`,
                                        `${viewLayer[0].COMP_FIELD}-${groupIndex}-${rowIndex}-${colIndex}`,
                                      )}
                                  </Contents>
                                </td>
                              ) : (
                                ''
                              ),
                            )}
                        </tr>
                      ) : (
                        ''
                      ),
                    )}
                  </tbody>
                </table>
              </Group>
            </div>
          ))}
          {hiddenField &&
            hiddenField.length > 0 &&
            hiddenField.map(node => this.renderComp(node, node.COMP_FIELD ? formData[node.COMP_FIELD] : undefined, false))}
        </>
      );
    }
    return '';
  }
}
export default View;
