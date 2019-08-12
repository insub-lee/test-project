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
import MailListChild from './mailListChild';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import { makeGetMailList } from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';

const RadioGroup = AntRadiobox(Radio.Group);

const debouncedOnChange = _.debounce((action, value) => { action(value); }, 300);

class WidgetSetting extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mailListFull: this.props.mailListFull,
      mailList: this.props.mailList,
      deletedMailIndex: [],
      isWidgetDragged: false,
      viewType: this.props.mailListFull.viewType,
      numChildren: this.props.mailList.length,
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
      mailList,
    } = this.state;

    const index = mailList.findIndex(i => i.SEQNO === seqNo);
    const afterIndex = mailList.findIndex(i => i.SEQNO === afterSeqNo);

    let temp = mailList[index];
    let temp2 = mailList[afterIndex];

    let mailListCopy = mailList.slice();

    mailListCopy.splice(index, 1, temp2);
    mailListCopy.splice(afterIndex, 1, temp);

    this.setState({
      mailList: mailListCopy,
    });
  }

  getMailSettingList = () => {
    const { mailList } = this.state;
    const result = mailList.map((mailList, index) => {
      if (mailList.isShow !== false) {
        return (
          <MailListChild
            index={index}
            mailList={mailList}
            deleteMail={this.deleteMail}
            setDeletedMailIndex={this.setDeletedMailIndex}
            changeIsWidgetDragged={this.changeIsWidgetDragged}
            dndChangePosition={this.dndChangePosition}
          />
        )
      }
    });
    return result;
  }

  setDeletedMailIndex = (SEQNO) => {
    const {
      mailList,
      deletedMailIndex
    } = this.state;
    const index = mailList.findIndex(mailList => mailList.SEQNO === SEQNO);
    let mailListCopy = update(mailList, {
      [index]: {
        isShow: {
          $set: false,
        },
      },
    });
    this.setState({
      mailList: mailListCopy,
    }, function () {
      this.deleteMail()
    });

    deletedMailIndex.push(SEQNO);
  }

  deleteMail = () => {
    const {
      deletedMailIndex,
      mailList,
      mailListFull,
      viewType
    } = this.state;
    const {
      handleSaveSettingMails,
      closeModal,
    } = this.props;

    const mailListCopy = mailList.filter(mailList => mailList.isShow !== false);

    for (let i = 0; i < mailListCopy.length; i += 1) {
      delete mailListCopy[i].SEQNO;
    }
    const result = {};

    result["data"] = {};
    result.data["body"] = mailListCopy;
    // result["appID"] = mailListFull.appID;
    result["widgetID"] = mailListFull.widgetID;
    result["viewType"] = viewType;

    const item = JSON.stringify(result);

    handleSaveSettingMails(item);

    this.setState({
      deletedMailIndex: [],
    });

    closeModal();
  }

  handleAppendMail = () => {
    const content = this.state.mailList.slice();
    const { mailList, numChildren } = this.state;
    // 임의 처리 추후 변경
    // const seqNo = Math.floor(Math.random() * 100000) + 1;
    for (let i = mailList.length; i < this.state.numChildren + 1; i += 1) {
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
      mailList: content,
      numChildren: numChildren + 1,
    })

    debouncedOnChange(() => this.scrollbarBottom(), 500);
  }

  scrollbarBottom() {
    this.scrollComponent.scrollToBottom();
  }

  render() {

    const { closeModal } = this.props;
    const { mailList, numChildren } = this.state;
    const content = this.getMailSettingList();

    const viewTypeChange = (e) => {
      this.setState({ viewType: e.target.value }, function () {
        this.deleteMail();
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
          <BtnIconAdd title="addNewForm" onClick={(e) => { e.preventDefault(); this.handleAppendMail() }} />
        </div>

        <p className="guideTitle">{intlObj.get(messages.mailInformSubject)}</p>
        <ul className="guideList">
          <li>{intlObj.get(messages.mailInformSubject2)}</li>
          <li>{intlObj.get(messages.mailInformSubject3)}</li>
          <li>{intlObj.get(messages.mailInformSubject4)}</li>
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
            onClick={this.deleteMail}
          >
            {intlObj.get(messages.save)}
          </BtnDkGray>
        </div> */}
      </WidgetSettingStyle>
    );
  }
}

WidgetSetting.propTypes = {
  mailList: PropTypes.array,
  closeModal: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  mailList: makeGetMailList(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleSaveSettingMails: (item) => dispatch(actions.deleteMail(item)),
  };
}

const withReducer = injectReducer({ key: 'mailSetting', reducer });
const withSaga = injectSaga({ key: 'mailSetting', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(WidgetSetting);
