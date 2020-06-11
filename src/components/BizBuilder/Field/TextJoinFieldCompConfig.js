import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Input, Radio, Select, Button, Modal } from 'antd';
import MoadalStyled from 'apps/WorkBuilderApp/Admin/WorkBuilderDetailPage/ViewDesigner/CompItem/Styled';
import { debounce } from 'lodash';

const { Option } = Select;
class ComponentConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'field',
      text: '',
      modalVisible: false,
      modalType: 'insert',
      modifyIndex: -1,
    };
    this.handleChangeConfigData = debounce(this.handleChangeConfigData, 500);
  }

  // state 초기화
  resetState = () => {
    this.setState({
      type: 'field',
      text: '',
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

  // 텍스트 아이템 저장
  handleSaveTextInfo = () => {
    const { type, text } = this.state;
    const { configInfo } = this.props;
    const prevTextItems = configInfo.property.textItems || [];
    const newTextItem = { type, text };
    const nextTextItems = prevTextItems.concat(newTextItem);
    this.handleChangeConfigData('textItems', nextTextItems);
    this.resetState();
  };

  // 텍스트 아이템 수정
  handleModifyTextInfo = () => {
    const { type, text, modifyIndex } = this.state;
    const { configInfo } = this.props;
    const { textItems } = configInfo.property;
    textItems[modifyIndex] = { type, text };
    this.handleChangeConfigData('textItems', textItems);
    this.resetState();
  };

  // 텍스트 아이템 삭제
  handleDeleteTextInfo = () => {
    const { modifyIndex } = this.state;
    const { configInfo } = this.props;
    const prevTextItems = configInfo.property.textItems;
    const nextTextItems = prevTextItems.filter((column, index) => index !== modifyIndex);
    this.handleChangeConfigData('textItems', nextTextItems);
    this.resetState();
  };

  // 생성된 아이템 선택
  handleClickTextItem = (index, item) => {
    this.setState({
      type: item.type,
      text: item.text,
      modifyIndex: index,
      modalVisible: true,
      modalType: 'modify',
    });
  };

  // 페이지 렌더
  render() {
    const { type, text, modalVisible, modalType } = this.state;
    const { configInfo } = this.props;
    const { textItems } = configInfo.property;
    return [
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">툴팁 사용 여부</span>
        <Radio.Group
          className="alignCenter"
          value={(configInfo && configInfo.property && configInfo.property.usingToolTip) || 'N'}
          onChange={e => {
            const { value } = e.target;
            this.handleChangeConfigData('usingToolTip', value);
          }}
        >
          <Radio value="Y">Y</Radio>
          <Radio value="N">N</Radio>
        </Radio.Group>
      </div>,
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">Bold체 조건</span>
        <Input
          style={{ width: '50%' }}
          placeholder="Bold체 여부를 결정할 컬럼명을 입력해주세요."
          defaultValue={(configInfo && configInfo.property && configInfo.property.boldCondition) || ''}
          onChange={e => this.handleChangeConfigData('boldCondition', e.target.value)}
        />
        <Input
          style={{ width: '50%' }}
          placeholder="Bold체 여부를 결정할 값을 입력해주세요."
          defaultValue={(configInfo && configInfo.property && configInfo.property.boldTarget) || ''}
          onChange={e => this.handleChangeConfigData('boldTarget', e.target.value)}
        />
      </div>,
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">제목 기능 사용 여부</span>
        <Radio.Group
          className="alignCenter"
          value={(configInfo && configInfo.property && configInfo.property.titleUse) || 'N'}
          onChange={e => {
            const { value } = e.target;
            this.handleChangeConfigData('titleUse', value);
          }}
        >
          <Radio value="Y">Y</Radio>
          <Radio value="N">N</Radio>
        </Radio.Group>
      </div>,
      configInfo && configInfo.property && configInfo.property.titleUse === 'Y' ? (
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">모달 페이지 설정</span>
          <Select
            style={{ width: '100%' }}
            defaultValue={(configInfo && configInfo.property && configInfo.property.changeViewType) || 'VIEW'}
            onChange={value => this.handleChangeConfigData('changeViewType', value)}
          >
            <Option value="VIEW" disable>
              View Page
            </Option>
            <Option value="MODIFY">Modify Page</Option>
          </Select>
        </div>
      ) : (
        ''
      ),
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">텍스트 아이템</span>
        <Button onClick={() => this.setState({ modalVisible: true })}>텍스트 아이템 추가</Button>
      </div>,
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">텍스트</span>
        <>
          {textItems && textItems.length > 0 ? (
            <div className="textItems">
              {textItems.map((item, index) => (
                <Button style={{ margin: '4px 5px 4px 0px' }} onClick={() => this.handleClickTextItem(index, item)}>
                  {`${item.text}`}
                </Button>
              ))}
            </div>
          ) : (
            <div className="emptyColumn">생성된 텍스트 정보가 없습니다.</div>
          )}
        </>
      </div>,
      <Modal visible={modalVisible} centered destroyOnClose footer={null} bodyStyle={{ padding: '1px' }} onCancel={() => this.resetState()} width="800px">
        <MoadalStyled className="popoverWrapper">
          <div className="popoverInnerInput">
            <p className="popover-tit">
              텍스트 / 필드 정보
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
                <col width="30%" />
                <col width="30%" />
                <col width="40%" />
              </colgroup>
              <thead>
                <tr>
                  <th>타입</th>
                  <th>필드 / 텍스트</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Select style={{ width: '100%' }} value={type} onChange={value => this.setState({ type: value })}>
                      <Option value="field">필드</Option>
                      <Option value="text">텍스트</Option>
                    </Select>
                  </td>
                  <td>
                    <Input style={{ width: '100%' }} value={text} onChange={e => this.setState({ text: e.target.value })} />
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
