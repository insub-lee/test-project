// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Select, Radio } from 'antd';
// import { v4 as uuid } from 'uuid';

// import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
// import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
// import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
// import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
// import moment from 'moment';
// import jsonToQueryString from 'apps/eshs/common/jsonToQueryString';
// import JasperViewer from 'apps/eshs/common/JasperViewer';

// const currentYear = moment(new Date()).format('YYYY');
// const AntdSelect = StyledSelect(Select);

// const reportSrc =
//   'http://192.168.191.110:4488/jasperserver-pro/rest_v2/reports/reports/Dev/ESHS/HealthChkResultTargetStatusReport.html?j_username=jasperadmin&j_password=jasperadmin&';

// const defaultParam = {
//   CHK_TYPE: 'CHECKUP',
//   WORK_AREA_NODE_ID: '318',
//   CHK_YEAR: currentYear,
// };

// class Report extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       yearList: [],
//       queryParam: defaultParam,
//       reportView: [],
//     };
//   }

//   componentDidMount() {
//     this.props.spinningOn();
//     const yearList = [];
//     for (let i = currentYear; i >= 1998; i--) {
//       yearList.push(i);
//     }
//     this.setState({ yearList }, this.getInitData);
//   }

//   getInitData = () => {
//     const { sagaKey, getCallDataHandler, spinningOff } = this.props;
//     const apiAry = [
//       {
//         key: 'workAreaList',
//         url: '/api/admin/v1/common/categoryMapList',
//         type: 'POST',
//         params: {
//           PARAM: { NODE_ID: 316 },
//         },
//       },
//     ];

//     getCallDataHandler(sagaKey, apiAry, spinningOff);
//   };

//   onChangeQueryParam = (target, value) => this.setState(prevState => ({ queryParam: { ...prevState.queryParam, [target]: value } }));

//   onSearch = () => {
//     this.setState(
//       {
//         reportView: [],
//       },
//       () =>
//         this.setState(prevState => ({
//           reportView: [
//             <JasperViewer
//               title="건강대상자현황"
//               src={reportSrc + jsonToQueryString(prevState.queryParam)}
//               spinningOn={this.props.spinningOn}
//               spinningOff={this.props.spinningOff}
//               key={uuid()}
//             />,
//           ],
//         })),
//     );
//   };

//   render() {
//     const { result } = this.props;
//     const { yearList, reportView } = this.state;

//     const workAreaList = result?.workAreaList?.categoryMapList || [];

//     return (
//       <>
//         <StyledContentsWrapper>
//           <StyledCustomSearchWrapper className="search-wrapper-inline">
//             <div className="search-input-area">
//               <AntdSelect
//                 defaultValue={defaultParam.CHK_YEAR}
//                 className="select-sm mr5"
//                 style={{ width: 100 }}
//                 onChange={val => this.onChangeQueryParam('CHK_YEAR', val)}
//               >
//                 {yearList.map(year => (
//                   <AntdSelect.Option key={`year_${year}`} value={year}>{`${year}년`}</AntdSelect.Option>
//                 ))}
//               </AntdSelect>
//               <AntdSelect
//                 className="select-sm mr5"
//                 style={{ width: 100 }}
//                 defaultValue={defaultParam.WORK_AREA_NODE_ID}
//                 onChange={val => this.onChangeQueryParam('WORK_AREA_NODE_ID', val)}
//               >
//                 {workAreaList
//                   .filter(item => item.LVL === 1)
//                   .map(item => (
//                     <AntdSelect.Option key={item.NODE_ID} value={String(item.NODE_ID)}>
//                       {item.NAME_KOR}
//                     </AntdSelect.Option>
//                   ))}
//               </AntdSelect>
//               <Radio.Group onChange={e => this.onChangeQueryParam('CHK_TYPE', e?.target?.value)} defaultValue={defaultParam.CHK_TYPE}>
//                 <Radio value="CHECKUP">검진종류</Radio>
//                 <Radio value="AGE">연령</Radio>
//                 <Radio value="WORK_YEAR">근속년수</Radio>
//                 <Radio value="GRADE">건강등급</Radio>
//                 <Radio value="DISEASE">질환</Radio>
//                 <Radio value="FACTORS">유해인자</Radio>
//               </Radio.Group>
//             </div>
//             <div className="btn-area">
//               <StyledButton className="btn-gray btn-sm ml5" onClick={this.onSearch}>
//                 검색
//               </StyledButton>
//             </div>
//           </StyledCustomSearchWrapper>
//           {reportView}
//         </StyledContentsWrapper>
//       </>
//     );
//   }
// }
// Report.propTypes = {
//   spinningOn: PropTypes.func,
//   spinningOff: PropTypes.func,
//   result: PropTypes.object,
//   sagaKey: PropTypes.string,
//   getCallDataHandler: PropTypes.func,
// };

// Report.defaultProps = {
//   spinningOn: () => {},
//   spinningOff: () => {},
//   result: {},
//   sagaKey: '',
//   getCallDataHandler: () => {},
// };
// export default Report;
