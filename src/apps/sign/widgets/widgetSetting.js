import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';
import update from 'react-addons-update';
import Scrollbars from 'react-custom-scrollbars';
import { Radio } from 'antd';
import { BtnDkGray, BtnLgtGray } from 'containers/store/components/uielements/buttons.style';
import AntRadiobox from '../../../containers/store/components/uielements/radiobox.style';
import { BtnIconAdd } from '../../../components/uielements/styles/buttons.style';
import { intlObj } from 'utils/commonUtils';
import messages from '../../../components/Page/messages';
import WidgetSettingStyle from './widgetSettingStyle';
import SignListChild from './signListChild';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import { makeGetSignList } from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';

const RadioGroup = AntRadiobox(Radio.Group);

const debouncedOnChange = _.debounce((action, value) => { action(value); }, 300);

class WidgetSetting extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      signListFull: this.props.signListFull,
      signList: this.props.signList,
      deletedSignIndex: [],
      isWidgetDragged: false,
      viewType: this.props.signListFull.viewType,
      numChildren: this.props.signList.length,
    };
  }

  changeIsWidgetDragged = () => {
    const { isWidgetDragged } = this.state;

    if (!isWidgetDragged) {
      this.setState({
        isWidgetDragged: true,
      });
    } else {
      this.setState({
        isWidgetDragged: false,
      });
    }
  }

  dndChangePosition = (seqNo, afterSeqNo) => {
    const {
      signList,
    } = this.state;

    const index = signList.findIndex(i => i.SEQNO === seqNo);
    const afterIndex = signList.findIndex(i => i.SEQNO === afterSeqNo);

    let temp = signList[index];
    let temp2 = signList[afterIndex];

    let signListCopy = signList.slice();

    signListCopy.splice(index, 1, temp2);
    signListCopy.splice(afterIndex, 1, temp);

    this.setState({
      signList: signListCopy,
    });
  }

  getSignSettingList = () => {
    const { signList } = this.state;
    const result = signList.map((signList, index) => {
      if (signList.isShow !== false) {
        return (
          <SignListChild
            index={index}
            signList={signList}
            deleteSign={this.deleteSign}
            setDeletedSignIndex={this.setDeletedSignIndex}
            changeIsWidgetDragged={this.changeIsWidgetDragged}
            dndChangePosition={this.dndChangePosition}
          />
        )
      }
    });
    return result;
  }

  setDeletedSignIndex = (SEQNO) => {
    const {
      signList,
      deletedSignIndex
    } = this.state;
    const index = signList.findIndex(signList => signList.SEQNO === SEQNO);
    let signListCopy = update(signList, {
      [index]: {
        isShow: {
          $set: false,
        },
      },
    });
    this.setState({
      signList: signListCopy,
    }, function () {
      this.deleteSign()
    });

    deletedSignIndex.push(SEQNO);
  }

  deleteSign = () => {
    const {
      deletedSignIndex,
      signList,
      signListFull,
      viewType
    } = this.state;
    const {
      handleSaveSettingSigns,
      closeModal,
    } = this.props;

    const signListCopy = signList.filter(signList => signList.isShow !== false);

    for (let i = 0; i < signListCopy.length; i += 1) {
      delete signListCopy[i].SEQNO;
    }

    const result = {};

    result["data"] = {};
    result.data["body"] = signListCopy;
    // result["appID"] = signListFull.appID;
    result["widgetID"] = signListFull.widgetID;
    result["viewType"] = viewType;

    const item = JSON.stringify(result);

    handleSaveSettingSigns(item);

    this.setState({
      deletedSignIndex: [],
    });

    closeModal();
  }

  handleAppendSign = () => {
    const content = this.state.signList.slice();
    const { signList, numChildren } = this.state;
    // 임의 처리 추후 변경
    // const seqNo = Math.floor(Math.random() * 100000) + 1;
    for (let i = signList.length; i < this.state.numChildren + 1; i += 1) {
      let emptyContent = new Object();
      //emptyContent.SEQNO = `${i}`;
      emptyContent.SEQNO = `${i}`;
      emptyContent.TITLE = "";
      emptyContent.URL = "";
      emptyContent.IMAGE = "";
      emptyContent.METHOD = "get";
      emptyContent.param = "";
      content.push(emptyContent)
    }

    this.setState({
      signList: content,
      numChildren: numChildren + 1,
    })

    debouncedOnChange(() => this.scrollbarBottom(), 500);
  }

  scrollbarBottom() {
    this.scrollComponent.scrollToBottom();
  }

  render() {

    const { closeModal } = this.props;
    const { signList, numChildren } = this.state;
    const content = this.getSignSettingList();

    const viewTypeChange = (e) => {
      this.setState({ viewType: e.target.value }, function () {
        this.deleteSign();
      });
    };

    return (
      <WidgetSettingStyle>
        <div className="viewType">
          <RadioGroup
            value={this.state.viewType}
            className="typeOptions"
            onChange={viewTypeChange}
          >
            <Radio value="0">{intlObj.get(messages.viewDivision)}</Radio>
            <Radio value="1">{intlObj.get(messages.viewSlide)}</Radio>
          </RadioGroup>
        </div>
        <Scrollbars
          className="custom-scrollbar"
          ref={c => { this.scrollComponent = c }}
          style={{ width: 'auto' }}
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          autoHeight
          autoHeightMax={288}
        >
          {content}
        </Scrollbars>
        <div className="btnWrapper">
          <BtnIconAdd title="addNewForm" onClick={(e) => { e.preventDefault(); this.handleAppendSign() }} />
        </div>

        <p className="guideTitle">{intlObj.get(messages.signInformSubject)}</p>
        <ul className="guideList">
          <li>{intlObj.get(messages.signInformSubject2)}</li>
          <li>{intlObj.get(messages.signInformSubject3)}</li>
          <li>{intlObj.get(messages.signInformSubject4)}</li>
        </ul>

        {/* <div className='widgetSettingFooter'>
          <BtnLgtGray
            key="back"
            onClick={closeModal}
          >
            {intlObj.get(messages.cancel)}
          </BtnLgtGray>
          <BtnDkGray
            key="submit"
            onClick={this.deleteSign}
          >
            {intlObj.get(messages.save)}
          </BtnDkGray>
        </div> */}
      </WidgetSettingStyle>
    );
  }
}

WidgetSetting.propTypes = {
  signList: PropTypes.array,
  closeModal: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  signList: makeGetSignList(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleSaveSettingSigns: (item) => dispatch(actions.deleteSign(item)),
  };
}

const withReducer = injectReducer({ key: 'signSetting', reducer });
const withSaga = injectSaga({ key: 'signSetting', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(WidgetSetting);
