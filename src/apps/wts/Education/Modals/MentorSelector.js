import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';

import { AutoSizer, List } from 'react-virtualized';
import { jsonToQueryString } from 'utils/helpers';
import StyledVirtualizedList from 'apps/wts/components/CommonStyledElement/StyledVirtualizedList';
import StyledContent from './StyledContent';
import service from '../service';

class MentorSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      data: [],
      selectedMentor: '',
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleAfterOpen = this.handleAfterOpen.bind(this);
    this.fetchMentors = this.fetchMentors.bind(this);
    this.handleSelectRow = this.handleSelectRow.bind(this);
    this.rowRenderer = this.rowRenderer.bind(this);
    this.initData = this.initData.bind(this);
  }

  handleOpenModal(empno, selectedMentor = '') {
    // Todo - Fetch moentor list...
    const { usrId } = this.props;
    this.setState({ isOpen: true, data: [], empno, selectedMentor }, () => {
      this.initData(usrId);
    });
  }

  initData(usrId) {
    this.fetchMentors(usrId).then(({ data }) => {
      this.setState({ data });
    });
  }

  handleCloseModal() {
    this.setState({ isOpen: false });
  }

  handleAfterOpen() {
    const { id } = this.state;
  }

  handleChangeGongNo(e) {
    const { value } = e.target;
    this.setState({ selectedGongNo: value });
  }

  async fetchMentors(usrId) {
    const requestQuery = {
      type: 'eduMentoList',
      usrId,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.manage.get(queryString);
    if (response && !error) {
      const { eduMentoList } = response;
      return {
        data: eduMentoList.map(({ empno, usrnm }) => ({
          key: empno,
          label: usrnm,
        })),
      };
    }
    return {
      data: [],
    };
  }

  rowRenderer(index, key, style) {
    const { data, selectedMentor } = this.state;
    // Todo - add selected mentor color...
    return (
      <button type="button" aria-pressed="false" key={key} className="row" style={style} onClick={() => this.handleSelectRow(data[index].key)}>
        {`${data[index].key} ${data[index].label}`}
      </button>
    );
  }

  handleSelectRow(row) {
    if (window.confirm('선택하신 사원을 멘토로 지정하시겠습니까?')) {
      // Todo - Save Mentor Info
    }
  }

  render() {
    const { isOpen, data } = this.state;
    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.handleCloseModal}
        style={{
          width: 400,
        }}
        bodyStyle={{
          padding: 0,
        }}
        closable={false}
        destroyOnClose
      >
        <div>
          <StyledContent>
            <div className="pop_tit">
              Mentor 선택하기
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <StyledVirtualizedList minHeight={500}>
                <AutoSizer>
                  {({ height, width }) => (
                    <List
                      className="row_list"
                      height={height}
                      rowRenderer={({ index, key, style }) => this.rowRenderer(index, key, style)}
                      rowCount={data.length || 0}
                      rowHeight={50}
                      width={width}
                    />
                  )}
                </AutoSizer>
              </StyledVirtualizedList>
            </div>
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

MentorSelector.propTypes = {
  callbackHandler: PropTypes.func,
  type: PropTypes.string,
  usrId: PropTypes.string.isRequired,
};

MentorSelector.defaultProps = {
  callbackHandler: () => false,
  type: '',
};

export default MentorSelector;
