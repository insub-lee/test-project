import React, { Component } from 'react';
import { Popconfirm } from 'antd';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import BizBuilderBase from 'components/BizBuilderBase';

import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

class Hazard extends Component {
  componentDidMount() {}

  handleCustomAction = (id, formData, changeFormData, onChangeSave, type, validationCkNeed) => {
    let isValid = true;
    const itemList = (formData && formData.HAZARD_LIST) || [];
    const endYn = formData.END_YN; // 완료여부
    // 벨리데이션 결과
    if (validationCkNeed === 'Y') {
      isValid = this.validChecker(itemList);
    }

    // 메세지 지정
    let msg = '위험요인 List를 저장하였습니다.';
    switch (type) {
      case 'D':
        msg = '위험요인 List를 삭제하였습니다.';
        break;
      case 'Y':
        msg = '위험요인 List를 완료하였습니다.';
        break;
      default:
        break;
    }

    if (isValid && endYn === 'N') {
      changeFormData(id, 'END_YN', type);
      onChangeSave('M');
      message.info(<MessageContent>{msg}</MessageContent>);
    }
    if (endYn === 'Y') {
      message.info(
        <MessageContent>완료가 된 위험요인 List-up 입니다. 해당항목은 수정 및 저장이 불가능합니다.</MessageContent>,
      );
    }
  };

  validChecker = hazardList => {
    const itemListYn = hazardList.length;
    if (itemListYn > 0) {
      const checkedItem = hazardList.filter(item => item.CHK === 'Y');
      if (checkedItem.length === 0) {
        message.info(<MessageContent>저장할 위험요인 List를 선택하세요.</MessageContent>);
        return false;
      }
      let allowYn = true;
      let msg = '';
      checkedItem.forEach(item => {
        const workNm = item.WORK_NM;
        const aocId = item.AOC_ID;
        const aotId = item.AOT_ID;
        if (aocId === '[]') {
          msg = `[사고의 발생원인] 중 1개이상을 선택하셔야 합니다.`;
          allowYn = false;
        }
        if (!aotId > 0) {
          msg = `[사고의 발생유형]을 선택해주세요.`;
          allowYn = false;
        }
        if (workNm === null || workNm === '' || workNm === undefined) {
          msg = `[위험요인]을 작성해주세요.`;
          allowYn = false;
        }
      });
      if (msg !== '') {
        message.info(<MessageContent>{msg}</MessageContent>);
      }
      return allowYn;
    }
    message.info(<MessageContent>저장할 위험요인 List가 존재하지 않습니다.</MessageContent>);
    return false;
  };

  modifyCustomButtons = ({ ...modifyProps }) => {
    const { onChangeSave, sagaKey: id, changeFormData, changeViewPage, viewPageData, formData } = modifyProps;
    return (
      <>
        <StyledButton
          className="btn-primary btn-first btn-xs"
          onClick={() => this.handleCustomAction(id, formData, changeFormData, onChangeSave, 'N', 'N')}
        >
          저장
        </StyledButton>
        <Popconfirm
          title="정말로 삭제하시겠습니까?"
          onConfirm={() => this.handleCustomAction(id, formData, changeFormData, onChangeSave, 'D', 'N')}
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
          onClick={() => this.handleCustomAction(id, formData, changeFormData, onChangeSave, 'Y', 'Y')}
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
