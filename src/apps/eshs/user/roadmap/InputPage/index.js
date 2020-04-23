import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputNumber, Row, Col } from 'antd';
import { isJSON } from 'utils/helpers';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledHtmlTable from 'commonStyled/EshsStyled/Table/StyledHtmlTable';
// import { WORKFLOW_OPT_SEQ } from 'components/BizBuilder/Common/Constants';
import Moment from 'moment';
import { debounce } from 'lodash';
import StyledButton from 'commonStyled/Buttons/StyledButton';

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
        break;
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
        <ContentsWrapper>
          <StyledHtmlTable>
            <div className="tableWrapper">
              <table>
                <colgroup>
                  <col width="20%" />
                  <col width="30%" />
                  <col width="20%" />
                  <col width="30%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th colSpan={1}>항목</th>
                    <td colSpan={3}>{this.state.category}</td>
                  </tr>
                  <tr>
                    <th colSpan={1}>작성자</th>
                    <td colSpan={3}>{formData.REG_USER_NAME}</td>
                  </tr>
                  <tr>
                    <th colSpan={1}>연월</th>
                    <td colSpan={3}>{`${Moment(formData.CHK_DATE).format('YYYY')}/${Moment(formData.CHK_DATE).format('MM')}`}</td>
                  </tr>
                  <tr>
                    <th>청주</th>
                    <td>
                      <InputNumber name="C1" min={0} width onChange={value => this.setState({ C1: value })} />
                    </td>
                    <th>구미</th>
                    <td>
                      <InputNumber name="H3" min={0} onChange={value => this.setState({ H3: value })} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </StyledHtmlTable>
          <div className="alignRight">
            <StyledButton className="btn-primary" onClick={() => this.handleOnAddClick(id)}>
              저장
            </StyledButton>
          </div>
        </ContentsWrapper>
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
