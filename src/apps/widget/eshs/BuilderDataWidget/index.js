import React, { Component } from 'react';
import { Icon, Modal } from 'antd';

import BizBuilderBase from 'components/BizBuilderBase';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledBuilderDataWidget from './StyledBuilderDataWidget';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import history from 'utils/history';

const AntdModal = StyledAntdModal(Modal);

class BuilderDataList extends Component {
  state = {
    isShow: false,
    taskSeq: -1
  }

  onClickRow = row => {
    this.setState({ 
      isShow: true,
      taskSeq: row.TASK_SEQ
    });
  };

  onCancelPopup = () => {
    this.setState({ isShow: false });
  };

  render() {
    const { listData, item } = this.props;

    return (
      <>
        <AntdModal
          width={700}
          visible={this.state.isShow}
          title="공지사항"
          onCancel={this.onCancelPopup}
          destroyOnClose
          footer={null}
        >
          <BizBuilderBase
            sagaKey="BuilderDataWidgetView"
            viewType="VIEW"
            workSeq={item.data.WORK_SEQ}
            taskSeq={this.state.taskSeq}
            ViewCustomButtons={() => (
              <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
                <StyledButton className="btn-light btn-sm" onClick={this.onCancelPopup}>닫기</StyledButton>
              </StyledButtonWrapper>
            )}
          />
        </AntdModal>
        <StyledBuilderDataWidget>
          <div className="section-body">
            <ul className="section-contents-board">
            {listData && listData.length > 0 && listData.map((row, idx) => (
              idx < 5 && (
                <li>
                  <a href="javascript:void(0);" onClick={() => this.onClickRow(row)}>
                    <span className="board-txt">{row.TITLE}</span>
                  </a>
                </li>
              )
            ))}
            </ul>
          </div>
          <StyledButtonWrapper className="btn-wrap-center">
            <StyledButton className="btn-link" onClick={() => history.push(`${item.data.MORE_URL}`)}><Icon type="plus" /> 더보기</StyledButton>
          </StyledButtonWrapper>
        </StyledBuilderDataWidget>

      </>
    );
  }
}

class BuilderDataWidget extends Component {
  render() {
    const { item } = this.props;
    return (
      <BizBuilderBase sagaKey={`BuilderBasicList_${item.WIDGET_ID}`} viewType="LIST" CustomListPage={BuilderDataList} workSeq={item.data.WORK_SEQ} item={item} />
    );
  }
}

export default BuilderDataWidget;