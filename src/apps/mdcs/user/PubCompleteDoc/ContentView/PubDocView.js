import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import StyledTable from 'components/CommonStyled/StyledTable';
class PubDocView extends Component {
  state = {
    dccInfo: [],
  };

  onInitDccInfo = sagaKey => {
    const { extraApiData } = this.props;
    console.debug('ini', this.props);
    const { dccInfo } = extraApiData;
    this.setState({ dccInfo });
  };

  componentDidMount() {
    const { sagaKey, getExtraApiData, pubApiArys } = this.props;
    getExtraApiData(sagaKey, pubApiArys, this.onInitDccInfo);
    console.debug('pubDocView', this.props);
  }

  render() {
    const { pubDocInfo } = this.props;
    return (
      <StyledTable>
        <table>
          <tbody>
            <tr>
              <th style={{ width: '100px' }}>문서종류</th>
              <td colSpan={3}>{pubDocInfo.TITLE}</td>
            </tr>
            <tr>
              <th style={{ width: '100px' }}>문서번호</th>
              <td style={{ width: '200px' }}>{pubDocInfo.DOCNUMBER}</td>
              <th style={{ width: '100px' }}>개정번호</th>
              <td style={{ width: '200px' }}>{pubDocInfo.VERSION}</td>
            </tr>
            <tr>
              <th style={{ width: '100px' }}>제목</th>
              <td colSpan={3}>{pubDocInfo.TITLE}</td>
            </tr>
            <tr>
              <th style={{ width: '100px' }}>기안부서</th>
              <td style={{ width: '200px' }}>{pubDocInfo.REG_DEPT_NAME}</td>
              <th style={{ width: '100px' }}>기안자</th>
              <td style={{ width: '200px' }}>{pubDocInfo.REG_USER_NAME}</td>
            </tr>
            <tr>
              <th style={{ width: '100px' }}>표지보기</th>
              <td colSpan={3}>{/* <Button icon="file-text" onClick={this.onDocCoverClick}>
                  표지보기
                </Button> */}</td>
            </tr>
            <tr>
              <th style={{ width: '100px' }}>본문내용</th>
              <td colSpan={3}></td>
            </tr>
            <tr>
              <th style={{ width: '100px' }}>별첨#1</th>
              <td colSpan={3}></td>
            </tr>
            <tr>
              <th style={{ width: '100px' }}>별첨#2</th>
              <td colSpan={3}></td>
            </tr>
            <tr>
              <th style={{ width: '100px' }}>담당DCC</th>
              <td style={{ width: '200px' }}>{this.state.dccInfo && this.state.dccInfo.list && this.state.dccInfo.list.map(dcc => dcc.NAME_KOR)}</td>
              <th style={{ width: '100px' }}>배포일</th>
              <td style={{ width: '200px' }}>{moment(pubDocInfo.END_DTTM).format('YYYY-MM-DD')}</td>
            </tr>
          </tbody>
        </table>
      </StyledTable>
    );
  }
}

PubDocView.propTypes = {
  pubApiArys: PropTypes.array,
};

PubDocView.defaultProps = {
  pubApiArys: [
    {
      key: 'dccInfo',
      url: '/api/workflow/v1/common/dccInfoHandler',
      type: 'GET',
      params: {},
    },
  ],
};

export default PubDocView;
