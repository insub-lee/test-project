import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Descriptions, Input, Select, Checkbox, Table } from 'antd';

import FroalaEditorView from 'components/FormStuff/RichTextEditor/FroalaEditorView';
import StyledButton from '../../Styled/StyledButton';
import StyledDetail from './StyledDetail';

class compDetail extends PureComponent {
  render() {
    console.log('프롭스', this.props);
    const { formData } = this.props;
    return (
      <StyledDetail>
        <Descriptions bordered>
          <Descriptions.Item label="컬럼형식(논리)" span={2}>{`${formData.COL_GROUP_NAME}`}</Descriptions.Item>
          <Descriptions.Item label="컬럼 DB타입" span={1}>{`${formData.COL_DB_TYPE}`}</Descriptions.Item>
          <Descriptions.Item label="컴포넌트 명" span={3}>{`${formData.COMP_NAME}`}</Descriptions.Item>
          <Descriptions.Item label="컴포넌트 경로" span={3}>{`${formData.COMP_SRC}`}</Descriptions.Item>
          <Descriptions.Item label="컴포넌트 설정경로" span={3}>
            {formData.COMP_SETTING_SRC !== null ? `${formData.COMP_SETTING_SRC}` : '설정된 경로가 없습니다.'}
          </Descriptions.Item>
          <Descriptions.Item label="컴포넌트 설명" span={3}>
            <FroalaEditorView model={formData.COMP_DESC}></FroalaEditorView>
          </Descriptions.Item>
        </Descriptions>
      </StyledDetail>
    );
  }
}

compDetail.propTypes = {};

compDetail.defaultProps = {};

export default compDetail;
