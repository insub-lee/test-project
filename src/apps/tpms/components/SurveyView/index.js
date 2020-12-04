import React, { Component } from 'react';
import moment from 'moment';
import FormView from '../FormPreview/FormView';
import Button from '../Button';
import service from './service';
import alertMessage from '../Notification/Alert';
import makeSurveyResultForm from '../../utils/makeSurveyResultForm';

class SurveyView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brdnm: '',
      sdd: moment(new Date()).format('YYYY.MM.DD'),
      edd: moment(new Date()).format('YYYY.MM.DD'),
      formjson: [],
      readOnly: false,
    };
    this.fetchInfo = this.fetchInfo.bind(this);
    this.submitData = this.submitData.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchInfo();
  }

  async fetchInfo() {
    const { boardId } = this.props;
    const { response, error } = await service.boardView.get(boardId);
    if (response && !error) {
      const { brdInfo } = response;
      console.debug('>>>brdInfo', brdInfo);
      const { view } = brdInfo;
      this.setState({
        brdnm: view.brdnm,
        sdd: moment(view.sdd, 'YYYYMMDD').format('YYYY.MM.DD'),
        edd: moment(view.edd, 'YYYYMMDD').format('YYYY.MM.DD'),
        formjson: JSON.parse(view.formjson),
      });
      this.fetchData();
    } else {
      alertMessage.alert('Server Error');
    }
  }

  async fetchData() {
    const { boardId } = this.props;
    const { formjson } = this.state;
    const { response, error } = await service.answerList.get(boardId);
    if (response && !error) {
      const { list } = response;
      if (list.length === 0) {
        this.setState({ formjson, readOnly: false });
      } else {
        const nextFormJson = makeSurveyResultForm(formjson, list, true);
        this.setState({ formjson: nextFormJson, readOnly: true });
      }
    } else {
      alertMessage.alert('Server Error');
    }
  }

  async submitData(e) {
    e.preventDefault();
    const { boardId, usrId } = this.props;
    const formData = new FormData(e.target);
    const answerList = [];
    formData.forEach((value, key) => {
      const parsedKey = key.split('-');
      const parsedKeyForQno = key.split('_');
      const sno = parseInt(parsedKey[0], 10) + 1;
      const type = parsedKey[1];
      let qno;
      if (type === 'single_choice') {
        const { id } = document.querySelector(`input[name="${key}"]`);
        const parsedId = id.split('_');
        qno = parseInt(parsedId[parsedId.length - 1], 10) + 1;
      } else {
        qno = parseInt(parsedKeyForQno[parsedKeyForQno.length - 1], 10) + 1;
      }
      answerList.push({
        brdid: boardId,
        sno,
        qno,
        answer: value,
        usrId,
        insrId: usrId,
      });
    });
    const payload = {
      isAnswer: true,
      answerList,
    };
    console.debug('Payload :', payload);
    if (answerList.length < 3) {
      alertMessage.alert('선택해 주십시오.');
      return;
    }
    /* Todo - insert survey */
    const { response, error } = await service.answer.post(payload);
    if (response && !error) {
      console.debug('WOW SURVEY Inserted', response);
      this.fetchInfo();
    } else {
      console.debug('Sad.. Error', error);
      alertMessage.alert('Server Error');
    }
  }

  render() {
    const { brdnm, sdd, edd, formjson, readOnly } = this.state;
    return (
      <div>
        <div style={{ padding: 10 }}>
          <strong style={{ fontSize: 20 }}>
            {brdnm} <span style={{ fontSize: 15, margin: '0 10px' }}>{`기간: ${sdd} ~ ${edd}`}</span>
          </strong>
        </div>
        <form autoComplete="off" onSubmit={this.submitData}>
          <FormView datas={formjson} isSurvey noBoarder noPadding />
          <div style={{ textAlign: 'center', marginTop: 30 }}>
            <Button type="submit" disabled={readOnly}>
              등록하기
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default SurveyView;
