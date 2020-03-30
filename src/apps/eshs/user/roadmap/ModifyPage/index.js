import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputNumber, Row, Col } from 'antd';

import { isJSON } from 'utils/helpers';
import Sketch from 'components/BizBuilder/Sketch';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import Moment from 'moment';
import request from 'utils/request';

class ModifyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initLoading: true,
      C1: '',
      H3: '',
    };
  }

  componentDidMount() {
    const { category } = this.props;
    switch (category) {
      case '387':
        return this.setState({
          category: 'WF 생산량',
        });
      case '388':
        return this.setState({
          category: '전력',
        });
      case '389':
        return this.setState({
          category: '연료',
        });
      case '390':
        return this.setState({
          category: '용수',
        });
      case '391':
        return this.setState({
          category: '경미재해',
        });
      default:
        return null;
    }
  }

  handleOnModify = () => {
    const { changeViewPage, workSeq, bindTaskSeq, baseSagaKey } = this.props;
    const value = { c1Value: this.state.C1, h3Value: this.state.H3 };
    const taskSeq = { c1_task_seq: bindTaskSeq.c1_task_seq, h3_task_seq: bindTaskSeq.h3_task_seq };
    this.handleModifyCallback(value, taskSeq);
    changeViewPage(baseSagaKey, workSeq, -1, 'LIST');
  };

  handleModifyCallback = async (value, taskSeq) => {
    await request({
      method: 'PATCH',
      url: `/api/eshs/v1/common/updateroadmapvalue?value=${value.c1Value}&taskSeq=${taskSeq.c1_task_seq}`,
    });
    await request({
      method: 'PATCH',
      url: `/api/eshs/v1/common/updateroadmapvalue?value=${value.h3Value}&taskSeq=${taskSeq.h3_task_seq}`,
    });
    this.props.onCloseModalHandler();
  };

  render = () => {
    const { sagaKey: id, viewLayer, loadingComplete, formData, c1Value, h3Value } = this.props;
    if (viewLayer.length === 1 && viewLayer[0].CONFIG && viewLayer[0].CONFIG.length > 0 && isJSON(viewLayer[0].CONFIG)) {
      const viewLayerData = JSON.parse(viewLayer[0].CONFIG).property || {};
      const { bodyStyle } = viewLayerData;

      // 로딩
      if (this.props.isLoading === false && this.state.initLoading) {
        this.setState(
          {
            initLoading: false,
          },
          () => loadingComplete(),
        );
      }
      return (
        <StyledViewDesigner>
          <Sketch {...bodyStyle}>
            <Row>
              <Col span={3}>항목</Col>
              <Col span={18}>{this.state.category}</Col>
            </Row>
            <hr />
            <Row>
              <Col span={3}>작성자</Col>
              <Col span={18}>{formData.REG_USER_NAME}</Col>
            </Row>
            <hr />
            <Row>
              <Col span={3}>연/월</Col>
              <Col span={18}>{`${Moment(formData.CHK_DATE).format('YYYY')}/${Moment(formData.CHK_DATE).format('MM')}`}</Col>
            </Row>
            <hr />
            <Row>
              <Col span={3}>청주</Col>
              <Col span={8}>
                <InputNumber name="C1" min={0} defaultValue={c1Value} onChange={value => this.setState({ C1: value })} />
              </Col>
              <Col span={3}>구미</Col>
              <Col span={8}>
                <InputNumber name="H3" min={0} defaultValue={h3Value} onChange={value => this.setState({ H3: value })} />
              </Col>
            </Row>
            <hr />
            <div className="alignRight">
              <StyledButton className="btn-primary" onClick={() => this.handleOnModify(id)}>
                저장
              </StyledButton>
            </div>
          </Sketch>
        </StyledViewDesigner>
      );
    }
    return '';
  };
}

ModifyPage.propTypes = {
  category: PropTypes.string,
  sagaKey: PropTypes.string,
  changeViewPage: PropTypes.func,
  workSeq: PropTypes.number,
  viewLayer: PropTypes.object,
  loadingComplete: PropTypes.func,
  viewPageData: PropTypes.object,
  c1_task_seq: PropTypes.number,
  h3_task_seq: PropTypes.number,
  year: PropTypes.string,
  month: PropTypes.string,
  bindTaskSeq: PropTypes.object,
  baseSagaKey: PropTypes.string,
  c1Value: PropTypes.number,
  h3Value: PropTypes.number,
  formData: PropTypes.object,
  onCloseModalHandler: PropTypes.func,
};

export default ModifyPage;
