import React, { PureComponent } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import TechSafeView from './techSafeView'

class InformNoteTechSafeDetail extends PureComponent {
  constructor(props) {
    super(props);
    const { params } = props.match;
    const { PARAM } = params;
    const data = {
      PARAM_U_ID: PARAM,
    }
    this.props.handleTechSafeDetailSearch(data);
  }

  closePopup = () => {
    window.close();
  }

  render() {
    const { techSafeDetail } = this.props;
    if (techSafeDetail) {
      let Detaildata = this.props.techSafeDetail[0];
      return (
        <section className="gipms popup">
          <header>
            <h2 className="title">Utility Inform Note Detail</h2>
          </header>
          {/* popup contnent */}
          <TechSafeView techSafeDetail={Detaildata}/>
          <div className="btn-group">
            <div className="right">
              <Button type="primary" onClick={this.closePopup} className="btn-apply save">Close</Button>
            </div>
          </div>
        </section>
      );
    } else {
      return (
        <section className="gipms popup">
          <header>
            <h2 className="title">Utility Inform Note Detail</h2>
          </header>
          {/* popup contnent */}
          <div>
            검색된 내용이 없습니다.
          </div>
          <div className="btn-group">
            <div className="right">
              <Button type="primary" onClick={this.closePopup} className="btn-apply save">Close</Button>
            </div>
          </div>
        </section>
      );
    }
  }
}

InformNoteTechSafeDetail.defaultProps = {
};

InformNoteTechSafeDetail.propTypes = {
  handleTechSafeDetailSearch: PropTypes.func,
  techSafeDetail: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  techSafeDetail: selectors.makeTechSafeDetail(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleTechSafeDetailSearch: value => dispatch(actions.techSafeDetailSearch(value)),
  };
}

const withReducer = injectReducer({ key: 'gridsheet', reducer });
const withSaga = injectSaga({ key: 'gridsheet', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(InformNoteTechSafeDetail);
