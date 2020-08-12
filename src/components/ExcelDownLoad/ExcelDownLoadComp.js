import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactExport from 'react-data-export';

import { Button } from 'antd';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
import { FileExcelOutlined } from '@ant-design/icons';

const StyledButton = StyledAntdButton(Button);
const { ExcelFile } = ReactExport;
const { ExcelSheet } = ReactExport.ExcelFile;

class ExcelDownLoadComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitInfo: undefined,
      dataSet: undefined,
      startDown: false,
      dataSetBind: undefined,
    };
  }

  componentDidMount() {
    const { submitInfo, dataSetBind } = this.props;
    this.setState({ submitInfo });
  }

  makeExcelDataSet = (dataSet, columns, fields) => {
    const data = dataSet.map(item => {
      const result = [];
      fields.forEach(fieldInfo => {
        const cell = {};
        // if (fieldInfo.format) {
        //   const type = fieldInfo.format.type;
        //   switch (type) {
        //     case 'DATE':
        //       console.debug('type', type, item[fieldInfo.field]);
        //       cell.value = item[fieldInfo.field] !== undefined && item[fieldInfo.field] !== null ?  item[fieldInfo.field] : '';
        //       return;
        //     default:
        //       return;
        //   }
        // } else {
        //   cell.value = item[fieldInfo.field] !== undefined && item[fieldInfo.field] !== null ? item[fieldInfo.field] : '';
        // }
        cell.value = item[fieldInfo.field] !== undefined && item[fieldInfo.field] !== null ? item[fieldInfo.field] : '';
        cell.style = fieldInfo.style;
        result.push(cell);
      });
      return result;
    });
    return [{ columns, data }];
  };

  onClickDocDownLoad = () => {
    const { sagaKey, submitHandlerBySaga, dataSetBind, columns, fields } = this.props;
    const { submitInfo } = this.state;
    if (submitInfo) {
      const { dataUrl, method, submitData } = submitInfo;
      submitHandlerBySaga(sagaKey, method, dataUrl, submitData, this.initDataBind);
    } else {
      const dataSet = this.makeExcelDataSet(dataSetBind, columns, fields);
      this.setState(prevState => {
        return { dataSet, startDown: prevState.startDown + 1 };
      });
    }
  };

  initDataBind = (id, response) => {
    console.debug('execl response', response);
    const { columns, fields } = this.props;
    const { submitInfo } = this.state;
    const { dataSetName } = submitInfo;
    const { [dataSetName]: list } = response;
    const dataSet = this.makeExcelDataSet(list, columns, fields);
    this.setState(prevState => {
      return { dataSet, startDown: prevState.startDown + 1 };
    });
  };

  render() {
    const { title, fileName } = this.props;
    const { dataSet, startDown } = this.state;

    return (
      <>
        <div style={{ width: '100%' }}>
          {startDown && (
            <ExcelFile key={startDown} filename={fileName} hideElement={true}>
              <ExcelSheet dataSet={dataSet} name="sheet1" />
            </ExcelFile>
          )}
        </div>

        <span className={this.props.className}>
          <StyledButton className="btn-img btn-gray btn-sm" onClick={this.onClickDocDownLoad}>
            <FileExcelOutlined />
            &nbsp;{title}
          </StyledButton>
        </span>
      </>
    );
  }
}

export default ExcelDownLoadComp;
