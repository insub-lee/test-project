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
    const { item, type } = this.props;
    const widgetId = item.WIDGET_ID ? item.WIDGET_ID : 11144;
    const payload = {
      widgetId,
      type: type || 'bizgroup',
    };
    this.props.getWorkList();
    this.props.getBuilderWidgetConfig(payload);
  }

  onSaveWidgetConfig = () => {
    const { item, type, updateBizGroupChgYn, saveBuilderWidgetConfig, ITEM_VALUE } = this.props;
    const widgetId = item.WIDGET_ID ? item.WIDGET_ID : 11144;
    const result = {
      WIDGETID: widgetId,
      ITEM_VALUE: JSON.stringify({
        ...ITEM_VALUE,
      }),
      type: type || 'bizgroup',
    };

    saveBuilderWidgetConfig(result);
    updateBizGroupChgYn();
  };

  onChangeBuilder = val => {
    this.props.changeWorkSeq(val);
  };

  render() {
    const { workList, ITEM_VALUE } = this.props;

    return (
      <div style={{ marginTop: '10px' }}>
        <table>
          <tbody>
            <tr>
              <td>
                <label className="subtitle" htmlFor="wSubject">
                  업무빌더
                </label>
              </td>
              <td>
                <Select
                  value={ITEM_VALUE && ITEM_VALUE.data && ITEM_VALUE.data.WORK_SEQ ? ITEM_VALUE.data.WORK_SEQ : ''}
                  style={{ width: '300px', marginLeft: '20px' }}
                  onChange={val => this.onChangeBuilder(val)}
                >
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
          </tbody>
        </table>
      </div>
    );
  }
}

BuilderWidgetSetting.propTypes = {
  item: PropTypes.object,
  type: PropTypes.string,
  updateBizGroupChgYn: PropTypes.func,
  workList: PropTypes.array,
  ITEM_VALUE: PropTypes.object,
  getWorkList: PropTypes.func,
  changeWorkSeq: PropTypes.func,
  getBuilderWidgetConfig: PropTypes.func,
  saveBuilderWidgetConfig: PropTypes.func,
};

BuilderWidgetSetting.defaultProps = {
  item: {},
  type: '',
  workList: [],
  ITEM_VALUE: {},
};

const mapStateToProps = createStructuredSelector({
  workList: selectors.makeSelectWorkList(),
  ITEM_VALUE: selectors.makeSelectWidgetConfig(),
});

const mapDispatchToProps = dispatch => ({
  getWorkList: () => dispatch(actions.getWorkList()),
  changeWorkSeq: workSeq => dispatch(actions.changeWorkSeq(workSeq)),
  getBuilderWidgetConfig: payload => dispatch(actions.getBuilderWidgetConfig(payload)),
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
