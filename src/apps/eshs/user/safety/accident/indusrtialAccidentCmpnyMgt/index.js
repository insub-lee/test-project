import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, message, Popconfirm } from 'antd';

import BizBuilderBase from 'components/BizBuilderBase';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
import CustomList from './pages/CustomList';

const StyledButton = StyledAntdButton(Button);

class IndusrtialAccidentCmpnyMgt extends Component {
  state = {
    isLoading: true,
  };

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  inputCustomButtons = ({ ...props }) => {
    const {
      sagaKey: id,
      reloadId,
      isLoading,
      saveTask,
      changeViewPage,
      listSagaKey,
      viewPageData: { workSeq },
    } = props;
    return (
      <div className="alignRight">
        <StyledButton
          className="btn-primary btn-first"
          onClick={() => saveTask(id, reloadId, () => this.saveAfter(changeViewPage, workSeq, id, listSagaKey))}
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
    const { listSagaKey, sagaKey } = this.props;
    return (
      <>
        <BizBuilderBase
          sagaKey={sagaKey}
          listSagaKey={listSagaKey}
          workSeq={2201}
          viewType="INPUT"
          InputCustomButtons={this.inputCustomButtons}
          ModifyCustomButtons={this.modifyCustomButtons}
          loadingComplete={this.loadingComplete}
        />
        <BizBuilderBase
          sagaKey={listSagaKey}
          modifySagaKey="IndusrtialAccidentCmpnyMgt"
          CustomListPage={CustomList}
          workSeq={2201}
          viewType="LIST"
          loadingComplete={this.loadingComplete}
        />
      </>
    );
  }
}

IndusrtialAccidentCmpnyMgt.propTypes = {
  listSagaKey: PropTypes.string,
  sagaKey: PropTypes.string,
};

IndusrtialAccidentCmpnyMgt.defaultProps = {
  listSagaKey: 'IndusrtialAccidentCmpnyList',
  sagaKey: 'IndusrtialAccidentCmpnyMgt',
};

export default IndusrtialAccidentCmpnyMgt;
