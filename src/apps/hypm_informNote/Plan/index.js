import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import * as feed from 'components/Feedback/functions';
import Axios from 'axios';
import { BtnSearchDkGray } from './buttons.style';
import Grid from './grid.js';

class Plan extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      planDataList: [],
    };
  }

  showModal = () => {
    const {
      eqMstId,
      upTime,
      downTime,
    } = this.props;

    let lsldt = '';
    if (upTime !== '') {
      lsldt = upTime.replace(/-/g, '');
    } else if (downTime !== '') {
      lsldt = downTime.replace(/-/g, '');
    }

    if (eqMstId === '') {
      feed.warning('EQ_MST_ID은 필수 값입니다.');
      return;
    }

    console.log('show Modal', this.props.eqMstId);
    // 결과데이터 초기화
    const param = {
      // 기본조회 조건, POP OVER 조건
      EQUNR: eqMstId,
      IV_LSLDT: lsldt,
      IV_EQUNR: eqMstId,
    };
    this.loadingPlanParam(param);
  }

  handleOk = () => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  loadingPlanParam = (param) => {
    Axios.post('/api/gipms/v1/informNote/fabNextTBMList', param)
      .then((result) => {
        if (result.data) {
          const { data } = result;

          if (data.resultCode === 'N') {
            feed.warning('모델링된 TBM PLAN이 없습니다.');
            return;
          }

          if (data.list) {
            if (this.state.planDataList !== data.list.ET_LIST) {
              const {
                list,
              } = data;
              if (list.ET_LIST.length !== 0) {
                this.setState({
                  planDataList: data.list.ET_LIST,
                  visible: true,
                });
              } else {
                feed.warning('모델링된 TBM PLAN이 없습니다.');
              }
            }
          }
        }
      });
  }

  render() {
    const {
      planDataList,
    } = this.state;

    return (
      <div>
        <BtnSearchDkGray type="primary" onClick={this.showModal}>
          Plan
        </BtnSearchDkGray>
        <Modal
          title="Plan Simulation"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelButtonProps={{ style: { display: 'none' } }}
          width="310px"
        >
          <Grid
            planDataList={planDataList}
          />
        </Modal>
      </div>
    );
  }
}

Plan.propTypes = {
  eqMstId: PropTypes.string,
  upTime: PropTypes.string,
  downTime: PropTypes.string,
};

Plan.defaultProps = {
  eqMstId: '',
  upTime: '',
  downTime: '',
};

export default Plan;
