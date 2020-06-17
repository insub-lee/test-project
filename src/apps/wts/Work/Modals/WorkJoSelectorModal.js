import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';

import { List, AutoSizer } from 'react-virtualized';
import StyledModalContent from 'apps/wts/components/CommonStyledElement/StyledModalContent';
import StyledVirtualizedList from 'apps/wts/components/CommonStyledElement/StyledVirtualizedList';

import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import service from '../service';

class WorkJoSelectorModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      checkedList: [],
      newUsers: [],
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleAfterOpen = this.handleAfterOpen.bind(this);
    this.rowRenderer = this.rowRenderer.bind(this);
    this.handleClickList = this.handleClickList.bind(this);
    this.handleSetWorkJo = this.handleSetWorkJo.bind(this);
    this.postNewUsers = this.postNewUsers.bind(this);
  }

  handleClickList(index) {
    this.setState({ checkedList: [index] });
  }

  handleOpenModal(newUsers) {
    this.setState({ isOpen: true, newUsers });
  }

  handleCloseModal() {
    this.setState({ isOpen: false, newUsers: [], checkedList: [] });
  }

  handleAfterOpen() {}

  rowRenderer(index, key, style) {
    const { checkedList } = this.state;
    const { list } = this.props;
    return (
      <button
        type="button"
        aria-pressed="false"
        key={key}
        className={`row ${checkedList.includes(index) ? 'row_checked' : ''}`}
        style={{
          ...style,
          textAlign: 'center',
        }}
        onClick={() => this.handleClickList(index)}
      >
        <span>{`${list[index].area} ${list[index].workjo} ${list[index].part} ${list[index].usrnm} ${list[index].position}`}</span>
      </button>
    );
  }

  handleSetWorkJo() {
    const { checkedList, newUsers } = this.state;
    const { list } = this.props;
    if (checkedList.length > 0) {
      const { area, part, workjo } = list[checkedList[0]];
      const users = newUsers.map(newUser => ({
        area,
        part,
        workJo: workjo,
        bay: '미배정',
        empNo: newUser.usrid,
        sex: newUser.sex,
        usrNm: newUser.usrnm,
        position: newUser.POSITION,
      }));
      const payload = {
        users,
      };
      this.postNewUsers(payload).then(result => {
        console.debug(result);
        if (result) {
          const { callbackHandler } = this.props;
          this.handleCloseModal();
          callbackHandler();
        } else {
          alert('서버 에러');
        }
      });
    }
  }

  async postNewUsers(payload) {
    let result = false;
    const { response, error } = await service.manHisAdmin.post(payload);
    if (response && !error) {
      result = response.insertyn;
    }
    return result;
  }

  render() {
    const { isOpen } = this.state;
    const { list, title } = this.props;
    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.handleCloseModal}
        style={{
          width: 500,
        }}
        bodyStyle={{
          padding: 0,
        }}
        closable={false}
        destroyOnClose
      >
        <div>
          <StyledModalContent>
            <div className="pop_tit">
              {title}
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              {/* Todo - use tabs but check only one! */}
              <StyledVirtualizedList minHeight={500}>
                <AutoSizer>
                  {({ height, width }) => (
                    <List
                      className="row_list"
                      height={height}
                      rowRenderer={({ index, key, style }) => this.rowRenderer(index, key, style)}
                      rowCount={list.length || 0}
                      rowHeight={50}
                      width={width}
                    />
                  )}
                </AutoSizer>
              </StyledVirtualizedList>
              <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
                <StyledButton type="button" className="btn-primary btn-sm mr5" onClick={this.handleSetWorkJo}>
                  확인
                </StyledButton>
                <StyledButton type="button" className="btn-light btn-sm" onClick={this.handleCloseModal}>
                  취소
                </StyledButton>
              </StyledButtonWrapper>
            </div>
          </StyledModalContent>
        </div>
      </Modal>
    );
  }
}

WorkJoSelectorModal.propTypes = {
  title: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.object),
  callbackHandler: PropTypes.func,
};

WorkJoSelectorModal.defaultProps = {
  title: '',
  list: [],
  callbackHandler: () => false,
};

export default WorkJoSelectorModal;
