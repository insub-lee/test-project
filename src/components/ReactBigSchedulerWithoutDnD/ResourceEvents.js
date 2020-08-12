import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import AddMore from './AddMore';
import Summary from './Summary';
import SelectedArea from './SelectedArea';
import { CellUnits, SummaryPos } from './index';
import { getPos } from './Util';
import EventItem from './EventItem';

class ResourceEvents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSelecting: false,
      left: 0,
      width: 0,
    };
  }

  static propTypes = {
    resourceEvents: PropTypes.object.isRequired,
    schedulerData: PropTypes.object.isRequired,
    onSetAddMoreState: PropTypes.func,
    updateEventStart: PropTypes.func,
    updateEventEnd: PropTypes.func,
    moveEvent: PropTypes.func,
    movingEvent: PropTypes.func,
    conflictOccurred: PropTypes.func,
    subtitleGetter: PropTypes.func,
    eventItemClick: PropTypes.func,
    viewEventClick: PropTypes.func,
    viewEventText: PropTypes.string,
    viewEvent2Click: PropTypes.func,
    viewEvent2Text: PropTypes.string,
    newEvent: PropTypes.func,
    eventItemTemplateResolver: PropTypes.func,
  };

  render() {
    const { resourceEvents, schedulerData } = this.props;
    const { cellUnit, startDate, endDate, config, localeMoment } = schedulerData;
    const { isSelecting, left, width } = this.state;
    const cellWidth = schedulerData.getContentCellWidth();
    const cellMaxEvents = schedulerData.getCellMaxEvents();
    const rowWidth = schedulerData.getContentTableWidth();

    const selectedArea = isSelecting ? <SelectedArea {...this.props} left={left} width={width} /> : <div />;

    const eventList = [];
    resourceEvents.headerItems.forEach((headerItem, index) => {
      if (headerItem.count > 0 || headerItem.summary !== undefined) {
        const isTop = config.summaryPos === SummaryPos.TopRight || config.summaryPos === SummaryPos.Top || config.summaryPos === SummaryPos.TopLeft;
        const marginTop = resourceEvents.hasSummary && isTop ? 1 + config.eventItemLineHeight : 1;
        const renderEventsMaxIndex = headerItem.addMore === 0 ? cellMaxEvents : headerItem.addMoreIndex;

        headerItem.events.forEach((evt, idx) => {
          if (idx < renderEventsMaxIndex && evt !== undefined && evt.render) {
            let durationStart = localeMoment(startDate);
            let durationEnd = localeMoment(endDate).add(1, 'days');
            if (cellUnit === CellUnits.Hour) {
              durationStart = localeMoment(startDate).add(config.dayStartFrom, 'hours');
              durationEnd = localeMoment(endDate).add(config.dayStopTo + 1, 'hours');
            }
            const eventStart = localeMoment(evt.eventItem.start);
            const eventEnd = localeMoment(evt.eventItem.end);
            const isStart = eventStart >= durationStart;
            const isEnd = eventEnd <= durationEnd;
            const left = index * cellWidth + (index > 0 ? 2 : 3);
            const width = evt.span * cellWidth - (index > 0 ? 5 : 6) > 0 ? evt.span * cellWidth - (index > 0 ? 5 : 6) : 0;
            const top = marginTop + idx * config.eventItemLineHeight;
            const eventItem = (
              <EventItem
                {...this.props}
                key={evt.eventItem.id}
                eventItem={evt.eventItem}
                isStart={isStart}
                isEnd={isEnd}
                isInPopover={false}
                left={left}
                width={width}
                top={top}
                leftIndex={index}
                rightIndex={index + evt.span}
              />
            );
            eventList.push(eventItem);
          }
        });

        if (headerItem.addMore > 0) {
          const left = index * cellWidth + (index > 0 ? 2 : 3);
          const width = cellWidth - (index > 0 ? 5 : 6);
          const top = marginTop + headerItem.addMoreIndex * config.eventItemLineHeight;
          const addMoreItem = (
            <AddMore
              {...this.props}
              key={headerItem.time}
              headerItem={headerItem}
              number={headerItem.addMore}
              left={left}
              width={width}
              top={top}
              clickAction={this.onAddMoreClick}
            />
          );
          eventList.push(addMoreItem);
        }

        if (headerItem.summary !== undefined) {
          const top = isTop ? 1 : resourceEvents.rowHeight - config.eventItemLineHeight + 1;
          const left = index * cellWidth + (index > 0 ? 2 : 3);
          const width = cellWidth - (index > 0 ? 5 : 6);
          const key = `${resourceEvents.slotId}_${headerItem.time}`;
          const summary = <Summary key={key} schedulerData={schedulerData} summary={headerItem.summary} left={left} width={width} top={top} />;
          eventList.push(summary);
        }
      }
    });

    return (
      <tr>
        <td style={{ width: rowWidth }}>
          <div ref={this.eventContainerRef} className="event-container" style={{ height: resourceEvents.rowHeight }}>
            {selectedArea}
            {eventList}
          </div>
        </td>
      </tr>
    );
  }

  onAddMoreClick = headerItem => {
    const { onSetAddMoreState, resourceEvents, schedulerData } = this.props;
    if (onSetAddMoreState) {
      const { config } = schedulerData;
      const cellWidth = schedulerData.getContentCellWidth();
      const index = resourceEvents.headerItems.indexOf(headerItem);
      if (index !== -1) {
        let left = index * (cellWidth - 1);
        const pos = getPos(this.eventContainer);
        left += pos.x;
        const top = pos.y;
        const height = (headerItem.count + 1) * config.eventItemLineHeight + 20;

        onSetAddMoreState({
          headerItem,
          left,
          top,
          height,
        });
      }
    }
  };

  eventContainerRef = element => {
    this.eventContainer = element;
  };
}

export default ResourceEvents;
