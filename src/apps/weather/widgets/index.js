import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import WeatherStyle from './weatherStyle';
import { tempWeatherList, tempWeatherList2, tempWeatherList3, tempWeatherList4 } from '../dummyData';

const { Option } = Select;

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = { location: '' };
  }

  componentDidMount() {
    const { item: data } = this.props;
    this.setState({ location: data.LOCATION || 'Icheon' });
  }

  getMonthDay = day => {
    // console.log('day', day);
    const today = new Date();
    if (day > 0) {
      today.setDate(new Date().getDate() + day);
    }

    const week = new Array('일', '월', '화', '수', '목', '금', '토');
    const month = '00'.concat(today.getMonth() + 1).slice(-2);
    const todate = '00'.concat(today.getDate()).slice(-2);
    const yoil = week[today.getDay()];
    const toMonthday = `${month}/${todate} (${yoil})`;
    return toMonthday;
  };

  // 화씨 => 섭씨111
  toCelsius = fahrenheit => {
    const celsius = (fahrenheit - 32) / 1.8;

    return Math.round(celsius); // °C 와 ° 는 style에서 넣음
  };

  onChangeType = val => {
    this.setState({ location: val });
  };

  getWhether = () => {
    const {
      item: { LOCATION },
    } = this.props;
    switch (LOCATION) {
      case 'Chengju':
        return {
          todayWhether: tempWeatherList2.list[0],
          futureWhether: tempWeatherList2.list.filter(list => list.dt > tempWeatherList2.list[0].dt),
        };
      case 'Seoul':
        return {
          todayWhether: tempWeatherList3.list[0],
          futureWhether: tempWeatherList3.list.filter(list => list.dt > tempWeatherList3.list[0].dt),
        };
      case 'Bundang':
        return {
          todayWhether: tempWeatherList4.list[0],
          futureWhether: tempWeatherList4.list.filter(list => list.dt > tempWeatherList4.list[0].dt),
        };
      case 'Icheon':
      default:
        return {
          todayWhether: tempWeatherList.list[0],
          futureWhether: tempWeatherList.list.filter(list => list.dt > tempWeatherList.list[0].dt),
        };
    }
  };

  getImageWeather = iconId => {
    switch (iconId) {
      case '01n':
      case '01d':
      case '02d':
        return (
          <div className="wState1sm" title="맑음" /> // class 이름은 날씨 아이템별로 번호 매겨짐 (나중에 작업)
        );
      case '10d':
        return (
          <div className="wState3sm" title="흐림" /> // class 이름은 날씨 아이템별로 번호 매겨짐 (나중에 작업)
        );
      default:
        return null;
    }
  };

  render() {
    const { location } = this.state;
    const { item } = this.props;
    const {
      data: weatherList,
      user: { viewType },
      WIDGET_ID: widgetId,
      PAGE_ID: pageId,
    } = item;
    const { todayWhether, futureWhether } = this.getWhether();
    return (
      <WeatherStyle className="weather">
        <table className="todayWeather">
          <tbody>
            <tr>
              <td rowSpan="2" className="weatherIcon">
                {/* 날씨 아이콘 className으로 적용 */}
                <div className="wIcon wStatus4lg" title="{this.getImageWeather(toDayWether.weather[0].icon)}" />
              </td>
              <td className="weatherInfo">
                <Select onChange={this.onChangeType} value={location} dropdownStyle={{ fontSize: 12 }}>
                  <Option value="Icheon">이천</Option>
                  <Option value="Chengju">청주</Option>
                  <Option value="Seoul">서울</Option>
                  <Option value="Bundang">분당</Option>
                </Select>
                <span className="date">{this.getMonthDay(0)}</span>
              </td>
            </tr>
            <tr>
              <td className="temperatureInfo">
                <span className="fontBig">{this.toCelsius(todayWhether.temp.day)}</span>
                <span className="fontSmall">
                  <span className="minTemp">{this.toCelsius(todayWhether.temp.min)}</span>
                  <span className="div">/</span>
                  <span className="maxTemp">{this.toCelsius(todayWhether.temp.max)}</span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <table className="otherDaysWeather">
          <tbody>
            {futureWhether.map((obj, i) => (
              <tr key={i}>
                <td>{this.getMonthDay(i + 1)}</td>
                <td className="wStateIconSm">{this.getImageWeather(obj.weather[0].icon)}</td>
                <td>
                  <span className="minTemp">{this.toCelsius(obj.temp.min, 'small')}</span>
                  <span className="div">/</span>
                  <span className="maxTemp">{this.toCelsius(obj.temp.max, 'small')}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </WeatherStyle>
    );
  }
}

Weather.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Weather;
