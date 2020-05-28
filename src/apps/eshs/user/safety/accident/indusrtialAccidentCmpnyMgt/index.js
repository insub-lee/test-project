import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, message, Popconfirm } from 'antd';

import BizBuilderBase from 'components/BizBuilderBase';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
import CustomList from 'apps/eshs/user/safety/accident/indusrtialAccidentCmpnyMgt/pages/CustomList';
const StyledButton = StyledAntdButton(Button);

class IndusrtialAccidentCmpnyMgt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      setDefaultValueFlag: false,
    };
  }

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  inputCustomButtons = ({ ...inputProps }) => {
    const {
      sagaKey: id,
      reloadId,
      isLoading,
      saveTask,
      changeViewPage,
      listSagaKey,
      inputMetaSeq,
      viewPageData: { workSeq },
      setFormData,
      formData,
    } = inputProps;
    const { saveAfter, initFormData } = this.props;
    const { setDefaultValueFlag } = this.state;
    const bizRegNo = (formData && formData.BIZ_REG_NO) || '';

    if (JSON.stringify(initFormData) !== '{}' && !bizRegNo && !setDefaultValueFlag) {
      setFormData(id, { ...formData, ...initFormData });
      this.setState({ setDefaultValueFlag: true });
    }

    return (
      <div className={inputMetaSeq === 2227 ? 'alignRight' : 'alignCenter'}>
        <StyledButton
          className="btn-primary btn-first"
          onClick={() => saveTask(id, reloadId, typeof saveAfter === 'function' ? saveAfter : () => this.saveAfter(changeViewPage, workSeq, id, listSagaKey))}
          loading={isLoading}
        >
          저장
        </StyledButton>
      </div>
    );
  };

  modifyCustomButtons = ({ ...props }) => {
    const {
      sagaKey: id,
      reloadId,
      saveBeforeProcess,
      listSagaKey,
      viewPageData,
      viewPageData: { workSeq, taskSeq },
      changeViewPage,
      modifyTask,
      deleteTask,
      isLoading,
    } = props;
    return (
      <div className="alignRight">
        <StyledButton
          className="btn-primary btn-first"
          onClick={() => modifyTask(id, reloadId, () => changeViewPage(listSagaKey, workSeq, -1, 'LIST'))}
          loading={isLoading}
        >
          수정
        </StyledButton>
        <Popconfirm
          title="Are you sure ?"
          onConfirm={() => deleteTask(id, listSagaKey, workSeq, taskSeq, () => changeViewPage(id, workSeq, -1, 'INPUT'))}
          okText="Yes"
          cancelText="No"
        >
          <StyledButton className="btn-primary btn-first">미사용</StyledButton>
        </Popconfirm>
        <StyledButton className="btn-primary" onClick={() => changeViewPage(id, viewPageData.workSeq, -1, 'INPUT')}>
          RESET
        </StyledButton>
      </div>
    );
  };

  saveAfter = (changeViewPage, workSeq, sagaKey, listSagaKey) => {
    changeViewPage(sagaKey, workSeq, -1, 'INPUT');
    changeViewPage(listSagaKey, workSeq, -1, 'LIST');
  };

  render() {
    const { listSagaKey, sagaKey, inputMetaSeq, initFormData } = this.props;
    return (
      <>
        <BizBuilderBase
          sagaKey={sagaKey}
          listSagaKey={listSagaKey}
          workSeq={2201}
          inputMetaSeq={inputMetaSeq}
          viewType="INPUT"
          InputCustomButtons={this.inputCustomButtons}
          ModifyCustomButtons={this.modifyCustomButtons}
          loadingComplete={this.loadingComplete}
          initFormData={initFormData}
        />
        {inputMetaSeq === 2227 && (
          <BizBuilderBase
            sagaKey={listSagaKey}
            modifySagaKey="IndusrtialAccidentCmpnyMgt"
            CustomListPage={CustomList}
            workSeq={2201}
            viewType="LIST"
            loadingComplete={this.loadingComplete}
          />
        )}
      </>
    );
  }
}
// 8921 -- 미등록 업체 등록페이지
IndusrtialAccidentCmpnyMgt.propTypes = {
  listSagaKey: PropTypes.string,
  sagaKey: PropTypes.string,
  inputMetaSeq: PropTypes.number,
  saveAfter: PropTypes.any,
  initFormData: PropTypes.object,
};

IndusrtialAccidentCmpnyMgt.defaultProps = {
  listSagaKey: 'IndusrtialAccidentCmpnyList',
  sagaKey: 'IndusrtialAccidentCmpnyMgt',
  inputMetaSeq: 2227,
  saveAfter: undefined,
  initFormData: {},
};

export default IndusrtialAccidentCmpnyMgt;
