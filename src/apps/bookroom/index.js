import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import TimeTable from './TimeTable/index';
import FavoriteLocation from './FavoriteLocation/index';
import HTML from './common/HTML/timeTable/index';

// const SubMenu = Menu.SubMenu;
const { Header, Content } = Layout;

const basicUrl = ['/apps/bookroom', '/sm/bookroom'];

/* egss bookroom */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    let mainUrl = null; // basicUrl[0]
    if (props.history.location.pathname === basicUrl[0]) {
      mainUrl = '/apps/bookroom/TimeTable';
    } else if (props.history.location.pathname === basicUrl[1]) {
      mainUrl = '/sm/bookroom/TimeTable';
    }

    this.state = {
      currentLocation: mainUrl,
    };

    const locationPath = props.history.location.pathname.split('/');
    /*
      선택된 메뉴의 key값
      
      url 형식이 변경될 경우 아래의 인덱스 번호도 변경되어야함
      기본 화면인 회의실 예약(key = 'bookRoom')의 경우, locationPath[3]이 undefined이므로
      별도로 처리
    */
    this.selectedKey = locationPath[3] ? locationPath[3] : 'bookRoom';

    if (mainUrl !== null) {
      props.history.replace(mainUrl);
    }
  }

  state={
    collapsed: false,
  }

  componentWillReceiveProps(nextProps) {
    const { history } = nextProps;
    const { currentLocation } = this.state;

    const {
      location,
    } = history;

    const {
      pathname,
    } = location;


    if (currentLocation !== pathname) { // url이 다른경우
      if (!basicUrl.includes(pathname)) { // home url X
        this.setState({
          currentLocation: pathname,
        });
      } else { // home url O
        history.replace(currentLocation);
      }
    }    
  }

  // app모드에서 화면 값 유지
  shouldComponentUpdate(nextProps) {
    const { history } = nextProps;
    const { currentLocation } = this.state;
    const pathArray = history.location.pathname.split('/');

    if (currentLocation === history.location.pathname && pathArray[1] === 'apps') {
      return false;
    }
    return true;
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <div>
        <Layout>      
          <Layout>
            <Content>
              < div >
                {/* egss routing
                <Route path="/portal/intlSVC/bookroom" component={TimeTable} exact />
                <Route path="/portal/intlSVC/bookroom/TimeTable" component={TimeTable} exact />
                <Route  path="/portal/intlSVC/bookroom/Reservation" component={Reservation} exact  /> 
                <Route  path="/portal/intlSVC/bookroom/ReservationDetail" component={ReservationDetail} exact /> 
                <Route  path="/portal/intlSVC/bookroom/ApprovalBook" component={ApprovalBook} exact /> 
                */ }
                <Route path="/apps/bookroom" component={TimeTable} exact />
                <Route path="/apps/bookroom/TimeTable" component={TimeTable} exact />
                <Route path="/apps/bookroom/FavoriteLocation" component={FavoriteLocation} exact />
                <Route path="/sm/bookroom" component={TimeTable} exact />
                <Route path="/sm/bookroom/TimeTable" component={TimeTable} exact />
                <Route path="/sm/bookroom/FavoriteLocation" component={FavoriteLocation} exact />
                <Route path="/sm/bookroom/HTML" component={HTML} exact />
              </div>
            </Content>
          </Layout>
        </Layout>         
      </div>
    );
  }
}

export default App;
