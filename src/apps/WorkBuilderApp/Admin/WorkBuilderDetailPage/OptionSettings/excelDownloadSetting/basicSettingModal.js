import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { Input, Modal, Button } from 'antd';
import styled from 'styled-components';
import MoadalStyled from 'apps/WorkBuilderApp/Admin/WorkBuilderDetailPage/ViewDesigner/CompItem/Styled';
import ColumnSettingMoadal from './columnSettingMoadal';

const Styled = styled.div`
  .emptyColumn {
    padding: 5px;
    background: white;
    text-align: center;
    border-radius: 5px;
    border: 1px solid #e3e3e3;
  }
  .columnList {
    background: white;
    border-radius: 5px;
    border: 1px solid #e3e3e3;
    padding: 5px 0px 5px 10px;
    min-height: 50px;
  }
  .checkboxGroup {
    margin-top: 5px;
  }
  .selectedFgColorText {
    width: 108px;
    position: absolute;
    bottom: 0px;
  }
  .selectedFillColorWrap {
    width: 122px;
    height: 50px;
    border: 1px solid #e5e5e5;
    padding: 2px;
    position: absolute;
    bottom: 0px;
    left: 108px;
    .selectedFillColor {
      width: 100%;
      height: 100%;
    }
  }
  .selectedFontStyleWrap {
    display: table;
    width: 122px;
    height: 50px;
    border: 1px solid #e5e5e5;
    padding: 2px;
    position: absolute;
    bottom: 0px;
    left: 108px;
    .selectedFontStyle {
      display: table-cell;
      text-align: center;
      vertical-align: middle;
    }
  }
`;

class settingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalType: '',
      modifyIndex: -1,
    };
  }

  toggleModalVisible = (modalType, targetIndex) => {
    const { modalVisible } = this.state;
    this.setState({
      modalVisible: !modalVisible,
      modalType,
      modifyIndex: targetIndex,
    });
  };

  render() {
    const { optValue, onChangeOptionValue, onSaveClick } = this.props;
    const { modalVisible, modalType, modifyIndex } = this.state;
    const btnText = (optValue && optValue.btnText) || '';
    const fileName = (optValue && optValue.fileName) || '';
    const sheetName = (optValue && optValue.sheetName) || '';
    const columns = (optValue && optValue.columnInfo && optValue.columnInfo.columns) || [];
    return (
      <>
        <MoadalStyled className="popoverWrapper">
          <div className="popoverInnerInput">
            <p className="popover-tit">엑셀다운로드 설정</p>
            <table className="popoverInnerTable">
              <colgroup>
                <col width="33%" />
                <col width="33%" />
                <col width="33%" />
              </colgroup>
              <thead>
                <tr>
                  <th>버튼텍스트</th>
                  <th>파일명</th>
                  <th>시트명</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Input placeholder="버튼텍스트" style={{ width: '100%' }} value={btnText} onChange={e => onChangeOptionValue('btnText', e.target.value)} />
                  </td>
                  <td>
                    <Input placeholder="파일명" style={{ width: '100%' }} value={fileName} onChange={e => onChangeOptionValue('fileName', e.target.value)} />
                  </td>
                  <td>
                    <Input placeholder="시트명" style={{ width: '100%' }} value={sheetName} onChange={e => onChangeOptionValue('sheetName', e.target.value)} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="popoverInner">
            <p className="popover-tit">
              컬럼정보
              <Button type="primary" onClick={onSaveClick}>
                저장
              </Button>
              <Button type="primary" onClick={() => this.toggleModalVisible('insert', -1)}>
                컬럼추가
              </Button>
            </p>
            <div className="popoverInnerCom">
              <div className="popoverItem">
                <Styled>
                  {columns && columns.length > 0 ? (
                    <div className="columnList">
                      {columns.map((item, index) => (
                        <Button style={{ margin: '4px 5px 4px 0px' }} onClick={() => this.toggleModalVisible('modify', index)}>
                          {`${index + 1}_${item.title}`}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <div className="emptyColumn">생성된 컬럼 정보가 없습니다.</div>
                  )}
                </Styled>
              </div>
            </div>
          </div>
        </MoadalStyled>
        <Modal
          visible={modalVisible}
          centered
          destroyOnClose
          footer={null}
          bodyStyle={{ padding: '1px' }}
          onCancel={() => this.toggleModalVisible('', -1)}
          width="750px"
        >
          <Styled>
            <ColumnSettingMoadal
              modalType={modalType}
              modifyIndex={modifyIndex}
              optValue={optValue}
              onChangeOptionValue={onChangeOptionValue}
              toggleModalVisible={this.toggleModalVisible}
            />
          </Styled>
        </Modal>
      </>
    );
  }
}

settingModal.propTypes = {
  optValue: PropTypes.object,
  onChangeOptionValue: PropTypes.func,
  onSaveClick: PropTypes.func,
};

export default settingModal;
