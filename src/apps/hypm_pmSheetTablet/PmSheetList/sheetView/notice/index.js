import React, { Component } from 'react';
import { Modal, Input } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import _ from 'lodash';
import * as feed from 'components/Feedback/functions';

class Notice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  componentDidMount() {
    const { inspLot } = this.props;
    this.props.LoadingNoticeList(inspLot);
  }

  handleSave = () => {
    const { inspLot, empNo, empName, roleDetail, collaboratorList } = this.props;
    const { content } = this.state;
    const coWorker = roleDetail === '910' ? collaboratorList.map(e => `${e.WORKER}`).join('_') : empName;
    if (content.length >= 2000) feed.error('2000자 이내로 입력바랍니다.');
    if (_.trim(content).length !== 0) {
      this.props.handleUpdateNotice(inspLot, empNo, coWorker, content);
      this.setState({ content: ''});
    }
  }

  handleOnChange = (e) => {
    this.setState({ content: e.target.value });
  }

  render() {
    const { content } = this.state;
    const { noticeList, handleToggleOpen, visible } = this.props;
    return (
      <div>
        <Modal
          visible={visible}
          footer={null}
          closable={false}
          width={'60%'}
        >
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 30,
              }}
            >
              <button
                style={{
                  width: '60px',
                  height: '60px',
                  border: '1px solid black',
                }}
                onClick={handleToggleOpen}
              >
                X
              </button>
              <span>
                전달 사항
              </span>
            </div>
          </div>
          <div 
            style={{
              marginTop: '10px',
              display: 'inline-block',
            }}
          >
            {
              noticeList.map((list, idx) => (
              <div key={`${idx}`}>
                <div style={{ marginTop: '20px' }}>
                  <ul>
                    <li
                      style={{
                        display: 'inline',
                        padding: '0 10px',
                      }}
                    >
                      {_.replace(list.CO_WORKER, /_/g, ', ')}
                    </li>                    
                    <li
                      style={{
                        display: 'inline',
                        padding: '0 10px',
                      }}                 
                    >
                      {list.REG_DT}
                    </li>
                  </ul>
                  <span>
                    {list.CONTENT}
                  </span>
                </div>
              </div>
              ))
            }
          </div>
          <div
           style={{
            width: '100%',
            position: 'relative',
           }}
          >
            <Input.TextArea
              placeholder={'텍스트 입력'}
              autosize={{ minRows: 1, maxRows: 4 }}
              rows={2}
              value={content}
              onChange={this.handleOnChange}
            />
            <button
              style={{
                width: '50px',
                height: '40px',
                border: '1px solid black',
              }}
              onClick={() => this.handleSave()}
            >
              등록
            </button>
          </div>
        </Modal>
      </div>
    );
  };
}

Notice.defaultProps = {
  noticeList: [],
  worker: [],
};

Notice.propTypes = {
  LoadingNoticeList: PropTypes.func.isRequired,
  handleUpdateNotice: PropTypes.func.isRequired,
  noticeList: PropTypes.array.isRequired,
  inspLot: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  empNo: PropTypes.string.isRequired,
  empName: PropTypes.string.isRequired,
  roleDetail: PropTypes.string.isRequired,
  collaboratorList: PropTypes.array.isRequired,
  handleToggleOpen: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  noticeList: selectors.noticeList(),
});

export function mapDispatchToProps(dispatch) {
  return {
    LoadingNoticeList: (value) => dispatch(actions.LoadingNoticeList(value)),
    handleUpdateNotice: (inspLot, empNo, coWorker, content) => dispatch(actions.handleUpdateNotice(inspLot, empNo, coWorker, content)),
  };
}

const withReducer = injectReducer({ key: 'mobileNotice', reducer });
const withSaga = injectSaga({ key: 'mobileNotice', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(Notice);
