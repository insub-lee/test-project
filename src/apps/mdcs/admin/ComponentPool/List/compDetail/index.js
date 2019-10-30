import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Descriptions, Input, Select, Checkbox, Table } from 'antd';

import StyledButton from 'apps/mdcs/styled/StyledButton';
import FroalaEditorView from 'components/FormStuff/RichTextEditor/FroalaEditorView';
import StyledDetail from './StyledDetail';

class compDetail extends PureComponent {
  render() {
    console.log('프롭스', this.props);
    const { metaData } = this.props.viewData;
    return (
      <StyledDetail>
        <Descriptions bordered>
          <Descriptions.Item label="컬럼형식(논리)" span={2}>{`${metaData.COL_GROUP_NAME}`}</Descriptions.Item>
          <Descriptions.Item label="컬럼 DB타입" span={1}>{`${metaData.COL_DB_TYPE}`}</Descriptions.Item>
          <Descriptions.Item label="컴포넌트 명" span={3}>{`${metaData.COMP_NAME}`}</Descriptions.Item>
          <Descriptions.Item label="컴포넌트 경로" span={3}>{`${metaData.COMP_SRC}`}</Descriptions.Item>
          <Descriptions.Item label="컴포넌트 설정경로" span={3}>
            {metaData.COMP_SETTING_SRC !== null ? `${metaData.COMP_SETTING_SRC}` : '설정된 경로가 없습니다.'}
          </Descriptions.Item>
          <Descriptions.Item label="컴포넌트 설명" span={3}>
            <FroalaEditorView model={metaData.COMP_DESC}></FroalaEditorView>
          </Descriptions.Item>
        </Descriptions>
      </StyledDetail>
    );
  }
}

compDetail.propTypes = {};

compDetail.defaultProps = {};

export default compDetail;
