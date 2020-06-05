import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 30px !important;
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  .bd {
    border: 1px solid #d4d7df !important;
  }
  .tb02 {
    width: 100%;
  }
  .tb02 caption {
    color: #333;
    font-size: 15px;
    margin-bottom: 10px;
    text-align: right;
  }
  .tb02 th,
  .tb02 td {
    font-size: 15px;
    padding: 12px 10px;
    text-align: center;
  }
  .tb02.wb th,
  .tb02.wb td,
  .tb02.wb a,
  .tb02.wb button {
    word-break: break-all;
  }
  .tb02 th {
    color: white;
    background: #6e7b95;
    font-weight: 400;
    padding: 8px 10px;
  }
  .tb02 .bd th {
    border: 1px solid #5a6885;
  }
  .tb02 td {
    position: relative;
    color: #555;
    border: 1px solid #eaecee;
    padding: 7px 10px;
  }
  .tb02 .bb {
    border-bottom: 2px solid #eaecee;
  }
  .tb02 th .checkbox label {
    color: white;
  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .tb_is {
    padding: 0 !important;
  }
  .tb_is input {
    width: calc(100% - 20px);
    height: 40px;
    line-height: 40px;
    text-align: center;
    padding: 0 10px;
    border: 0;
    border-radius: 0;
    background: 0;
  }
  .tb_is input:focus {
    border: 2px solid #ff7f29;
    width: calc(100% - 24px);
    height: calc(40px - 4px);
  }
`;

class WorkSimulator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: ['월', '화', '수', '목', '금', '토', '일'],
      times: [
        { general: 0, night: 0 },
        { general: 0, night: 0 },
        { general: 0, night: 0 },
        { general: 0, night: 0 },
        { general: 0, night: 0 },
        { general: 0, night: 0 },
        { general: 0, night: 0 },
      ],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, index, type) {
    const { value } = e.target;
    this.setState(prevState => {
      const { times } = prevState;
      times[index][type] = value === '' ? 0 : parseFloat(value);
      return { times };
    });
  }

  render() {
    const { days, times } = this.state;
    const result = {
      total: 0,
      nightCnt: 0,
    };
    times.forEach(time => {
      if (time.night > 0) {
        result.nightCnt += 1;
      }
      result.total = result.total + time.general + time.night;
    });
    return (
      <Wrapper>
        <table>
          <colgroup>
            <col width={50} />
            <col width={100} />
            <col width={100} />
          </colgroup>
          <tbody className="tb02 wb">
            <tr className="bd">
              <th />
              <th>근무 시간</th>
              <th>야근 시간</th>
            </tr>
            {days.map((day, index) => (
              <tr key={day} className="bd">
                <th>{day}</th>
                <td className="tb_is">
                  <input type="number" onChange={e => this.handleChange(e, index, 'general')} value={times[index].general} />
                </td>
                <td className="tb_is">
                  <input type="number" onChange={e => this.handleChange(e, index, 'night')} value={times[index].night} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          <span>{`${result.total}시간 근무 (야근 횟수: ${result.nightCnt})`}</span>
        </p>
      </Wrapper>
    );
  }
}

export default WorkSimulator;
