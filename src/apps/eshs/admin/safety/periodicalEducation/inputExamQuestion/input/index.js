import React from 'react';
import PropTypes from 'prop-types';
import { Card, Input } from 'antd';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

const AntdInput = StyledInput(Input);
class InputPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div style={{ marginTop: '30px', marginLeft: '100px', marginBottom: '10px' }}>
          <Card
            title={
              <>
                <div className="ant-card-head-title">1번 문항</div>
                <AntdInput placeholder="문제를 입력하세요." />
              </>
            }
            style={{ width: '90%' }}
          >
            <AntdInput placeholder="보기 1" style={{ width: '100%', marginBottom: '10px' }} />
            <AntdInput placeholder="보기 2" style={{ width: '100%', marginBottom: '10px' }} />
            <AntdInput placeholder="보기 3" style={{ width: '100%', marginBottom: '10px' }} />
            <AntdInput placeholder="보기 4" style={{ width: '100%', marginBottom: '10px' }} />
          </Card>
        </div>
        <div style={{ marginLeft: '100px', marginBottom: '10px' }}>
          <Card
            title={
              <>
                <div className="ant-card-head-title">2번 문항</div>
                <AntdInput placeholder="문제를 입력하세요." />
              </>
            }
            style={{ width: '90%' }}
          >
            <AntdInput placeholder="보기 1" style={{ width: '100%', marginBottom: '10px' }} />
            <AntdInput placeholder="보기 2" style={{ width: '100%', marginBottom: '10px' }} />
            <AntdInput placeholder="보기 3" style={{ width: '100%', marginBottom: '10px' }} />
            <AntdInput placeholder="보기 4" style={{ width: '100%', marginBottom: '10px' }} />
          </Card>
        </div>
        <div style={{ marginLeft: '100px', marginBottom: '10px' }}>
          <Card
            title={
              <>
                <div className="ant-card-head-title">3번 문항</div>
                <AntdInput placeholder="문제를 입력하세요." />
              </>
            }
            style={{ width: '90%' }}
          >
            <AntdInput placeholder="보기 1" style={{ width: '100%', marginBottom: '10px' }} />
            <AntdInput placeholder="보기 2" style={{ width: '100%', marginBottom: '10px' }} />
            <AntdInput placeholder="보기 3" style={{ width: '100%', marginBottom: '10px' }} />
            <AntdInput placeholder="보기 4" style={{ width: '100%', marginBottom: '10px' }} />
          </Card>
        </div>
        <div style={{ marginLeft: '100px', marginBottom: '10px' }}>
          <Card
            title={
              <>
                <div className="ant-card-head-title">4번 문항</div>
                <AntdInput placeholder="문제를 입력하세요." />
              </>
            }
            style={{ width: '90%' }}
          >
            <AntdInput placeholder="보기 1" style={{ width: '100%', marginBottom: '10px' }} />
            <AntdInput placeholder="보기 2" style={{ width: '100%', marginBottom: '10px' }} />
            <AntdInput placeholder="보기 3" style={{ width: '100%', marginBottom: '10px' }} />
            <AntdInput placeholder="보기 4" style={{ width: '100%', marginBottom: '10px' }} />
          </Card>
        </div>
        <div style={{ marginLeft: '100px', marginBottom: '10px' }}>
          <Card
            title={
              <>
                <div className="ant-card-head-title">5번 문항</div>
                <AntdInput placeholder="문제를 입력하세요." />
              </>
            }
            style={{ width: '90%' }}
          >
            <AntdInput placeholder="보기 1" style={{ width: '100%', marginBottom: '10px' }} />
            <AntdInput placeholder="보기 2" style={{ width: '100%', marginBottom: '10px' }} />
            <AntdInput placeholder="보기 3" style={{ width: '100%', marginBottom: '10px' }} />
            <AntdInput placeholder="보기 4" style={{ width: '100%', marginBottom: '10px' }} />
          </Card>
        </div>
        <div style={{ padding: '30px' }}>
          <StyledButton className="btn-primary mr5">저장</StyledButton>
          <StyledButton className="btn-light">취소</StyledButton>
        </div>
      </>
    );
  }
}

Input.propTypes = {};

Input.defaultProps = {};

export default InputPage;
