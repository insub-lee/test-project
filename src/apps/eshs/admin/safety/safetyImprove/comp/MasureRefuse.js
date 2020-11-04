import * as PropTypes from 'prop-types';
import React from 'react';
import { Input } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';

const AntdTextarea = StyledTextarea(Input.TextArea);

class MasureRefuse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.formData.CONTENT,
    };
  }

  render() {
    const { formData, flag, send } = this.props;
    return (
      <StyledContentsWrapper>
        <StyledHtmlTable>
          <table className="table-border">
            <colgroup>
              <col width="20%" />
              <col width="80%" />
            </colgroup>
            <tbody>
              <tr>
                <th colSpan={2}>*요청반송</th>
              </tr>
              <tr>
                <th>발행번호</th>
                <td>{(formData && formData.REQ_NO) || ''}</td>
              </tr>
              <tr>
                <th>{flag === 'LOWER' ? '요청 부서' : '반송 부서'}</th>
                <td>{formData.TARGET_DEPT || ''}</td>
              </tr>
              <tr>
                <th>{flag === 'LOWER' ? '요청자' : '반송자'}</th>
                <td>{formData.TARGET_USER || ''}</td>
              </tr>
              <tr>
                <th>내용</th>
                <td>
                  <AntdTextarea
                    rows={8}
                    defaultValue={formData.CONTENT || ''}
                    onChange={e =>
                      this.setState({
                        content: e.target.value,
                      })
                    }
                  />
                </td>
              </tr>
              {flag === 'LOWER' && (
                <tr>
                  <th colSpan={2} align="center">
                    <StyledButton className="btn-gray btn-sm mr5" onClick={() => send(this.state.content)}>
                      반송
                    </StyledButton>
                  </th>
                </tr>
              )}
            </tbody>
          </table>
        </StyledHtmlTable>
      </StyledContentsWrapper>
    );
  }
}

MasureRefuse.propTypes = {
  formData: PropTypes.object,
  flag: PropTypes.string,
  send: PropTypes.func,
};

MasureRefuse.defaultProps = {
  formData: {},
  flag: 'LOWER',
  send: content => console.debug('content ::: ', content),
};

export default MasureRefuse;
