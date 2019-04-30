import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import WeatherStyle from './weatherStyle';

const { Option } = Select;

const tempWeatherList =
  {
    cod:"200",
    message:0,
    city:{
       geoname_id:1907296,
       name:"Icheon",
       lat:35.0164,
       lon:139.0077,
       country:"JP",
       iso2:"JP",
       type:"",
       population:0
    },
    cnt:10,
    list:[
       {
          dt:1538697600,
          temp:{
             day:60,
             min:50,
             max:70,
             night:285.51,
             eve:285.51,
             morn:285.51
          },
          pressure:1013.75,
          humidity:100,
          weather:[
             {
                id:800,
                main:"Clear",
                description:"sky is clear",
                icon:"01n"
             }
          ],
          speed:5.52,
          deg:311,
          clouds:0
       },
       {
          dt:1538784000,
          temp:{
             day:62,
             min:52,
             max:72,
             night:284.66,
             eve:282.78,
             morn:282.56
          },
          pressure:1023.68,
          humidity:100,
          weather:[
             {
                id:800,
                main:"Clear",
                description:"sky is clear",
                icon:"01d"
             }
          ],
          speed:5.46,
          deg:66,
          clouds:0
       },
       {
          dt:1538870400,
          temp:{
             day:63,
             min:53,
             max:73,
             night:284.16,
             eve:285.49,
             morn:283.21
          },
          pressure:1017.39,
          humidity:100,
          weather:[
             {
                id:800,
                main:"Clear",
                description:"sky is clear",
                icon:"02d"
             }
          ],
          speed:13.76,
          deg:260,
          clouds:8
       },
       {
          dt:1538956800,
          temp:{
             day:70,
             min:60,
             max:80,
             night:283.81,
             eve:284.76,
             morn:281.86
          },
          pressure:1017.36,
          humidity:100,
          weather:[
             {
                id:800,
                main:"Clear",
                description:"sky is clear",
                icon:"01d"
             }
          ],
          speed:8.95,
          deg:288,
          clouds:0
       },
       {
          dt:1539043200,
          temp:{
             day:65,
             min:55,
             max:75,
             night:278.79,
             eve:283.75,
             morn:275.68
          },
          pressure:996.2,
          humidity:0,
          weather:[
             {
                id:500,
                main:"Rain",
                description:"light rain",
                icon:"10d"
             }
          ],
          speed:5.92,
          deg:295,
          clouds:0
       },
    ]
  }

const tempWeatherList2 =
  {
    cod:"200",
    message:0,
    city:{
      geoname_id:1907296,
      name:"Chengju",
      lat:35.0164,
      lon:139.0077,
      country:"JP",
      iso2:"JP",
      type:"",
      population:0
    },
    cnt:10,
    list:[
      {
          dt:1538697600,
          temp:{
            day:50,
            min:40,
            max:60,
            night:285.51,
            eve:285.51,
            morn:285.51
          },
          pressure:1013.75,
          humidity:100,
          weather:[
            {
              id:800,
              main:"Clear",
              description:"sky is clear",
              icon:"01n"
            }
          ],
          speed:5.52,
          deg:311,
          clouds:0
      },
      {
          dt:1538784000,
          temp:{
            day:61,
            min:51,
            max:71,
            night:284.66,
            eve:282.78,
            morn:282.56
          },
          pressure:1023.68,
          humidity:100,
          weather:[
            {
              id:800,
              main:"Clear",
              description:"sky is clear",
              icon:"01d"
            }
          ],
          speed:5.46,
          deg:66,
          clouds:0
      },
      {
          dt:1538870400,
          temp:{
            day:64,
            min:54,
            max:74,
            night:284.16,
            eve:285.49,
            morn:283.21
          },
          pressure:1017.39,
          humidity:100,
          weather:[
            {
              id:500,
              main:"Rain",
              description:"light rain",
              icon:"10d"
            }
          ],
          speed:13.76,
          deg:260,
          clouds:8
      },
      {
          dt:1538956800,
          temp:{
            day:75,
            min:65,
            max:85,
            night:283.81,
            eve:284.76,
            morn:281.86
          },
          pressure:1017.36,
          humidity:100,
          weather:[
            {
              id:500,
              main:"Rain",
              description:"light rain",
              icon:"10d"
            }
          ],
          speed:8.95,
          deg:288,
          clouds:0
      },
      {
          dt:1539043200,
          temp:{
            day:67,
            min:57,
            max:77,
            night:278.79,
            eve:283.75,
            morn:275.68
          },
          pressure:996.2,
          humidity:0,
          weather:[
            {
              id:800,
              main:"Clear",
              description:"sky is clear",
              icon:"01d"
            }
          ],
          speed:5.92,
          deg:295,
          clouds:0
      },
    ]
  }

  const tempWeatherList3 =
  {
    cod:"200",
    message:0,
    city:{
      geoname_id:1907296,
      name:"Seoul",
      lat:35.0164,
      lon:139.0077,
      country:"JP",
      iso2:"JP",
      type:"",
      population:0
    },
    cnt:10,
    list:[
      {
          dt:1538697600,
          temp:{
            day:47,
            min:37,
            max:57,
            night:285.51,
            eve:285.51,
            morn:285.51
          },
          pressure:1013.75,
          humidity:100,
          weather:[
            {
                id:800,
                main:"Clear",
                description:"sky is clear",
                icon:"01n"
            }
          ],
          speed:5.52,
          deg:311,
          clouds:0
      },
      {
          dt:1538784000,
          temp:{
            day:58,
            min:48,
            max:68,
            night:284.66,
            eve:282.78,
            morn:282.56
          },
          pressure:1023.68,
          humidity:100,
          weather:[
            {
              id:500,
              main:"Rain",
              description:"light rain",
              icon:"10d"
            }
          ],
          speed:5.46,
          deg:66,
          clouds:0
      },
      {
          dt:1538870400,
          temp:{
            day:61,
            min:51,
            max:71,
            night:284.16,
            eve:285.49,
            morn:283.21
          },
          pressure:1017.39,
          humidity:100,
          weather:[
            {
              id:800,
              main:"Clear",
              description:"sky is clear",
              icon:"02d"
            }
          ],
          speed:13.76,
          deg:260,
          clouds:8
      },
      {
          dt:1538956800,
          temp:{
            day:64,
            min:54,
            max:74,
            night:283.81,
            eve:284.76,
            morn:281.86
          },
          pressure:1017.36,
          humidity:100,
          weather:[
            {
              id:800,
              main:"Clear",
              description:"sky is clear",
              icon:"01d"
            }
          ],
          speed:8.95,
          deg:288,
          clouds:0
      },
      {
          dt:1539043200,
          temp:{
            day:60,
            min:50,
            max:70,
            night:278.79,
            eve:283.75,
            morn:275.68
          },
          pressure:996.2,
          humidity:0,
          weather:[
            {
              id:500,
              main:"Rain",
              description:"light rain",
              icon:"10d"
            }
          ],
          speed:5.92,
          deg:295,
          clouds:0
      },
    ]
  }

  const tempWeatherList4 =
  {
    cod:"200",
    message:0,
    city:{
      geoname_id:1907296,
      name:"Bundang",
      lat:35.0164,
      lon:139.0077,
      country:"JP",
      iso2:"JP",
      type:"",
      population:0
    },
    cnt:10,
    list:[
      {
          dt:1538697600,
          temp:{
            day:49,
            min:39,
            max:59,
            night:285.51,
            eve:285.51,
            morn:285.51
          },
          pressure:1013.75,
          humidity:100,
          weather:[
            {
              id:800,
              main:"Clear",
              description:"sky is clear",
              icon:"01n"
            }
          ],
          speed:5.52,
          deg:311,
          clouds:0
      },
      {
          dt:1538784000,
          temp:{
            day:55,
            min:45,
            max:65,
            night:284.66,
            eve:282.78,
            morn:282.56
          },
          pressure:1023.68,
          humidity:100,
          weather:[
            {
              id:800,
              main:"Clear",
              description:"sky is clear",
              icon:"01d"
            }
          ],
          speed:5.46,
          deg:66,
          clouds:0
      },
      {
          dt:1538870400,
          temp:{
            day:61,
            min:51,
            max:71,
            night:284.16,
            eve:285.49,
            morn:283.21
          },
          pressure:1017.39,
          humidity:100,
          weather:[
            {
              id:800,
              main:"Clear",
              description:"sky is clear",
              icon:"02d"
            }
          ],
          speed:13.76,
          deg:260,
          clouds:8
      },
      {
          dt:1538956800,
          temp:{
            day:67,
            min:57,
            max:77,
            night:283.81,
            eve:284.76,
            morn:281.86
          },
          pressure:1017.36,
          humidity:100,
          weather:[
            {
              id:500,
              main:"Rain",
              description:"light rain",
              icon:"10d"
            }
          ],
          speed:8.95,
          deg:288,
          clouds:0
      },
      {
          dt:1539043200,
          temp:{
            day:61,
            min:51,
            max:71,
            night:278.79,
            eve:283.75,
            morn:275.68
          },
          pressure:996.2,
          humidity:0,
          weather:[
            {
              id:500,
              main:"Rain",
              description:"light rain",
              icon:"10d"
            }
          ],
          speed:5.92,
          deg:295,
          clouds:0
      },
    ]
  }

 let toDayWether = tempWeatherList.list[0];
 let futureWether = tempWeatherList.list.filter(list=> list.dt > toDayWether.dt);



class Weather extends Component {
  constructor(props) {
    super(props);
    const { item } = this.props;
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
      this.onChangeType(weatherList.LOCATION);
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

  getMonthDay = (day) => {
    // console.log('day', day);
    let today = new Date();
    if(day > 0){
      today.setDate(new Date().getDate()+day)
    }

    const week = new Array('일', '월', '화', '수', '목', '금', '토');
    const month = '00'.concat(today.getMonth() + 1).slice(-2);
    const todate = '00'.concat(today.getDate()).slice(-2);
    const yoil = week[today.getDay()];
    const toMonthday = month + '/' + todate + ' ('+ yoil  + ')';
    return toMonthday;
  }

  // 화씨 => 섭씨111
  toCelsius = (fahrenheit) => {
    const celsius = (fahrenheit - 32) / 1.8;

    return Math.round(celsius); // °C 와 ° 는 style에서 넣음
  }

  onChangeType = (val) => {
    console.log('val : ', val, 'tmepval : ', tempWeatherList.city.name);
    if (val === 'Icheon') {
      toDayWether = tempWeatherList.list[0];
      futureWether = tempWeatherList.list.filter(list=> list.dt > toDayWether.dt);
    }
    else if(val === 'Chengju') {
      toDayWether = tempWeatherList2.list[0];
      futureWether = tempWeatherList2.list.filter(list=> list.dt > toDayWether.dt);
    }
    else if(val === 'Seoul') {
      toDayWether = tempWeatherList3.list[0];
      futureWether = tempWeatherList3.list.filter(list=> list.dt > toDayWether.dt);
    }
    else if(val === 'Bundang') {
      toDayWether = tempWeatherList4.list[0];
      futureWether = tempWeatherList4.list.filter(list=> list.dt > toDayWether.dt);
    }
    this.setState({ location: val });
  }

  render() {
    // 날씨 이미지
    const getImageWeather = (iconId) => {
      if(iconId === '01n' || iconId === '01d' || iconId === '02d') {
        return (
          <div className="wState1sm" title="맑음" /> // class 이름은 날씨 아이템별로 번호 매겨짐 (나중에 작업)
        )
      } else if(iconId === '10d') {
        return (
          <div className="wState3sm" title="흐림" /> // class 이름은 날씨 아이템별로 번호 매겨짐 (나중에 작업)
        )
      }
    }

    return (
      <WeatherStyle className="weather">
        <table className="todayWeather">
          <tbody>
            <tr>
              <td rowSpan="2" className="weatherIcon">
                {/* 날씨 아이콘 className으로 적용 */}
                <div className="wIcon wStatus4lg" title="{getImageWeather(toDayWether.weather[0].icon)}" />
              </td>
              <td className="weatherInfo">
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
                <span className="date">{this.getMonthDay(0)}</span>
              </td>
            </tr>
            <tr>
              <td className="temperatureInfo">
                <span className="fontBig">{this.toCelsius(toDayWether.temp.day)}</span>
                <span className="fontSmall">
                  <span className="minTemp">{this.toCelsius(toDayWether.temp.min)}</span>
                  <span className="div">/</span>
                  <span className="maxTemp">{this.toCelsius(toDayWether.temp.max)}</span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <table className="otherDaysWeather">
          <tbody>
          {
            futureWether.map((list, i) =>
              <tr>
                <td>{this.getMonthDay(i+1)}</td>
                <td className="wStateIconSm">{getImageWeather(list.weather[0].icon)}</td>
                <td>
                  <span className="minTemp">{this.toCelsius(list.temp.min, 'small')}</span>
                  <span className="div">/</span>
                  <span className="maxTemp">{this.toCelsius(list.temp.max, 'small')}</span>
                </td>
              </tr>
            )
          }
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

