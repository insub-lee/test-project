import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';
import EditorComp from 'components/BizBuilder/Field/EditorComp';

class OnlyView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oneQFile: [],
      twoQFile: [],
      threeQFile: [],
      fourQFile: [],
      mainFile: [],
      planQFile: [],
    };
  }

  componentDidMount() {
    const { sagaKey, getExtraApiData, taskSeq, YEAR } = this.props;
    const apiArray = [{ key: `detail`, url: `/api/eshs/v1/common/eshsclause?TASK_SEQ=${taskSeq}&YEAR=${YEAR || 2020}`, type: 'GET' }];
    getExtraApiData(sagaKey, apiArray, this.initData);
  }

  initData = () => {
    const { extraApiData } = this.props;
    const detailData = (extraApiData && extraApiData.detail && extraApiData.detail.data) || {};
    const { ONE_Q_FILE, TWO_Q_FILE, THREE_Q_FILE, FOUR_Q_FILE, MAIN_FILE_NAME, PLAN_FILE_NAME } = detailData;
    const oneQFile = ONE_Q_FILE ? JSON.parse(ONE_Q_FILE) : [];
    const twoQFile = TWO_Q_FILE ? JSON.parse(TWO_Q_FILE) : [];
    const threeQFile = THREE_Q_FILE ? JSON.parse(THREE_Q_FILE) : [];
    const fourQFile = FOUR_Q_FILE ? JSON.parse(FOUR_Q_FILE) : [];
    const mainFile = MAIN_FILE_NAME ? JSON.parse(MAIN_FILE_NAME) : [];
    const planQFile = PLAN_FILE_NAME ? JSON.parse(PLAN_FILE_NAME) : [];
    this.setState({ oneQFile, twoQFile, threeQFile, fourQFile, mainFile, planQFile });
  };

  render = () => {
    const { extraApiData, YEAR, changeFormData, sagaKey: id } = this.props;
    const detailData = (extraApiData && extraApiData.detail && extraApiData.detail.data) || {};
    const { oneQFile, twoQFile, threeQFile, fourQFile, mainFile, planQFile } = this.state;
    const CONFIG = { property: { className: '' } };

    return (
      <ContentsWrapper>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="16%"></col>
              <col width="27%"></col>
              <col width="27%"></col>
              <col width="27%"></col>
            </colgroup>
            <tbody>
              <tr>
                <th>법규명</th>
                <td>{detailData && detailData.MASTER_LAW_NAME}</td>
                <td>관리번호</td>
                <td>{detailData && detailData.MASTER_LAW_NO}</td>
              </tr>
              <tr>
                <th>년도</th>
                <td colSpan={3}>{YEAR}</td>
              </tr>
              <tr>
                <th>법령</th>
                <td>{detailData && detailData.CLAUSE_GUBUN}</td>
                <td>조항</td>
                <td>{detailData && detailData.CLAUSE_NAME}</td>
              </tr>
              <tr>
                <th>1분기</th>
                <td colSpan={3}>
                  <EditorComp
                    COMP_FIELD="CONTENT"
                    sagaKey={id}
                    colData={detailData && detailData.ONE_Q}
                    readOnly
                    visible
                    changeFormData={changeFormData}
                    CONFIG={CONFIG}
                    WORK_SEQ={2242}
                  />
                </td>
              </tr>
              <tr>
                <th>1분기 첨부파일</th>
                <td colSpan={3}>{oneQFile && oneQFile.map(item => <a href={item.down}>{item.fileName}</a>)}</td>
              </tr>
              <tr>
                <th>2분기</th>
                <td colSpan={3}>
                  <EditorComp
                    COMP_FIELD="CONTENT"
                    sagaKey={id}
                    colData={detailData && detailData.TWO_Q}
                    readOnly
                    visible
                    changeFormData={changeFormData}
                    CONFIG={CONFIG}
                    WORK_SEQ={2242}
                  />
                </td>
              </tr>
              <tr>
                <th>2분기 첨부파일</th>
                <td colSpan={3}>{twoQFile && twoQFile.map(item => <a href={item.down}>{item.fileName}</a>)}</td>
              </tr>
              <tr>
                <th>3분기</th>
                <td colSpan={3}>
                  <EditorComp
                    COMP_FIELD="CONTENT"
                    sagaKey={id}
                    colData={detailData && detailData.THREE_Q}
                    readOnly
                    visible
                    changeFormData={changeFormData}
                    CONFIG={CONFIG}
                    WORK_SEQ={2242}
                  />
                </td>
              </tr>
              <tr>
                <th>3분기 첨부파일</th>
                <td colSpan={3}>{threeQFile && threeQFile.map(item => <a href={item.down}>{item.fileName}</a>)}</td>
              </tr>
              <tr>
                <th>4분기</th>
                <td colSpan={3}>
                  <EditorComp
                    COMP_FIELD="CONTENT"
                    sagaKey={id}
                    colData={detailData && detailData.FOUR_Q}
                    readOnly
                    visible
                    changeFormData={changeFormData}
                    CONFIG={CONFIG}
                    WORK_SEQ={2242}
                  />
                </td>
              </tr>
              <tr>
                <th>4분기 첨부파일</th>
                <td colSpan={3}>{fourQFile && fourQFile.map(item => <a href={item.down}>{item.fileName}</a>)}</td>
              </tr>
              <tr>
                <th>주요 법규 내용 (요약)</th>
                <td colSpan={3}>
                  <EditorComp
                    COMP_FIELD="CONTENT"
                    sagaKey={id}
                    colData={detailData && detailData.MAIN_CONTENT}
                    readOnly
                    visible
                    changeFormData={changeFormData}
                    CONFIG={CONFIG}
                    WORK_SEQ={2242}
                  />
                </td>
              </tr>
              <tr>
                <th>주요 법규 내용 (요약) 첨부파일</th>
                <td colSpan={3}>{mainFile && mainFile.map(item => <a href={item.down}>{item.fileName}</a>)}</td>
              </tr>
              <tr>
                <th>운영 현황</th>
                <td colSpan={3}>
                  <EditorComp
                    COMP_FIELD="CONTENT"
                    sagaKey={id}
                    colData={detailData && detailData.PLAN_CONTENT}
                    readOnly
                    visible
                    changeFormData={changeFormData}
                    CONFIG={CONFIG}
                    WORK_SEQ={2242}
                  />
                </td>
              </tr>
              <tr>
                <th>운영 현황 첨부파일</th>
                <td colSpan={3}>{planQFile && planQFile.map(item => <a href={item.down}>{item.fileName}</a>)}</td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
      </ContentsWrapper>
    );
  };
}

OnlyView.propTypes = {
  sagaKey: PropTypes.string,
  extraApiData: PropTypes.object,
  getExtraApiData: PropTypes.func,
  changeFormData: PropTypes.func,
  taskSeq: PropTypes.number,
  YEAR: PropTypes.string,
};

OnlyView.defaultProps = {};

export default OnlyView;
