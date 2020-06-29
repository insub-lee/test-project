import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Input, Row, Col, message } from 'antd';
import GGEditor, { Flow } from 'gg-editor';

import ContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import FlowDetailPanel from './EditorDetailPanel';
import EditorActionPanel from './EditorActionPanel';

const { TextArea } = Input;

// gg-editor viewPage에서 readOnly 설정
const graphConfig = {
  // width: '100%',
  mode: 'readOnly',
  modes: {
    readOnly: ['panCanvas', 'clickEdgeSelected', 'clickNodeSelected', 'clickCanvasSelected', 'clickGroupSelected'],
  },
};

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setDataApi();
  }

  setDataApi = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'eshsExhaust',
        url: '/api/eshs/v1/common/eshsexhaust',
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry, this.setData);
  };

  setData = () => {
    const {
      result: { eshsExhaust },
    } = this.props;
    if (eshsExhaust && eshsExhaust.exhaust) {
      const { EXHAUST_IN_WATER, EXHAUST_OUT_PRC_FAB, EXHAUST_OUT_PRC_IN, EXHAUST_OUT_LAST } = eshsExhaust.exhaust;
      this.setState({
        exhaustInWater: EXHAUST_IN_WATER,
        exhaustOutPrcFab: EXHAUST_OUT_PRC_FAB,
        exhaustOutPrcIn: EXHAUST_OUT_PRC_IN,
        exhaustOutLast: EXHAUST_OUT_LAST,
      });
    }
  };

  onChange = (name, value) => {
    this.setState({ [name]: value });
  };

  onFlowChartSave = (id, result) => {
    const { submitHandlerBySaga } = this.props;
    const { exhaustInWater, exhaustOutPrcFab, exhaustOutPrcIn, exhaustOutLast } = this.state;
    const submitData = {
      PARAM: {
        EXHAUST_DESIGN: result.DESIGN_DATA,
        EXHAUST_IN_WATER: exhaustInWater || '투입물',
        EXHAUST_OUT_PRC_FAB: exhaustOutPrcFab || '처리시설',
        EXHAUST_OUT_PRC_IN: exhaustOutPrcIn || '처리시설 유입',
        EXHAUST_OUT_LAST: exhaustOutLast || '최종 배출',
      },
    };
    submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsexhaust', submitData, this.callBack);
  };

  callBack = (id, response) => {
    if (response.result === 1) {
      message.info('등록되었습니다.');
      this.setDataApi();
    } else {
      message.info('페이지에 오류가 발생했습니다.');
    }
  };

  render() {
    const {
      sagaKey: id,
      result: { eshsExhaust },
      eshsExhaustView,
    } = this.props;
    const EXHAUST_DESIGN = eshsExhaust && eshsExhaust.exhaust && JSON.parse(eshsExhaust.exhaust.EXHAUST_DESIGN);
    // 약품투입 및 배출 현황데이터
    const { exhaustInWater, exhaustOutPrcFab, exhaustOutPrcIn, exhaustOutLast } = this.state;
    // 폐수 배출과정 design
    const data = {
      // // nodes: EXHAUST_DESIGN && EXHAUST_DESIGN.nodes && EXHAUST_DESIGN.nodes.map(item => ({ ...item, size: item.size === '1*1' ? '40*40' : '' })),
      // nodes: EXHAUST_DESIGN && EXHAUST_DESIGN.nodes && EXHAUST_DESIGN.nodes.map(item => ({ ...item, size: item.size === '40*40' ? '1*1' : '' })),
      nodes: EXHAUST_DESIGN && EXHAUST_DESIGN.nodes,
      edges: EXHAUST_DESIGN && EXHAUST_DESIGN.edges,
    };
    return (
      <ContentsWrapper>
        {eshsExhaustView ? (
          <div style={{ position: 'relative', overflow: 'hidden' }} readOnly>
            <StyledHtmlTable className="tableWrapper" style={{ width: '50%', float: 'left', textAlign: 'center' }} readOnly>
              <GGEditor style={{ border: '1px solid #444444' }} model="view" readOnly>
                <Row type="flex">
                  <Col span={24}>
                    <Flow style={{ width: '100%', height: 800 }} data={data} graph={graphConfig} />
                  </Col>
                </Row>
              </GGEditor>
              <span>[폐수 배출 과정]</span>
            </StyledHtmlTable>
            <StyledHtmlTable className="tableWrapper" style={{ width: '50%', float: 'right', textAlign: 'center' }}>
              <GGEditor style={{ width: 400, border: '1px solid #444444', display: 'inline-block' }}>
                <Row type="flex">
                  <Col span={24}>
                    <Flow
                      style={{ width: '100%', height: 800 }}
                      data={{
                        nodes: [
                          { type: 'node', id: 'materialInput', label: '원료투입', x: 200, y: 36.5, index: 1 },
                          { type: 'node', id: 'oxideFilmStorage', label: '산화막저장', x: 200, y: 136.5, index: 2 },
                          { type: 'node', id: 'photosensitive', label: '사진감광', x: 200, y: 236.5, index: 3 },
                          { type: 'node', id: 'WashingDeveloper', label: '현상액 세척', x: 200, y: 336.5, index: 4 },
                          { type: 'node', id: 'etchingAndwashing', label: '식각 및 세척', x: 200, y: 436.5, index: 5 },
                          { type: 'node', id: 'diffusion', label: '확산', x: 200, y: 536.5, index: 6 },
                          { type: 'node', id: 'screeningWork', label: '선별 작업', x: 200, y: 636.5, index: 7 },
                          { type: 'node', id: 'cut', label: '절단', x: 200, y: 736.5, index: 8 },
                        ],
                        edges: [
                          { source: 'materialInput', sourceAnchor: 2, target: 'oxideFilmStorage', targetAnchor: 0, id: 'fed3d49d', index: 8 },
                          { source: 'oxideFilmStorage', sourceAnchor: 2, target: 'photosensitive', targetAnchor: 0, id: '35ad73b8', index: 9 },
                          { source: 'photosensitive', sourceAnchor: 2, target: 'WashingDeveloper', targetAnchor: 0, id: '13a2e30a', index: 10 },
                          { source: 'WashingDeveloper', sourceAnchor: 2, target: 'etchingAndwashing', targetAnchor: 0, id: '4455e73d', index: 11 },
                          { source: 'etchingAndwashing', sourceAnchor: 2, target: 'diffusion', targetAnchor: 0, id: '5262c28e', index: 12 },
                          { source: 'diffusion', sourceAnchor: 2, target: 'screeningWork', targetAnchor: 0, id: '9d1a7f0a', index: 13 },
                          { source: 'screeningWork', sourceAnchor: 2, target: 'cut', targetAnchor: 0, id: '15203d09', index: 14 },
                        ],
                      }}
                      graph={graphConfig}
                    />
                  </Col>
                </Row>
              </GGEditor>
              <br />
              <span>[제품 생산 공정도]</span>
            </StyledHtmlTable>
            <StyledHtmlTable className="tableWrapper" style={{ width: '50%', float: 'left', textAlign: 'center' }}>
              <div style={{ marginTop: 10 }}>
                <table>
                  <colgroup>
                    <col width="10%" />
                    <col width="20%" />
                    <col width="10%" />
                    <col width="20%" />
                    <col width="20%" />
                    <col width="20%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2">투입 (INPUT)</th>
                      <th colSpan="4">배출 (OUTPUT)</th>
                    </tr>
                    <tr>
                      <td>구분</td>
                      <td>투입물</td>
                      <td>구분</td>
                      <td>처리시설 유입</td>
                      <td>처리시설</td>
                      <td>최종 배출</td>
                    </tr>
                    <tr>
                      <td>약품</td>
                      <td>
                        <TextArea readOnly value={exhaustInWater || '투입물'} autoSize={{ minRows: 25 }} />
                      </td>
                      <td>수질</td>
                      <td>
                        <TextArea readOnly value={exhaustOutPrcFab || '처리시설 유입'} autoSize={{ minRows: 25 }} />
                      </td>
                      <td>
                        <TextArea readOnly value={exhaustOutPrcIn || '처리시설'} autoSize={{ minRows: 25 }} />
                      </td>
                      <td>
                        <TextArea readOnly value={exhaustOutLast || '최종 배출'} autoSize={{ minRows: 25 }} />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <span>[약품투입 및 배출 현황]</span>
              </div>
            </StyledHtmlTable>
            <StyledHtmlTable className="tableWrapper" style={{ width: '50%', position: 'absolute', bottom: 20, right: 0 }}>
              <div style={{ marginTop: 10 }}>
                <span>산업시설의 폐가스, 분진, 세정, 응축시설</span>
                <hr />
                <TextArea value="Gas 저장 창고 폐가스 세정시서리 비상상황시(가스 유출시) 가동하여 Veolia 공동방지시설로 유입하여 처리 후 방류" readOnly />
              </div>
            </StyledHtmlTable>
          </div>
        ) : (
          <>
            <StyledHtmlTable className="tableWrapper" style={{ width: '50%', float: 'left' }}>
              <GGEditor style={{ border: '1px solid #444444' }}>
                <Row type="flex">
                  <Col span={18}>
                    <Row>
                      <Col span={24}>
                        <EditorActionPanel sagaKey={id} onflowChartSave={this.onFlowChartSave} />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <Flow
                          style={{ width: '100%', height: 800 }}
                          data={data}
                          // graph={{ modes: { default: ['panCanvas', 'clickCanvasSelected', 'clickEdgeSelected'] } }}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col span={6}>
                    <FlowDetailPanel />
                  </Col>
                </Row>
              </GGEditor>
            </StyledHtmlTable>
            <StyledHtmlTable className="tableWrapper" style={{ width: '50%', float: 'right' }}>
              <h3>투입 (INPUT)</h3>
              <table>
                <colgroup>
                  <col width="20%" />
                  <col width="80%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th style={{ background: '#D6EBFF' }}>구분</th>
                    <th style={{ background: '#D6EBFF' }}>투입물</th>
                  </tr>
                  <tr>
                    <td>수질</td>
                    <td>
                      <TextArea value={exhaustInWater || '투입물'} onChange={e => this.onChange('exhaustInWater', e.target.value)} autoSize={{ minRows: 11 }} />
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <h3>배출 (OUTPUT)</h3>
              <table>
                <colgroup>
                  <col width="20%" />
                  <col width="30%" />
                  <col width="25%" />
                  <col width="25%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th style={{ background: '#D6EBFF' }}>구분</th>
                    <th style={{ background: '#D6EBFF' }}>처리시설 유입</th>
                    <th style={{ background: '#D6EBFF' }}>처리시설</th>
                    <th style={{ background: '#D6EBFF' }}>최종 배출</th>
                  </tr>
                  <tr>
                    <td>수질</td>
                    <td>
                      <TextArea
                        value={exhaustOutPrcFab || '처리시설 유입'}
                        onChange={e => this.onChange('exhaustOutPrcFab', e.target.value)}
                        autoSize={{ minRows: 20 }}
                      />
                    </td>
                    <td>
                      <TextArea
                        value={exhaustOutPrcIn || '처리시설'}
                        onChange={e => this.onChange('exhaustOutPrcIn', e.target.value)}
                        autoSize={{ minRows: 20 }}
                      />
                    </td>
                    <td>
                      <TextArea
                        value={exhaustOutLast || '최종 배출'}
                        onChange={e => this.onChange('exhaustOutLast', e.target.value)}
                        autoSize={{ minRows: 20 }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </StyledHtmlTable>
          </>
        )}
      </ContentsWrapper>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  submitHandlerBySaga: PropTypes.func,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.object,
  eshsExhaustView: PropTypes.bool,
};

List.defaultProps = {
  getCallDataHandler: () => {},
  // 제품 생산 공정도
  // nodes: [
  //   { type: 'node', id: 'materialInput', label: '원료투입', x: 200, y: 36.5, index: 1 },
  //   { type: 'node', id: 'oxideFilmStorage', label: '산화막저장', x: 200, y: 136.5, index: 2 },
  //   { type: 'node', id: 'photosensitive', label: '사진감광', x: 200, y: 236.5, index: 3 },
  //   { type: 'node', id: 'WashingDeveloper', label: '현상액 세척', x: 200, y: 336.5, index: 4 },
  //   { type: 'node', id: 'etchingAndwashing', label: '식각 및 세척', x: 200, y: 436.5, index: 5 },
  //   { type: 'node', id: 'diffusion', label: '확산', x: 200, y: 536.5, index: 6 },
  //   { type: 'node', id: 'screeningWork', label: '선별 작업', x: 200, y: 636.5, index: 7 },
  //   { type: 'node', id: 'cut', label: '절단', x: 200, y: 736.5, index: 8 },
  // ],
  // edges: [
  //   { source: 'materialInput', sourceAnchor: 2, target: 'oxideFilmStorage', targetAnchor: 0, id: 'fed3d49d', index: 8 },
  //   { source: 'oxideFilmStorage', sourceAnchor: 2, target: 'photosensitive', targetAnchor: 0, id: '35ad73b8', index: 9 },
  //   { source: 'photosensitive', sourceAnchor: 2, target: 'WashingDeveloper', targetAnchor: 0, id: '13a2e30a', index: 10 },
  //   { source: 'WashingDeveloper', sourceAnchor: 2, target: 'etchingAndwashing', targetAnchor: 0, id: '4455e73d', index: 11 },
  //   { source: 'etchingAndwashing', sourceAnchor: 2, target: 'diffusion', targetAnchor: 0, id: '5262c28e', index: 12 },
  //   { source: 'diffusion', sourceAnchor: 2, target: 'screeningWork', targetAnchor: 0, id: '9d1a7f0a', index: 13 },
  //   { source: 'screeningWork', sourceAnchor: 2, target: 'cut', targetAnchor: 0, id: '15203d09', index: 14 },
  // ],

  // 폐수 배출 과정
  // nodes: [
  //   { id: 'circle5', index: 10, shape: 'flow-circle', size: '1*1', type: 'node', x: 387, y: 68 },
  //   { id: 'materialInput', index: 12, label: '공업용수', size: '50*50', type: 'node', x: 47, y: 495 },
  //   { id: 'circle7', index: 14, shape: 'flow-circle', size: '1*1', type: 'node', x: 47, y: 109 },
  //   { id: 'circle4', index: 15, shape: 'flow-circle', size: '1*1', type: 'node', x: 47, y: 668 },
  //   { id: 'circle9', index: 24, shape: 'flow-circle', size: '1*1', type: 'node', x: 47, y: 384 },
  //   { id: 'pureMake', index: 25, label: '초순수 제조', size: '100*50', type: 'node', x: 155, y: 299 },
  //   { id: 'make', index: 26, label: '생산', size: '50*50', type: 'node', x: 349, y: 299 },
  //   { id: 'pureRecover', index: 27, label: '초순수 재사용', size: '100*50', type: 'node', x: 253, y: 250 },
  //   { id: 'pureWaste', index: 28, label: '초순수 폐수', size: '100*50', type: 'node', x: 253, y: 360 },
  //   { id: 'circle2', index: 29, shape: 'flow-circle', size: '1*1', type: 'node', x: 483, y: 299 },
  //   { id: 'waste', index: 30, label: '폐수처리', size: '50*50', type: 'node', x: 483, y: 495 },
  //   { id: 'circle6', index: 31, shape: 'flow-circle', size: '1*1', type: 'node', x: 483, y: 150 },
  //   { id: 'sluge', index: 32, label: '탈수여액(슬러지)', size: '100*50', type: 'node', x: 253, y: 495 },
  //   { id: 'utility', index: 33, label: '기타(Utility)', size: '100*50', type: 'node', x: 155, y: 190 },
  //   { id: 'airExhuest', index: 34, label: '대기방지시설', size: '100*50', type: 'node', x: 155, y: 109 },
  //   { id: 'ctIce', index: 35, label: 'C/T(냉동기)', size: '100*50', type: 'node', x: 155, y: 28 },
  // ],
  // edges: [
  //   { id: '2925382f', index: 0, label: '6639', source: 'circle4', sourceAnchor: 0, target: 'materialInput', targetAnchor: 2 },
  //   { id: '5369c226', index: 1, label: '3120(47%)', source: 'circle9', sourceAnchor: 0, target: 'circle7', targetAnchor: 2 },
  //   { id: '10599704', index: 2, label: '3519(53%)', source: 'circle9', sourceAnchor: 1, target: 'pureMake', targetAnchor: 3 },
  //   { id: '7369e3e1', index: 3, label: '2190', source: 'circle7', sourceAnchor: 1, target: 'ctIce', targetAnchor: 3 },
  //   { id: '4a04f900', index: 4, label: '679', source: 'circle7', sourceAnchor: 1, target: 'airExhuest', targetAnchor: 3 },
  //   { id: '8a2d4161', index: 5, label: '251', source: 'circle7', sourceAnchor: 1, target: 'utility', targetAnchor: 3 },
  //   { id: 'b8980f6b', index: 6, source: 'ctIce', sourceAnchor: 1, target: 'circle5', targetAnchor: 3 },
  //   { id: 'b98c426e', index: 7, source: 'airExhuest', sourceAnchor: 1, target: 'circle5', targetAnchor: 3 },
  //   { id: '26efe292', index: 8, source: 'airExhuest', sourceAnchor: 1, target: 'circle6', targetAnchor: 3 },
  //   { id: '6a7a753c', index: 9, source: 'utility', sourceAnchor: 1, target: 'circle6', targetAnchor: 3 },
  //   { id: 'e93b2a38', index: 11, label: '6', source: 'waste', sourceAnchor: 3, target: 'sluge', targetAnchor: 1 },
  //   { id: '3e8fe8aa', index: 13, label: '6639', source: 'materialInput', sourceAnchor: 0, target: 'circle9', targetAnchor: 2 },
  //   { id: '9addad72', index: 16, label: '1241', source: 'circle6', sourceAnchor: 2, target: 'circle2', targetAnchor: 0 },
  //   { id: 'c205f5c2', index: 17, label: '4760', source: 'circle2', sourceAnchor: 2, target: 'waste', targetAnchor: 0 },
  //   { id: 'd3a47df7', index: 18, label: '2650', source: 'make', sourceAnchor: 1, target: 'circle2', targetAnchor: 3 },
  //   { id: '42814213', index: 19, label: '4792', source: 'pureMake', sourceAnchor: 1, target: 'make', targetAnchor: 3 },
  //   { id: 'f4e36732', index: 20, label: undefined, source: 'make', sourceAnchor: 0, target: 'pureRecover', targetAnchor: 1 },
  //   { id: 'e2aa9fb9', index: 21, label: '2142', source: 'pureRecover', sourceAnchor: 3, target: 'pureMake', targetAnchor: 0 },
  //   { id: '63466b90', index: 22, source: 'pureMake', sourceAnchor: 2, target: 'pureWaste', targetAnchor: 3 },
  //   { id: 'ba83ed37', index: 23, label: '869', source: 'pureWaste', sourceAnchor: 1, target: 'circle2', targetAnchor: 2 },
  //   { id: 'acf0ac23', index: 36, label: '1879', source: 'circle5', sourceAnchor: 1, target: { x: 484, y: 68 } },
  //   { id: '0ced5274', index: 37, label: '4754', source: 'waste', sourceAnchor: 2, target: { x: 481, y: 663 } },
  // ],
};

export default List;
