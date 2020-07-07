import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import { Select } from 'antd';
import axios from 'axios';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import ExcelUpload from '../ExcelUpload';

const AntdSelect = StyledSelect(Select);

class Upload extends Component {
  state = {
    fileInfo: {},
    CHK_TYPE_CD_NODE_ID: 2065,
  }

  componentDidMount() {
    const { sagaKey, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'chkTypeList',
        url: '/api/admin/v1/common/categoryMapList',
        type: 'POST',
        params: {
          PARAM: { NODE_ID: 675 }
        },
      },
    ];
    getCallDataHandler(sagaKey, apiAry, () => {});
  }

  onChangeFileInfo = fileInfo => {
    this.setState({ fileInfo });
  };
  
  onUploadExcel = () => {
    const { sagaKey, excelUpload, spinningOn, spinningOff, onCancelPopup } = this.props;

    const { fileInfo, CHK_TYPE_CD_NODE_ID } = this.state;
    const formData = new FormData();
    formData.append(fileInfo.uid, fileInfo);
    formData.append('startRow', 5);
    formData.append('startCell', 0);
    formData.append('CHK_TYPE_CD_NODE_ID', CHK_TYPE_CD_NODE_ID);

    const headers = {};
    spinningOn();
    excelUpload(sagaKey, '/api/eshs/v1/common/MhrsHealthChkResultExcelUpload', formData, headers, (res) => {
      spinningOff();
      if (res && res.result === 1) {
        message.success(<MessageContent>업로드를 완료하였습니다.</MessageContent>);
        onCancelPopup();
      } else {
        message.error(<MessageContent>업로드를 실패하였습니다.</MessageContent>);
      }
    });
  };

  render() {
    const { result } = this.props;

    return (
      <StyledContentsWrapper>
        <StyledCustomSearchWrapper>
          <div className="search-input-area">
            <AntdSelect
              defaultValue={this.state.CHK_TYPE_CD_NODE_ID}
              className="select-sm" style={{width: 150 }} placeholder="검진종류"
              onChange={val => this.setState({ CHK_TYPE_CD_NODE_ID: val })}
            > 
            {result && result.chkTypeList && result.chkTypeList.categoryMapList && (
              result.chkTypeList.categoryMapList.map(cate => (
                <AntdSelect.Option value={cate.NODE_ID}>{cate.NAME_KOR}</AntdSelect.Option>
              ))
            )}
            </AntdSelect>
          </div>
        </StyledCustomSearchWrapper>
        <div>
          <ExcelUpload onChangeFileInfo={this.onChangeFileInfo} />
        </div>
        <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
          <StyledButton className="btn-light btn-sm mr5" onClick={this.props.onCancelPopup}>취소</StyledButton>
          <StyledButton className="btn-primary btn-sm" onClick={this.onUploadExcel}>업로드</StyledButton>
        </StyledButtonWrapper>
      </StyledContentsWrapper>
    );
  }
}

class ChkResultUpload extends Component {
  render() {
    const { onCancelPopup } = this.props;
    return (
      <BizMicroDevBase sagaKey="ChkResultUpload" component={Upload} onCancelPopup={onCancelPopup} />
    );
  }
}

export default ChkResultUpload;
