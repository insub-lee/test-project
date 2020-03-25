import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Input, Button } from 'antd';
const { Search } = Input;

class Header extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  handleAction = type => {
    const { saveTask, modifySaveTask, changeViewPage, viewPageData, modalSelectedRow, id } = this.props;
    const { workSeq } = viewPageData;
    const taskSeq = (modalSelectedRow && modalSelectedRow.TASK_SEQ) || -1;
    switch (type) {
      case 'INPUT':
        console.debug('여기는 INPUT', saveTask);
        saveTask();
        break;
      case 'MODIFY':
        console.debug('여기는 MODIFY', modifySaveTask);
        modifySaveTask();
        break;
      case 'SEARCH':
        if (taskSeq > -1) {
          console.debug('여기는 changeViewPage');
          changeViewPage(id, workSeq, taskSeq, 'MODIFY');
        }
        break;
      default:
        break;
    }
  };

  render() {
    const { handleModalVisible, modalSelectedRow, viewPageData } = this.props;
    const viewType = (viewPageData && viewPageData.viewType) || '';
    return (
      <>
        <Search value={modalSelectedRow.EQUIP_CD || ''} readOnly onClick={handleModalVisible} />
        <Button onClick={() => this.handleAction('SEARCH')}>검색</Button>
        <Button onClick={() => this.handleAction(viewType)}>저장</Button>
      </>
    );
  }
}

Header.propTypes = {
  handleModalVisible: PropTypes.func,
  modalSelectedRow: PropTypes.object,
  viewPageData: PropTypes.object,
  saveTask: PropTypes.func,
  modifySaveTask: PropTypes.func,
};

Header.defaultProps = {
  handleModalVisible: () => {},
  saveTask: () => {},
  modifySaveTask: () => {},
  viewPageData: {},
  modalSelectedRow: {},
};
export default Header;
