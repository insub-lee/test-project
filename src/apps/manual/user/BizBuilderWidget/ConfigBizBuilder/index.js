import React, { Component } from 'react';
import { Input, Button, Select } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { fromJS } from 'immutable';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';
import * as actions from './actions';

const { TextArea } = Input;

class ConfigBizBuilder extends Component {
  onApply = () => {
    const { setBizBuilderWidgetSettingBySaga, item, size, sizeArr, user, BizBuilderConfigInfo, type, updateBizGroupChgYn } = this.props;
    console.debug(BizBuilderConfigInfo);
    const result = {
      WIDGETID: item.id,
      ITEM_VALUE: {
        size,
        sizeArr,
        user,
        data: BizBuilderConfigInfo,
        type,
      },
    };
    console.debug(result);
    setBizBuilderWidgetSettingBySaga(result);
    if (type !== 'mypage') {
      // 업무 그룹 변화 감지 함수
      // updateBizGroupChgYn();
      console.debug(type);
    }
  };

  componentDidMount() {
    const { getBizBuilderWidgetSettingBySaga, getWorkListBySaga, item } = this.props;
    getBizBuilderWidgetSettingBySaga(item);
    getWorkListBySaga();
  }

  render() {
    const { setBizBuilderConfigChangeValueByReducr, BizBuilderConfigInfo, workList, setBizBuillderWidgetSettingAsJSON } = this.props;
    const workListOpt = [];
    const { Option } = Select;
    for (let i = 0; i < workList.length; i++) {
      workListOpt.push(
        <Option key={workList[i].WORK_ID}>
          {workList[i].NAME_KOR} [테이블명 : {workList[i].WORK_ID}]
        </Option>,
      );
    }
    return (
      <table>
        <tbody>
          <tr>
            <td>컬럼정보: </td>
            <td>
              <TextArea
                id="sourcecols"
                cols={100}
                rows={10}
                onChange={e => setBizBuillderWidgetSettingAsJSON(e.target.value)}
                value={JSON.stringify(BizBuilderConfigInfo.sourcecols)}
              ></TextArea>
            </td>
          </tr>
          <tr>
            <td>업무빌더 선택 : </td>
            <td>
              <Select
                onChange={work_seq => setBizBuilderConfigChangeValueByReducr('WORK_ID', work_seq)}
                placeholder="chooes bizbuilder"
                style={{ width: '100%' }}
                value={BizBuilderConfigInfo.WORK_ID}
              >
                {workListOpt}
              </Select>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <Button onClick={this.onApply}>적용</Button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

ConfigBizBuilder.propTypes = {
  item: PropTypes.object,
  size: PropTypes.string,
  sizeArr: PropTypes.array,
  user: PropTypes.object,
  data: PropTypes.object,
  setBizBuilderWidgetSettingBySaga: PropTypes.func,
  setBizBuilderConfigChangeValueByReducr: PropTypes.func,
  BizBuilderConfigInfo: PropTypes.object,
  type: PropTypes.string,
  getBizBuilderWidgetSettingBySaga: PropTypes.func,
  setBizBuillderWidgetSettingAsJSON: PropTypes.func,
  getWorkListBySaga: PropTypes.func,
  workList: PropTypes.array,
};

ConfigBizBuilder.defaultProps = {
  item: { id: '11078' },
  size: '2X1',
  sizeArr: ['2X1'],
  user: {
    isTitle: true,
    skin: '1',
  },
  data: {},
  setBizBuilderWidgetSettingBySaga: () => false,
  setBizBuilderConfigChangeValueByReducr: () => false,
  BizBuilderConfigInfo: {},
  type: 'common',
  getBizBuilderWidgetSettingBySaga: () => false,
  setBizBuillderWidgetSettingAsJSON: () => false,
  getWorkListBySaga: () => false,
  workList: [],
};

const mapStateToProps = createStructuredSelector({
  BizBuilderConfigInfo: selectors.makeSelectBizBuilderConfigInfo(),
  workList: selectors.makeSelectWorkList(),
});

const mapDispatchToProps = dispatch => ({
  setBizBuilderWidgetSettingBySaga: data => dispatch(actions.setBizBuilderWidgetSettingBySaga(data)),
  setBizBuilderConfigChangeValueByReducr: (key, value) => dispatch(actions.setBizBuilderConfigChangeValueByReducr(key, value)),
  getBizBuilderWidgetSettingBySaga: item => dispatch(actions.getBizBuilderWidgetSettingBySaga(item)),
  setBizBuillderWidgetSettingAsJSON: cols => dispatch(actions.setBizBuillderWidgetSettingAsJSON(cols)),
  getWorkListBySaga: () => dispatch(actions.getWorkListBySaga()),
});

const withReducer = injectReducer({ key: 'apps-manual-user-BizBuilderWidget-ConfigBizBuilder-reducer', reducer });
const withSaga = injectSaga({ key: 'apps-manual-user-BizBuilderWidget-ConfigBizBuilder-saga', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(ConfigBizBuilder);
