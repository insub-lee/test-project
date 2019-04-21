import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Transfer } from 'antd';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import * as feed from 'components/Feedback/functions';
import Axios from 'axios';
import defineData from './defineData';

let totalDataList = [];
// let EMP_NUM = '';

class CommonInformnoteGridColumSetPopup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      targetKeys: [],
    };

    const { params } = props.match;
    const { PARAM } = params;
    this.empNo = PARAM;

    totalDataList = defineData;
    // this.empNo = PARAM || '';
    // const param = {
    //   PARAM_EMP_NUM: this.empNo,
    //   PARAM_SCR_NUM: 'INFORM NOTE LIST GRID',
    //   PARAM_DEFINE_GUBUN: 'G',
    // };
    // this.props.handleGridColumnSearch(param);
  }

  componentDidMount() {
    const param = {
      PARAM_EMP_NUM: this.empNo,
      PARAM_SCR_NUM: 'INFORM NOTE LIST GRID',
      PARAM_DEFINE_GUBUN: 'G',
    };

    this.handleGridColumnSearch(param);
  }

  handleChange = (targetKeys) => {
    this.setState({ targetKeys });
  }

  handleSave = () => {
    const { targetKeys } = this.state;

    if (targetKeys.length === 0) {
      feed.warning('선택된 Column이 없습니다.');
      return;
    }

    for (let i = 0; totalDataList.length > i; i += 1) {
      // .toString()
      if (targetKeys.indexOf(totalDataList[i].key) > -1) {
        totalDataList[i].USE_YN = 'Y';
      } else {
        totalDataList[i].USE_YN = 'N';
      }
    }

    const param = {
      PARAM_EMP_NUM: this.empNo,
      SCR_NUM: 'INFORM NOTE LIST GRID',
      DEFINE_GUBUN: 'G',
      list: { GRID_COL_LIST: totalDataList },
    };

    this.handleGridColumnSave(param);
  }

  handleGridColumnSearch = (param) => {
    Axios.post('/api/gipms/v1/common/fabInformNoteListGridColumnSetSearch', param)
      .then((result) => {
        if (result.data) {
          const newTargetKeys = [];
          const { userGridDefineList } = result.data.list;

          if (userGridDefineList.length > 0) {
            for (let i = 0; userGridDefineList.length > i; i += 1) {
              if (userGridDefineList[i].USE_YN === 'Y') {
                newTargetKeys.push(userGridDefineList[i].LIST_NUM.toString());
              }
            }

            this.setState({ targetKeys: newTargetKeys });
          }
        }
      });
  }

  handleGridColumnSave = (param) => {
    Axios.post('/api/gipms/v1/common/fabInformNoteListGridColumnSetSave', param)
      .then((result) => {
        if (result.data) {
          const { data } = result;

          if (data.resultCode !== '00') {
            feed.error('저장에 실패하였습니다.');
            return;
          }

          window.opener.postMessage(`CommonInformnoteGridColumSetPopup:${this.empNo}`, window.location.origin);
          window.close();
        }
      });
  }

  render() {
    const {
      targetKeys,
    } = this.state;

    return (
      <div>
        <div>
          <h4>조회 List 설정</h4>
        </div>
        <div style={{ padding: 20 }}>
          <Transfer
            dataSource={totalDataList}
            // showSearch
            listStyle={{
              width: '45.5%',
              height: 730,
            }}
            // operations={['to right', 'to left']}
            targetKeys={targetKeys}
            titles={['전체 Column List', '선택 Column List']}
            onChange={this.handleChange}
            render={item => `${item.COL_TEXT}`}
          />
        </div>
        <div style={{ float: 'right' }}>
          <Button
            style={{ width: 80, right: 25, alignContent: 'center' }}
            onClick={this.handleSave}
          >
          선택완료
          </Button>
        </div>
      </div>
    );
  }
}

CommonInformnoteGridColumSetPopup.propTypes = {
  match: PropTypes.object.isRequired,
};

export default CommonInformnoteGridColumSetPopup;
