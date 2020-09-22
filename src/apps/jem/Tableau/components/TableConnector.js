import React from 'react';
import styled from 'styled-components';
import tableau from 'tableau-api';

import { jsonToQueryString } from 'utils/helpers';

const Wrapper = styled.div`
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 795px;
  width: 1366px;
`

class TableConnector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      hostUrl: '',
      hasError: false,
    };
    this.fetchToken = this.fetchToken.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.initViz = this.initViz.bind(this);
  }

  componentDidMount() {
    const { menuId } = this.props;
    const queryString = jsonToQueryString({ mnuId: menuId });
    // this.fetchToken(queryString).then(response => {
    //   if (response.result) {
    //     const { token } = response;
    //     this.setState({ token, hasError: false }, () => {
    //       this.fetchData(queryString).then(dataResponse => {
    //         if (dataResponse.result) {
    //           const { data } = dataResponse;
    //           const { hosturl } = data;
    //           this.setState({ hostUrl: hosturl }, () => {
    //             this.initViz(token, hosturl);
    //           });
    //         } else {
    //           this.setState({ hasError: true });
    //         }
    //       })
    //     })
    //   }
    // })
  }

  async fetchToken(payload) {
    return { result: false, token: null };
  }

  async fetchData(queryString) {
    return { result: false };
  }

  initViz(ticket, hostUrl) {
    const trustedTicket = `/trusted/${ticket}`;
    const shareUrl = `http://192.168.251.12${trustedTicket}/views/${hostUrl}`;
    const options = {
      hideTabs: true,
      hideToolbar: false,
      // P_NO: , userId
      // P_NAME: , userName
      width: '100%',
      height: '100%',
    }
    const viz = new window.tableau.Viz(this.vizContainer, shareUrl, options);
  }

  render() {
    return (
      <div>
        <Wrapper ref={div => this.vizContainer = div}/>
      </div>
    );
  }
}

export default TableConnector;
