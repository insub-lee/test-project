import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import ScrollBar from 'react-custom-scrollbars';
import { intlObj } from 'utils/commonUtils';
import messages from '../../components/Page/messages';
import WidgetList from './widgetList';

let content = [];

class selectedCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeAll = this.onChangeAll.bind(this);
    this.changeIsWidgetDragged = this.changeIsWidgetDragged.bind(this);
    this.moveWidget = this.moveWidget.bind(this);
    this.findWidget = this.findWidget.bind(this);
    this.findIndex = this.findIndex.bind(this);
  }

  onChange(list) {
    this.props.deleteCategoryList(list);
  }

  onChangeAll() {
    this.props.deleteCategoryList('ALL');
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

  findWidget(id) {
    const { selectedList, appList } = this.props;
    let widget;

    if (selectedList.length > 0) {
      widget = selectedList.filter(c => c.APP_ID === id)[0]
    } else if(selectedList.length === 0 && appList.length > 0) {
      widget = appList.filter(c => c.APP_ID === id)[0]
    } else {
      widget = this.state.changeWidgetList.filter(c => c.APP_ID === id)[0]
    }
    // const widget = appList.data.body.filter(c => c.appID === id)[0]

    const list = [];

    if (selectedList.length > 0) {
      selectedList.map(l => list.push(l.APP_ID));
    } else if(selectedList.length === 0 && appList.length > 0) {
      appList.map(l => list.push(l.APP_ID));
    } else {
      this.state.changeWidgetList.map(l => list.push(l.APP_ID));
    }

    if (widget !== undefined) {
      return {
        widget,
        index: list.indexOf(widget.APP_ID),
      };
    }
  }

  moveWidget(index, atIndex) {
    let widget = [];
    let newWidget = [];

    if (this.props.selectedList.length > 0) {
      widget = this.props.selectedList[index];
    } else if(this.props.selectedList.length === 0 && this.props.appList.length > 0) {
      widget = this.props.appList[index];
    } else {
      widget = this.state.changeWidgetList[index];
    }

    if (this.props.selectedList.length > 0) {
      newWidget = this.props.selectedList;
    } else if(this.props.selectedList.length === 0 && this.props.appList.length > 0) {
      newWidget = this.props.appList;
    } else {
      newWidget = this.state.changeWidgetList;
    }
    // let newWidget = this.props.appList.data.body
    newWidget.splice(index, 1); // 움직인 item 삭제
    newWidget.splice(atIndex, 0, widget); // 움직인 item 삽입

    const result = {};

    result.body = newWidget;
    result.app_ID = 4;
    result.widget_ID = 31;

    this.setState({ changeWidgetList: result.body });

    this.props.onSaveCategory(result.body);
  }

  findIndex(id, url) {
    let list = [];

    if (this.state.changeWidgetList) {
      list = this.state.changeWidgetList;
    } else {
      list = this.props.appList.body.slice();
    }

    const idx = id ? list.findIndex(i => i.app_ID === id) : list.findIndex(i => i.url === url);
    const result = {};
    list.splice(idx, 1);

    result.body = list;
    result.app_ID = this.props.appList.app_ID;
    result.widget_ID = this.props.appList.widget_ID;

    this.setState({ changeWidgetList: result.body });

    this.props.onSaveCategory(result.body);
  }

  render() {

    content = [];

    if (this.state.changeWidgetList === undefined && this.props.selectedList.length === 0) {
      const chList = [];

      if (this.props.appList.length > 0 && this.props.de === false) {
        this.props.appList.forEach((list) => {
          const result = {};

          result.APP_ID = list.APP_ID;
          result.NAME_KOR = list.NAME_KOR;
          result.ICON = list.ICON;
          result.DSCR_KOR = list.DSCR_KOR;

          chList.push(result);
        });

        let bList = [];
        content.map(list => bList.push(list.props.widgetItem.APP_ID));

        for (let i = 0; i < chList.length; i += 1) {
          const idx = bList.findIndex(t => t === chList[i].APP_ID);
          if(idx === -1) {
          content.push(<WidgetList
            key={i}
            id={i}
            widgetItem={chList[i]}
            changeIsWidgetDragged={this.changeIsWidgetDragged}
            moveWidget={this.moveWidget}
            onChange={this.onChange}
            findWidget={this.findWidget}
            findIndex={this.findIndex}
          />);
          }
        }

        // this.props.comList(chList);
      } else if (this.props.selectedList.length !== 0) {
        this.props.appList.forEach((list) => {
          const result = {};

          result.APP_ID = list.APP_ID;
          result.NAME_KOR = list.NAME_KOR;
          result.ICON = list.ICON;
          result.DSCR_KOR = list.DSCR_KOR;

          chList.push(result);
        });

      let bList = [];
      content.map(list => bList.push(list.props.widgetItem.APP_ID));

        for (let i = 0; i < chList.length; i += 1) {
          const idx = bList.findIndex(t => t === chList[i].APP_ID);
          if(idx === -1) {
          content.push(<WidgetList
            key={i}
            id={i}
            widgetItem={chList[i]}
            changeIsWidgetDragged={this.changeIsWidgetDragged}
            moveWidget={this.moveWidget}
            onChange={this.onChange}
            findWidget={this.findWidget}
            findIndex={this.findIndex}
          />);
        }

          this.props.comList(chList);
        }
      }
    } else if (this.props.selectedList.length > 0) {
      const category = this.props.selectedList ?
        this.props.selectedList : this.state.changeWidgetList;
      
      let bList = [];
      content.map(list => bList.push(list.props.widgetItem.APP_ID));

      for (let i = 0; i < category.length; i += 1) {
        const idx = bList.findIndex(t => t === category[i].APP_ID);
        if(idx === -1) {
        content.push(<WidgetList
          key={i}
          id={i}
          widgetItem={category[i]}
          changeIsWidgetDragged={this.changeIsWidgetDragged}
          moveWidget={this.moveWidget}
          onChange={this.onChange}
          findWidget={this.findWidget}
          findIndex={this.findIndex}
        />);
        }
      }
    } else {
      const category = this.props.selectedList ?
        this.props.selectedList : this.state.changeWidgetList;

        let bList = [];
        content.map(list => bList.push(list.props.widgetItem.APP_ID));

      for (let i = 0; i < category.length; i += 1) {
        const idx = bList.findIndex(t => t === category[i].APP_ID);
        if(idx === -1) {
        content.push(<WidgetList
          key={i}
          id={i}
          widgetItem={category[i]}
          changeIsWidgetDragged={this.changeIsWidgetDragged}
          moveWidget={this.moveWidget}
          onChange={this.onChange}
          findWidget={this.findWidget}
          findIndex={this.findIndex}
        />);
        }
      }
    }

    return (
      <div>
        <div className="SUTitle">
          <h3>
            {intlObj.get(messages.selectApp)}
            <a className="deleteAll" onClick={this.onChangeAll}>전체삭제</a>
          </h3>
        </div>
        <Table size="small" className="SUTable" style={{ width: '100%' }}>
          <ScrollBar
            autoHide
            autoHideTimeout={1000}
            style={{ height: 700, paddingBottom: 20 }}
          >
            <Table.Body className="SUTBody">
              {content}
            </Table.Body>
          </ScrollBar>
        </Table>
      </div>
    );
  }
}

selectedCategory.propTypes = {
  selectedList: PropTypes.array.isRequired,
  deleteCategoryList: PropTypes.func.isRequired,
  onSaveCategory: PropTypes.func.isRequired,
  appList: PropTypes.array.isRequired,
  de: PropTypes.bool.isRequired,
  comList: PropTypes.func.isRequired,
};

export default selectedCategory;
