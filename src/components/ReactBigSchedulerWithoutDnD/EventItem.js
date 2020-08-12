import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Popover from 'antd/lib/popover';
import 'antd/lib/popover/style/index.css';
import EventItemPopover from './EventItemPopover';

class EventItem extends Component {
  constructor(props) {
    super(props);

    const { left, top, width } = props;
    this.state = {
      left,
      top,
      width,
    };
  }

  static propTypes = {
    schedulerData: PropTypes.object.isRequired,
    eventItem: PropTypes.object.isRequired,
    isStart: PropTypes.bool.isRequired,
    isEnd: PropTypes.bool.isRequired,
    left: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    isInPopover: PropTypes.bool.isRequired,
    leftIndex: PropTypes.number.isRequired,
    rightIndex: PropTypes.number.isRequired,
    updateEventStart: PropTypes.func,
    updateEventEnd: PropTypes.func,
    moveEvent: PropTypes.func,
    subtitleGetter: PropTypes.func,
    eventItemClick: PropTypes.func,
    viewEventClick: PropTypes.func,
    viewEventText: PropTypes.string,
    viewEvent2Click: PropTypes.func,
    viewEvent2Text: PropTypes.string,
    conflictOccurred: PropTypes.func,
    eventItemTemplateResolver: PropTypes.func,
  };

  UNSAFE_componentWillReceiveProps(np) {
    const { left, top, width } = np;
    this.setState({
      left,
      top,
      width,
    });
  }

  render() {
    const { eventItem, isStart, isEnd, isInPopover, eventItemClick, schedulerData, eventItemTemplateResolver } = this.props;
    const { config, localeMoment } = schedulerData;
    const { left, width, top } = this.state;
    const roundCls = isStart ? (isEnd ? 'round-all' : 'round-head') : isEnd ? 'round-tail' : 'round-none';
    let bgColor = config.defaultEventBgColor;
    if (eventItem.bgColor) bgColor = eventItem.bgColor;

    const titleText = schedulerData.behaviors.getEventTextFunc(schedulerData, eventItem);
    const content = (
      <EventItemPopover
        {...this.props}
        eventItem={eventItem}
        title={eventItem.title}
        startTime={eventItem.start}
        endTime={eventItem.end}
        statusColor={bgColor}
      />
    );

    const start = localeMoment(eventItem.start);
    const eventTitle = isInPopover ? `${start.format('HH:mm')} ${titleText}` : titleText;
    const startResizeDiv = <div />;
    const endResizeDiv = <div />;

    let eventItemTemplate = (
      <div className={`${roundCls} event-item`} key={eventItem.id} style={{ height: config.eventItemHeight, backgroundColor: bgColor }}>
        <span style={{ marginLeft: '10px', lineHeight: `${config.eventItemHeight}px` }}>{eventTitle}</span>
      </div>
    );
    if (eventItemTemplateResolver !== undefined)
      eventItemTemplate = eventItemTemplateResolver(schedulerData, eventItem, bgColor, isStart, isEnd, 'event-item', config.eventItemHeight, undefined);

    const a = (
      <a
        className="timeline-event"
        style={{ left, width, top }}
        onClick={() => {
          if (eventItemClick) eventItemClick(schedulerData, eventItem);
        }}
      >
        {eventItemTemplate}
        {startResizeDiv}
        {endResizeDiv}
      </a>
    );

    return schedulerData._isResizing() || config.eventItemPopoverEnabled === false || eventItem.showPopover === false ? (
      <div>{a}</div>
    ) : (
      <Popover placement="bottomLeft" content={content} trigger="hover">
        {a}
      </Popover>
    );
  }
}

export default EventItem;
