import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Select } from 'antd';
import { BtnDkGray } from 'containers/portal/components/uielements/buttons.style';
import WidgetSettingStyle from './widgetSettingStyle';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';

const { Option } = Select;

class WidgetSetting extends Component {
  constructor(props) {
		super(props);
    const { item, type } = this.props;

    const weatherList = item.data;

    // 초기값 처리
    if (weatherList.LOCATION !== undefined) {
      this.state = {
        itemList: item,
        weatherList: weatherList,
        viewType: item.user.viewType,
        widgetId: item.WIDGET_ID,
        pageId: item.PAGE_ID,
        location: weatherList.LOCATION,
      };
    } else {
      let emptyContent = new Object();
      emptyContent.LOCATION = 'Icheon';

      this.state = {
        itemList: item,
        weatherList: emptyContent,
        viewType: item.user.viewType,
        widgetId: item.WIDGET_ID,
        pageId: item.PAGE_ID,
        location: emptyContent.LOCATION,
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    const { item } = this.props;
    const nextItemWeatherList = nextProps.itemWeatherList.data;
    if (nextItemWeatherList.length !== undefined) {

      const nextItem = nextProps.itemWeatherList;
      const nextWidgetId = nextProps.widgetId;
      const nextPageId = nextProps.pageId;

      this.setState({
        itemList: nextItem,
        weatherList: nextItem.data,
        viewType: nextItem.user.viewType,
        widgetId: nextWidgetId,
        pageId: nextPageId,
      });
    }
  }

  onChangeType = (val) => {
    this.setState({ location: val });
  }

	setWeatherLocation = () => {
		const {
      itemList,
      weatherList,
      viewType,
      widgetId,
      pageId,
    } = this.state;
    const {
      deleteWeather,
      deleteBizWeather,
      type,
    } = this.props;

    const result = {};
    result.size = itemList.size;
    result.sizeArr = itemList.sizeArr;
    result.user = {};
    result.user.isTitle = itemList.user.isTitle;
    result.user.skin = itemList.user.skin;
    result.user.viewType = viewType;
    let emptyContent = new Object();
    emptyContent.LOCATION = this.state.location;
    result.data = emptyContent;

    const item = JSON.stringify(result);

    if (type === "mypage") {
		  deleteWeather(item, widgetId, pageId);
    } else {
      //업무그룹
      // console.log("bizPage", type);
      deleteBizWeather(item, widgetId, pageId);
    }
	}

  render() {
    return (
      <div className="commonPage" style={{ width: '100%' }}>
      <div className="basicSettingTable">
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <th>
                <label className="subtitle" htmlFor="wSubject">날씨지역 설정</label>
              </th>
              <td>
                <WidgetSettingStyle>
                  <div className="viewType">
                    <Select
                      onChange={this.onChangeType}
                      value={this.state.location}
                      dropdownStyle={{ fontSize: 12 }}
                    >
                      <Option value='Icheon'>이천</Option>
                      <Option value='Chengju'>청주</Option>
                      <Option value='Seoul'>서울</Option>
                      <Option value='Bundang'>분당</Option>
                    </Select>
                    <BtnDkGray style={{ float: 'right', marginTop: '-4px' }} onClick={this.setWeatherLocation}>날씨지역 적용</BtnDkGray>
                  </div>
                </WidgetSettingStyle>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    );
  }
}

WidgetSetting.propTypes = {
  item: PropTypes.object,
  itemWeatherList: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  itemWeatherList: selectors.makeGetWeatherList(),
  widgetId: selectors.makeGetWidgetId(),
  pageId: selectors.makeGetPageId(),
});

export function mapDispatchToProps(dispatch) {
  return {
    deleteWeather: (item, widgetId, pageId) => dispatch(actions.deleteWeather(item, widgetId, pageId)),
    deleteBizWeather: (item, widgetId, pageId) => dispatch(actions.deleteBizWeather(item, widgetId, pageId)),
  };
}

const withReducer = injectReducer({ key: 'weatherSetting', reducer });
const withSaga = injectSaga({ key: 'weatherSetting', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(WidgetSetting);


