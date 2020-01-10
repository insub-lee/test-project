import React, { Component } from 'react';

import { Button, Modal } from 'antd';
import BizBuilderBase from 'components/BizBuilderBase';
import ContentView from './ContentView';
class MdcsContentView extends Component {
  state = {
    modalVisible: false,
  };

  componentDidMount() {
    console.debug('component didmout!!!!');
  }

  onDocCoverClick = () => {
    this.setState({ modalVisible: true });
  };

  onDocCoverCloseClick = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    console.debug('mdcsContentview', this.props);
    const { formData, selectedRow } = this.props;
    return (
      <>
        <table>
          <tbody>
            <tr>
              <td>문서종류</td>
              <td></td>
            </tr>
            <tr>
              <td>문서번호</td>
              <td>{formData.DOCNUMBER}</td>
            </tr>
            <tr>
              <td>개정번호</td>
              <td>{formData.VERSION}</td>
            </tr>
            <tr>
              <td>제목</td>
              <td>{formData.TITLE}</td>
            </tr>
            <tr>
              <td>표지보기</td>
              <td>
                <Button onClick={this.onDocCoverClick}>표지보기</Button>
              </td>
            </tr>
            <tr>
              <td>본문내용</td>
              <td></td>
            </tr>
            <tr>
              <td>홀드중</td>
              <td></td>
            </tr>
          </tbody>
        </table>
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
