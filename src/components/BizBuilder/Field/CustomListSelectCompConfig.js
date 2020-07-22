import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Input, Select, Button, Modal } from 'antd';
import { debounce } from 'lodash';
import MoadalStyled from 'apps/WorkBuilderApp/Admin/WorkBuilderDetailPage/ViewDesigner/CompItem/Styled';

const { Option } = Select;

class ComponentConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formDatafield: '',
      listDatafield: '',
      modalVisible: false,
      modalType: 'insert',
      modifyIndex: -1,
    };
    this.handleChangeConfigData = debounce(this.handleChangeConfigData, 200);
  }

  // state 초기화
  resetState = () => {
    this.setState({
      formDatafield: '',
      listDatafield: '',
      modalVisible: false,
      modalType: 'insert',
      modifyIndex: -1,
    });
  };

  // Config 설정 변경
  handleChangeConfigData = (key, value) => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  // 추가 폼데이터 - 저장 Additional
  handleSaveTextInfo = () => {
    const { formDatafield, listDatafield } = this.state;
    const { configInfo } = this.props;
    const prevItems = configInfo.property.additionalData || [];
    const newItem = { formDatafield, listDatafield };
    const nextTextItems = prevItems.concat(newItem);
    this.handleChangeConfigData('additionalData', nextTextItems);
    this.resetState();
  };

  // 추가 폼데이터 - 수정
  handleModifyTextInfo = () => {
    const { formDatafield, listDatafield, modifyIndex } = this.state;
    const { configInfo } = this.props;
    const { additionalData } = configInfo.property;
    additionalData[modifyIndex] = { formDatafield, listDatafield };
    this.handleChangeConfigData('additionalData', additionalData);
    this.resetState();
  };

  // 추가 폼데이터 - 삭제
  handleDeleteTextInfo = () => {
    const { modifyIndex } = this.state;
    const { configInfo } = this.props;
    const prevItems = configInfo.property.additionalData;
    const nextItems = prevItems.filter((column, index) => index !== modifyIndex);
    this.handleChangeConfigData('additionalData', nextItems);
    this.resetState();
  };

  // 생성된 아이템 선택
  handleClickTextItem = (index, item) => {
    this.setState({
      formDatafield: item.formDatafield,
      listDatafield: item.listDatafield,
      modifyIndex: index,
      modalVisible: true,
      modalType: 'modify',
    });
  };

  // 페이지 렌더
  render() {
    const { modalVisible, modalType, formDatafield, listDatafield } = this.state;
    const { configInfo } = this.props;
    const { additionalData } = configInfo.property;
    return [
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">API Method</span>
        <Select
          className="alignCenter"
          value={(configInfo && configInfo.property && configInfo.property.method) || 'GET'}
          onChange={e => this.handleChangeConfigData('method', e.target.value)}
        >
          <Option value="GET">GET</Option>
          <Option value="POST">POST</Option>
        </Select>
      </div>,
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">API URL</span>
        <Input
          style={{ width: '100%' }}
          defaultValue={(configInfo && configInfo.property && configInfo.property.url) || ''}
          onChange={e => this.handleChangeConfigData('url', e.target.value)}
        />
      </div>,
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">Select Value Key</span>
        <Input
          style={{ width: '100%' }}
          defaultValue={(configInfo && configInfo.property && configInfo.property.optValue) || ''}
          onChange={e => this.handleChangeConfigData('optValue', e.target.value)}
        />
      </div>,
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">Select Label Key</span>
        <Input
          style={{ width: '100%' }}
          defaultValue={(configInfo && configInfo.property && configInfo.property.optLabel) || ''}
          onChange={e => this.handleChangeConfigData('optLabel', e.target.value)}
        />
      </div>,
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">추가 formData</span>
        <Button onClick={() => this.setState({ modalVisible: true })}>추가 폼데이터 추가</Button>
      </div>,
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">텍스트</span>
        <>
          {additionalData && additionalData.length > 0 ? (
            <div className="textItems">
              {additionalData.map((item, index) => (
                <Button style={{ margin: '4px 5px 4px 0px' }} onClick={() => this.handleClickTextItem(index, item)}>
                  {`${item.formDatafield}`}
                </Button>
              ))}
            </div>
          ) : (
            <div className="emptyColumn">추가 폼데이터 정보가 없습니다.</div>
          )}
        </>
      </div>,
      <Modal visible={modalVisible} centered destroyOnClose footer={null} bodyStyle={{ padding: '1px' }} onCancel={() => this.resetState()} width="800px">
        <MoadalStyled className="popoverWrapper">
          <div className="popoverInnerInput">
            <p className="popover-tit">
              FormData 필드 / ListData 필드 설정
              {modalType === 'insert' ? (
                <Button type="primary" onClick={this.handleSaveTextInfo}>
                  저장
                </Button>
              ) : (
                <>
                  <Button type="primary" onClick={this.handleModifyTextInfo}>
                    수정
                  </Button>
                  <Button type="primary" onClick={this.handleDeleteTextInfo}>
                    삭제
                  </Button>
                </>
              )}
            </p>
            <table className="popoverInnerTable">
              <colgroup>
                <col width="50%" />
                <col width="50%" />
              </colgroup>
              <thead>
                <tr>
                  <th>FormData 필드</th>
                  <th>ListData 필드</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Input style={{ width: '100%' }} value={formDatafield} onChange={e => this.setState({ formDatafield: e.target.value })} />
                  </td>
                  <td>
                    <Input style={{ width: '100%' }} value={listDatafield} onChange={e => this.setState({ listDatafield: e.target.value })} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </MoadalStyled>
      </Modal>,
    ];
  }
}

ComponentConfig.propTypes = {
  configInfo: PropTypes.object,
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
};

export default ComponentConfig;
