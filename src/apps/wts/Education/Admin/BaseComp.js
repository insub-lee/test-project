import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { jsonToQueryString } from 'utils/helpers';
import service from 'apps/wts/Work/service';

import EduPrograms from './EduPrograms';

class BaseComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payload: Map({}),
      area: '',
      type: '',
      eduType: '',
      manInfo: undefined,
    };
    this.sendPayloadToSubBody = this.sendPayloadToSubBody.bind(this);
    this.selectedCategoryHandler = this.selectedCategoryHandler.bind(this);
    this.fetchInfo = this.fetchInfo.bind(this);
  }

  componentDidMount() {
    const { profile } = this.props;
    this.fetchInfo(profile.EMP_NO).then(payload => {
      this.setState({ manInfo: payload.manInfo });
    });
  }

  selectedCategoryHandler(payload) {
    const { area, type, eduType } = payload;
    this.setState({ area, type, eduType });
  }

  sendPayloadToSubBody(index, payload) {
    this.setState(prevState => ({
      payload: prevState.payload.set(index, payload),
    }));
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
    const { manInfo } = this.state;
    return manInfo ? <EduPrograms manInfo={manInfo} /> : <div />;
  }
}

BaseComp.propTypes = {
  profile: PropTypes.object,
};

BaseComp.defaultProps = {
  profile: null,
};

export default BaseComp;
