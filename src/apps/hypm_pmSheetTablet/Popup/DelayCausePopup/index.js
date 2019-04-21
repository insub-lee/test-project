import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';
import * as feed from 'components/Feedback/functions';
import MessageContent from 'components/Feedback/message.style2';
import message from 'components/Feedback/message';
import Axios from 'axios';
import { Radio, Button } from 'antd';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';


const RadioGroup = Radio.Group;

class DelayCausePopup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: '', // 라디오 버튼
    };
    this.props.handleLoadingPopup();
  }

  handleEqIdConfirm = () => { // 부모에서 받아온 리스트값
    const { radioValue } = this.state;
    const { dataList } = this.props;
    console.log(' 데이터리스트 2@@@@@@@@@@', dataList);
    if (radioValue.length === 0) {
      alert('지연사유를 선택해주세요.');
    } else {
      dataList[3] = radioValue.DELAY_REASON; // 리스트에 선택값 푸쉬;
      this.delayCauseUpdate(dataList); // 업데이트 호출
      this.setState({ // 라디오 버튼 초기화
        radioValue: '',
      });
    }
  }

  delayCauseUpdate = (dataList) => {
    const param = {
      INSP_LOT: dataList[0],
      INSPOPER: dataList[1],
      INSPCHAR: dataList[2],
      DELAY_REASON: dataList[3],
    };
    Axios.post('/api/gipms/v1/pmsheet/pmSheetUpdateDelayList', param)
      .then((result) => {
        if (result.data.result > 0) {
          message.success( 
            <MessageContent> 
             저장되었습니다 .
            </MessageContent>, 
            1, 
          );
          this.props.onOk();
        } else {
          message.success( 
            <MessageContent> 
            저장에 실패하였습니다.
            </MessageContent>, 
            1, 
          );
          this.props.onOk();
        }
      });
  }


  handleIsActiveChange = (e) => { // 라디오 버튼
    this.setState({
      radioValue: e.target.value, // 라디오 버튼 1개 선택
    });
  }

  render() {
    const {
      delayCauseDetail,
      indata, // 오퍼레이션 번호
    } = this.props;

    const list = _.filter(delayCauseDetail, ['INSPOPER', indata]); // 프랍 넘어온 값 필터
    return (
      <div style={{ padding: 50 }}>
        <div>
          <th>지연 사유 선택</th>
          <th>10. Down 작업 지연에 대한 사유를 선택해 주세요</th>
        </div>
        <table style={{ width: '760px' }}>
          <tr>
            <td>
              {list.map(c => (
                <li style={{ padding: '5px' }}>
                  <RadioGroup
                    onChange={this.handleIsActiveChange}
                    value={this.state.radioValue}
                  >
                    <Radio value={c}>{c.DELAY_REASON}</Radio>
                  </RadioGroup>
                </li>
              ))}
            </td>
          </tr>
          <tr>
            <div>
              {/*  확인 버튼 update */}
              <Button onClick={() => this.handleEqIdConfirm()}>확인</Button>
            </div>
          </tr>
        </table>
      </div>
    );
  }
}
DelayCausePopup.propTypes = {
  onOk: PropTypes.func.isRequired,
  handleLoadingPopup: PropTypes.func.isRequired,
  delayCauseDetail: PropTypes.array,
  dataList: PropTypes.array,
  indata: PropTypes.array,
};

DelayCausePopup.defaultProps = {
  delayCauseDetail: [],
  dataList: [],
  indata: [],
};
const mapStateToProps = createStructuredSelector({
  delayCauseDetail: selectors.makepopList(),
});
export function mapDispatchToProps(dispatch) {
  return {
    handleLoadingPopup: () => dispatch(actions.handleLoadingPopup()),
    // delayCauseUpdate : (dataList) => dispatch(actions.delayCauseUpdate(dataList)),
  };
}

const withReducer = injectReducer({ key: 'DelayCausePopup', reducer });
const withSaga = injectSaga({ key: 'DelayCausePopup', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(DelayCausePopup);

