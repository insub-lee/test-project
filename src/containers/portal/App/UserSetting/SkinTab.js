import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio, Spin } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { intlObj, lang } from 'utils/commonUtils';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import * as actions from './actions';
import injectReducer from '../../../../utils/injectReducer';
import injectSaga from '../../../../utils/injectSaga';
import { loadSkin, mySkin, disabled } from './selectors';
import reducer from './reducer';
import saga from './saga';
import AntRadiobox from '../../components/uielements/radiobox.style';
import messages from './messages';

const RadioGroup = AntRadiobox(Radio.Group);

class SkinTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.mySkin ? `${this.props.mySkin}` : '1',
      isSpinnerShow: false,
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.props.onLoadChange();
    this.setState({
      value: e.target.value,
      isSpinnerShow: true,
    });

    // const idx = this.props.loadSkin.findIndex(a => a.CODE_CD === e.target.value + '');
    // const skin = lang.get('NAME', this.props.loadSkin[idx]);

    this.props.onSaveSkin(e.target.value);
    // this.props.setSkin(skin);

    setTimeout(() => {
      this.notDisabled();
    }, 1000);
  }

  notDisabled() {
    this.props.onNotDisabled();
    this.setState({ isSpinnerShow: false });

    message.success(<MessageContent>{intlObj.get(messages.completeChangeTheme)}</MessageContent>, 2);
  }

  render() {
    console.log(this.props.loadSkin, 'aslkfnlaknsfak');
    const styleSpinner = { margin: 'auto', width: '100%', padding: '20%', position: 'absolute', zIndex: '100', left: 150, bottom: 150 };

    const { currentView } = this.props;

    let width;
    switch (currentView) {
      case 'DesktopWide':
        width = '';
        break;
      case 'Desktop':
        width = '';
        break;
      case 'DesktopNarrow':
        width = '';
        break;
      case 'Tablet':
        width = '';
        break;
      default:
        width = '120';
    }

    return (
      <div>
        <Spin size="large" style={styleSpinner} spinning={this.state.isSpinnerShow} />
        {this.state.isSpinnerShow ? (
          <div />
        ) : (
          <div className="skinWrapper">
            <RadioGroup onChange={this.onChange} value={this.state.value} disabled={this.props.disabled}>
              <ul className="skinList">
                {this.props.loadSkin.map((skin, index) => (
                  <li key={index}>
                    <Radio value={skin.CODE_CD}>
                      <span className="skinItem">
                        <img src={require(`../../../../images/portal/setting/skin-option${skin.CODE_CD}.png`)} alt={skin.CODE_CD} />
                      </span>
                      <p>{lang.get('NAME', skin)}</p>
                    </Radio>
                  </li>
                ))}
              </ul>
            </RadioGroup>
          </div>
        )}
      </div>
    );
  }
}

SkinTab.propTypes = {
  loadSkin: PropTypes.array.isRequired,
  onSaveSkin: PropTypes.func.isRequired,
  setSkin: PropTypes.func.isRequired,
  mySkin: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loadSkin: loadSkin(),
  mySkin: mySkin(),
  disabled: disabled(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSaveSkin: value => dispatch(actions.onSaveSkin(value)),
    onLoadChange: () => dispatch(actions.onLoadChange()),
    onNotDisabled: () => dispatch(actions.onNotDisabled()),
  };
}

const withReducer = injectReducer({ key: 'skintab', reducer });
const withSaga = injectSaga({ key: 'skintab', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withReducer, withSaga, withConnect)(SkinTab);
