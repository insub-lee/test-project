import React, { Component } from 'react';
import { Input, Modal, Popconfirm } from 'antd';

import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';

import CustomWorkProcess from 'apps/Workflow/CustomWorkProcess';
import AppLineBtn from 'apps/eshs/common/Workflow/AppLineBtn';
import { saveProcessRule, getProcessRule } from 'apps/eshs/common/workProcessRule';

const AntdModal = StyledAntdModal(Modal);
class SubResourceDispReq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalObj: {
        title: '',
        visible: false,
        content: [],
      },
      processRule: {},
      currentTaskSeq: -1,
    };
  }

  componentDidMount() {}

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  handleModal = (title = '', visible = false, content = []) => this.setState({ modalObj: { title, visible, content } });

  saveProcessRule = builderProps => {
    const { processRule } = this.state;
    const { relKey, relKey2, formData } = builderProps;

    saveProcessRule({
      ...processRule,
      DRAFT_DATA: {},
      REL_KEY: relKey,
      REL_KEY2: formData[relKey2],
      DRAFT_TITLE: `의뢰번호(${formData[relKey2]})`,
      TASK_SEQ: formData?.TASK_SEQ,
      WORK_SEQ: formData?.WORK_SEQ,
    });
  };

  setModifyCustomButtons = builderProps => {
    const { sagaKey: id, prcId: PRC_ID, formData, onChangeSave, changeViewPage, viewPageData, relKey, relKey2, profile } = builderProps;
    const { processRule, currentTaskSeq } = this.state;
    if (currentTaskSeq !== formData?.TASK_SEQ) {
      this.setState({
        currentTaskSeq: formData?.TASK_SEQ,
        processRule: {},
      });
      return [];
    }

    // 문서상태가 (저장(0) OR 부결(4F)) and 문서작성자와 로그인한사람이 같을 경우
    const flag1 = ((formData?.APP_STATUS === '0' || formData?.APP_STATUS === '2F') && formData?.REG_USER_ID === profile?.USER_ID) || false;
    // 문서상태 결재중
    const flag2 = formData?.APP_STATUS !== '0';
    // 문서상태 결재완료(4A)
    const flag3 = formData?.APP_STATUS === '4A';

    const customButtonsRef = [
      {
        text: '저장',
        onClick: () => onChangeSave('M'),
        className: 'btn-primary btn-first  btn-sm',
        visible: flag1,
        popconfirm: false,
        message: '',
      },
      {
        text: '삭제',
        onClick: () => onChangeSave('D'),
        className: 'btn-light btn-first  btn-sm',
        visible: flag1,
        popconfirm: true,
        message: '정말로 삭제하시겠습니까?',
      },
      {
        text: '초기화',
        onClick: () => changeViewPage(id, viewPageData.workSeq, -1, 'INPUT'),
        className: 'btn-light  btn-sm mr5',
        visible: true,
        popconfirm: false,
        message: '',
      },
      {
        text: '상신',
        onClick: () => this.saveProcessRule(builderProps),
        className: 'btn-primary btn-first  btn-sm',
        visible: flag1,
        popconfirm: true,
        message: '상신하시겠습니까?',
      },
      {
        text: '결재선 확인',
        onClick: () =>
          this.handleModal(`[${formData?.DOC_NO}] 결재선`, true, [
            <CustomWorkProcess PRC_ID={PRC_ID} draftId={formData?.DRAFT_ID || -1} viewType="VIEW" statusVisible />,
          ]),
        className: 'btn-primary btn-first  btn-sm',
        visible: flag2,
      },
      {
        text: '인쇄',
        onClick: () => {},
        className: 'btn-primary btn-first  btn-sm',
        visible: flag3,
      },
    ];

    const customButtons = customButtonsRef
      .filter(btn => btn.visible)
      .map((btn, index) => {
        if (btn?.popconfirm) {
          return (
            <Popconfirm key={`CUSTOMBUTTON_${index}`} title={btn?.message} onConfirm={btn?.onClick} okText="Yes" cancelText="No">
              <StyledButton className={btn?.className}>{btn?.text}</StyledButton>
            </Popconfirm>
          );
        }
        return (
          <StyledButton key={`CUSTOMBUTTON_${index}`} className={btn?.className} onClick={btn?.onClick}>
            {btn?.text}
          </StyledButton>
        );
      });

    // 결재라인지정 컴포넌트 추가
    if (flag1) {
      customButtons.push(
        <AppLineBtn
          key="appLine"
          prcId={PRC_ID}
          draftId={formData?.DRAFT_ID}
          processRule={processRule}
          setProcessRule={prcRule => this.setState({ processRule: prcRule })}
        />,
      );
    }

    return customButtons;
  };

  render() {
    const { modalObj } = this.state;
    return (
      <>
        <BizBuilderBase
          sagaKey="subResourceDispReq"
          workSeq={4981}
          relType={100}
          viewType="INPUT"
          loadingComplete={this.loadingComplete}
          InputCustomButtons={() => null}
          relKey="폐기물 처리 요청서"
          relKey2="TITLE"
          prcId={108}
          EshsSearchBarModifyCustomButtons={this.setModifyCustomButtons}
          ModifyCustomButtons={() => []}
          ViewCustomButtons={() => []}
        />
        <AntdModal width={850} visible={modalObj.visible} title={modalObj.title || ''} onCancel={() => this.handleModal()} destroyOnClose footer={null}>
          {modalObj.content}
        </AntdModal>
      </>
    );
  }
}

SubResourceDispReq.propTypes = {};

SubResourceDispReq.defaultProps = {};

export default SubResourceDispReq;
