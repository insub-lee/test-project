import React, { Component } from 'react';

import { Button, Modal } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import BizBuilderBase from 'components/BizBuilderBase';
import StyledTable from 'components/CommonStyled/StyledTable';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import StyledModalWrapper from 'components/CommonStyled/StyledModalWrapper';
import ContentView from './ContentView';

const ModalWrapper = StyledModalWrapper(Modal);

class MdcsContentView extends Component {
  state = {
    modalVisible: false,
    fullPathNm: undefined,
  };

  initDataBind = (id, response) => {
    const { fullPath_Nm } = response;
    const FULLPATH_NM = fullPath_Nm && fullPath_Nm.FULLPATH_NM;
    this.setState({ fullPathNm: FULLPATH_NM });
  };

  componentDidMount = () => {
    console.debug('this.props componentDidMount', this.props);
    const { sagaKey, submitExtraHandler, formData } = this.props;
    const submitUrl = '/api/admin/v1/common/categoryFullPathNm';
    const submitData = { PARAM: { NODE_ID: formData.NODE_ID } };
    submitExtraHandler(sagaKey, 'POST', submitUrl, submitData, this.initDataBind);
  };

  componentDidUpdate = prevProps => {
    const { sagaKey, submitExtraHandler, formData } = this.props;
    const { viewType } = this.props;
    if (viewType && viewType !== prevProps.viewType) {
      const submitUrl = '/api/admin/v1/common/categoryFullPathNm';
      const submitData = { PARAM: { NODE_ID: formData.NODE_ID } };
      submitExtraHandler(sagaKey, 'POST', submitUrl, submitData, this.initDataBind);
    }
  };

  onDocCoverClick = () => {
    this.setState({ modalVisible: true });
  };

  onDocCoverCloseClick = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    const { formData, selectedRow } = this.props;
    const { fullPathNm } = this.state;
    return (
      <>
        <StyledTable>
          <table>
            <tbody>
              <tr>
                <th style={{ width: '100px' }}>문서종류</th>
                <td colSpan={3}>{fullPathNm}</td>
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
                  <StyledButton className="btn-primary  btn-sm" onClick={this.onDocCoverClick}>
                    <FileSearchOutlined /> 표지보기
                  </StyledButton>
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
        <ModalWrapper
          title="문서표지"
          style={{ padding: '10px' }}
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
        </ModalWrapper>
      </>
    );
  }
}

export default MdcsContentView;
