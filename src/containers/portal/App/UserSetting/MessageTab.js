import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Checkbox } from 'antd';
import { connect } from 'react-redux';
import { Checkbox } from 'antd';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import ScrollBar from 'react-custom-scrollbars';
import { lang, intlObj } from 'utils/commonUtils';
import { onSaveMessage, onSaveMessageALL } from './actions';
import injectReducer from '../../../../utils/injectReducer';
import { makeCheckList } from './selectors';
import messages from './messages';
import reducer from './reducer';

let appList = []; // DB에 있는 해당 사용자의 APPList의 NAME
let appDetail = []; // DB에 있는 해당 사용자의 APpList의 NAME과 ID
let CopySelectedList = []; // 선택된 List의 Copy
let SelectedApp = []; // 선택된 List
let AppYN = []; // App의 YN 값

class MessageTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedList: SelectedApp,
      checkAll: SelectedApp.length === this.props.mlist.length,
    };
    this.onChangeList = this.onChangeList.bind(this);
    this.onCheckAllChange = this.onCheckAllChange.bind(this);
    this.checkList = this.checkList.bind(this);
  }

  componentDidMount() {
    if (this.props.list) {
      appList = [];
      appDetail = [];
      CopySelectedList = [];
      SelectedApp = [];
      AppYN = [];
      this.props.list.map(setting => appList.push(lang.get('NAME', setting)));
      this.props.list.map(setting => appDetail.push([lang.get('NAME', setting), setting.APP_ID]));

      this.props.list.map(setting => AppYN.push(setting.RECV_YN));
      for (let i = 0; i < this.props.list.length; i += 1) {
        if (AppYN[i] === 'Y') {
          SelectedApp.push(appList[i]);
        }
      }
      CopySelectedList = SelectedApp.slice();
      this.setState({
        checkedList: CopySelectedList,
        checkAll: SelectedApp.length === this.props.list.length,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.list === undefined && this.props.list !== nextProps.list) {
      appList = [];
      appDetail = [];
      CopySelectedList = [];
      SelectedApp = [];
      AppYN = [];
      nextProps.list.map(setting => appList.push(lang.get('NAME', setting)));
      nextProps.list.map(setting => appDetail.push([lang.get('NAME', setting), setting.APP_ID]));

      nextProps.list.map(setting => AppYN.push(setting.RECV_YN));
      for (let i = 0; i < nextProps.list.length; i += 1) {
        if (AppYN[i] === 'Y') {
          SelectedApp.push(appList[i]);
        }
      }
      CopySelectedList = SelectedApp.slice();
      this.setState({
        checkedList: CopySelectedList,
        checkAll: SelectedApp.length === nextProps.list.length,
      });
    }
  }

  onChangeList(checkedList) {
    const copy = this.state.checkedList;
    const copy2 = copy.slice(-1)[0];
    let selectedList = '';
    if (checkedList.length > 0) {
      selectedList = checkedList.slice(-1)[0];
    } else {
      selectedList = copy2;
    }
    if (copy.indexOf(selectedList) === -1) {
      // selectedList//Y인 item
      {
        this.checkList(selectedList, 'Y');
      }
      {
        this.props.message(selectedList, true);
      }
    } else {
      // N인 item
      for (let i = 0; i < copy.length; i++) {
        if (checkedList.indexOf(copy[i]) === -1) {
          const unChecked = copy[i];
          {
            this.checkList(unChecked, 'N');
          }
          {
            this.props.message(unChecked, false);
          }
        }
      }
    }
    this.setState({
      checkedList,
      checkAll: checkedList.length === appList.length,
    });
  }

  onCheckAllChange(e) {
    this.setState({
      checkedList: e.target.checked ? appList : [],
      checkAll: !this.state.checkAll,
    });
    const allCheck = [];
    for (let i = 0; i < appDetail.length; i++) {
      allCheck.push(appDetail[i][1]);
    }
    {
      e.target.checked ? this.props.onSaveMessageALL(allCheck, 'ALL') : this.props.onSaveMessageALL(allCheck, 'NALL');
    }
    {
      e.target.checked ? this.props.message('all', true) : this.props.message('all', false);
    }
  }

  checkList(selectedItem, stat) {
    const Datail = appDetail;
    const item = [];
    const indexList = Datail.map(idx => idx.findIndex(t => t === selectedItem));
    const index = indexList.findIndex(t => t === 0);
    item.push(Datail[index][1]);
    const data = {
      item,
      stat,
    };
    this.props.onSaveMessage(data);
  }

  render() {
    const { currentView } = this.props;
    let className = '';
    let minHeight;
    switch (currentView) {
      case 'DesktopWide':
        className = 'msgBoxWrapper';
        minHeight = 480;
        break;
      case 'Desktop':
        className = 'msgBoxWrapper';
        break;
      case 'DesktopNarrow':
        className = 'msgBoxWrapper';
        break;
      case 'Tablet':
        className = 'msgBoxWrapper';
        break;
      default:
        className = 'msgBoxWrapperMobile';
        minHeight = 350;
    }

    return (
      <div className="msgBoxWrapper">
        <ScrollBar style={{ width: '100%', minHeight: { minHeight } }}>
          <div className="totalCheckbox">
            <Checkbox onChange={e => this.onCheckAllChange(e)} checked={this.state.checkAll} className="selectAll">
              {intlObj.get(messages.allSelect)}
            </Checkbox>
          </div>
          <Checkbox.Group
            style={{ width: '100%' }}
            options={appList}
            value={this.state.checkedList}
            onChange={e => this.onChangeList(e)}
            className="eachCheckbox"
          />
        </ScrollBar>
      </div>
    );
  }
}

MessageTab.propTypes = {
  list: PropTypes.array.isRequired,
  onSaveMessageALL: PropTypes.func.isRequired,
  onSaveMessage: PropTypes.func.isRequired,
};
const mapStateToProps = createStructuredSelector({
  mlist: makeCheckList(),
});
export function mapDispatchToProps(dispatch) {
  return {
    onSaveMessage: list => dispatch(onSaveMessage(list)),
    onSaveMessageALL: (list, stat) => dispatch(onSaveMessageALL(list, stat)),
  };
}
const withReducer = injectReducer({ key: 'messagetab', reducer });
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withReducer, withConnect)(MessageTab);
