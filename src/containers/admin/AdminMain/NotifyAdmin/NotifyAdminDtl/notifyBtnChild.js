import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

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

  render() {
    const { index } = this.props;

    const { btnList } = this.state;
    console.log('btnList', btnList);

    return (
      <div className="mediaRegForm btnReg" key={index}>
        <div className="containerDiv">
          <table style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td className="up">
                  <label htmlFor="subject" className="label">
                    VALUE
                  </label>
                  <Input id="subject" name="VALUE" type="text" value={btnList.value} readOnly />
                </td>
              </tr>
              <tr>
                <td className="down">
                  <label htmlFor="url" className="label">
                    URL
                  </label>
                  <Input id="url" name="url" type="text" value={btnList.link.url} readOnly />
                </td>
              </tr>
            </tbody>
          </table>
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
