import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Select, Button, Modal } from 'antd';

import BizMicroDevBase from 'components/BizMicroDevBase';
import BizBuilderBase from 'components/BizBuilderBase';
import DwDoc from './DwDoc';
import PmDoc from './PmDoc';

const { Option } = Select;

class IntroComponent extends Component {
  state = {
    optAry2: [],
    optAry3: [],
    optAry4: [],
    selectedValue1: undefined,
    selectedValue2: undefined,
    selectedValue3: undefined,
    selectedValue4: undefined,
    selectedCategory: undefined,
    selectedComponent: undefined,
    isShow: false,
  };

  componentWillMount() {
    const { id, getCallDataHanlder, apiArys } = this.props;
    getCallDataHanlder(id, apiArys);
  }

  componentDidMount() {
    const { result } = this.props;
  }

  onChangeByStep1 = (value, result) => {
    this.setState({
      selectedValue1: value,
      optAry2: result.categoryInfo.categoryMapList.filter(item => item.PARENT_NODE_ID === value).map(x => <Option value={x.NODE_ID}>{x.NAME_KOR}</Option>),
    });
  };

  onChangeByStep2 = (value, result) => {
    this.setState({
      selectedValue2: value,
      optAry3: result.categoryInfo.categoryMapList.filter(item => item.PARENT_NODE_ID === value).map(x => <Option value={x.NODE_ID}>{x.NAME_KOR}</Option>),
    });
  };

  onChangeByStep3 = (value, result) => {
    this.setState({
      selectedValue3: value,
      optAry4: result.categoryInfo.categoryMapList.filter(item => item.PARENT_NODE_ID === value).map(x => <Option value={x.NODE_ID}>{x.NAME_KOR}</Option>),
    });
  };

  findDocs = (listItem, aryNodesIds) => {
    const node = aryNodesIds.filter(node => listItem.NODE_ID.toString() === node);
    return node.length > 0 ? listItem : false;
  };

  selectedTemplate = (aryDocs, categoryListinfo, aryDocTemplateInfoList) => {
    let _selectedCategory;
    aryDocs.map(doc => {
      if (_selectedCategory === undefined) {
        _selectedCategory =
          categoryListinfo.filter(cate => cate.NODE_ID === doc.NODE_ID).length > 0
            ? categoryListinfo.filter(cate => cate.NODE_ID === doc.NODE_ID)[0]
            : undefined;
      } else {
        const _curCategory = categoryListinfo.filter(cate => cate.NODE_ID === doc.NODE_ID)
          ? categoryListinfo.filter(cate => cate.NODE_ID === doc.NODE_ID)[0]
          : undefined;
        if (_selectedCategory.length > 0 && _curCategory.LVL > _selectedCategory.LVL) {
          _selectedCategory = _curCategory;
        }
      }
    });

    const selectedDoc = aryDocs.filter(doc => doc.NODE_ID === _selectedCategory.NODE_ID)
      ? aryDocs.filter(doc => doc.NODE_ID === _selectedCategory.NODE_ID)[0]
      : undefined;

    return aryDocTemplateInfoList.filter(template => template.NODE_ID === selectedDoc.DOC_CODE)
      ? aryDocTemplateInfoList.filter(template => template.NODE_ID === selectedDoc.DOC_CODE)[0]
      : undefined;
  };

  onChangeByStep4 = (value, result) => {
    const selectedItem = result.categoryInfo.categoryMapList.filter(item => item.NODE_ID === value);
    let fullPath = '';
    if (selectedItem && selectedItem.length > 0) {
      fullPath = selectedItem[0].FULLPATH;
    }

    const aryNodeIds = fullPath.split('|');
    const aryDocs = result.docTemplateInfoByCategory.list.filter(listItem => this.findDocs(listItem, aryNodeIds));
    const aryDocTemplateInfoList = result.docTemplateInfo.categoryMapList;
    const selectedTemplate = this.selectedTemplate(aryDocs, result.categoryInfo.categoryMapList, aryDocTemplateInfoList);

    this.setState({
      selectedValue4: value,
      selectedFullPath: fullPath,
      selectedComponent: selectedTemplate,
    });
  };

  onModalShow = result => {
    this.setState({
      isShow: true,
    });
  };

  onCloseModal = () => {
    this.setState({
      isShow: false,
    });
  };

  onShowDocTemplate = doctype => {
    const { item } = this.props;
    const widgetId = item && item.WIDGET_ID ? item.WIDGET_ID : -1;
    const WORK_SEQ = item && item.data && item.data.WORK_SEQ ? item.data.WORK_SEQ : 953; // 779
    console.debug(doctype);
    switch (doctype) {
      case 'PM': {
        return <BizBuilderBase sagaKey={`${widgetId}_PmDoc`} workSeq={WORK_SEQ} component={PmDoc} viewType="INPUT" />;
      }
      case 'DW': {
        return <BizBuilderBase sagaKey={`${widgetId}_DwDoc`} workSeq={WORK_SEQ} component={DwDoc} viewType="INPUT" />;
      }
      default:
        return false;
    }
  };

  render() {
    const { result, item } = this.props;
    const _fDepth =
      result &&
      result.categoryInfo &&
      result.categoryInfo.categoryMapList.filter(item => item.LVL === 1).map(x => <Option value={x.NODE_ID}>{x.NAME_KOR}</Option>);

    console.debug('componentid', this.state.selectedComponent);

    return (
      <div style={{ width: '500', margin: 'auto' }}>
        <div style={{ width: 300, margin: 'auto' }}>
          <Select
            style={{ width: 300, margin: 'auto' }}
            placeholder="대분류(문서구분)"
            onChange={e => this.onChangeByStep1(e, result)}
            value={this.state.selectedValue1}
          >
            {_fDepth}
          </Select>
        </div>
        <div style={{ width: 300, margin: 'auto' }}>
          <Select style={{ width: 300 }} placeholder="중분류" onChange={e => this.onChangeByStep2(e, result)} value={this.state.selectedValue2}>
            {this.state.optAry2}
          </Select>
        </div>
        <div style={{ width: 300, margin: 'auto' }}>
          <Select style={{ width: 300 }} placeholder="소분류(업무기능)" onChange={e => this.onChangeByStep3(e, result)} value={this.state.selectedValue3}>
            {this.state.optAry3}
          </Select>
        </div>
        <div style={{ width: 300, margin: 'auto' }}>
          <Select style={{ width: 300 }} placeholder="문서LEVEL/종류" onChange={e => this.onChangeByStep4(e, result)} value={this.state.selectedValue4}>
            {this.state.optAry4}
          </Select>
        </div>
        <div style={{ width: 300, margin: 'auto' }}>
          <Button style={{ float: 'right' }} onClick={() => this.onModalShow(result)}>
            선택완료
          </Button>
        </div>
        <Modal destroyOnClose={true} style={{ top: '50px' }} width={1200} visible={this.state.isShow} onCancel={() => this.onCloseModal()}>
          {this.onShowDocTemplate(this.state.selectedComponent && this.state.selectedComponent.CODE)}
        </Modal>
      </div>
    );
  }
}

IntroComponent.propTypes = {
  id: PropTypes.string,
  apiArys: PropTypes.array,
  categoryInfo: PropTypes.array,
  categoryMapList: PropTypes.object,
  getCallDataHanlder: PropTypes.func,
  workSeq: PropTypes.number,
  item: PropTypes.object,
  doctype: PropTypes.object,
};

IntroComponent.defaultProps = {
  id: '',
  apiArys: [
    {
      key: 'categoryInfo',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=3',
      type: 'GET',
      params: {},
    },
    {
      key: 'docTemplateInfoByCategory',
      url: '/api/builder/v1/work/taskList/1011',
      type: 'GET',
      params: {},
    },
    {
      key: 'docTemplateInfo',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=2',
      type: 'GET',
      params: {},
    },
  ],
  categoryInfo: [],
  categoryMapList: {},
  getCallDataHanlder: () => false,
  workSeq: 1011,
  item: {},
  doctype: {},
};

class MdcsStandard extends Component {
  render() {
    return <BizMicroDevBase sagaKey="mdcsIntro" component={IntroComponent} />;
  }
}

export default MdcsStandard;
