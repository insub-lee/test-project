import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Select, Spin } from 'antd';
import EshsCmpnyComp from 'components/BizBuilder/Field/EshsCmpnyComp';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
import StyledModalWrapper from 'commonStyled/EshsStyled/Modal/StyledSelectModal';
import StyledSearchWrapper from 'commonStyled/Wrapper/StyledSearchWrapper';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';

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
    // const initVersion = {
    //   fh_master:
    //   eb_master:
    //   wh_master:
    //   ws_master:
    //   er_master:
    //   wp_master:
    //   rp_master:
    //   dp_master:
    //   fe_master:
    //   al_master:
    //   pk_master:
    //   pa_master:
    // }
    const fireVersions = (result && result.getFireVersion && result.getFireVersion.fireversion) || {};
    return (
      <div>
        <ContentsWrapper>보류</ContentsWrapper>
      </div>
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
