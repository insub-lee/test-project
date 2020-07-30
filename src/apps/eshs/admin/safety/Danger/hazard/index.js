import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popconfirm } from 'antd';
import BizBuilderBase from 'components/BizBuilderBase';

import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

class Hazard extends Component {
  componentDidMount() {}

  handleCustomAction = (id, changeFormData, afterCallBack, type) => {
    changeFormData(id, 'END_YN', type);
    afterCallBack();
  };

  modifyCustomButtons = ({ ...modifyProps }) => {
    const { onChangeSave, sagaKey: id, changeFormData, changeViewPage, viewPageData } = modifyProps;

    return (
      <>
        <StyledButton className="btn-primary btn-first btn-xs" onClick={() => onChangeSave('M')}>
          저장
        </StyledButton>
        <Popconfirm
          title="정말로 삭제하시겠습니까?"
          onConfirm={() => this.handleCustomAction(id, changeFormData, () => onChangeSave('M'), 'D')}
          okText="Yes"
          cancelText="No"
        >
          <StyledButton className="btn-light btn-first btn-xs">삭제</StyledButton>
        </Popconfirm>
        <StyledButton className="btn-light btn-xs mr5" onClick={() => changeViewPage(id, viewPageData.workSeq, -1, 'INPUT')}>
          초기화
        </StyledButton>
        <StyledButton className="btn-primary btn-xs" onClick={() => this.handleCustomAction(id, changeFormData, () => onChangeSave('M'), 'Y')}>
          완료
        </StyledButton>
      </>
    );
  };

  render() {
    return (
      <BizBuilderBase
        sagaKey="hazard"
        workSeq={12061}
        viewType="INPUT"
        InputCustomButtons={() => null}
        ModifyCustomButtons={() => null}
        ListCustomButtons={() => null}
        ViewCustomButtons={() => null}
        EshsSearchBarModifyCustomButtons={this.modifyCustomButtons}
        loadingComplete={this.loadingComplete}
        conditional={`AND W.END_YN IN ('Y', 'N')`}
      />
    );
  }
}

Hazard.propTypes = {};

Hazard.defaultProps = {};

export default Hazard;
