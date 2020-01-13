import React, { Component } from 'react';

import { Button, Modal } from 'antd';
import BizBuilderBase from 'components/BizBuilderBase';
import StyledTable from 'components/CommonStyled/StyledTable';
import ContentView from './ContentView';

class MdcsContentView extends Component {
  state = {
    modalVisible: false,
  };

  onDocCoverClick = () => {
    this.setState({ modalVisible: true });
  };

  onDocCoverCloseClick = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    const { formData, selectedRow } = this.props;
    return (
      <>
        <StyledTable>
          <table>
            <tbody>
              <tr>
                <th style={{ width: '100px' }}>문서종류</th>
                <td colSpan={3}></td>
              </tr>
              <tr>
                <th style={{ width: '100px' }}>제목</th>
                <td colSpan={3}>{formData.TITLE}</td>
              </tr>
              <tr>
                <th style={{ width: '100px' }}>문서번호</th>
                <td style={{ width: '200px' }}>{formData.DOCNUMBER}</td>
                <th style={{ width: '100px' }}>개정번호</th>
                <td style={{ width: '200px' }}>{formData.VERSION}</td>
              </tr>
              <tr>
                <th style={{ width: '100px' }}>표지보기</th>
                <td style={{ width: '200px' }}>
                  <Button icon="file-text" onClick={this.onDocCoverClick}>
                    표지보기
                  </Button>
                </td>
                <th style={{ width: '100px' }}>결재상태</th>
                <td style={{ width: '200px' }}></td>
              </tr>
              <tr>
                <th style={{ width: '100px' }}>본문내용</th>
                <td colSpan={3}></td>
              </tr>
            </tbody>
          </table>
        </StyledTable>
        <Modal
          title="문서표지"
          style={{ top: '10px', padding: '10px' }}
          visible={this.state.modalVisible}
          width={900}
          onCancel={this.onDocCoverCloseClick}
          destroyOnClose
        >
          <BizBuilderBase
            sagaKey="approveBase_approveView_1"
            viewType="VIEW"
            workSeq={selectedRow && selectedRow.WORK_SEQ}
            taskSeq={selectedRow && selectedRow.TASK_SEQ}
            draftId={selectedRow && selectedRow.DRAFT_ID}
            metaSeq={selectedRow && selectedRow.RULE_CONFIG.META_SEQ}
          />
        </Modal>
      </>
    );
  }
}

export default MdcsContentView;
