// import React from 'react';
// import PropTypes from 'prop-types';
// import connect from 'react-redux/es/connect/connect';
// import { createStructuredSelector } from 'reselect';
// import { getCurrentPageInfo } from 'utils/helpers';
// import LoadingOverlayWrapper from 'components/LoadingOverlayWrapper';
// import * as actions from 'containers/App/actions';
// import * as selectors from 'containers/App/selectors';
// import * as authSelectors from 'containers/Auth/selectors';
// import TitleContainerWithSub from 'components/TitleContainerWithSub';
// import MainBody from './MainBody';

// class User extends React.Component {
//   componentDidMount() {
//     this.props.disableViewIsLoading();
//   }

//   render() {
//     const { menus, match, isLoading, enableExpandedView, disableExpandedView, profile } = this.props;
//     const menuId = match.path.replace('/', '');
//     const pageInfo = getCurrentPageInfo(menus, menuId === '' ? 'Main' : menuId);
//     return (
//       <LoadingOverlayWrapper active={isLoading} spinner spinnerSize="50px" text="Loading..." color="#333" background="rgb(239,243,248)">
//         <TitleContainerWithSub
//           title={pageInfo[0] ? pageInfo[0].title : ''}
//           nav={pageInfo}
//           mainbody={<MainBody profile={profile} />}
//           subbody={null}
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

// User.propTypes = {
//   menus: PropTypes.arrayOf(PropTypes.object),
//   enableExpandedView: PropTypes.func,
//   disableExpandedView: PropTypes.func,
//   disableViewIsLoading: PropTypes.func,
//   isLoading: PropTypes.bool,
//   profile: PropTypes.object,
// };

// User.defaultProps = {
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
// )(User);
