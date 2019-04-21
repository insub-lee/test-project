// import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
// import injectReducer from 'utils/injectReducer';
// import injectSaga from 'utils/injectSaga';
// import reducer from './reducer';
// import saga from './saga';
// import * as selectors from './selectors';
// import * as actions from './actions';

// import SimpleAreaChart from './charts/simpleAreaChart';
// import SimpleBarChart from './charts/simpleBarChart';
// import SimpleLineChart from './charts/simpleLineChart';
// import StockWrapper from './stockStyle';

// const stockCode = '000660';

// class Stock extends PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       chartType: 'area',
//     }

//     this.props.getStockList(stockCode);
//   }

//   // 숫자에 콤마 찍는 정규식(3자리)
//   numberWithCommas = (x) => {
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   }

//   // 선택된 차트가져오기
//   getChart = chartType => {
//     // 차트로 보낼 파라미터
//     const isTooltip = true;
//     const XdataKey = 'day';
//     const YdataKey = 'price';
//     const type = 'monotone'
//     const isLegend = true;
//     const fontSize = 9;

//     let min = 0;
//     let max = 0;
//     let datas = [];

//     const stockList = this.props.setStockList;

//     if (stockList.length > 0) {
//       // 최소값, 최대값
//       min = stockList.map(item=>
//         Number(item.day_EndPrice.replace(',','')))
//         .sort(function(a, b) { return a < b ? -1 : a > b ? 1 : 0; })[0];
//       max = stockList.map(item=>
//         Number(item.day_EndPrice.replace(',','')))
//         .sort(function(a, b) { return a > b ? -1 : a < b ? 1 : 0; })[0];

//       // 주식리스트에 일자(월일), 가격 삽입
//       for (let i=0; i < stockList.length; i += 1) {
//         Object.assign(
//           stockList[i],
//           {day: `${stockList[i].day_Date.substr(stockList[i].day_Date.length-5, 5)}` },
//           {price: Number(stockList[i].day_EndPrice.replace(',','')) },
//         )
//       }

//       // 주식리스트 날짜로 소트(오름차순)
//       datas = stockList.sort(function(a, b) {
//         return new Date('20' + a.day_Date) < new Date('20' + b.day_Date) ? -1
//         : new Date('20' + a.day_Date) > new Date('20' + b.day_Date) ? 1 : 0; } );
//     }

//     if (chartType === 'area') {
//       return (
//         <SimpleAreaChart
//           // {...SimpleAreaChart1}
//           width = {340}
//           height = {180}
//           colors = {['#707070', '#707070', '#fb6c07', '#f79962']}
//           datas={datas}
//           isTooltip = {isTooltip}
//           XdataKey={XdataKey}
//           YdataKey={YdataKey}
//           type={type}
//           isLegend={isLegend}
//           dataMin={min}
//           dataMax={max}
//           fontSize={fontSize}
//         />
//       )
//     }
//   }

//   clickHandler = (chartTypes) => {
//     this.setState({ chartType: chartTypes})
//   }

//   render() {
//     let prevJuka = 0;
//     let curJuka = 0;
//     let dungRakPrice = 0;
//     let dungRakPrice1 = 0;

//     const stockInfo = this.props.setStockInfo;

//     if (stockInfo.CurJuka !== undefined) {
//       prevJuka = Number(stockInfo.PrevJuka.replace(',', '')); //전날종가
//       curJuka = Number(stockInfo.CurJuka.replace(',', '')); // 현주가
//       dungRakPrice = curJuka - prevJuka;  //등락금액
//       dungRakPrice1 = this.numberWithCommas(dungRakPrice).replace('-', ''); //등락금액(절대값)
//     }

//     // 현재가
//     const colorCurJuka = (curJukaAmt) => {
//       if(dungRakPrice > 0 ) {
//         return (
//           <span className="bigFontUp">{curJukaAmt}</span>
//         );
//       } else if(dungRakPrice < 0) {
//         return (
//           <span className="bigFontDown">{curJukaAmt}</span>
//         );
//       }
//       return (
//         <span className="bigFont">{curJukaAmt}</span>
//       );
//     }

//     //등락표시 + 등락금액(절대값)
//     const dungRak = dungRakPrice => {
//       if (dungRakPrice > 0) {
//         return (
//           <span className="up">{dungRakPrice1}</span>
//         );
//       } else if (dungRakPrice < 0) {
//         return (
//           <span className="down">{dungRakPrice1}</span>
//         );
//       }
//       return ' ';
//     }
//     //등락비율
//     const dungRakPer = () => {
//       if((dungRakPrice / prevJuka * 100).toFixed(2) > 0) {
//         return (
//           <span className="up">{(dungRakPrice / prevJuka * 100).toFixed(2) + '%'}</span>
//         )
//       }else if((dungRakPrice / prevJuka * 100).toFixed(2) < 0) {
//         return (
//           <span className="down">{(dungRakPrice / prevJuka * 100).toFixed(2).replace('-','') + '%'}</span>
//         )
//       }
//       return (dungRakPrice / prevJuka * 100).toFixed(2);
//     }

//     const simpleChart = this.getChart(this.state.chartType);

//     if (stockInfo.CurJuka === '' || stockInfo.CurJuka === undefined) {
//       return (
//         <div className="noWidgetWrapper">
//           <div className="noWidgetContent">
//             <p className="noWCIcon">주식 데이터가 없습니다.</p>
//           </div>
//         </div>
//       );
//     } else {
//       return (
//         <StockWrapper className="stock">
//           <table>
//             <tbody>
//               <tr>
//                 <td rowSpan="2">
//                   <h3>SK하이닉스 현재가</h3>
//                   {/* <span className="bigFont">{tempStockList.CurJuka}</span> */}
//                   {colorCurJuka(curJuka)}
//                 </td>
//                 <td>
//                   {dungRak(dungRakPrice)}
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   {dungRakPer()}
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//           {simpleChart}
//         </StockWrapper>
//       );
//     }
//   }
// }

// Stock.propTypes = {
//   getStockList: PropTypes.func, //eslint-disable-line
//   setStockList: PropTypes.array, //eslint-disable-line
//   setStockInfo: PropTypes.object,  //eslint-disable-line
// };

// const mapDispatchToProps = dispatch => (
//   {
//     getStockList: stockCode => dispatch(actions.getStockList(stockCode)),
//   }
// );

// const mapStateToProps = createStructuredSelector({
//   setStockList: selectors.makegetStockList(),
//   setStockInfo: selectors.makegetStockInfo(),
// });

// const withConnect = connect(mapStateToProps, mapDispatchToProps);
// const withSaga = injectSaga({ key: 'Stock', saga });
// const withReducer = injectReducer({ key: 'Stock', reducer });

// export default compose(
//   withReducer,
//   withConnect,
//   withSaga,
// )(Stock);

import React, { Component } from 'react';
import SimpleAreaChart from './charts/simpleAreaChart';
import SimpleBarChart from './charts/simpleBarChart';
import SimpleLineChart from './charts/simpleLineChart';
import StockWrapper from './stockStyle';
// import { SimpleBarChart1, SimpleAreaChart1 } from './config';


// 임시데이터
const tempStockList = (
  {
    CurJuka : '70,900',
    Dabi: '1,600',
    DungRakPer: '',
    PrevJuka : '69,300',
    Volume: '3,630,660',
    myJangGubun:'장중',
    myNowTime: '2018/11/26 13:14:15',
    day_Date : '18/11/26',
    day_EndPrice :'70,900',
    day_Volume : '3,630,660',
  }
);

class Stock extends Component {
  // render() {
  //   return (
  //     <img
  //       alt="stock"
  //       src="/apps/stock.png"
  //       style={{ width: 320, }}
  //     />
  //   )
  // }

  constructor(props) {
    super(props);
    this.state = {
      chartType: 'area',
    }
  }

  // 숫자에 콤마 찍는 정규식(3자리)
  numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // 선택된 차트가져오기
  getChart = chartType => {
    // 차트로 보낼 파라미터
    const isTooltip = true;
    const XdataKey = 'name';
    const YdataKey = 'uv';
    const type = 'monotone'
    const datas = [
      {
        name: '4/1', uv: 76400, pv: 2400, amt: 2400,
      },
      {
        name: '5/1', uv: 79400, pv: 1398, amt: 2210,
      },
      {
        name: '6/1', uv: 75600, pv: 9800, amt: 2290,
      },
      {
        name: '7/1', uv: 75000, pv: 3908, amt: 2000,
      },
      {
        name: '8/1', uv: 80000, pv: 4800, amt: 2181,
      },
      {
        name: '10/1', uv: 76600, pv: 3800, amt: 2500,
      },
      {
        name: '11/1', uv: 78000, pv: 4300, amt: 2100,
      },
    ];
    const min = datas.map(item=> item.uv).sort(function(a,b){return a>b;})[0];
    const max = datas.map(item=> item.uv).sort(function(a,b){return a<b;})[0];
    const isLegend = true;
    const fontSize = 9;

    if (chartType === 'area') {
      return (
        <SimpleAreaChart
          // {...SimpleAreaChart1}
          width = {340}
          height = {180}
          colors = {['#707070', '#707070', '#fb6c07', '#f79962']}
          datas={datas}
          isTooltip = {isTooltip}
          XdataKey={XdataKey}
          YdataKey={YdataKey}
          type={type}
          isLegend={isLegend}
          dataMin={min}
          dataMax={max}
          fontSize={fontSize}
        />
      )
    } else if (chartType === 'bar') {
      return (
        <SimpleBarChart
          // {...SimpleBarChart1}
          width = {340}
          height = {180}
          colors = {['#F79962', '#B7DCFA', '#FFE69A', '#788195']}
          datas={datas}
          isTooltip = {isTooltip}
          XdataKey={XdataKey}
          YdataKey={YdataKey}
          type={type}
          isLegend={isLegend}
          dataMin={min}
          dataMax={max}
          fontSize={fontSize}
        />
      )
    } else if (chartType === 'line') {
      return (
        <SimpleLineChart
          // {...SimpleBarChart1}
          width = {340}
          height = {180}
          colors = {['#F79962', '#B7DCFA', '#FFE69A', '#788195']}
          datas={datas}
          isTooltip = {isTooltip}
          XdataKey={XdataKey}
          YdataKey={YdataKey}
          type={type}
          isLegend={isLegend}
          dataMin={min}
          dataMax={max}
          fontSize={fontSize}
        />
      )
    }
  }

  clickHandler = (chartTypes) => {
    this.setState({ chartType: chartTypes})
  }

  render() {
    const prevJuka = tempStockList.PrevJuka.replace(',', ''); //전날종가
    const curJuka = tempStockList.CurJuka.replace(',', ''); // 현주가
    const dungRakPrice = curJuka - prevJuka;  //등락금액
    const dungRakPrice1 = this.numberWithCommas(dungRakPrice).replace('-', ''); //등락금액(절대값)

    // 현재가
    const colorCurJuka = (curJukaAmt) => {
      if(dungRakPrice > 0 ) {
        return (
          <span className="bigFontUp">{curJukaAmt}</span>
        );
      } else if(dungRakPrice < 0) {
        return (
          <span className="bigFontDown">{curJukaAmt}</span>
        );
      }
      return (
        <span className="bigFont">{curJukaAmt}</span>
      );
    }

    //등락표시 + 등락금액(절대값)
    const dungRak = dungRakPrice => {
      if (dungRakPrice > 0) {
        return (
          <span className="up">{dungRakPrice1}</span>
        );
      } else if (dungRakPrice < 0) {
        return (
          <span className="down">{dungRakPrice1}</span>
        );
      }
      return ' ';
    }
    //등락비율
    const dungRakPer = () => {
      if((dungRakPrice / prevJuka * 100).toFixed(2) > 0) {
        return (
          <span className="up">{(dungRakPrice / prevJuka * 100).toFixed(2) + '%'}</span>
        )
      }else if((dungRakPrice / prevJuka * 100).toFixed(2) < 0) {
        return (
          <span className="down">{(dungRakPrice / prevJuka * 100).toFixed(2).replace('-','') + '%'}</span>
        )
      }
      return (dungRakPrice / prevJuka * 100).toFixed(2);
    }

    const simpleChart = this.getChart(this.state.chartType);

    if (curJuka === '' || curJuka === undefined) {
      return (
        <div className="noWidgetWrapper">
          <div className="noWidgetContent">
            <p className="noWCIcon">주식 데이터가 없습니다.</p>
          </div>
        </div>
      );
    } else {
      return (
        <StockWrapper className="stock">
          {/* <button style={{ fontSize:7 }} onClick={() => this.clickHandler('area')}>areaChart</button> &nbsp;&nbsp;&nbsp; */}
          {/* <button style={{ fontSize:7 }} onClick={() => this.clickHandler('bar')}>barChart</button> &nbsp;&nbsp;&nbsp; */}
          {/* <button style={{ fontSize:7 }} onClick={() => this.clickHandler('line')}>lineChart</button> */}
          <table>
            <tr>
              <td rowspan="2">
                <h3>SK하이닉스 현재가</h3>
                {/* <span className="bigFont">{tempStockList.CurJuka}</span> */}
                {colorCurJuka(tempStockList.CurJuka)}
              </td>
              <td>
                {dungRak(dungRakPrice)}
              </td>
            </tr>
            <tr>
              <td>
                {dungRakPer()}
              </td>
            </tr>
          </table>
          {simpleChart}
        </StockWrapper>
      );
    }
  }
}

export default Stock;
