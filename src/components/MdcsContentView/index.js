import React, { Component } from 'react';

import { Button, Modal } from 'antd';
import BizBuilderBase from 'components/BizBuilderBase';
import StyledTable from 'components/CommonStyled/StyledTable';
import StyledModalWrapper from 'components/CommonStyled/StyledModalWrapper';
import ContentView from './ContentView';

const ModalWrapper = StyledModalWrapper(Modal);

class MdcsContentView extends Component {
  state = {
    modalVisible: false,
  };

  componentDidMount = () => {
    const { sagaKey, getExtraApiData, formData } = this.props;
    const apiArys = [
      {
        key: 'fullPathName',
        url: '/api/admin/v1/common/categoryFullPathNm',
        type: 'POST',
        params: { PARAM: { NODE_ID: formData.NODE_ID } },
      },
    ];
    getExtraApiData(sagaKey, apiArys);
  };

  onDocCoverClick = () => {
    this.setState({ modalVisible: true });
  };

  onDocCoverCloseClick = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    const { formData, selectedRow, extraApiData } = this.props;
    return (
      <>
        <StyledTable>
          <table>
            <tbody>
              <tr>
                <th style={{ width: '100px' }}>문서종류</th>
                <td colSpan={3}>
                  {extraApiData && extraApiData.fullPathName && extraApiData.fullPathName.fullPath_Nm && extraApiData.fullPathName.fullPath_Nm.FULLPATH_NM}
                </td>
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
