import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input } from 'antd';
import * as feed from 'components/Feedback/functions';
import Axios from 'axios';
import { BtnSearchDkGray } from './buttons.style';

class Lot extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      operNo: this.props.Item.OPER,
      lotId: this.props.Item.LOT_ID,
      selectLotId: '',
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({
      visible: false,
      selectLotId: this.state.lotId,
    });

    if (this.props.onUpdateLot)
      this.props.onUpdateLot(this.state.lotId, this.state.operNo);
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  onChange = (e, property) => {
    let state = Object.assign({}, this.state);
    state[property] = e.target.value;
    this.setState(state);
  }

  render() {
    return (
      <div>
        { this.state.selectLotId + " "} 
        <BtnSearchDkGray type="primary" onClick={this.showModal}>
          입력
        </BtnSearchDkGray>
        <Modal
          title="Lot 입력"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelButtonProps={{ style: { display: 'none' } }}
          width="270px"
          height="140px"
        >
          <div className="block_p_contents">
            <div className="table_detail_edit">
              <table>
                <colgroup>
                  <col width="25%"></col>
                  <col width="75%"></col>
                </colgroup>
                <tbody>
                  <tr>
                    <th>LOT ID</th>
                    <td><div className="condition">
                        <Input maxLength="15" value={this.state.lotId} onChange={e => this.onChange(e, 'lotId')}/>
                      </div></td>
                  </tr>
                  <tr>
                    <th>OPER NO</th>
                    <td><div className="condition">
                        <Input maxLength="9" value={this.state.operNo} onChange={e => this.onChange(e, 'operNo')}/>
                      </div></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Lot;
