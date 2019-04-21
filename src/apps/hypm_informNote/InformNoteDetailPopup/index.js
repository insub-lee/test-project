import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Select, Button, Input } from 'antd';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';

const Options = Select.Option;

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
      defaultBox: [],
      danger: undefined,
      disabled: true,
      PARAM,
    };

    this.props.handleLoadingPopup(this.state.PARAM);
    this.props.getDangerTaskCombo();
  }


  // warfer ID 셀렉트 박스 disabled막혀있음
  // getOptionsList = () => {
  //   const data = [];
  //   for (let i = 0; i < 26; i + 1) {
  //     data.push(<Options key={i}>{i}</Options>);
  //   }
  //   return data;
  // }
  // 위험작업 분류 셀렉트  disabled 막혀있음
  handledangerChange = (event) => {
    this.setState({
      danger: event,
    });
  }
  // 팝업닫기
  handlClosetest = () => {
    window.close();
  }
  render() {
    const {
      informDetail,
      dangerTaskList,
    } = this.props;
    const {
      defaultBox,
      danger,
    } = this.state;
    // 진행상태여부
    const inspLostStatusObj = [{
      null: '작성전',
      I010: '진행중',
      I015: '진행중 - 도급완료',
      I020: '상신',
      I050: '부결',
      I040: '승인',
    },
    ];

    return (
      <div style={{ padding: 50 }}>
        <div style={{ border: 'solid 0.5px' }} disabled>
          <table>
            <tbody>
              <tr>
                <th style={{ background: 'yellow' }}>EQ ID</th>
                <td><span style={{ color: 'blue' }}>{informDetail.map(v => v.EQ_ID_NM)}</span></td>
                <th style={{ background: 'yellow' }}>Down</th>
                <td>{informDetail.map(v => v.NOTI_TYPE_NAME)}</td>
                <th style={{ background: 'yellow' }}>Down Type</th>
                <td>{informDetail.map(v => v.CODING_NAME)}</td>
                <th style={{ background: 'yellow' }}>Auto/Manual</th>
                <td>{informDetail.map(v => (v.IS_MANUAL === 'X' ? 'Manual' : 'Auto'))}</td>
              </tr>
              <tr>
                <th style={{ background: 'yellow' }}>Down Time</th>
                <td>{informDetail.map(v => v.DOWN_TIME)}</td>
                <th style={{ background: 'yellow' }}>Up Time</th>
                <td>{informDetail.map(v => v.UP_TIME)}</td>
                <th style={{ background: 'yellow' }}>Total Time</th>
                <td>{informDetail.map(v => v.INTERVAL_A)}</td>
                <th style={{ background: 'yellow' }}>Work Time</th>
                <td>{informDetail.map(v => v.INTERVAL_B)}</td>
              </tr>
              <tr>
                <th style={{ background: 'yellow' }}>Down Comment</th>
                <td colSpan="3">
                  {informDetail.map(v => v.NOTE_COMMENT)}
                </td>
                <th style={{ background: 'yellow' }}>Lot ID</th>
                <td>
                  {informDetail.map(v => v.LOT_ID)}
                </td>
                <th style={{ background: 'yellow' }}>Wafer ID</th>
                <td>
                  <Select defaultValue="All" style={{ width: 205 }} disabled={this.state.disabled}>
                    <Options value="1">1</Options>
                    <Options value="2">2</Options>
                    <Options value="3">3</Options>
                    <Options value="4">4</Options>
                    <Options value="5">5</Options>
                    <Options value="6">6</Options>
                    <Options value="7">7</Options>
                    <Options value="8">8</Options>
                    <Options value="9">9</Options>
                    <Options value="10">10</Options>
                  </Select>
                </td>
              </tr>
              <tr>
                <th style={{ background: 'yellow' }}>SVID</th>
                <td>{informDetail.map(v => v.SVID)}
                </td>
                <th style={{ background: 'yellow' }}>SVID_DESC</th>
                <td>{informDetail.map(v => v.SVID_DESC)}</td>
                <th style={{ background: 'yellow' }}>Value</th>
                <td>{informDetail.map(v => v.CURR_VAL)}</td>
                <th style={{ background: 'yellow' }}>고분보연계</th>
                <td >
                  {informDetail.map(v => v.GBB_UID)}
                </td>
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
                <th style={{ background: 'yellow' }}>첨부파일</th>
                <td colSpan="3" />
                <th style={{ background: 'yellow' }}>위험작업 분류</th>
                <td colSpan="3">
                  <div>
                    <div>
                      <Select
                        disabled={this.state.disabled}
                        defaultValue={defaultBox}
                        value={danger}
                        style={{ width: 180 }}
                        onChange={this.handledangerChange}
                        notFoundContent="Select 하세요."
                        placeholder="Select 하세요."
                        defaultActiveFirstOption={false}
                      >
                        {dangerTaskList.map(dt => <Options key={dt.CODE}>{dt.NAME}</Options>)}
                      </Select>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th style={{ background: 'yellow' }}>W/O #</th>
                <td>{informDetail.map(v => ((v.AUFNR !== '' && v.AUFNR != null) ? v.AUFNR.substring((v.AUFNR.length > 9) ? 3 : 0, v.AUFNR.length) : ''))}</td>
                <th style={{ background: 'yellow' }}>PM Sheet</th>
                <td>{informDetail.map(v => v.INSP_LOT)}</td>
                <th style={{ background: 'yellow' }}>PM Sheet Status</th>
                <td colSpan="3">{informDetail.map(v => ((v.INSP_LOT !== '') ? inspLostStatusObj.map(index => index[v.INSP_LOT_STATUS]) : ''))}</td>
              </tr>
              <tr>
                <div style={{ position: 'fixed', bottom: '0px', right: '0px' }}>
                  <td>
                    <Button onClick={this.handlClosetest} style={{ border: 'black 1.5px solid' }}>팝업 닫기</Button>
                  </td>
                </div>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
InformNoteDetailPopup.propTypes = {
  handleLoadingPopup: PropTypes.func.isRequired,
  getDangerTaskCombo: PropTypes.func.isRequired,
  informDetail: PropTypes.array.isRequired,
  dangerTaskList: PropTypes.array.isRequired,
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
  withConnect,
  withSaga,
)(InformNoteDetailPopup);
