import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

import SelfEmpResultDetail from 'apps/eshs/admin/health/MyHealthPage/SelfEmpResultDetail';
import SearchBar from 'apps/eshs/admin/health/ChkResult/EmpChkResultDetail/comp/SearchBar';
import moment from 'moment';
import { makeAvaterImg } from 'apps/eshs/admin/health/MyHealthPage/MyPage/image';
import Avater from 'apps/eshs/admin/health/MyHealthPage/MyPage/Avater';

const currentYear = moment(new Date()).format('YYYY');
const AntdModal = StyledAntdModal(Modal);

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      avaterTable: [],
      modalObj: {
        modalTitle: '',
        modalContent: [],
        modalVisible: false,
      },
    };
  }

  componentDidMount() {
    const {
      sagaKey: id,
      getCallDataHandler,
      profile: { USER_ID },
      defaultUser,
      spinningOn,
      chkYear,
    } = this.props;
    spinningOn();
    const apiAry = [
      {
        key: 'RESULT',
        type: 'GET',
        url: `/api/eshs/v1/common/health/eshsHealthSelfResultDetail?user_id=${defaultUser || USER_ID}&CHK_YEAR=${chkYear || currentYear}`,
      },
      {
        key: 'userDetail',
        type: 'GET',
        url: `/api/common/v1/account/userDetail/${defaultUser || USER_ID}`,
      },
      {
        key: 'DETAIL',
        type: 'GET',
        url: `/api/eshs/v1/common/health/eshsMyHealthPage?USER_ID=${defaultUser || USER_ID}`,
      },
    ];
    getCallDataHandler(id, apiAry, this.appStart);
  }

  appStart = () => {
    const { sagaKey: id, result, spinningOff, setFormData, formData } = this.props;
    const userDetail = (result && result.userDetail && result.userDetail.data) || {};
    const userData = (result && result.DETAIL && result.DETAIL.result) || {};
    this.setState({ avaterTable: [<Avater avaterImgs={makeAvaterImg(userData)} />] });
    setFormData(id, { ...formData, userInfo: userDetail, empNo: userDetail.EMP_NO });
    spinningOff();
  };

  apiAry = (userId, chkYear) => {
    this.setState({ text: '' });
    return [
      {
        key: 'userDetail',
        type: 'GET',
        url: `/api/common/v1/account/userDetail/${userId}`,
      },
      {
        key: 'DETAIL',
        type: 'GET',
        url: `/api/eshs/v1/common/health/eshsMyHealthPage?USER_ID=${userId}`,
      },
    ];
  };

  modalVisible = () => {
    const {
      modalObj,
      modalObj: { modalVisible },
    } = this.state;
    if (modalVisible) {
      return this.setState({
        modalObj: { modalContent: [], modalTitle: '', modalVisible: !modalVisible },
      });
    }
    return this.setState({
      modalObj: { ...modalObj, modalVisible: !modalVisible },
    });
  };

  resultOnClick = () => {
    const { result } = this.props;
    const userData = (result && result.DETAIL && result.DETAIL.result) || {};

    this.setState(
      {
        modalObj: {
          modalTitle: '개인진단현황',
          modalContent: [<SelfEmpResultDetail key="SelfEmpResultDetail" userSearch={false} defaultUser={userData.USER_ID} chkYear={userData.CHK_YEAR} />],
        },
      },
      this.modalVisible,
    );
  };

  render() {
    const { result, userSearch, profile, sagaKey, getCallDataHandler, formData, spinningOn, spinningOff, chkYear, defaultUser } = this.props;
    const { avaterTable, modalObj } = this.state;
    const userData = (result && result.DETAIL && result.DETAIL.result) || {};
    return (
      <StyledContentsWrapper>
        <StyledCustomSearchWrapper className="search-wrapper-inline">
          <SearchBar
            profile={profile}
            userSearch={userSearch}
            defaultUser={defaultUser || profile.USER_ID}
            sagaKey={sagaKey}
            getCallDataHandler={getCallDataHandler}
            result={result}
            chkYear={chkYear}
            formData={formData}
            viewStart={this.appStart}
            spinningOn={spinningOn}
            spinningOff={spinningOff}
            customApi={this.apiAry}
            yearSearch={false}
          />
        </StyledCustomSearchWrapper>
        <table>
          <colgroup>
            <col width="50%" />
            <col width="50%" />
          </colgroup>
          <thead></thead>
          <tbody>
            <tr>
              <td rowSpan={3}>{avaterTable}</td>
              <td>
                <StyledHtmlTable>
                  <table>
                    <colgroup>
                      <col width="100%" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>건강정보</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </StyledHtmlTable>
              </td>
            </tr>
            <tr>
              <td>
                <StyledHtmlTable>
                  <table>
                    <colgroup>
                      <col width="100%" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td>최근상담내용</td>
                      </tr>
                    </thead>
                    <tfoot></tfoot>
                    <tbody>
                      <tr>
                        <td>{userData.CONSULT && <div dangerouslySetInnerHTML={{ __html: userData.CONSULT }} />}</td>
                      </tr>
                    </tbody>
                  </table>
                </StyledHtmlTable>
              </td>
            </tr>
            <tr>
              <td>
                <StyledHtmlTable>
                  <table>
                    <colgroup>
                      <col width="20%" />
                      <col width="30%" />
                      <col width="20%" />
                      <col width="30%" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th colSpan={4}>최근검진결과</th>
                      </tr>
                    </thead>
                    <tfoot>
                      <tr>
                        <td colSpan={4}>
                          <font color="green"> ※ 결과를 클릭하시면 상세결과를 보실 수 있습니다</font>
                        </td>
                      </tr>
                    </tfoot>
                    <tbody>
                      <tr className="tr-pointer tr-center" onClick={this.resultOnClick}>
                        <th>고혈압</th>
                        <td>{userData.GRADE_GO || '-'}</td>
                        <th>당뇨</th>
                        <td>{userData.GRADE_DANG || '-'}</td>
                      </tr>
                      <tr className="tr-pointer tr-center" onClick={this.resultOnClick}>
                        <th>간장질환</th>
                        <td>{userData.GRADE_GAN || '-'}</td>
                        <th>빈혈</th>
                        <td>{userData.GRADE_BIN || '-'}</td>
                      </tr>
                      <tr className="tr-pointer tr-center" onClick={this.resultOnClick}>
                        <th>고지혈</th>
                        <td>{userData.GRADE_GOJI || '-'}</td>
                        <th>비만</th>
                        <td>{userData.GRADE_BIMAN || '-'}</td>
                      </tr>
                    </tbody>
                  </table>
                </StyledHtmlTable>
              </td>
            </tr>
          </tbody>
        </table>
        <AntdModal width={850} visible={modalObj.modalVisible} title={modalObj.modalTitle || ''} onCancel={this.modalVisible} destroyOnClose footer={null}>
          {modalObj.modalContent}
        </AntdModal>
      </StyledContentsWrapper>
    );
  }
}

View.propTypes = {
  result: PropTypes.object,
  profile: PropTypes.object,
  sagaKey: PropTypes.string,
  defaultUser: PropTypes.number,
  getCallDataHandler: PropTypes.func,
  userSearch: PropTypes.bool,
  setFormData: PropTypes.func,
  formData: PropTypes.object,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
  chkYear: PropTypes.string,
};
View.defaultProps = {
  result: {},
  profile: {},
  sagaKey: '',
  defaultUser: null,
  getCallDataHandler: () => {},
  setFormData: () => {},
  formData: {},
  spinningOn: () => {},
  spinningOff: () => {},
};

export default View;
