import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Button, Input } from 'antd';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';

const { TextArea } = Input;


class InformNoteDetailPopup extends PureComponent {
  constructor(props) {
    super(props);

    console.log('프랍스 ', props);
    // 방법이없어서 일단 라인처리
    // const search = this.props.location.search;
    // const params = new URLSearchParams(search);
    // const informnoteNo = params.get('InformnoteNo');
    const { match } = props;
    const { params } = match;
    const { PARAM } = params;
    // console.log('서치 ', match);
    // console.log('파람 ', params);
    this.state = {
      disabled: true,
      PARAM,
    };

    this.props.handleLoadingPopup(this.state.PARAM);
    this.props.getDangerTaskCombo();
  }


  // 팝업닫기
  handlClosetest = () => {
    window.close();
  }
  render() {
    const {
      informDetail,
    } = this.props;
    const {
      PARAM,
    } = this.state;
    return (
      <div style={{ padding: 50 }}>
        <div>
          <th>InfromNoteNo(#{PARAM})</th>
        </div>
        <table style={{ width: '760px' }} >
          <tr>
            <th style={{ background: 'yellow' }}>EQ ID</th>
            <td><span style={{ color: 'blue' }}>{informDetail.map(v => v.EQ_ID_NM)}</span></td>
            <th style={{ background: 'yellow' }}>Down Time</th>
            <td>{informDetail.map(v => v.DOWN_TIME)}</td>
          </tr>
          <tr>
            <th style={{ background: 'yellow' }}>Down</th>
            <td>{informDetail.map(v => v.NOTI_TYPE_NAME)}</td>
            <th style={{ background: 'yellow' }}>Down Type</th>
            <td>{informDetail.map(v => v.CODING_NAME)}</td>
          </tr>
          <tr>
            <th style={{ background: 'yellow' }}>Problem</th>
            <td colSpan="7">
              <div>
                <TextArea
                  readOnly={this.state.disabled}
                  value={informDetail.map(v => v.ZZPROBLEM)}
                  autosize={{ minRows: 4, maxRow: 6 }}
                />
              </div>
            </td>
          </tr>
          <tr>
            <th style={{ background: 'yellow' }}>조치 상세 내용</th>
            <td colSpan="7">
              <div>
                <TextArea
                  readOnly={this.state.disabled}
                  value={informDetail.map(v => v.HLTEXT)}
                  autosize={{ minRows: 4, maxRow: 6 }}
                />
              </div>
            </td>
          </tr>
          <tr>
            <div style={{ position: 'fixed', bottom: '0px', right: '0px' }}>
              <td>
                <Button onClick={this.handlClosetest} style={{ border: 'black 1.5px solid' }}>팝업 닫기</Button>
              </td>
            </div>
          </tr>
        </table>

      </div>
    );
  }
}
InformNoteDetailPopup.propTypes = {
  handleLoadingPopup: PropTypes.func.isRequired,
  getDangerTaskCombo: PropTypes.func.isRequired,
  informDetail: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,

};

const mapStateToProps = createStructuredSelector({
  informDetail: selectors.makepopList(),
  dangerTaskList: selectors.makedangerList(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleLoadingPopup: value => dispatch(actions.handleLoadingPopup(value)),
    getDangerTaskCombo: () => dispatch(actions.getDangerTaskCombo()),
  };
}

const withReducer = injectReducer({ key: 'InformNoteDetailPopup', reducer });
const withSaga = injectSaga({ key: 'InformNoteDetailPopup', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(InformNoteDetailPopup);
