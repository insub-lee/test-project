import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizDoc from '../../MdcsStandard/BizDoc';
import DwDoc from '../../MdcsStandard/DwDoc';
import PmDoc from '../../MdcsStandard/PmDoc';
import TechDoc from '../../MdcsStandard/TechDoc';
// import BizBuilderBase from '../../../components/BizBuilderBase';

class Viewer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('Viewer componentDidMount this.props : ', this.props);
    const { id, getExtraApiData, apiArys } = this.props;
    getExtraApiData(id, apiArys);
  }

  findDocs = (listItem, aryNodesIds) => {
    const node = aryNodesIds.filter(_node => listItem.NODE_ID.toString() === _node);
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

  getTemplate = () => {
    const { nodeId } = this.props;
    console.log('aaa nodeId : ', nodeId);
    if (nodeId === null) return null;
    const { categoryInfo, docTemplateInfoByCategory, docTemplateInfo } = this.props.extraApiData;
    console.log('this.props.extraApiData : ', this.props.extraApiData);
    const myInfo = categoryInfo.categoryMapList.filter(cInfo => cInfo.NODE_ID === nodeId);
    if (!myInfo || myInfo.length === 0) return null;
    console.log('myInfo : ', myInfo);
    const aryNodeIds = myInfo[0].FULLPATH.split('|');
    console.log('aryNodeIds : ', aryNodeIds);
    const aryDocs = docTemplateInfoByCategory.list.filter(listItem => this.findDocs(listItem, aryNodeIds));
    console.log('aryDocs : ', aryDocs);
    const selectedTemplate = this.selectedTemplate(aryDocs, categoryInfo.categoryMapList, docTemplateInfo.categoryMapList);
    console.log('selectedTemplate : ', selectedTemplate);
    return selectedTemplate;
  };

  render() {
    console.log('this.props : ', this.props);
    const { categoryInfo, docTemplateInfoByCategory, docTemplateInfo } = this.props.extraApiData;
    let selectedTemplate = null;
    if (categoryInfo && docTemplateInfoByCategory && docTemplateInfo) {
      selectedTemplate = this.getTemplate();
    }

    if (selectedTemplate != null && selectedTemplate) {
      const { CODE } = selectedTemplate;
      if (CODE === 'BS') {
        // ok
        return <BizDoc {...this.props} viewType="VIEW" />;
      }
      if (CODE === 'TS') {
        // ok
        return <TechDoc {...this.props} viewType="VIEW" />;
      }
      if (CODE === 'DW') {
        return <DwDoc {...this.props} viewType="VIEW" />;
      }
      if (CODE === 'PM') {
        // ok
        return <PmDoc {...this.props} viewType="VIEW" />;
      }
    }
    return <div>123</div>;
  }
}

Viewer.propTypes = {
  workSeq: PropTypes.number,
  apiInfo: PropTypes.object,
};

Viewer.defaultProps = {
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
};

export default Viewer;
