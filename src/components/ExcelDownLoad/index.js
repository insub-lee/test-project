import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactExport from 'react-data-export';

import { Button } from 'antd';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
import { FileExcelOutlined } from '@ant-design/icons';
const StyledButton = StyledAntdButton(Button);
const { ExcelFile } = ReactExport;
const { ExcelSheet } = ReactExport.ExcelFile;

class ExcelDownLoad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitInfo: undefined,
      dataSet: undefined,
      startDown: false,
    };
  }

  componentDidMount() {
    const { submitInfo } = this.props;
    this.setState({ submitInfo });
  }

  makeExcelDataSet = (dataSet, columns, fields) => {
    const data = dataSet.map(item => {
      const result = [];
      fields.forEach(fieldInfo => {
        const cell = {};
        cell.value = item[fieldInfo.field] !== undefined && item[fieldInfo.field] !== null ? item[fieldInfo.field] : '';
        cell.style = fieldInfo.style;
        result.push(cell);
      });
      return result;
    });
    return [{ columns, data }];
  };

  onClickDownLoad = () => {
    const { sagaKey, submitHandlerBySaga } = this.props;
    const { submitInfo } = this.state;
    const { dataUrl, method, submitData } = submitInfo;
    submitHandlerBySaga(sagaKey, method, dataUrl, submitData, this.initDataBind);
  };

  initDataBind = (id, response) => {
    const { columns, fields } = this.props;
    const { submitInfo } = this.state;
    const { dataSetName } = submitInfo;
    const { [dataSetName]: list } = response;
    const dataSet = this.makeExcelDataSet(list, columns, fields);
    this.setState({ dataSet, startDown: true });
  };

  render() {
    const { title } = this.props;
    const { dataSet, startDown } = this.state;

    return (
      <>
        {startDown && (
          <ExcelFile filename="ttitititi">
            <ExcelSheet dataSet={dataSet} name="dddd" />
          </ExcelFile>
        )}
        <span className={this.props.className}>
          <StyledButton className="btn-img btn-gray btn-sm" onClick={this.onClickDownLoad}>
            <FileExcelOutlined />
            &nbsp;{title}
          </StyledButton>
        </span>
      </>
    );
  }
}

export default ExcelDownLoad;
