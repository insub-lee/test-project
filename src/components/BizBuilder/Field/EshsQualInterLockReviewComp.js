import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Input, Select } from 'antd';
import { debounce } from 'lodash';

import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'commonStyled/Form/StyledSelect';

const AntdInput = StyledInput(Input);
const { Option } = Select;

const AntdSelect = StyledSelect(Select);

class EshsQualInterLockReviewComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultReviewList: [
        {
          TITLE: '위험성',
          EXAM_RESULT: '1',
          EXAM_COMMENT: '',
          SEQ: '1',
          REQ_CD: (this.props && this.props.formData && this.props.formData.REQ_CD) || '',
          TASK_SEQ: (this.props && this.props.formData && this.props.formData.TASK_SEQ) || '',
        },
        {
          TITLE: '가동률',
          EXAM_RESULT: '1',
          EXAM_COMMENT: '',
          SEQ: '2',
          REQ_CD: (this.props && this.props.formData && this.props.formData.REQ_CD) || '',
          TASK_SEQ: (this.props && this.props.formData && this.props.formData.TASK_SEQ) || '',
        },
        {
          TITLE: '작업절차',
          EXAM_RESULT: '1',
          EXAM_COMMENT: '',
          SEQ: '3',
          REQ_CD: (this.props && this.props.formData && this.props.formData.REQ_CD) || '',
          TASK_SEQ: (this.props && this.props.formData && this.props.formData.TASK_SEQ) || '',
        },
        {
          TITLE: '투자비',
          EXAM_RESULT: '1',
          EXAM_COMMENT: '',
          SEQ: '4',
          REQ_CD: (this.props && this.props.formData && this.props.formData.REQ_CD) || '',
          TASK_SEQ: (this.props && this.props.formData && this.props.formData.TASK_SEQ) || '',
        },
        {
          TITLE: '생산성',
          EXAM_RESULT: '1',
          EXAM_COMMENT: '',
          SEQ: '5',
          REQ_CD: (this.props && this.props.formData && this.props.formData.REQ_CD) || '',
          TASK_SEQ: (this.props && this.props.formData && this.props.formData.TASK_SEQ) || '',
        },
        {
          TITLE: '불량방지',
          EXAM_RESULT: '1',
          EXAM_COMMENT: '',
          SEQ: '6',
          REQ_CD: (this.props && this.props.formData && this.props.formData.REQ_CD) || '',
          TASK_SEQ: (this.props && this.props.formData && this.props.formData.TASK_SEQ) || '',
        },
        {
          TITLE: '유지보수',
          EXAM_RESULT: '1',
          EXAM_COMMENT: '',
          SEQ: '7',
          REQ_CD: (this.props && this.props.formData && this.props.formData.REQ_CD) || '',
          TASK_SEQ: (this.props && this.props.formData && this.props.formData.TASK_SEQ) || '',
        },
      ],
      examResultList: [
        { value: '1', text: '작다' },
        { value: '2', text: '보통' },
        { value: '3', text: '크다' },
        { value: '4', text: '매우크다' },
      ],
      ExamResult: (seq, val) => (
        <AntdSelect key={`EXAM_RESULT_${seq}`} defaultValue={val} style={{ width: '100%' }} onChange={e => this.handleOnChange('EXAM_RESULT', e, seq)}>
          {this.state &&
            this.state.examResultList &&
            this.state.examResultList.map(e => (
              <Option key={e.value} value={e.value}>
                {e.text}
              </Option>
            ))}
        </AntdSelect>
      ),
      ExamComment: (seq, val) => (
        <AntdInput
          key={`EXAM_COMMENT_${seq}`}
          defaultValue={val || ''}
          style={{ width: '100%' }}
          onChange={e => this.handleOnChange('EXAM_COMMENT', e.target.value, seq)}
        />
      ),
    };
    this.handleOnChange = debounce(this.handleOnChange, 300);
  }

  componentDidMount() {
    const {
      sagaKey: id,
      getExtraApiData,
      viewPageData: { taskSeq },
    } = this.props;
    if (taskSeq > 0) {
      const apiArray = [
        {
          key: 'reviewList',
          type: 'GET',
          url: `/api/eshs/v1/common/eshsSqQualInterLockReview?TASK_SEQ=${taskSeq}`,
        },
      ];
      return getExtraApiData(id, apiArray, this.appStart);
    }
    return this.appStart();
  }

  appStart = () => {
    const { sagaKey: id, changeFormData, extraApiData } = this.props;
    const { defaultReviewList } = this.state;
    const reviewList = (extraApiData && extraApiData.reviewList && extraApiData.reviewList.list) || [];

    if (0 in reviewList) {
      return changeFormData(id, 'reviewList', reviewList);
    }
    return changeFormData(id, 'reviewList', defaultReviewList);
  };

  handleOnChange = (target, val, seq) => {
    const { sagaKey: id, formData, changeFormData } = this.props;
    const reviewList = (formData && formData.reviewList) || [];
    changeFormData(
      id,
      'reviewList',
      reviewList.map(e => (e.SEQ === seq ? { ...e, [target]: val } : e)),
    );
  };

  render() {
    const {
      formData,
      viewPageData: { viewType },
    } = this.props;
    const { ExamResult, ExamComment, examResultList } = this.state;
    const reviewList = (formData && formData.reviewList) || [];
    return (
      <StyledHtmlTable className="tableWrapper">
        <table>
          <colgroup>
            <col width="14%" />
            <col width="14%" />
            <col width="14%" />
            <col width="56%" />
          </colgroup>
          <tbody>
            {reviewList.map((e, index) => (
              <tr key={e.SEQ}>
                {index === 0 && (
                  <th rowSpan={reviewList.length}>
                    <span>검토내역</span>
                  </th>
                )}
                <th>
                  <span>{e.TITLE}</span>
                </th>
                <td>
                  {viewType !== 'VIEW' ? ExamResult(e.SEQ, e.EXAM_RESULT) : examResultList[examResultList.findIndex(ex => ex.value === e.EXAM_RESULT)].text}
                </td>
                <td>{viewType !== 'VIEW' ? ExamComment(e.SEQ, e.EXAM_COMMENT) : e.EXAM_COMMENT}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </StyledHtmlTable>
    );
  }
}

EshsQualInterLockReviewComp.propTypes = {
  changeFormData: PropTypes.func,
  formData: PropTypes.object,
  sagaKey: PropTypes.string,
  extraApiData: PropTypes.object,
  getExtraApiData: PropTypes.func,
  viewPageData: PropTypes.object,
};

EshsQualInterLockReviewComp.defaultProps = {};

export default EshsQualInterLockReviewComp;
