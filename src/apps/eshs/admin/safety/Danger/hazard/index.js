import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popconfirm } from 'antd';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import BizBuilderBase from 'components/BizBuilderBase';

import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

class Hazard extends Component {
  componentDidMount() {}

  handleCustomAction = (id, formData, changeFormData, afterCallBack, type, validationCkNeed) => {
    // validation
    const itemList = (formData && formData.HAZARD_LIST) || [];
    const endYn = formData.END_YN; // 완료여부

    if (endYn === 'Y') {
      message.info(
        <MessageContent>완료가 된 위험요인 List-up 입니다. 해당항목은 수정 및 저장이 불가능합니다.</MessageContent>,
      );
      return false;
    }

    if (validationCkNeed === 'Y') {
      const itemListYn = itemList.length;
      if (itemListYn !== 0) {
        let chkCnt = 0;
        for (let i = 0; i < itemList.length; i + 1) {
          const workNm = itemList[i].WORK_NM;
          const aocId = itemList[i].AOC_ID;
          const chk = itemList[i].CHK;
          if (workNm === null || workNm === '' || workNm === undefined) {
            message.info(<MessageContent>[위험요인]을 작성해주세요.</MessageContent>);
            return false;
          }
          if (aocId === '[]') {
            message.info(<MessageContent>[사고의발생원인] 중 1개이상을 선택하셔야 합니다.</MessageContent>);
            return false;
          }
          if (chk === 'Y') {
            // eslint-disable-next-line no-plusplus
            chkCnt++;
          }
        }
        if (chkCnt === 0) {
          message.info(<MessageContent>저장할 위험요인 List를 선택하세요.</MessageContent>);
          return false;
        }
      } else {
        message.info(<MessageContent>저장할 위험요인 List가 존재하지 않습니다.</MessageContent>);
        return false;
      }
    }
    changeFormData(id, 'END_YN', type);
    return afterCallBack();
  };

  modifyCustomButtons = ({ ...modifyProps }) => {
    const { onChangeSave, sagaKey: id, changeFormData, changeViewPage, viewPageData, formData } = modifyProps;
    return (
      <>
        <StyledButton
          className="btn-primary btn-first btn-xs"
          onClick={() => this.handleCustomAction(id, formData, changeFormData, () => onChangeSave('M'), '', 'N')}
        >
          저장
        </StyledButton>
        <Popconfirm
          title="정말로 삭제하시겠습니까?"
          onConfirm={() => this.handleCustomAction(id, formData, changeFormData, () => onChangeSave('M'), 'D', 'N')}
          okText="Yes"
          cancelText="No"
        >
          <StyledButton className="btn-light btn-first btn-xs">삭제</StyledButton>
        </Popconfirm>
        <StyledButton
          className="btn-light btn-xs mr5"
          onClick={() => changeViewPage(id, viewPageData.workSeq, -1, 'INPUT')}
        >
          초기화
        </StyledButton>
        <StyledButton
          className="btn-primary btn-xs"
          onClick={() => this.handleCustomAction(id, formData, changeFormData, () => onChangeSave('M'), 'Y', 'Y')}
        >
          완료
        </StyledButton>
      </>
    );
  };

  render() {
    return (
      <BizBuilderBase
        sagaKey="hazard"
        workSeq={12061}
        viewType="INPUT"
        InputCustomButtons={() => null}
        ModifyCustomButtons={() => null}
        ListCustomButtons={() => null}
        ViewCustomButtons={() => null}
        EshsSearchBarModifyCustomButtons={this.modifyCustomButtons}
        loadingComplete={this.loadingComplete}
        conditional={`AND W.END_YN IN ('Y', 'N')`}
      />
    );
  }
}

Hazard.propTypes = {};

Hazard.defaultProps = {};

export default Hazard;
