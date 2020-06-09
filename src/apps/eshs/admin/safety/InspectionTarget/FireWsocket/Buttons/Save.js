import React from 'react';
import PropTypes from 'prop-types';
import request from 'utils/request';
import { address } from 'apps/eshs/admin/safety/InspectionTarget/FireWsocket/internal_constants';
import { Button } from 'antd';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
const StyledButton = StyledAntdButton(Button);

String.prototype.rtrim = function() {
  return this.replace(/(\s*$)/, '');
};

export default function Save({ saveTask, saveBeforeProcess, onCloseModalHandler, changeFormData, formData, workSeq, sagaKey: id, reloadId, getListData }) {
  function position_no_generator(formData) {
    const { BUILDING_CODE, STAIR_NO, INSTALLED_LOCATION, CHIP_NO } = formData;

    request({
      method: 'POST',
      url: `${address.generatePositionNo}`,
      data: { FIRE_CODE: 'WS', BUILDING_CODE, STAIR_NO, INSTALLED_LOCATION, CHIP_NO },
    }).then(({ response }) => {
      if (response?.result === 1) {
        const { data } = response || {};
        changeFormData(id, data.COMP_FIELD, data.POSITION_NO);
        saveBeforeProcess(id, reloadId || id, afterProcessing(formData, data.POSITION_NO));
      } else {
        message.error(<MessageContent>등록정보 저장에 실패하였습니다.</MessageContent>);
        console.debug('ERROR : ', response?.data?.comment);
      }
    });
  }

  function afterProcessing(formData, POSITION_NO) {
    const { CHIP_NO } = formData;
    const Chip = CHIP_NO;
    const Chip_substr = Chip.rtrim();

    const Blank_num = `${Chip_substr}`;
    let Blank_point = Blank_num.length % 3;
    const Blank_len = Blank_num.length;

    let Blank_chip_no = Blank_num.substring(0, Blank_point);

    while (Blank_point < Blank_len) {
      if (Blank_chip_no != '') Blank_chip_no += ' ';
      Blank_chip_no += Blank_num.substring(Blank_point, Blank_point + 2);
      Blank_point += 2;
    }

    const Colon_num = `${Chip_substr}`;
    let Colon_point = Colon_num.length % 3;
    const Colon_len = Colon_num.length;

    let Colon_chip_no = Colon_num.substring(0, Colon_point);

    while (Colon_point < Colon_len) {
      if (Colon_chip_no != '') Colon_chip_no += ':';
      Colon_chip_no += Colon_num.substring(Colon_point, Colon_point + 2);
      Colon_point += 2;
    }

    const Semicolon_num = `${Chip_substr}`;
    let Semicolon_point = Semicolon_num.length % 3;
    const Semicolon_len = Semicolon_num.length;

    let Semicolon_chip_no = Semicolon_num.substring(0, Semicolon_point);

    while (Semicolon_point < Semicolon_len) {
      if (Semicolon_chip_no != '') Semicolon_chip_no += ';';
      Semicolon_chip_no += Semicolon_num.substring(Semicolon_point, Semicolon_point + 2);
      Semicolon_point += 2;
    }

    Blank_chip_no = Blank_chip_no.rtrim();
    Colon_chip_no = Colon_chip_no.rtrim();
    Semicolon_chip_no = Semicolon_chip_no.rtrim();

    const { UPD_USER_ID } = formData;
    const nextPositionNo = POSITION_NO || formData.POSITION_NO;
    request({
      method: 'POST',
      url: `${address.afterProcessing}`,
      data: {
        COMPANY_CD: 1,
        CHIP_NO,
        POSITION_NO: nextPositionNo,
        Blank_chip_no,
        Colon_chip_no,
        Semicolon_chip_no,
        CREATE_EMPNO: UPD_USER_ID,
      },
    }).then(({ response }) => {
      message.success(<MessageContent>등록정보 저장을 성공하였습니다.</MessageContent>);
      console.debug('### response : ', response);
    });
  }

  return (
    <StyledButton
      className="btn-primary btn-first"
      onClick={() => {
        position_no_generator(formData);
      }}
    >
      저장
    </StyledButton>
  );
}

Save.defaultProps = {};

Save.propTypes = {};
