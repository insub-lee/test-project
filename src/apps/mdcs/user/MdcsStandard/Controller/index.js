import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import DwDoc from '../DwDoc';
import PmDoc from '../PmDoc';
import BizDoc from '../BizDoc';
import TechDoc from '../TechDoc';

class Controller extends Component {
  componentDidMount() {}

  render() {
    const { item } = this.props;
    const widgetId = item && item.WIDGET_ID ? item.WIDGET_ID : -1;
    const WORK_SEQ = item && item.data && item.data.WORK_SEQ ? item.data.WORK_SEQ : 913; // 779
    // return <BizBuilderBase id={`${widgetId}_DwDoc`} workSeq={WORK_SEQ} component={DwDoc} viewType="INPUT" />;
    // return <BizBuilderBase id={`${widgetId}_PmDoc`} workSeq={WORK_SEQ} component={PmDoc} viewType="INPUT" />;
    return <BizBuilderBase sagaKey={`${widgetId}_TechDoc`} workSeq={WORK_SEQ} component={TechDoc} viewType="INPUT" />;
    // return <BizBuilderBase id="DocTemplate" component={DwDoc} viewType="LIST" {...this.props} workSeq={985} />;
  }
}

Controller.propTypes = {
  workSeq: PropTypes.number,
};

Controller.defaultProps = {
  workSeq: 1011,
};
export default Controller;
