import React from 'react';
// import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import { basicPath } from 'containers/common/constants';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { Layout } from 'antd';
import Scrollbars from 'react-custom-scrollbars';
// import { ThemeProvider } from 'styled-components';
import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import makeSelectApps from './selectors';
import AppWrapper from '../App/AppWrapper';
import SmAppsRouter from '../../../apps/smAppsRouter';
import '../App/global.css';
// import * as actions from './actions';
import saga from './saga';
import reducer from './reducer';

const wrap = dragDropContext(HTML5Backend);
class SingleModeApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // 현재 Page에 표시된 앱이 단일앱인지 여부
      // 모바일에서 Dock의 ContextMenu 닫기를 위한 플래그
      // 스피너 상태
      // isSpinnerShow: true,
    };
    // this.styleSpinner = {
    //   margin: 'auto',
    //   width: '100%',
    //   padding: '20%',
    //   position: 'absolute',
    //   zIndex: '100',
    // };
  }

  // shouldComponentUpdate(nextProps) {
  //   const {
  //     selectedApp,
  //   } = this.props;
  //   // 생성자에서 각 탭별 treeData를 가져오는 액션을 발행하는데, 이 액션들의 결과 값들이 하나하나 속성에
  //   // 전달될 때 마다 리랜더링이 일어남. 이를 최적화 하기 위해 모두 들어왔을 때 렌더링 실행
  //   if (JSON.stringify(selectedApp) !== JSON.stringify(nextProps.selectedApp)) {
  //     return true;
  //   }
  //   return false;
  // }
  // componentDidUpdate(prevProps) {
  //   if (this.state.isSpinnerShow && prevProps !== this.props) {
  //     this.setIsSpinnerShow();
  //   }
  // }
  // ****************** 메뉴 관련 함수 ******************
  // setIsSpinnerShow = () => {
  //   this.setState({
  //     isSpinnerShow: false,
  //   });
  // }

  render() {
    // const { isSpinnerShow } = this.state;
    const {
      selectedApp,
      // setIsSpinnerShow,
      // 홈
    } = this.props;

    console.log(selectedApp, ' tesdsfasfsdafasdfdsafsdafasdf');

    return (
      <div>
        {selectedApp.length !== 0 ?
          <Layout className="portalLayout">
            <Scrollbars
              className="singleMode-custom-scrollbar"
              style={{ width: 'auto', minHeight: '100vh', height: 'auto' }}
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
            >
              <AppWrapper style={{ width: '100%' }}>
                {/* <Spin size="large" style={this.styleSpinner} spinning={isSpinnerShow} /> */}
                <SmAppsRouter selectedApp={selectedApp} />
              </AppWrapper>
            </Scrollbars>
          </Layout>
        :
          <div />
        }
      </div>
    );
  }
}
SingleModeApp.propTypes = {
  selectedApp: PropTypes.array.isRequired,
  // setIsSpinnerShow: PropTypes.func.isRequired,
};
const mapStateToProps = createStructuredSelector({
  selectedApp: makeSelectApps(),
});
const mapDispatchToProps = () => ({
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'singleModeApp', reducer });
const withSaga = injectSaga({ key: 'singleModeApp', saga });
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(wrap(SingleModeApp));
