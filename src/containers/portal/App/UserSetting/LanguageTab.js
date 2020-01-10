import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { lang } from 'utils/commonUtils';
import injectReducer from '../../../../utils/injectReducer';
import injectSaga from '../../../../utils/injectSaga';
import { loadLang, myLang } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { onSaveLang } from './actions';
import AntRadiobox from '../../components/uielements/radiobox.style';

const RadioGroup = AntRadiobox(Radio.Group);

class LanguageTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.myLang ? this.props.myLang : 'KOR',
    };
  }

  onChange = e => {
    this.setState({
      value: e.target.value,
    });

    const idx = this.props.loadLang.findIndex(a => a.CODE_CD === e.target.value);
    const language = lang.get('NAME', this.props.loadLang[idx]);

    this.props.onSaveLang(e.target.value);
    this.props.setLang(language);
  };

  render() {
    const { currentView } = this.props;

    let mHeight;
    switch (currentView) {
      case 'DesktopWide':
        mHeight = 'calc(100vh - 200px)';
        break;
      case 'Desktop':
        mHeight = 'calc(100vh - 200px)';
        break;
      case 'DesktopNarrow':
        mHeight = 'calc(100vh - 200px)';
        break;
      case 'Tablet':
        mHeight = 'calc(100vh - 200px)';
        break;
      default:
        mHeight = 'calc(100vh - 360px)';
    }

    return (
      <div>
        <div className="languageWrapper" style={{ height: mHeight }}>
          <RadioGroup onChange={this.onChange} value={this.state.value}>
            <ul className="languageList">
              {this.props.loadLang.map((language, index) => (
                <li key={index}>
                  <Radio value={language.CODE_CD}>
                    <img src={require(`../../../../images/portal/setting/icon-lang-${language.CODE_CD}.png`)} alt={language.CODE_CD} className="langIcon" />
                    <span className="langTxt">{lang.get('NAME', language)}</span>
                  </Radio>
                </li>
              ))}
            </ul>
          </RadioGroup>
        </div>
      </div>
    );
  }
}

LanguageTab.propTypes = {
  myLang: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loadLang: loadLang(),
  myLang: myLang(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSaveLang: value => dispatch(onSaveLang(value)),
  };
}

const withReducer = injectReducer({ key: 'languagetab', reducer });
const withSaga = injectSaga({ key: 'languagetab', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withReducer, withSaga, withConnect)(LanguageTab);
