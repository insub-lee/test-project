import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Input, Table } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
// import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
// import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';

import BizMicroDevBase from 'components/BizMicroDevBase';

// const AntdInput = StyledInput(Input);
const AntdTable = StyledAntdTable(Table);

class Comp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount = () => {
    const { sagaKey, selectedRow, spinningOn, spinningOff, getCallDataHandlerReturnRes } = this.props;
    spinningOn();
    const apiInfo = {
      key: 'list',
      url: '/api/eshs/v1/common/health/healthChkSpecialTargetDetailList',
      type: 'POST',
      params: {
        PARAM: {
          ...selectedRow,
        },
      },
    };

    getCallDataHandlerReturnRes(sagaKey, apiInfo, (id, res) => {
      this.setState(
        {
          list: res?.list || [],
        },
        spinningOff,
      );
    });
  };

  columns = [
    {
      title: '지역',
      dataIndex: 'SITE',
      align: 'center',
      width: '10%',
    },
    {
      title: 'AREA',
      dataIndex: 'AREA',
      align: 'center',
      width: '10%',
    },
    {
      title: 'BAY',
      dataIndex: 'BAY',
      align: 'center',
      width: '10%',
    },
    {
      title: '층',
      dataIndex: 'FLOOR',
      align: 'center',
      width: '10%',
    },
    {
      title: '장비',
      dataIndex: 'MACHINE',
      align: 'center',
      width: '15%',
    },
    {
      title: '물질명',
      dataIndex: 'MATERIALNM',
      align: 'center',
      width: '25%',
    },
    {
      title: 'CASNO',
      dataIndex: 'CASNO',
      align: 'center',
      width: '20%',
    },
  ];

  render = () => (
    <StyledContentsWrapper>
      <div className="div-comment" style={{ textAlign: 'left' }}>
        ※ 반장 모든 BAY적용
      </div>
      <AntdTable columns={this.columns} dataSource={this.state.list} rowKey="SEQ" bordered />
      <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
        <StyledButton className="btn-light btn-sm" onClick={this.props.onCancelPopup}>
          닫기
        </StyledButton>
      </StyledButtonWrapper>
    </StyledContentsWrapper>
  );
}

Comp.propTypes = {
  selectedRow: PropTypes.object,
  onCancelPopup: PropTypes.func,
  sagaKey: PropTypes.string,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
  getCallDataHandlerReturnRes: PropTypes.func,
};

Comp.defaultProps = {
  selectedRow: {},
  onCancelPopup: () => undefined,
  spinningOn: () => undefined,
  spinningOff: () => undefined,
  getCallDataHandlerReturnRes: () => undefined,
};

const SpecialMaterialList = ({ selectedRow, onCancelPopup }) => (
  <BizMicroDevBase sagaKey="SpecialMaterialList" selectedRow={selectedRow} onCancelPopup={onCancelPopup} component={Comp}></BizMicroDevBase>
);

SpecialMaterialList.propTypes = {
  selectedRow: PropTypes.object,
  onCancelPopup: PropTypes.func,
};

export default SpecialMaterialList;
