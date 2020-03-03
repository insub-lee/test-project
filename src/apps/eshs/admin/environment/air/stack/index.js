import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import { Modal, Input } from 'antd';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import CustomList from './List';
import CustomInput from './Input';
import CustomModify from './Modify';

class Stack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchModal: false,
      selectedTaskSeq: -1,
      stackCd: '',
      CustomViewType: 'INPUT',
    };
  }

  componentDidMount() {}

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  isModalData = rowData => {
    console.log(rowData, 'rowData');
    this.setState({ isSearchModal: false, selectedTaskSeq: rowData.TASK_SEQ, CustomViewType: 'MODIFY', stackCd: rowData.STACK_CD }, () => this.mainTemplate());
  };

  onCancel = () => {
    this.setState({
      isSearchModal: false,
    });
  };

  onReset = () => {
    this.setState({
      isSearchModal: false,
      selectedTaskSeq: -1,
      stackCd: '',
      CustomViewType: 'INPUT',
    });
  };

  onShowModalTemplate = () => (
    <BizBuilderBase
      sagaKey="stackListModal"
      baseSagaKey="stack"
      CustomListPage={CustomList}
      workSeq={3741}
      taskSeq={-1}
      viewType="LIST"
      loadingComplete={this.loadingComplete}
      isOpenModalChange={this.isModalData}
    />
  );

  mainTemplate = sagakey => (
    <BizBuilderBase
      sagaKey={sagakey}
      workSeq={3741}
      taskSeq={this.state.selectedTaskSeq}
      viewType={this.state.CustomViewType}
      CustomInputPage={CustomInput}
      CustomModifyPage={CustomModify}
      loadingComplete={this.loadingComplete}
    />
  );

  render() {
    return (
      <>
        <StyledViewDesigner>
          <Sketch>
            <Group>
              <StyledSearchWrap>
                <div>
                  <span>Stack번호</span>
                  <Input
                    style={{ width: '250px', margin: '5px', cursor: 'pointer' }}
                    value={this.state.stackCd}
                    onClick={() => this.setState({ isSearchModal: true })}
                    placeholder="여기를 클릭해주세요."
                  />
                  <StyledButton className="btn-primary" onClick={() => this.onReset()}>
                    Search
                  </StyledButton>
                </div>
              </StyledSearchWrap>
            </Group>
          </Sketch>
        </StyledViewDesigner>
        {/* {this.state.selectedTaskSeq === -1 ? this.mainTemplate('stack') : this.mainTemplate('stackModify')} */}
        {this.state.selectedTaskSeq === -1 && this.mainTemplate('stack')}
        {this.state.selectedTaskSeq !== -1 && this.mainTemplate('stackModify')}
        <Modal visible={this.state.isSearchModal} width="1000px" onCancel={this.onCancel} destroyOnClose footer={[]}>
          {this.state.isSearchModal && this.onShowModalTemplate()}
        </Modal>
      </>
    );
  }
}

Stack.propTypes = {};

Stack.defaultProps = {};

export default Stack;
