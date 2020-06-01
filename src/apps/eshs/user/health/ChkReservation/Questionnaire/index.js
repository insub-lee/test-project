import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import QuestionnaireView from './QuestionnaireView';

class Questionnaire extends Component {
  render() {
    const { onCancelPopup, userInfo, chkTypeCd } = this.props;
    return <BizMicroDevBase sagaKey="questionnaireView" component={QuestionnaireView} onCancelPopup={onCancelPopup} userInfo={userInfo} chkTypeCd={chkTypeCd} />;
  }
}

export default Questionnaire;