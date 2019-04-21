import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Iframe from 'react-iframe'
import * as selectors from './selectors';
import reducer from './reducer';
import injectReducer from '../../utils/injectReducer';
import axios from 'axios';

class LegacySVC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getStateUrl: '',
    }
  }

  componentDidMount() {
    const {
      meta,
      item,
    } = this.props;
    if (item !== undefined && meta !== undefined) {
      const data = {
        PARAM: {
          APPID: item.APP_ID,
          VER: item.VER,
        },
      };
      axios({
        method: 'post',
        url: '/api/portal/v1/page/getUrl/',
        data: data,
        headers: { META: JSON.stringify(meta) },
      })
      .then((response) => {
        if (response.statusText !== 'OK') {
          return Promise.reject(response.data);
        }
        return response.data;
      })
      .then((response) => {
        this.setState({ getStateUrl: response.resultValue });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  }

  getLegacySVCPage = () => {
    const { getStateUrl } = this.state;
    if (getStateUrl === '') {
        <div />
    } else {
      return (
        //iframe 관련 사이트 페이지
        <Iframe url={getStateUrl}
          id="legacy"
          className="legacy"
          display="initial"
          position="relative"
          allowFullScreen
        // 별도의 style은 portal > global.css에 정의
        />
      );
    }
  }

  render() {
    const contents = this.getLegacySVCPage();
    return (
      <div>
        {contents}
      </div>
    );

  }
}

const mapStateToProps = createStructuredSelector({
  meta: selectors.makeSelectMeta(),
});
const withConnect = connect(mapStateToProps);
const withReducer = injectReducer({ key: 'legacySVC', reducer });
// const withSaga = injectSaga({ key: 'legacySVC', saga });

export default compose(
  withReducer,
  // withSaga,
  withConnect,
)(LegacySVC);