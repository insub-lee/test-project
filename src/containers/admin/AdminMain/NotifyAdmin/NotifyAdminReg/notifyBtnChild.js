import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { BtnIconWidgetDel } from '../../../../../components/uielements/styles/buttons.style';

class NotifyBtnChild extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      btnList: this.props.btnList,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.btnList !== nextProps.btnList) {
      this.setState({ btnList: nextProps.btnList });
    }
  }

  handleChangeValue = (e) => {
    const copyBtnList = this.state.btnList;
    copyBtnList.VALUE = e.target.value;
    this.setState({ btnList: copyBtnList, value: copyBtnList.VALUE }); // eslint-disable-line
  }

  handleChangeUrl = (e) => {
    const copyBtnList = this.state.btnList;
    copyBtnList.URL = e.target.value;
    this.setState({ btnList: copyBtnList, value: copyBtnList.URL }); // eslint-disable-line
  }

  render() {
    const {
      index,
      setDeletedBtnIndex,
    } = this.props;

    const { btnList } = this.state;

    return (
      <div className="mediaRegForm btnReg" key={index}>
        <div className="containerDiv">
          <table style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td className="up">
                  <label htmlFor="subject" className="label">
                    {/* {intlObj.get(messages.bannerName)} */}
                    VALUE
                  </label>
                  <Input
                    id="subject"
                    name="VALUE"
                    type="text"
                    value={btnList.VALUE}
                    onChange={this.handleChangeValue}
                  />
                </td>
              </tr>
              <tr>
                <td className="down">
                  <label htmlFor="url" className="label">
                    {/* {intlObj.get(messages.bannerName)} */}
                    URL
                  </label>
                  <Input
                    placeholder="URL은 http:// 로 시작해주십시오."
                    id="url"
                    name="url"
                    type="text"
                    value={btnList.URL}
                    onChange={this.handleChangeUrl}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <BtnIconWidgetDel className="delete" title="delete" onClick={() => { setDeletedBtnIndex(btnList.SEQNO); }} style={{ display: 'inline-block' }} />
        </div>
      </div>  // eslint-disable-line
    );
  }
}

NotifyBtnChild.propTypes = {
  index: PropTypes.number.isRequired, // eslint-disable-line
  btnList: PropTypes.object.isRequired,  // eslint-disable-line
  setDeletedBtnIndex: PropTypes.func.isRequired, // eslint-disable-line
};

export default NotifyBtnChild;

