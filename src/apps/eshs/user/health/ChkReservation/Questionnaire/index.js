import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import QuestionnaireView from './QuestionnaireView';

class Questionnaire extends Component {
  render() {
    const { onCancelPopup, profile } = this.props;
    return <BizMicroDevBase sagaKey="questionnaireView" component={QuestionnaireView} onCancelPopup={onCancelPopup} profile={profile} />;
  }
}

export default Questionnaire;