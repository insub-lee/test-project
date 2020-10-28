import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import styled from 'styled-components';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import * as selectors from 'containers/portal/App/selectors';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import { divide } from 'numeral';
import Styled from './Styled';
import AccidentStatus from '../infoTable/AccidentStatus';

const StyledTooltip = styled.div`
  .custom-tooltip {
    padding: 10px;
    background-color: #f6f6f6;
    border-radius: 5px;
  }
`;

const CustomTooltip = props => {
  const target = props.payload[0];
  if (props.active) {
    return (
      <StyledTooltip>
        <div className="custom-tooltip">
          <p className="label">
            <span style={{ fontWeight: 600 }}>{`${props.label}`}</span>
          </p>
          <p className="label">
            <span>{`달성율 : ${target.value}배`}</span>
          </p>
        </div>
      </StyledTooltip>
    );
  }
  return '';
};

class NoaccidentManagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
    };
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const apiInfo = {
      key: 'getNoAccidentMgtInfo',
      type: 'POST',
      url: `/api/eshs/v1/common/noAccident`,
      params: { PARAM: { type: 'GET_STATUS' } },
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.initCallback);
  };

  initCallback = (id, response) => {
    const { result } = response;
    const list = this.setList(result);
    this.setState({
      info: result || {},
      list,
    });
  };

  setList = info => {
    const list = [];
    for (let i = 1; i < 4; i += 1) {
      list.push({
        AREA: info[`AREA_${i}`],
        TOTAL: info[`TOTAL_${i}`],
        TARGET: info[`TARGET_${i}`],
        ACCIDENT_DT: info[`ACCIDENT_DT_${i}`],
        RATE: info[`RATE_${i}`],
      });
    }
    return list || [];
  };

  render() {
    const { menuFixedYn } = this.props;
    const { info, list } = this.state;
    const boxWidth = menuFixedYn === 'N' ? 620 : 500;
    return (
      <Styled>
        <div style={{ marginBottom: '20px' }}>
          <AccidentStatus info={info} />
        </div>
        <StyledCustomSearchWrapper>
          <h3 className="fw600">달성시간(율) 계산방법</h3>
          <p>달성시간(인시) = 실근무자수 X 실근로시간</p>
          <p>달성율 = 달성 / 목표 X 100(%)</p>
        </StyledCustomSearchWrapper>
        <div style={{ width: '100%', position: 'relative', display: 'flex' }}>
          <div className="chart_wrap" style={{ ddisplay: 'inline-block', width: '50%', padding: '5px' }}>
            <BarChart width={boxWidth} height={350} data={list}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="AREA" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="RATE" fill="#8884d8" barSize={20} />
            </BarChart>
          </div>
          <div style={{ display: 'inline-block', width: '50%', padding: '5px' }}>
            <StyledHtmlTable>
              <table>
                <colgroup>
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                    <th>특기사항</th>
                  </tr>
                  <tr>
                    <td className="check">
                      <h4 className="fw600 mb5">&#8251; 무재해 시작일</h4>
                      <p>구미 : {`${info.NO_ACCIDENT_DT_1 || '데이터가 없습니다'}`}</p>
                      <p>청주 : {`${info.NO_ACCIDENT_DT_2 || '데이터가 없습니다'}`}</p>
                      <p>서울 : {`${info.NO_ACCIDENT_DT_3 || '데이터가 없습니다'}`}</p>
                      <h4 className="fw600 mt20 mb5">&#8251; 최근 사고일</h4>
                      <p>구미 : {`${info.ACCIDENT_DT_1 || '사고기록이 없습니다'}`}</p>
                      <p>청주 : {`${info.ACCIDENT_DT_2 || '사고기록이 없습니다'}`}</p>
                      <p>서울 : {`${info.ACCIDENT_DT_3 || '사고기록이 없습니다'}`}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </StyledHtmlTable>
          </div>
        </div>
      </Styled>
    );
  }
}

NoaccidentManagePage.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandlerReturnRes: PropTypes.func,
  menuFixedYn: PropTypes.string,
};

NoaccidentManagePage.defaultProps = {};

const mapStateToProps = createStructuredSelector({
  menuFixedYn: selectors.makeSelectMenuFixedYn(),
});

export default connect(mapStateToProps)(NoaccidentManagePage);
