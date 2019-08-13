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

class Collaborator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      sourceList: [],
      targetList: [],
    };

    this.handleInput = this.handleInput.bind(this);
  }
  componentDidMount() {
    this.props.initCollaboratorList(this.props.empNo);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ sourceList : nextProps.collaboratorList });
  }

  handleCancle = () => {
    this.props.history.push({
      pathname: '/sm/pmSheetTablet'
    });
  }

  handleOk = (list) => {
    if (list.length !== 0) {
      this.props.handleCollaboratorUpdate(list);
      this.props.handleCollaboratorList(list);
      this.setState({ visible: false });
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

  handleInput = (e) => {
    const { sourceList, targetList } = this.state;
    const { empNo } = this.props;
    const value = _.trim(e.target.value);
    const re = /[~!@\#$%^&*\()\-=+_']/gi;
    const list = [{ EMP_NUM: empNo, WORKER: value }];
    if(re.test(value) || value.length === 0) return;
    if (e.key === 'Enter') {
      this.setState({
        targetList: _.flattenDeep(_.unionBy([...targetList, list])),
        sourceList: _.differenceWith(sourceList, list, _.isEqual),
      })
    }
  }

  render() {
    const { sourceList, targetList } = this.state;
    const { onBack } = this.props;
    return (
      <div>
        <Modal
          visible={this.state.visible}
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
            onClick={onBack}
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
            className='' 
            title="확인"
            onClick={() => this.handleOk(targetList)}
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
              <p>
                작업자를 입력(선택)해 주세요
              </p>
              <Input
                style={{ width: 250, height: 40 }}
                placeholder={'작업자명 (공백/특수문자 제외)'}
                allowClear={true}
                onKeyUp={this.handleInput}
              />
            </div>
            {
            targetList.map(list => (
            <div
              className="작업자 list"
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
        </Modal>
      </div>
    );
  };
}


Collaborator.defaultProps = {
  collaboratorList: [],
};

Collaborator.propTypes = {
  initCollaboratorList: PropTypes.func.isRequired,
  collaboratorList: PropTypes.array.isRequired,
  handleCollaboratorList: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  empNo: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  collaboratorList: selectors.collaboratorList(),
});

export function mapDispatchToProps(dispatch) {
  return {
    initCollaboratorList: (empNo) => dispatch(actions.loadingCollaboratorList(empNo)),
    handleCollaboratorUpdate: (list) => dispatch(actions.handleCollaboratorUpdate(list)),
  };
}

const withReducer = injectReducer({ key: 'mobileCollaborator', reducer });
const withSaga = injectSaga({ key: 'mobileCollaborator', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Collaborator);

