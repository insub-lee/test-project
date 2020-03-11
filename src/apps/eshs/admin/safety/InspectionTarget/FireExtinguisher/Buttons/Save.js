import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import request from 'utils/request';
import { address } from 'apps/eshs/admin/safety/InspectionTarget/internal_constants';

export default function Save({ saveTask, saveBeforeProcess, onCloseModleHandler, formData, workSeq, sagaKey: id, reloadId, getListData }) {
  function position_no_generator(formData) {
    const { BUILDING_CODE, STAIR_NO, INSTALLED_LOCATION } = formData;
    request({
      method: 'POST',
      url: `${address.generatePositionNo}`,
      params: { BUILDING_CODE, STAIR_NO, INSTALLED_LOCATION },
    }).then(({ response }) => {
      console.info('@@@ res : ', response);
    });
  }

  return (
    <StyledButton
      className="btn-primary"
      onClick={() => {
        // position_no_generator(formData);
        // saveTask(id, reloadId || id, onCloseModleHandler);
        saveBeforeProcess(id, reloadId || id, saveTask);
      }}
    >
      저장
    </StyledButton>
  );
}

Save.defaultProps = {};

Save.propTypes = {};
