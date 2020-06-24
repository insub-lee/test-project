import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import styled from 'styled-components';

const CustomStyled = styled.div`
  width: 50%;
  text-align: center;
`;

class VersionMgtPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { sagaKey, getCallDataHandler } = this.props;
    const apiArr = [
      {
        /* 소방점검 버전정보 호출 */
        key: 'getFireVersion',
        type: 'GET',
        url: `/api/eshs/v1/common/fireVersion`,
      },
    ];
    getCallDataHandler(sagaKey, apiArr);
  }

  render() {
    const { result } = this.props;
    const fireVersions = (result && result.getFireVersion && result.getFireVersion.fireVersion) || {};
    return (
      <CustomStyled>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="40%" />
              <col width="60%" />
            </colgroup>
            <tbody>
              <tr>
                <th>
                  <span>신청일</span>
                </th>
                <th>
                  <span>버전</span>
                </th>
              </tr>
              <tr>
                <td>
                  <span>소화기 점검</span>
                </td>
                <td>
                  <span>{fireVersions.fe_master || '버전정보가 없습니다.'}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>소화전 점검</span>
                </td>
                <td>
                  <span>{fireVersions.fh_master || '버전정보가 없습니다.'}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Pre Action & Alarm Valve</span>
                </td>
                <td>
                  <span>{fireVersions.pa_master || '버전정보가 없습니다.'}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>PKG 소화설비</span>
                </td>
                <td>
                  <span>{fireVersions.pk_master || '버전정보가 없습니다.'}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>미분무 소화전</span>
                </td>
                <td>
                  <span>{fireVersions.wh_master || '버전정보가 없습니다.'}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>미분무 콘센트</span>
                </td>
                <td>
                  <span>{fireVersions.ws_master || '버전정보가 없습니다.'}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>미분무 펌프</span>
                </td>
                <td>
                  <span>{fireVersions.wp_master || '버전정보가 없습니다.'}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>R동 소방 펌프</span>
                </td>
                <td>
                  <span>{fireVersions.rp_master || '버전정보가 없습니다.'}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>DI동 소방 펌프</span>
                </td>
                <td>
                  <span>{fireVersions.dp_master || '버전정보가 없습니다.'}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>ERT 장비 보관함</span>
                </td>
                <td>
                  <span>{fireVersions.er_master || '버전정보가 없습니다.'}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>EYE & BODY SHOWER</span>
                </td>
                <td>
                  <span>{fireVersions.eb_master || '버전정보가 없습니다.'}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Air Line Mask함</span>
                </td>
                <td>
                  <span>{fireVersions.al_master || '버전정보가 없습니다.'}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
      </CustomStyled>
    );
  }
}

VersionMgtPage.propTypes = {
  sagaKey: PropTypes.string,
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
  getCallDataHandlerReturnRes: PropTypes.func,
};

VersionMgtPage.defaultProps = {};

export default VersionMgtPage;
