import React, { Component } from 'react';
import { Radio, Input } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';

const AntdTextArea = StyledTextarea(Input.TextArea);

class DraftDownLoad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DRAFT_PROCESS: undefined,
      OPINION: undefined,
      drmByDraft: undefined,
      drmByPrint: undefined,
      selectedDRM: undefined,
      downType: undefined,
    };
  }

  componentDidMount() {
    const { sagaKey, submitHandlerBySaga } = this.props;
    const prefixUrl = '/api/mdcs/v1/common/drmAclHandler';
    submitHandlerBySaga(sagaKey, 'GET', prefixUrl, {}, this.initAclData);
  }

  initAclData = (id, response) => {
    const { aclList } = response;
    const drmByDarft = aclList.filter(x => x.IDX === 2).length > 0 ? aclList.filter(x => x.IDX === 2)[0] : undefined;
    const drmByPrint = aclList.filter(x => x.IDX === 3).length > 0 ? aclList.filter(x => x.IDX === 3)[0] : undefined;
    this.setState({ downType: 1, selectedDRM: drmByDarft, drmByDarft, drmByPrint });
  };

  onChangeDRMRadio = e => {
    const { drmByDraft, drmByPrint } = this.state;
    if (e.target.value === 2) {
      this.setState({ downType: 2, selectedDRM: drmByPrint });
    } else {
      this.setState({ downType: 1, selectedDRM: drmByDraft });
    }
  };

  onChangeOpinion = e => {
    this.setState({ OPINION: e.target.value });
  };

  onDraftDownLoad = () => {
    const { selectedDRM, OPINION } = this.state;
    const { sagaKey, submitHandlerBySaga, onCompleteProc, selectedRow, DRAFT_PROCESS } = this.props;
    const { TITLE, WORK_SEQ, TASK_SEQ } = selectedRow;
    const draftTitle = `${TITLE} 다운로드신청`;
    const prefixUrl = '/api/workflow/v1/common/workprocess/draft';
    const draftData = {
      DRAFT_PROCESS: { ...DRAFT_PROCESS, DRAFT_TITLE: draftTitle, WORK_SEQ, TASK_SEQ, OPINION, REL_TYPE: 4, DRAFT_DATA: { ...selectedDRM, OPINION } },
    };
    submitHandlerBySaga(sagaKey, 'POST', prefixUrl, draftData, onCompleteProc);
  };

  render() {
    const { selectedRow, appvMember, onCloseDownLoad } = this.props;
    return (
      <StyledContentsWrapper>
        <div style={{ fontSize: 12, color: 'rgb(255, 36, 36)', marginBottom: 10, textAlign: 'center' }}>
          ※ 이 표준 및 도면은 MagnaChip 반도체의 자산이므로 불법 유출 시,관계법과 MagnaChip 회사 규정에 의해 처벌함.
        </div>
        <StyledHtmlTable>
          {selectedRow && (
            <>
              <table>
                <tbody>
                  <tr>
                    <th>표준 종류</th>
                    <td colSpan={3}>{selectedRow.NODE_FULLNAME}</td>
                  </tr>
                  <tr>
                    <th>표준 번호</th>
                    <td>{selectedRow.DOCNUMBER}</td>
                    <th>개정번호</th>
                    <td>{selectedRow.VERSION}</td>
                  </tr>
                  <tr>
                    <th>결재자</th>
                    <td colSpan={3}>{appvMember && appvMember.map(item => `${item.NAME_KOR} ( ${item.PSTN_NAME_KOR} ) `)}</td>
                  </tr>
                  <tr>
                    <th>요청종류</th>
                    <td colSpan={3}>
                      <Radio.Group onChange={this.onChangeDRMRadio} defaultValue={1}>
                        <Radio value={1}>기안용 Download 권한신청 </Radio>
                        <Radio value={2}>Print 권한신청</Radio>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th>요청사유</th>
                    <td colSpan={3}>
                      <AntdTextArea rows={4} onChange={this.onChangeOpinion} />
                    </td>
                  </tr>
                </tbody>
              </table>
              <StyledButtonWrapper className="btn-wrap-mt-20 btn-wrap-center">
                <StyledButton className="btn-primary btn-sm mr5" onClick={this.onDraftDownLoad}>
                  신청
                </StyledButton>
                <StyledButton className="btn-light btn-sm" onClick={onCloseDownLoad}>
                  닫기
                </StyledButton>
              </StyledButtonWrapper>
            </>
          )}
        </StyledHtmlTable>
      </StyledContentsWrapper>
    );
  }
}

export default DraftDownLoad;
