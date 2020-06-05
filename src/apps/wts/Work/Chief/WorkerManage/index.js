// import React from 'react';
// import PropTypes from 'prop-types';
// import connect from 'react-redux/es/connect/connect';
// import { createStructuredSelector } from 'reselect';
// import moment from 'moment';
// import { getCurrentPageInfo } from 'utils/helpers';
// import LoadingOverlayWrapper from 'components/LoadingOverlayWrapper';
// import * as actions from 'containers/App/actions';
// import * as selectors from 'containers/App/selectors';
// import * as authSelectors from 'containers/Auth/selectors';
// import TitleContainerWithSub from 'components/TitleContainerWithSub';
// import jsonToQueryString from 'utils/jsonToQueryString';
// import MainBody from './MainBody';
// import SubBody from './SubBody';
// import service from '../../service';

// class WorkerManage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       canUseThisPage: true,
//       manInfo: undefined,
//     };
//     this.fetchInfo = this.fetchInfo.bind(this);
//   }

//   componentDidMount() {
//     this.props.disableViewIsLoading();
//     const { profile } = this.props;
//     this.fetchInfo(profile.emrno).then(payload => {
//       if (payload.manInfo && payload.manInfo.bangubun === '1') {
//         this.setState({ canUseThisPage: true, manInfo: payload.manInfo });
//       } else {
//         this.setState({ canUseThisPage: false, manInfo: undefined });
//       }
//     });
//   }

//   async fetchInfo(empNo) {
//     const requestQuery = {
//       empNo,
//       type: 'manInfo',
//       searchDt: moment(new Date()).format('YYYYMMDD'),
//     };
//     const queryString = jsonToQueryString(requestQuery);
//     const { response, error } = await service.manHis.get(queryString);
//     const payload = {};
//     if (response && !error) {
//       payload[requestQuery.type] = response[requestQuery.type];
//     }
//     return payload;
//   }

//   render() {
//     const { canUseThisPage, manInfo } = this.state;
//     const { menus, match, isLoading, enableExpandedView, disableExpandedView, profile } = this.props;
//     const menuId = match.path.replace('/', '');
//     const pageInfo = getCurrentPageInfo(menus, menuId === '' ? 'Main' : menuId);
//     return (
//       <LoadingOverlayWrapper active={isLoading} spinner spinnerSize="50px" text="Loading..." color="#333" background="rgb(239,243,248)">
//         <TitleContainerWithSub
//           title={pageInfo[0] ? pageInfo[0].title : ''}
//           nav={pageInfo}
//           mainbody={manInfo && <MainBody profile={profile} canUseThisPage={canUseThisPage} manInfo={manInfo} />}
//           subbody={
//             manInfo && (
//               <SubBody
//                 enableFixView={enableExpandedView}
//                 disableFixView={disableExpandedView}
//                 profile={profile}
//                 canUseThisPage={canUseThisPage}
//                 manInfo={manInfo}
//               />
//             )
//           }
//           enableFixView={enableExpandedView}
//           disableFixView={disableExpandedView}
//         />
//       </LoadingOverlayWrapper>
//     );
//   }
// }

// const mapStateToProps = createStructuredSelector({
//   menus: selectors.makeSelectMenus(),
//   view: selectors.makeSelectView(),
//   isLoading: selectors.makeSelectViewIsLoading(),
//   profile: authSelectors.makeSelectProfile(),
// });

// const mapDispatchToProps = dispatch => ({
//   enableExpandedView: () => dispatch(actions.enableExpandedView()),
//   disableExpandedView: () => dispatch(actions.disableExpandedView()),
//   disableViewIsLoading: () => dispatch(actions.disableViewIsLoading()),
// });

// WorkerManage.propTypes = {
//   menus: PropTypes.arrayOf(PropTypes.object),
//   enableExpandedView: PropTypes.func,
//   disableExpandedView: PropTypes.func,
//   disableViewIsLoading: PropTypes.func,
//   isLoading: PropTypes.bool,
//   profile: PropTypes.object,
// };

// WorkerManage.defaultProps = {
//   menus: [],
//   enableExpandedView: () => false,
//   disableExpandedView: () => false,
//   disableViewIsLoading: () => false,
//   isLoading: true,
//   profile: null,
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(WorkerManage);
