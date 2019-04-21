import React, { Component } from 'react';
import { Modal, Input, Button } from 'antd';
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

class Collaborator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // visible: true,
      sourceList: [],
      targetList: [],
      inputValue: '',
      inputComment: false,
    };
    // this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    this.props.initCollaboratorList(this.props.empNo);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ sourceList : nextProps.collaboratorList });
  }

  handleOk = (list) => {
    if (list.length !== 0) {
      const info = {
        INSP_LOT: this.props.hyPmState,
        WORKER: list.map(m => `${m.WORKER}`).join(','),
      }
      this.props.handleCollaboratorUpdate(list);
      this.props.handleSheetInfoCollaboratorUpdate(info);
      this.props.handleCollaboratorList(list);
      this.props.handleToggleOpen();
    }
  }

  handleClickSource = (list) => {
    const { sourceList, targetList } = this.state;
    // 작업자 max 5명
    if (targetList.length < 5) {
      this.setState({
        sourceList: _.differenceWith(sourceList, _.castArray(list), _.isEqual),
        targetList: _.unionBy([...targetList, list]),
      })
    }
  }

  handleClickTarget = (list) => {
    const { sourceList, targetList } = this.state;
    this.setState({
      targetList: _.differenceWith(targetList, _.castArray(list), _.isEqual),
      sourceList: _.unionBy([...sourceList, list]),
    })
  }

  handleInputOnChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputOnkeyUp = (e) => {
    if (e.key === 'Enter') {
      const { sourceList, targetList, inputValue } = this.state;
      const { empNo } = this.props;
      const value = _.trim(inputValue);
      const list = { EMP_NUM: empNo, WORKER: value };
      const re = /[~!@\#$%^&*()\-=+_:;|\[\]{}<>?\/\\\0-9]/gi;
      if (re.test(value)) {// 특수문자, 숫자
        this.setState({ nputValue: '', inputComment: true });
        return;
      }
      if(value.length === 0 || value.length > 3) {// 4글자 X
        this.setState({ inputValue: '', inputComment: true });
        return;
      }
      this.setState({
        inputValue: '',
        inputComment: false,
        sourceList: _.differenceWith(sourceList, _.castArray(list), _.isEqual),
        targetList: _.unionBy([...targetList, list]),
      });
    }
  }

  render() {
    const { sourceList, targetList, inputValue, inputComment } = this.state;
    const { visible, handleToggleOpen } = this.props;
    return (
      <div>
        {/* 작업자 입력 모달 */}
        <Modal
          title="작업자 입력"
          width="472px"
          wrapClassName="hypmTablet worker"
          centered
          visible={visible}
          onOk={() => this.handleOk(targetList)}
          onCancel={handleToggleOpen}
          footer={null}
        >
          <div className="worker">
            <section className="search-worker">
              <div className="input-worker">
                <Input 
                  className="worker"
                  placeholder="작업자명"
                  value={inputValue}
                  allowClear={true}
                  onChange={this.handleInputOnChange}
                  onKeyUp={this.handleInputOnkeyUp}
                />
                {
                  inputComment ? (
                    <span className="guide"
                      style={{ color: 'red' }}
                    >
                      잘못된 작업자 이름을 입력하였습니다.
                    </span>
                    
                  ) : (
                    <span className="guide">공백/특수문자 제외</span>
                  )
                }
              </div>
              {/* 검색결과 목록 */}
              <ul className="worker-list">
              {
              targetList.map(list => (
                <li key={`${list.WORKER}`}>
                  <Button onClick={() => this.handleClickTarget(list)}>
                    {list.WORKER}
                  </Button>
                </li>
              ))
              }
              </ul>
              <span className="guide">작업자는 최소 2명, 최대 5명까지 등록가능합니다.</span>
            </section>
            {/*  */}
            <section className="recent-worker">
              <h4>최근작업자</h4>
              {
              sourceList.length === 0 ? (
                <div className="no-recent">
                  최근 작업자 목록이 없습니다.<br />
                  직접 작업자를 등록해주세요.
                </div>           
              ) : (
                <ul className="worker-list">
                {
                sourceList.map(list => (
                  <li key={`${list.WORKER}`}>
                    <Button onClick={() => this.handleClickSource(list)}>
                      {list.WORKER}
                    </Button>
                  </li>
                ))
                }
                </ul>
              )
              }     
            </section>
            <Button
              className="btn-confirm"
              onClick={() => this.handleOk(targetList)}
            >
              확인
            </Button>
          </div>
        </Modal>
        {/* 모달 끝 */}      
        {/* <Modal
          visible={visible}
          footer={null}
          closable={false}
          width={'50%'}
        >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 30,
          }}
        >
          <button
            className=""
            title="취소"
            onClick={handleToggleOpen}
            style={{
              width: '60px',
              height: '40px',
              border: '1px solid black',
            }}
          >
            취소
          </button>
          <span>
            작업자 입력
          </span>
          <button
            type='primary'
            className={targetList.length < 2? 'disabled' : 'enable'}
            title="확인"
            onClick={() => this.handleOk(targetList)}
            disabled={targetList.length < 2 ? true : false}
            style={{
              width: '60px',
              height: '40px',
              border: '1px solid black',
            }}
          >
            확인
          </button>
        </div>
        <div style={{
          margin: '0 auto',
          overflow: 'hidden',
          textAlign: 'center',
          display: 'flex',
          marginTop: 50,
          fontSize: 20,
          height: '330px',
        }}>       
          <div style={{
            width: '40%',
            height: '50%',
            display: 'inline-block',
          }}>
            <div>
              <Input
                style={{ width: 250, height: 40 }}
                placeholder={'작업자명 (공백/특수문자 제외)'}
                value={inputValue}
                allowClear={true}
                onChange={this.handleInputOnChange}
                onKeyUp={this.handleInputOnkeyUp}
              />
            </div>
            {
              inputComment ? (
                <div>
                  <span
                    style={{ fontSize: 10, color: 'red' }}
                  >
                    잘못된 작업자 이름을 입력하였습니다.
                  </span>
                </div>
              ) : ('')
            }
            {
            targetList.map(list => (
            <div
              className="입력(선택) 작업자 list"
              key={`${list.WORKER}`}
              onClick={() => this.handleClickTarget(list)}
            >
              <ul>
                <li
                  style={{
                    display: 'inline',
                    padding: '0 10px',
                  }}
                >
                  {list.WORKER}
                </li>
                <li
                  style={{
                    display: 'inline',
                    padding: '0 10px',
                  }}
                >
                  -
                </li>
              </ul>
            </div>            
            ))
            }
          </div>
          <div 
            style={{
              width: '40%',
              height: '50%',
              display: 'inline-block',
              marginBottom: 100,
            }}
          >
            <div>
              <p>최근작업자</p>
            </div>
            {
              sourceList.length === 0 ? (
                <div>
                  <p>
                  최근 작업자 목록이 없습니다.
                  </p>
                  <p>
                  직접 작업자를 등록해주세요.
                  </p>
                </div>
              ) : (
                <div>
                {
                  sourceList.map(list => (
                  <div
                    className=""
                    key={`${list.WORKER}`}
                    onClick={() => this.handleClickSource(list)}
                  >
                    <ul>
                      <li
                        style={{
                          display: 'inline',
                          padding: '0 10px',
                        }}
                      >
                        {list.WORKER}
                      </li>
                      <li
                        style={{
                          display: 'inline',
                          padding: '0 10px',
                        }}
                      >
                        +
                      </li>
                    </ul>
                  </div>            
                  ))
                  }
                </div>
              ) 
            }
          </div>
        </div>
        </Modal> */}
      </div>
    );
  };
}


Collaborator.defaultProps = {
  collaboratorList: [],
};

Collaborator.propTypes = {
  initCollaboratorList: PropTypes.func.isRequired,
  handleCollaboratorUpdate: PropTypes.func.isRequired,
  handleCollaboratorList: PropTypes.func.isRequired,
  handleToggleOpen: PropTypes.func.isRequired,
  collaboratorList: PropTypes.array.isRequired,
  visible: PropTypes.bool.isRequired,
  empNo: PropTypes.string.isRequired,
  hyPmState: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  collaboratorList: selectors.collaboratorList(),
});

export function mapDispatchToProps(dispatch) {
  return {
    initCollaboratorList: (empNo) => dispatch(actions.loadingCollaboratorList(empNo)),
    handleCollaboratorUpdate: (list) => dispatch(actions.handleCollaboratorUpdate(list)),
    handleSheetInfoCollaboratorUpdate: (info) => dispatch(actions.handleSheetInfoCollaboratorUpdate(info)),
  };
}

const withReducer = injectReducer({ key: 'mobileCollaborator', reducer });
const withSaga = injectSaga({ key: 'mobileCollaborator', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(Collaborator);

