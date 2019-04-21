import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { DragSource, DropTarget } from 'react-dnd';
import { intlObj, lang, imgUrl } from 'utils/commonUtils';
import WidgetSettingStyle from './widgetSettingStyle';

const style = {
  fontSize: 13,
  width: '100%',
};

const WidgetDragSpec = {
  beginDrag(props) {
    // const { changeIsWidgetDragged } = props;
    return {
      appId: props.widgetItem.APP_ID,
    };
  },
};

const WidgetDropSpec = {
  hover(props, monitor) {
    const originalIndex = monitor.getItem().appId;
    const appId = props.widgetItem.APP_ID;

    if (originalIndex !== appId) {
      const originIndex = props.findWidget(originalIndex);
      const overIndex = props.findWidget(appId);

      props.moveWidget(originIndex.index, overIndex.index);
    }
  },
};

const collectDrag = connect => ({ connectDragSource: connect.dragSource() });
const collectDrop = connect => ({ connectDropTarget: connect.dropTarget() });

class WidgetList extends Component {
  constructor(prop) {
    super(prop);
    this.state = {

    };
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(id, url) {
    this.props.findIndex(id, url);
  }

  render() {
    const {
      widgetItem,
    } = this.props;

    const {
      connectDragSource, connectDropTarget,
    } = this.props;

    return connectDropTarget(connectDragSource(<div>
      <WidgetSettingStyle>
        <div style={style} className="dndItemWrapper">
          <Table size="small" style={{ width: '100%' }}>
            <Table.Body className="dndTBody">
              <Table.Row key={widgetItem.APP_ID}>
                <Table.Cell
                  textAlign="left"
                  title={`${widgetItem.NAME_KOR}`}
                  className="SUTableCell"
                >
                  <div className="dndItem">
                    <span className="appIconWrapper" style={{ position: 'absolute', left: 10, top: 7 }}>
                      <img
                        className="listImg"
                        style={{ height: 25, width: 25 }}
                        src={imgUrl.get('120x120', widgetItem.ICON)}
                        onError={(e) => { e.target.src = '/icon_no_image.png'; }}
                        alt=""
                      />
                    </span>
                    {widgetItem.NAME_KOR}
                    <span className="ellipsis" style={{ display: 'block' }}>
                      {widgetItem.DSCR_KOR}
                    </span>
                    <button onClick={() => this.props.onChange(widgetItem.APP_ID)} className="delApp" />
                  </div>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </WidgetSettingStyle>
    </div>));
  }
}

WidgetList.propTypes = {
  findIndex: PropTypes.func.isRequired,
  widgetItem: PropTypes.object.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

const dragHighOrderApp = DragSource('SamplePage', WidgetDragSpec, collectDrag)(WidgetList);
export default DropTarget('SamplePage', WidgetDropSpec, collectDrop)(dragHighOrderApp);
