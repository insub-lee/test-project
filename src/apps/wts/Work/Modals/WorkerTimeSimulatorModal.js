import React from 'react';
import Modal from 'rc-dialog';

// import 'rc-time-picker/assets/index.css';
import styled from 'styled-components';
import StyledContent from './StyledContent';

const Wrapper = styled.div`
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
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    padding: 0;
    border: 0;
    border-radius: 0;
    background: 0;
  }
  .tb_is input:focus {
    border: 2px solid #ff7f29;
    width: 100%;
    height: 40px;
    line-height: calc(40px - 4px);
  }
`;

class WorkerTimeSimulatorModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
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
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleAfterOpen = this.handleAfterOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleOpenModal() {
    this.setState({ isOpen: true });
  }

  handleCloseModal() {
    this.setState({
      isOpen: false,
      times: [
        { general: 0, night: 0 },
        { general: 0, night: 0 },
        { general: 0, night: 0 },
        { general: 0, night: 0 },
        { general: 0, night: 0 },
        { general: 0, night: 0 },
        { general: 0, night: 0 },
      ],
    });
  }

  handleAfterOpen() {
    const { id } = this.state;
    console.debug('Opened Modal : ', id);
  }

  handleChange(e, index, type) {
    const { value } = e.target;
    const time = value === '' ? 0 : parseFloat(value);
    console.debug('### Time', time);
    this.setState(prevState => {
      const { times } = prevState;
      if (time > 0) {
        times[index][type] = time > 24 ? 24 : time;
      } else {
        times[index][type] = 0;
      }
      return { times };
    });
  }

  render() {
    const { isOpen, days, times } = this.state;
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
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.handleCloseModal}
        style={{
          width: 500,
        }}
        bodyStyle={{
          padding: 0,
        }}
        closable={false}
        destroyOnClose
      >
        <div>
          <StyledContent>
            <div className="pop_tit">
              근무시간 시뮬레이터
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <Wrapper>
                <div style={{ width: '100%' }}>
                  <table>
                    <colgroup>
                      <col width="30%" />
                      <col width={`${70 / days.length}%`} />
                    </colgroup>
                    <tbody className="tb02 wb">
                      <tr className="bd">
                        <th />
                        {days.map(day => (
                          <th key={day}>{day}</th>
                        ))}
                      </tr>
                      <tr className="bd">
                        <th>근무 시간</th>
                        {days.map((day, index) => (
                          <td className="tb_is" key={day}>
                            <input type="number" onChange={e => this.handleChange(e, index, 'general')} value={times[index].general} />
                          </td>
                        ))}
                      </tr>
                      <tr className="bd">
                        <th>야근 시간</th>
                        {days.map((day, index) => (
                          <td className="tb_is" key={day}>
                            <input type="number" onChange={e => this.handleChange(e, index, 'night')} value={times[index].night} />
                          </td>
                        ))}
                      </tr>
                      <tr className="bd">
                        <th>전체 근무 시간</th>
                        <td
                          style={{ color: result.total > 52 ? '#ff7f29' : 'black', textAlign: 'right', fontSize: '20px', fontWeight: 800 }}
                          colSpan={days.length}
                        >
                          {result.total}
                        </td>
                      </tr>
                      <tr className="bd">
                        <th>야근 횟수</th>
                        <td
                          style={{ color: result.nightCnt > 2 ? '#ff7f29' : 'black', textAlign: 'right', fontSize: '20px', fontWeight: 800 }}
                          colSpan={days.length}
                        >
                          {result.nightCnt}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="cr" />
              </Wrapper>
            </div>
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

export default WorkerTimeSimulatorModal;
