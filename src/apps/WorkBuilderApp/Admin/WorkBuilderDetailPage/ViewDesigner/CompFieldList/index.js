import React, { Component } from 'react';
import { Popconfirm, Button } from 'antd';

import Styled from './Styled';

class CompList extends Component {
  state = {
    isSysView: false,
  };

  handleChangeSysView = () => this.setState(prevState => ({ isSysView: !prevState.isSysView }));

  render = () => {
    const {
      compList,
      sysMetaList,
      layerIdxKey,
      action: { removeCompItem, setViewDataCompItem, setSysCompItem },
    } = this.props;
    const { isSysView } = this.state;

    return (
      <Styled>
        <div className="categoryWrapper">
          <div className="categoryTitle" onClick={() => this.handleChangeSysView()} role="button">
            시스템 필드 항목
            <i className={`fa fa-angle-${isSysView ? 'down' : 'up'}`}></i>
          </div>
          <div className={`categoryBody${isSysView ? '' : ' hide'}`}>
            <ul>
              {compList
                .filter(fNode => fNode.COMP_TYPE === 'FIELD' && !fNode.isRemove && fNode.FIELD_TYPE === 'SYS')
                .map((node, nodeIdx) => (
                  <li key={`sysMetaUseList_${node.COMP_FIELD}_${nodeIdx}`}>
                    <Button className="btnCompTool ellipsis" onClick={() => setViewDataCompItem(node)}>{`${node.NAME_KOR || 'no name'}(${
                      node.COMP_FIELD
                    })`}</Button>
                  </li>
                ))}
              {sysMetaList &&
                sysMetaList.length > 0 &&
                sysMetaList.map((node, nodeIdx) => (
                  <li key={`sysMetaNoUseList_${node.META_SEQ}_${nodeIdx}`}>
                    <Button
                      className="btnCompTool ellipsis"
                      onClick={() => setSysCompItem({ ...node, META_SEQ: -1, COMP_TYPE: 'FIELD', ORD: compList.length + 1, FIELD_TYPE: 'SYS' })}
                      title={`${node.NAME_KOR}(${node.COMP_FIELD})`}
                    >
                      <i className="fa fa-plus" />
                      {`${node.NAME_KOR}(${node.COMP_FIELD})`}
                    </Button>
                  </li>
                ))}
            </ul>
          </div>
          <div className="categoryTitle">기본 항목</div>
          <div className="categoryBody">
            {compList && compList.length > 0 && (
              <ul>
                {compList
                  .filter(fNode => fNode.COMP_TYPE === 'FIELD' && !fNode.isRemove && fNode.FIELD_TYPE !== 'SYS')
                  .map(node => (
                    <li key={`compList_${node.CONFIG.property.compKey}`}>
                      <Button className="btnCompTool ellipsis" onClick={() => setViewDataCompItem(node)}>{`${node.NAME_KOR || 'no name'}(${
                        node.COMP_FIELD
                      })`}</Button>
                      <Popconfirm
                        title="Are you sure delete this Field?"
                        onConfirm={() => removeCompItem(node.CONFIG.property.layerIdx[layerIdxKey], node.CONFIG.property.compKey)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <span className="toolbar-item fa fa-trash" role="button" onKeyPress={() => false} tabIndex="0" />
                      </Popconfirm>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </Styled>
    );
  };
}

export default CompList;
