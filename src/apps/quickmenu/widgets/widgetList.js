import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Table } from 'semantic-ui-react';
import ScrollBar from 'react-custom-scrollbars';
import { DragSource, DropTarget } from 'react-dnd';
import { Button } from 'antd';
import WidgetSettingStyle from './widgetSettingStyle';
import { intlObj } from 'utils/commonUtils';
import messages from '../../../components/Page/messages';

const style = {
    fontSize: 13,
    width: '100%',
}

const WidgetDragSpec = {
    beginDrag(props) {
        const { changeIsWidgetDragged } = props;
        return {
            widgetId: props.widgetItem.app_ID,
        };
    },

    // endDrag(props, monitor) {
    //     const { changeIsWidgetDragged } = props;
    //     const { widgetId, originalIndex } = monitor.getItem()
	// 	const didDrop = monitor.didDrop()

	// 	if (!didDrop) {
	// 		props.moveWidget(widgetId, originalIndex)
	// 	}
    //     changeIsWidgetDragged();
    // },
};

const WidgetDropSpec = {
    hover(props, monitor) {
        const originalIndex = monitor.getItem().widgetId;
		const widgetId = props.widgetItem.app_ID;

		if (originalIndex !== widgetId) {
            const originIndex = props.findWidget(originalIndex);
            const overIndex  = props.findWidget(widgetId);
            
			props.moveWidget(originIndex.index, overIndex.index)
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
            widgetItem
        } = this.props

        const {
            connectDragSource, connectDropTarget,
        } = this.props;

        return connectDropTarget(connectDragSource(
          <div style={{ height: 30 }}>
            <WidgetSettingStyle>
                <div style={style} className="dndItemWrapper">
                    <Table size="small" style={{ width: '100%' }}>
                        <Table.Body>
                            <Table.Row>
                              <Table.Cell
                                style={{ width: '100%', padding: '5px 30px 5px 20px' }}
                                className="tableItem"
                              >
                                {widgetItem.title}
                                <span className="dndIcon" />
                                <button className="deleteItem" onClick={() => this.onDelete(widgetItem.app_ID, widgetItem.url)} />
                              </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            </WidgetSettingStyle>
          </div>
        ));
    }
}

const dragHighOrderApp = DragSource('SamplePage', WidgetDragSpec, collectDrag)(WidgetList);
export default DropTarget('SamplePage', WidgetDropSpec, collectDrop)(dragHighOrderApp);
