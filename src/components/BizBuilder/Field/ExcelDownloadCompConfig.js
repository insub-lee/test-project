import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { Input, Modal, Button, Checkbox, Collapse, Select } from 'antd';
import { debounce } from 'lodash';
import MoadalStyled from 'apps/WorkBuilderApp/Admin/WorkBuilderDetailPage/ViewDesigner/CompItem/Styled';
import styled from 'styled-components';

const { Option } = Select;
const { Panel } = Collapse;

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
`;

/*
    목적 : dataPicker Default Value 설정
    Config Info
      1. btnText (String) : '엑셀 다운로드'
      2. fileName (String) : 'ExcelFile'
      3. sheetName (String) : '시트1'
      4. * columns (array(object)) : [{ title: '이름', width: { wpx: 100 }, style: {} }, { title: '나이', width: { wpx: 100 }, style: {} }]
      5. * fields (array(object)) : [{ field: 'NAME', style: {} }, { field: 'AGE', style: {} }]
*/
class configer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: fromJS({
        title: '',
        width: { wpx: 100 },
        style: {},
      }),
      field: fromJS({
        field: '',
        style: {},
      }),
      modalVisible: false,
      modalType: 'insert',
      modifyIndex: -1,
    };
    this.handleChangeViewCompData = debounce(this.handleChangeViewCompData, 500);
  }

  handleInputOnchange = (key, e) => {
    const { value } = e.target;
    this.handleChangeViewCompData(key, value);
  };

  // Column Title Set
  handleColumnTitle = e => {
    const { value } = e.target;
    const { column } = this.state;
    this.setState({
      column: column.set('title', value),
    });
  };

  // Column Width Set (Only Number)
  handleColumnWidth = e => {
    const { value } = e.target;
    const { column } = this.state;
    if (!Number(value)) {
      return;
    }
    this.setState({
      column: column.setIn(['width', 'wpx'], value),
    });
  };

  // Field Value Set
  handleFieldValue = e => {
    const { value } = e.target;
    const { field } = this.state;
    this.setState({
      field: field.set('field', value),
    });
  };

  // 폰트 스타일 변경
  handleFontStyle = (target, type, value) => {
    switch (type) {
      case 'size':
        if ((Number(value) && Number(value) <= 75) || value === '') this.handleFontSize(target, value);
        break;
      case 'color':
        this.handleFontColor(target, value);
        break;
      case 'bold':
        this.handleFontOptions(target, type, value);
        break;
      case 'underline':
        this.handleFontOptions(target, type, value);
        break;
      case 'italic':
        this.handleFontOptions(target, type, value);
        break;
      default:
        break;
    }
  };

  // 폰트사이즈 설정
  handleFontSize = (target, value) => {
    const { field, column } = this.state;
    if (target === 'column') {
      const frontObj = column.getIn(['style', 'font']) || fromJS({});
      const nextFrontObj = frontObj.set('sz', value);
      this.setState({
        column: column.setIn(['style', 'font'], nextFrontObj),
      });
      return;
    }
    const frontObj = field.getIn(['style', 'font']) || fromJS({});
    const nextFrontObj = frontObj.set('sz', value);
    this.setState({
      field: field.setIn(['style', 'font'], nextFrontObj),
    });
  };

  // 폰트컬러 설정
  handleFontColor = (target, value) => {
    const { field, column } = this.state;
    if (target === 'column') {
      const fontObj = column.getIn(['style', 'font']) || fromJS({});
      const colorObj = fontObj.get('color') || fromJS({});
      const nextColorObj = colorObj.set('rgb', value);
      const nextFontObj = fontObj.set('color', nextColorObj);
      this.setState({
        column: column.setIn(['style', 'font'], nextFontObj),
      });
      return;
    }
    const fontObj = field.getIn(['style', 'font']) || fromJS({});
    const colorObj = fontObj.get('color') || fromJS({});
    const nextColorObj = colorObj.set('rgb', value);
    const nextFontObj = fontObj.set('color', nextColorObj);
    this.setState({
      field: field.setIn(['style', 'font'], nextFontObj),
    });
  };

  // 굵게, 밑줄, 기울임 설정
  handleFontOptions = (target, type, value) => {
    const { field, column } = this.state;
    if (target === 'column') {
      const fontObj = column.getIn(['style', 'font']) || fromJS({});
      const nextFontObj = fontObj.set(`${type}`, value);
      this.setState({
        column: column.setIn(['style', 'font'], nextFontObj),
      });
      return;
    }
    const fontObj = field.getIn(['style', 'font']) || fromJS({});
    const nextFontObj = fontObj.set(`${type}`, value);
    this.setState({
      field: field.setIn(['style', 'font'], nextFontObj),
    });
  };

  // 정렬 스타일 변경
  handleAlignmentStyle = (target, type, value) => {
    switch (type) {
      case 'wrapText':
        this.handleWrapTextStyle(target, value);
        break;
      default:
        this.handleAlignStyle(target, type, value);
        break;
    }
  };

  // 수직, 수평 정렬 변경
  handleAlignStyle = (target, type, value) => {
    const { field, column } = this.state;
    if (target === 'column') {
      const alignObj = column.getIn(['style', 'alignment']) || fromJS({});
      const nextAlignObj = alignObj.set(type, value);
      this.setState({
        column: column.setIn(['style', 'alignment'], nextAlignObj),
      });
      return;
    }
    const alignObj = field.getIn(['style', 'alignment']) || fromJS({});
    const nextAlignObj = alignObj.set(type, value);
    this.setState({
      field: field.setIn(['style', 'alignment'], nextAlignObj),
    });
  };

  // Cell 줄바꿈 설정 (value : bool)
  handleWrapTextStyle = (target, value) => {
    const { field, column } = this.state;
    if (target === 'column') {
      const alignObj = column.getIn(['style', 'alignment']) || fromJS({});
      const nextAlignObj = alignObj.set('wrapText', value);
      this.setState({
        column: column.setIn(['style', 'alignment'], nextAlignObj),
      });
      return;
    }
    const alignObj = field.getIn(['style', 'alignment']) || fromJS({});
    const nextAlignObj = alignObj.set('wrapText', value);
    this.setState({
      field: field.setIn(['style', 'alignment'], nextAlignObj),
    });
  };

  // state 초기화
  resetState = () => {
    this.setState({
      column: fromJS({
        title: '',
        width: { wpx: 100 },
        style: {},
      }),
      field: fromJS({
        field: '',
        style: {},
      }),
      modalVisible: false,
      modalType: 'insert',
      modifyIndex: -1,
    });
  };

  // 컬럼정보 입력
  handleSaveColumnInfo = () => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    const { column, field } = this.state;
    const columnTitle = column.get('title');
    const fieldValue = field.get('field');
    if (columnTitle === '' || fieldValue === '') {
      return;
    }
    const prevColumns = configInfo.property.columns || [];
    const prevFields = configInfo.property.fields || [];
    configInfo.property.columns = prevColumns.concat(column.toJS());
    configInfo.property.fields = prevFields.concat(field.toJS());
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
    this.resetState();
  };

  // 컬럼정보 수정
  handleModifyColumnInfo = () => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    const { modifyIndex, column, field } = this.state;
    const columnTitle = column.get('title');
    const fieldValue = field.get('field');
    if (columnTitle === '' || fieldValue === '') {
      return;
    }
    const prevColumns = configInfo.property.columns;
    const prevFields = configInfo.property.fields;
    prevColumns[modifyIndex] = column.toJS();
    prevFields[modifyIndex] = field.toJS();
    configInfo.property.columns = prevColumns;
    configInfo.property.fields = prevFields;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
    this.resetState();
  };

  // 컬럼정보 삭제
  handleDeleteColumnInfo = () => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    const { modifyIndex } = this.state;
    const prevColumns = configInfo.property.columns;
    const prevFields = configInfo.property.fields;
    configInfo.property.columns = prevColumns.filter((column, index) => index !== modifyIndex);
    configInfo.property.fields = prevFields.filter((column, index) => index !== modifyIndex);
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
    this.resetState();
  };

  handleClickColumn = (index, column, field) => {
    this.setState({
      column: fromJS({
        ...column,
      }),
      field: fromJS({
        ...field,
      }),
      modifyIndex: index,
      modalVisible: true,
      modalType: 'modify',
    });
  };

  handleChangeViewCompData = (key, value) => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  renderStyleSetComp = (type, style) => {
    const fontStyle = style.get('font');
    const alignStyle = style.get('alignment');
    return (
      <Styled>
        <Collapse>
          <Panel header="Font" key="1">
            <div className="excelConfig">
              <Input.Group compact>
                <Input className="excelConfigLabel" value="폰트사이즈" readOnly style={{ width: '20%', textAlign: 'center' }} />
                <Input
                  className="excelConfigInput"
                  placeholder="사이즈"
                  style={{ width: '30%' }}
                  value={(fontStyle && fontStyle.get('sz')) || ''}
                  onChange={e => this.handleFontStyle(type, 'size', e.target.value)}
                />
                <Input className="excelConfigLabel" value="폰트컬러" readOnly style={{ width: '20%', textAlign: 'center' }} />
                <Input
                  className="excelConfigInput"
                  placeholder="컬러(RGB)"
                  style={{ width: '30%' }}
                  value={(fontStyle && fontStyle.getIn(['color', 'rgb'])) || ''}
                  onChange={e => this.handleFontStyle(type, 'color', e.target.value)}
                />
              </Input.Group>
              <div className="checkboxGroup">
                <Checkbox checked={(fontStyle && fontStyle.get('bold')) || false} onChange={e => this.handleFontStyle(type, 'bold', e.target.checked)}>
                  굵게
                </Checkbox>
                <Checkbox
                  checked={(fontStyle && fontStyle.get('underline')) || false}
                  onChange={e => this.handleFontStyle(type, 'underline', e.target.checked)}
                >
                  밑줄
                </Checkbox>
                <Checkbox checked={(fontStyle && fontStyle.get('italic')) || false} onChange={e => this.handleFontStyle(type, 'italic', e.target.checked)}>
                  기울임꼴
                </Checkbox>
              </div>
            </div>
          </Panel>
          <Panel header="Alignment" key="2">
            <Input.Group compact>
              <Input className="excelConfigLabel" value="세로정렬" readOnly style={{ width: '18%', textAlign: 'center', marginRight: '0px' }} />
              <Select
                defaultValue={(alignStyle && alignStyle.get('vertical')) || ''}
                style={{ width: '30%', marginRight: '10px' }}
                onChange={e => this.handleAlignmentStyle(type, 'vertical', e)}
              >
                <Option value="">사용안함</Option>
                <Option value="bottom">위쪽 맞춤</Option>
                <Option value="center">가운데 맞춤</Option>
                <Option value="top">아래쪽 맞춤</Option>
              </Select>
              <Input className="excelConfigLabel" value="가로정렬" readOnly style={{ width: '18%', textAlign: 'center', marginRight: '0px' }} />
              <Select
                defaultValue={(alignStyle && alignStyle.get('horizontal')) || ''}
                style={{ width: '30%' }}
                onChange={e => this.handleAlignmentStyle(type, 'horizontal', e)}
              >
                <Option value="">사용안함</Option>
                <Option value="left">왼쪽 맞춤</Option>
                <Option value="center">가운데 맞춤</Option>
                <Option value="right">오른쪽 맞춤</Option>
              </Select>
            </Input.Group>
            <div className="checkboxGroup">
              <Checkbox
                checked={(alignStyle && alignStyle.get('wrapText')) || false}
                onChange={e => this.handleAlignmentStyle(type, 'wrapText', e.target.checked)}
              >
                줄바꿈
              </Checkbox>
            </div>
          </Panel>
          <Panel header="Border" key="3">
            <p>테두리설정 개발중</p>
          </Panel>
        </Collapse>
      </Styled>
    );
  };

  render() {
    const { configInfo } = this.props;
    const { modalVisible, modalType, column, field } = this.state;
    const { columns, fields, btnText, fileName, sheetName } = configInfo.property;

    const columnTitle = column.get('title');
    const columnWidth = column.getIn(['width', 'wpx']);
    const columnStyle = column.get('style');
    const fieldStyle = field.get('style');
    const fieldValue = field.get('field');

    return (
      <>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">다운로드 버튼 텍스트</span>
          <Input placeholder="다운로드 버튼 텍스트 설정" defaultValue={btnText || ''} onChange={e => this.handleInputOnchange('btnText', e)} />
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">파일명</span>
          <Input placeholder="Excel FileName" defaultValue={fileName || ''} onChange={e => this.handleInputOnchange('fileName', e)} />
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">시트명</span>
          <Input placeholder="Excel SheetName" defaultValue={sheetName || ''} onChange={e => this.handleInputOnchange('sheetName', e)} />
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">컬럼추가</span>
          <Button onClick={() => this.setState({ modalVisible: true })}>컬럼추가</Button>
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">컬럼리스트</span>
          <Styled>
            {columns && columns.length > 0 ? (
              <div className="columnList">
                {columns.map((item, index) => (
                  <Button style={{ margin: '4px 5px 4px 0px' }} onClick={() => this.handleClickColumn(index, item, fields[index])}>
                    {`${index + 1}_${item.title}`}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="emptyColumn">생성된 컬럼 정보가 없습니다.</div>
            )}
          </Styled>
        </div>
        <Modal
          visible={modalVisible}
          centered
          destroyOnClose
          footer={null}
          bodyStyle={{ padding: '1px' }}
          onCancel={() =>
            this.setState({
              modalVisible: false,
              modalType: 'insert',
              modifyIndex: -1,
            })
          }
          width="750px"
        >
          <MoadalStyled className="popoverWrapper">
            <div className="popoverInnerInput">
              <p className="popover-tit">컬럼설정</p>
              <table className="popoverInnerTable">
                <colgroup>
                  <col width="30%" />
                  <col width="30%" />
                  <col width="40%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>Column Title</th>
                    <th>Cell Width</th>
                    <th>Field</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Input placeholder="컬럼타이틀" style={{ width: '100%' }} value={columnTitle} onChange={e => this.handleColumnTitle(e)} />
                    </td>
                    <td>
                      <Input placeholder="Cell너비" style={{ width: '100%' }} value={columnWidth} onChange={e => this.handleColumnWidth(e)} />
                    </td>
                    <td>
                      <Input placeholder="필드" style={{ width: '100%' }} value={fieldValue} onChange={e => this.handleFieldValue(e)} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="popoverInner">
              <p className="popover-tit">
                컬럼설정
                {modalType === 'insert' ? (
                  <Button type="primary" onClick={this.handleSaveColumnInfo}>
                    svae
                  </Button>
                ) : (
                  <>
                    <Button type="primary" onClick={this.handleModifyColumnInfo}>
                      Modify
                    </Button>
                    <Button type="primary" onClick={this.handleDeleteColumnInfo}>
                      Delete
                    </Button>
                  </>
                )}
              </p>
              <div className="popoverInnerCom">
                <div className="popoverItem popoverItemInput">
                  <span className="spanLabel">Title Style</span>
                  {this.renderStyleSetComp('column', columnStyle)}
                </div>
                <div className="popoverItem popoverItemInput">
                  <span className="spanLabel">Cell Style</span>
                  {this.renderStyleSetComp('field', fieldStyle)}
                </div>
              </div>
            </div>
          </MoadalStyled>
        </Modal>
      </>
    );
  }
}

configer.propTypes = {
  configInfo: PropTypes.object,
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
};

export default configer;
