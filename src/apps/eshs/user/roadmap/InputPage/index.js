import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputNumber, Row, Col } from 'antd';
import { isJSON } from 'utils/helpers';
import Sketch from 'components/BizBuilder/Sketch';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
// import { WORKFLOW_OPT_SEQ } from 'components/BizBuilder/Common/Constants';
import Moment from 'moment';
import { debounce } from 'lodash';

class InputPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initLoading: true,
      C1: '',
      H3: '',
      category: '',
    };
    this.handleAddCallback = debounce(this.handleAddCallback, 1000);
  }

  componentDidMount() {
    const { sagaKey: id, getProcessRule, workFlowConfig, workPrcProps, changeFormData, category, year, month } = this.props;
    const {
      info: { PRC_ID },
    } = workFlowConfig;
    if (PRC_ID !== -1) {
      const payload = {
        PRC_ID,
        DRAFT_DATA: {
          ...workPrcProps,
        },
      };
      getProcessRule(id, payload);
    }

    changeFormData(id, 'CATEGORY', category);
    if (month >= 12) {
      changeFormData(id, 'CHK_DATE', `${Number(Moment(year).format('YYYY')) + 1}/01`);
    } else if (month === '0') {
      changeFormData(id, 'CHK_DATE', `${Number(Moment(year).format('YYYY'))}/01`);
    } else {
      changeFormData(id, 'CHK_DATE', `${Moment(year).format('YYYY')}/${Number(Moment(month).format('MM')) + 1}`);
    }

    switch (category) {
      case '387':
        this.setState({
          category: 'WF 생산량',
        });
        break;
      case '388':
        this.setState({
          category: '전력',
        });
        break;
      case '389':
        this.setState({
          category: '연료',
        });
        break;
      case '390':
        this.setState({
          category: '용수',
        });
        break;
      case '391':
        this.setState({
          category: '경미재해',
        });
        break;
      default:
        return null;
    }
  }

  saveTask = (id, reloadId) => {
    const { saveTask, saveTaskAfterCallbackFunc } = this.props;
    saveTask(id, reloadId, typeof saveTaskAfterCallbackFunc === 'function' ? saveTaskAfterCallbackFunc : this.saveTaskAfter);
  };

  saveTaskAfter = (id, workSeq) => {
    const { onCloseModalHandler, changeViewPage, baseSagaKey } = this.props;
    if (typeof onCloseModalHandler === 'function') {
      onCloseModalHandler();
      changeViewPage(baseSagaKey, workSeq, -1, 'LIST');
    }
  };

  handleOnAddClick = id => {
    const { changeFormData } = this.props;
    changeFormData(id, 'VALUE', this.state.C1);
    changeFormData(id, 'SITE', 'C1');
    this.props.saveTask(id, id, this.handleAddCallback(id));
  };

  handleAddCallback = id => {
    const { changeFormData } = this.props;
    changeFormData(id, 'TASK_SEQ', -1);
    changeFormData(id, 'VALUE', this.state.H3);
    changeFormData(id, 'SITE', 'H3');
    this.saveTask(id, id);
  };

  render = () => {
    const { sagaKey: id, viewLayer, loadingComplete, formData } = this.props;
    // Work Process 사용여부
    // const isWorkflowUsed = !!(workInfo && workInfo.OPT_INFO && workInfo.OPT_INFO.findIndex(opt => opt.OPT_SEQ === WORKFLOW_OPT_SEQ) !== -1);
    if (viewLayer.length === 1 && viewLayer[0].CONFIG && viewLayer[0].CONFIG.length > 0 && isJSON(viewLayer[0].CONFIG)) {
      const viewLayerData = JSON.parse(viewLayer[0].CONFIG).property || {};
      const { bodyStyle } = viewLayerData;
      // const {
      //   info: { PRC_ID },
      // } = workFlowConfig;

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
                <InputNumber name="C1" min={0} width onChange={value => this.setState({ C1: value })} />
              </Col>
              <Col span={3}>구미</Col>
              <Col span={8}>
                <InputNumber name="H3" min={0} onChange={value => this.setState({ H3: value })} />
              </Col>
            </Row>
            <hr />
            <div className="alignRight">
              <StyledButton className="btn-primary" onClick={() => this.handleOnAddClick(id)}>
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

InputPage.propTypes = {
  sagaKey: PropTypes.string,
  workFlowConfig: PropTypes.object,
  workPrcProps: PropTypes.object,
  viewLayer: PropTypes.array,
  formData: PropTypes.object,
  processRule: PropTypes.object,
  getProcessRule: PropTypes.func,
  onCloseModalHandler: PropTypes.func,
  saveTask: PropTypes.func,
  setProcessRule: PropTypes.func,
  isLoading: PropTypes.bool,
  loadingComplete: PropTypes.func,
  year: PropTypes.string,
  month: PropTypes.string,
  changeFormData: PropTypes.func,
  category: PropTypes.string,
  saveTaskAfterCallbackFunc: PropTypes.func,
  changeViewPage: PropTypes.func,
  baseSagaKey: PropTypes.string,
  workInfo: PropTypes.object,
};

InputPage.defaultProps = {
  workFlowConfig: {
    info: {
      PRC_ID: -1,
    },
  },
};

export default InputPage;
