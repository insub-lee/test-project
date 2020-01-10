import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { intlObj, lang } from 'utils/commonUtils';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';

import * as selectors from './selectors';
import * as actions from './actions';

import reducer from './reducer';
import saga from './saga';

import messages from '../Page/messages';
import ServicePageStyle from './servicePageStyle';

class ServiceMain extends Component {
  constructor(props) {
    super(props);
    // this.props.getService(this.props.item.APP_ID);
    this.state = {};
  }

  componentWillMount() {
    this.props.getService(this.props.item.APP_ID, this.props.item.PAGE_ID);
  }

  shouldComponentUpdate(nextProps) {
    const { serviceData } = nextProps;

    if (serviceData.length === undefined) {
      return false;
    }
    return true;
  }

  render() {
    const data = this.props.serviceData[0];
    const itemSet = this.props.item;
    const types = this.props.type;

    return (
      <ServicePageStyle>
        <div className="bgImgSuspend">
          {types === 'swidget' ? (
            <div className="singleWidget">
              <p className="informTxt">
                <span>
                  <i className="emp">{lang.get('NAME', itemSet)}</i>
                </span>{' '}
                {/* span이 br(줄바꿈)역할이에요 */}
                <span>{intlObj.get(messages.ServicePage)}</span>
                {data && (
                  <span className="reason">
                    {intlObj.get(messages.StopReason)}: {lang.get('RESN', data)}
                  </span>
                )}
              </p>
            </div>
          ) : (
            <div className="widgetContent">
              <p className="informTxt">
                <span>
                  <i className="emp">{lang.get('NAME', itemSet)}</i>
                </span>

                <span>{intlObj.get(messages.ServicePage)}</span>

                {data && (
                  <span className="reason">
                    {intlObj.get(messages.StopReason)}: {lang.get('RESN', data)}
                  </span>
                )}
              </p>
            </div>
          )}
        </div>
      </ServicePageStyle>
    );
  }
}

ServiceMain.propTypes = {
  getService: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  serviceData: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  serviceData: selectors.makeServiceData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getService: (appID, pageID) => dispatch(actions.getService(appID, pageID)),
  };
}

const withReducer = injectReducer({ key: 'servicepage', reducer });
const withSaga = injectSaga({ key: 'servicepage', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withReducer, withSaga, withConnect)(ServiceMain);
