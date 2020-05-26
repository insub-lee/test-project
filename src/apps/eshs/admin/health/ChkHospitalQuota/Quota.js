import React, { Component } from 'react';
import { Input, Select } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);

class Quota extends Component {
  state = {
    hospitalList: [],
  }

  componentWillMount() {
    const{ sagaKey, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'hospitalList',
        url: `/api/eshs/v1/common/health/healthChkHospital`,
        type: 'GET',
        params: {},
      },
    ];
    getCallDataHandler(sagaKey, apiAry, this.initState);
  }

  initState = () => {
    const { result } = this.props;
    this.setState({
      hospitalList: result.hospitalList ?  result.hospitalList.list : [],
    })
  };

  render() {
    const { hospitalList } = this.state;

    return (
      <>
        <StyledContentsWrapper>
          <div className="selSaveWrapper alignLeft">
            <AntdSelect className="select-sm mr5" placeholder="검진기관 선택" style={{ width: 200 }}>
              {hospitalList.map(item => (
                <AntdSelect.Option value={item.HOSPITAL_CODE}>{item.HOSPITAL_NAME}</AntdSelect.Option>
              ))}
            </AntdSelect>
            <StyledButtonWrapper className="btn-wrap-inline">
              <StyledButton className="btn-primary btn-sm" onClick={this.getList}>검색</StyledButton>
            </StyledButtonWrapper>
          </div>
        </StyledContentsWrapper>
      </>
    );
  }
}

export default Quota;