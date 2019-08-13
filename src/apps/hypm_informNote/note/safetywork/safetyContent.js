import React, { PureComponent } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../actions';
// import * as selectors from '../selectors';
import reducer from '../reducer';
import saga from '../saga';

class safetyContent extends PureComponent {
  constructor(props) {
    super(props);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.safeWorkPopData !== nextProps.safeWorkPopData ) {
  //      if (nextProps.safeWorkPopData.length===1) {
  //      }
  //   }
  // }

  componentDidMount() {
    window.addEventListener('message', this.onReceiveMessage, false);
  }

  // componentWillUnmount = () => {
  //   window.removeEventListener('message');
  // }

  onReceiveMessage = (event) => {
    this.props.handleSafeWorkPopData(event.data);
    this.props.handleMoveData(event.data.WORK_NO)
  }

  handleConnect = () => {
    // window.open("/sm/informNote/pop/InformNoteListCreatePopup/121|P121-08|12057|'CM', 'CP', 'MI', 'N5','N7'", 'ot', 'width=1200,height=800');
    window.open('/sm/informNote/pop/InformNoteSafetyWorkConnect', 'InformNoteSafetyWorkConnect', 'width=1200,height=800');
  }

  safetyWorkLinkNew = () => {
    let url = "http://eshs.skhynix.com/safety/eshgate.jsp?param=screenId::03010201__urlParam::GIPMS_WORK_ORDER_NO!!";
    url += this.props.itemNoteNo; // Parameter로  장비 Master ID 전달
    url += "^^CMD!!OPENDEATIL"; //팝업오픈여부
		window.open(url,"","top="+(screen.availHeight/2-800/2)+",left="+(screen.availWidth/2-1300/2)+",width=1250px, height=700px, location=no, toolbar=no, menubar=no, scrollbars=yes");
  }

  onFindDb = () => {
    let url = "http://eshs.skhynix.com/safety/eshgate.jsp?param=screenId::03010201__urlParam::GIPMS_WORK_ORDER_NO!!";
    url += this.props.itemNoteNo; 
    url += "^^CMD!!WORKDB^^MAKER!!"; 
    url += this.props.itemMaker;
    url += "^^MODEL!!";
    url += this.props.itemModel
    window.open(url,"","top="+(screen.availHeight/2-800/2)+",left="+(screen.availWidth/2-1300/2)+",width=1250px, height=700px, location=no, toolbar=no, menubar=no, scrollbars=yes");    
  }

  render() {
    return(
      <div>
        <div className="btn-group">
          <Button
            type="primary"
            className="btn-normal add-line"
            onClick={this.handleConnect}
          >
          연결
          </Button>
          <Button
            type="primary"
            className="btn-normal add-line"
            onClick={this.safetyWorkLinkNew}
          >
          신청
          </Button>
          <Button
            type="primary"
            className="btn-normal add-line"
            onClick={this.onFindDb}
          >
          SHE작업DB조회
          </Button>
        </div>
      </div>
    );
  }
}

safetyContent.defaultProps = {
  safeWorkPopData: {},
};

safetyContent.propTypes = {
  handleSafeWorkPopData: PropTypes.func,
  // safeWorkPopData: PropTypes.object,
  handleMoveData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // safeWorkPopData: selectors.makeSafeWorkPopData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleSafeWorkPopData: value => dispatch(actions.safeWorkPopData(value)),
  };
}

const withReducer = injectReducer({ key: 'gridsheet', reducer });
const withSaga = injectSaga({ key: 'gridsheet', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(safetyContent);
