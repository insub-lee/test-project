import React from 'react';
import { Menu, Button, Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as feed from 'components/Feedback/functions';
import * as actions from '../../actions';

const EditorMenu = ({ isGroupAdmin, isSuperAdmin, handlePostTemplate, handleChangeIsEditorMgr, handleSaveEditorMgr, getManualEditorMgr }) => (
  <Menu className="WriteHeader">
    <Menu secondary className="right WriteHeaderMenu">
      <Menu.Item>
        <Button basic compact inverted className="blackBtn" onClick={handleChangeIsEditorMgr}>
          나가기
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          type="button"
          basic
          compact
          inverted
          onClick={() => {
            feed.showConfirm('작성하신 글을 초기화 하시겠습니까?', '', () => getManualEditorMgr());
          }}
        >
          초기화
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Popup
          trigger={
            <Button type="button" basic compact inverted>
              템플릿등록
            </Button>
          }
          on="click"
          position="bottom center"
          style={{ textAlign: 'right' }}
        >
          <Popup.Content>
            <Button.Group size="mini" vertical basic>
              <Button content="개인템플릿 등록" onClick={() => handlePostTemplate('personal')} />
              {isGroupAdmin === true ? <Button content="그룹템플릿 등록" onClick={() => handlePostTemplate('group')} /> : null}
              {isSuperAdmin === true ? <Button content="전사템플릿 등록" onClick={() => handlePostTemplate('common')} /> : null}
            </Button.Group>
          </Popup.Content>
        </Popup>
      </Menu.Item>
      <Menu.Item>
        <Button type="button" basic compact inverted onClick={handleSaveEditorMgr}>
          저장
        </Button>
      </Menu.Item>
    </Menu>
  </Menu>
);

EditorMenu.propTypes = {
  handleChangeIsEditorMgr: PropTypes.func,
  handleSaveEditorMgr: PropTypes.func,
  getManualEditorMgr: PropTypes.func,
};

EditorMenu.defaultProps = {
  handleChangeIsEditorMgr: () => false,
  handleSaveEditorMgr: () => false,
  getManualEditorMgr: () => false,
};

const mapDispatchToProps = dispatch => ({
  handleChangeIsEditorMgr: () => dispatch(actions.setIsEditorMgrByReduc(false)),
  handleSaveEditorMgr: () => dispatch(actions.saveEditorMgrBySaga()),
  getManualEditorMgr: () => dispatch(actions.getManualEditorMgrBySaga()),
});

export default connect(
  null,
  mapDispatchToProps,
)(EditorMenu);
