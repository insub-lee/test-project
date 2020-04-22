import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Input } from 'antd';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledHtmlTable from 'commonStyled/EshsStyled/Table/StyledHtmlTable';

const { TextArea } = Input;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'eshsExhaust',
        url: '/api/eshs/v1/common/eshsexhaust',
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry);
  }

  render() {
    const {
      result: { eshsExhaust },
    } = this.props;
    const { EXHAUST_IN_WATER, EXHAUST_OUT_PRC_FAB, EXHAUST_OUT_PRC_IN, EXHAUST_OUT_LAST } = eshsExhaust.exhaust;
    return (
      <ContentsWrapper>
        <StyledHtmlTable className="tableWrapper">
          <table>
            <colgroup>
              <col width="30%" />
              <col width="70%" />
            </colgroup>
            <tbody>
              <tr>
                <th colSpan="2" style={{ background: '#D6EBFF' }}>
                  투입 (INPUT)
                </th>
                <th colSpan="4" style={{ background: '#D6EBFF' }}>
                  배출 (OUTPUT)
                </th>
              </tr>
              <tr>
                <td>구분</td>
                <td>투입물</td>
                <th>구분</th>
                <th>처리시설 유입</th>
                <th>처리시설</th>
                <th>최종 배출</th>
              </tr>
              <tr>
                <td>약품</td>
                <td>
                  <TextArea value={EXHAUST_IN_WATER || '투입물'} onChange={e => this.onChange('exhaustInWater', e.target.value)} autoSize={{ minRows: 10 }} />
                </td>
                <td>수질</td>
                <td>
                  <TextArea
                    value={EXHAUST_OUT_PRC_FAB || '처리시설 유입'}
                    onChange={e => this.onChange('exhaustOutPrcFab', e.target.value)}
                    autoSize={{ minRows: 20 }}
                  />
                </td>
                <td>
                  <TextArea
                    value={EXHAUST_OUT_PRC_IN || '처리시설'}
                    onChange={e => this.onChange('exhaustOutPrcIn', e.target.value)}
                    autoSize={{ minRows: 20 }}
                  />
                </td>
                <td>
                  <TextArea
                    value={EXHAUST_OUT_LAST || '최종 배출'}
                    onChange={e => this.onChange('exhaustOutLast', e.target.value)}
                    autoSize={{ minRows: 20 }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <span>[약품투입 및 배출 현황]</span>
          <span>산업시설의 폐가스, 분진, 세정, 응축시설</span>
          <hr />
          <span>Gas 저장 창고 폐가스 세정시서리 비상상황시(가스 유출시) 가동하여 Veolia 공동방지시서ㅗㄹ로 유입하여 처리 후 방류</span>
        </StyledHtmlTable>
      </ContentsWrapper>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.object,
};

List.defaultProps = {
  getCallDataHandler: () => {},
};

export default List;
