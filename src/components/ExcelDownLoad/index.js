import React, { Component } from 'react';
import { Button } from 'antd';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
import { FileExcelOutlined } from '@ant-design/icons';
const StyledButton = StyledAntdButton(Button);

class ExcelDownLoad extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dataUrl } = this.props;
    console.debug(this.props);
  }

  render() {
    const { title } = this.props;
    return (
      <StyledButton className="btn-img btn-gray btn-sm">
        <FileExcelOutlined />
        &nbsp;{title}
      </StyledButton>
    );
  }
}

export default ExcelDownLoad;
