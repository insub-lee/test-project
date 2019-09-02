import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Select, Button } from 'antd';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

const { Option } = Select;

class BuilderWidgetSetting extends Component {
  componentDidMount() {
    const { item } = this.props;
    this.props.getWorkList();
    this.props.getBuilderWidgetConfig(item.WIDGET_ID);
  }

  // componentDidUnmount() {
  //   this.props.initSettingData();
  // }

  onSaveWidgetConfig = () => {
    const { item, updateBizGroupChgYn, saveBuilderWidgetConfig, ITEM_VALUE } = this.props;
    const result = {
      WIDGETID: item.WIDGET_ID,
      ITEM_VALUE: JSON.stringify({
        ...ITEM_VALUE,
      }),
    };

    saveBuilderWidgetConfig(result);
    updateBizGroupChgYn();
  };

  render() {
    const { workList, ITEM_VALUE } = this.props;

    return (
      <div style={{ marginTop: '10px' }}>
        <table>
          <tr>
            <td>
              <label className="subtitle" htmlFor="wSubject">
                업무빌더
              </label>
            </td>
            <td>
              <Select defaultValue={ITEM_VALUE.data} style={{ width: '300px', marginLeft: '20px' }} onChange={val => this.props.changeWorkSeq(val)}>
                {workList.map(work => (
                  <Option key={work.WORK_SEQ} value={work.WORK_SEQ}>
                    {work.NAME_KOR}
                  </Option>
                ))}
              </Select>
              <Button type="primary" htmlType="button" size="small" onClick={this.onSaveWidgetConfig} style={{ marginLeft: '8px' }}>
                적용
              </Button>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

BuilderWidgetSetting.propTypes = {
  item: PropTypes.object,
  updateBizGroupChgYn: PropTypes.func,
  workList: PropTypes.array.isRequired,
  WORK_SEQ: PropTypes.number.isRequired,
  ITEM_VALUE: PropTypes.object.isRequired,
  getWorkList: PropTypes.func.isRequired,
  changeWorkSeq: PropTypes.func.isRequired,
  getBuilderWidgetConfig: PropTypes.func,
  saveBuilderWidgetConfig: PropTypes.func,
  initSettingData: PropTypes.func,
};

BuilderWidgetSetting.defaultProps = {
  item: {},
  updateBizGroupChgYn: () => console.debug('no bind'),
  getBuilderWidgetConfig: () => console.debug('no bind'),
  saveBuilderWidgetConfig: () => console.debug('no bind'),
  initSettingData: () => console.debug('no bind'),
};

const mapStateToProps = createStructuredSelector({
  workList: selectors.makeSelectWorkList(),
  WORK_SEQ: selectors.makeSelectWorkSeq(),
  ITEM_VALUE: selectors.makeSelectWidgetConfig(),
});

const mapDispatchToProps = dispatch => ({
  getWorkList: () => dispatch(actions.getWorkList()),
  changeWorkSeq: workSeq => dispatch(actions.changeWorkSeq(workSeq)),
  getBuilderWidgetConfig: widgetId => dispatch(actions.getBuilderWidgetConfig(widgetId)),
  saveBuilderWidgetConfig: payload => dispatch(actions.saveBuilderWidgetConfig(payload)),
  initSettingData: () => dispatch(actions.initSettingData()),
});

const withReducer = injectReducer({ key: 'apps.BuilderWidget.widgetSetting', reducer });
const withSaga = injectSaga({ key: 'apps.BuilderWidget.widgetSetting', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(BuilderWidgetSetting);
