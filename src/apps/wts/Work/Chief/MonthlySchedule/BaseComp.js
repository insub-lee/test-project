import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { jsonToQueryString } from 'utils/helpers';
import MainBody from './MainBody';
import service from '../../service';

class BaseComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canUseThisPage: true,
      manInfo: undefined,
    };
    this.fetchInfo = this.fetchInfo.bind(this);
  }

  componentDidMount() {
    const { profile } = this.props;
    this.fetchInfo(profile.EMP_NO).then(payload => {
      if (payload.manInfo && payload.manInfo.bangubun === '1') {
        this.setState({ canUseThisPage: true, manInfo: payload.manInfo });
      } else {
        this.setState({ canUseThisPage: false, manInfo: undefined });
      }
    });
  }

  async fetchInfo(empNo) {
    const requestQuery = {
      empNo,
      type: 'manInfo',
      searchDt: moment(new Date()).format('YYYYMMDD'),
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
