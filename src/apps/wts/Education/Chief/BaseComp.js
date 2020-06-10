import React from 'react';
import PropTypes from 'prop-types';

import { jsonToQueryString } from 'utils/helpers';
import service from 'apps/wts/Work/service';

import MainBody from './MainBody';

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
    const { profile } = this.props;
    const { manInfo } = this.state;
    return manInfo ? <MainBody empno={profile.EMP_NO} manInfo={manInfo} /> : <div />;
  }
}

BaseComp.propTypes = {
  profile: PropTypes.object,
};

BaseComp.defaultProps = {
  profile: null,
};

export default BaseComp;
