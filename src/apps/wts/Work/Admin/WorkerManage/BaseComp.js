import React from 'react';
import PropTypes from 'prop-types';

import { jsonToQueryString } from 'utils/helpers';
import MainBody from './MainBody';
import service from '../../service';

class BaseComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manInfo: undefined,
    };
    this.fetchInfo = this.fetchInfo.bind(this);
  }

  componentDidMount() {
    const { profile } = this.props;
    console.debug(profile);
    this.fetchInfo(profile.EMP_NO).then(payload => {
      this.setState({ manInfo: payload.manInfo });
    });
  }

  async fetchInfo(empNo) {
    const requestQuery = {
      empNo,
      type: 'manInfo',
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.manHis.get(queryString);
    const payload = {};
    if (response && !error) {
      payload[requestQuery.type] = response[requestQuery.type];
    }
    return payload;
  }

  render() {
    const { canUseThisPage, manInfo } = this.state;
    const { profile } = this.props;
    return manInfo ? <MainBody profile={profile} canUseThisPage={canUseThisPage} manInfo={manInfo} /> : <div />;
  }
}

BaseComp.propTypes = {
  profile: PropTypes.object,
};

BaseComp.defaultProps = {
  profile: null,
};

export default BaseComp;
