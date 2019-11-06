class ProcessInput extends Component {
  state = {
    actionType: 'I',
    PRC_ID: -1,
    NAME_KOR: '',
    PROCESS_SVRNAME: undefined,
  };

  onChangeValue = (id, value) => {
    const retObj = {};
    retObj[id] = value;
    this.setState(retObj);
  };

  onSaveComplete = id => {
    const { onRefresh } = this.props;
    onRefresh();
  };

  onSaveProcess = () => {
    const { submitHadnlerBySaga, id } = this.props;
    const submitData = {
      PARAM: {
        PRC_ID: -1,
        NAME_KOR: this.state.NAME_KOR,
        PROCESS_SVRNAME: this.state.PROCESS_SVRNAME,
      },
    };
    submitHadnlerBySaga(id, 'POST', '/api/workflow/v1/common/process', submitData, this.onSaveComplete);
  };

  render() {
    console.debug(this.props);
    return (
      <div>
        <table style={{ margin: '10px' }}>
          <tr>
            <td style={{ padding: '10px' }}>프로세스 : </td>
            <td>
              <Input value={this.state.NAME_KOR} onChange={e => this.onChangeValue('NAME_KOR', e.target.value)} />
            </td>
            <td style={{ padding: '10px' }}>프로세스 클래스 : </td>
            <td style={{ padding: '10px' }}>
              <Select
                onChange={e => this.onChangeValue('PROCESS_SVRNAME', e)}
                value={this.state.PROCESS_SVRNAME}
                style={{ width: '300px' }}
                placeholder="클래스를 선택해주세요"
              >
                <Option value="linearProcessService">선형 프로세스</Option>
                <Option value="ruleProcessService">사용자 정의</Option>
              </Select>
            </td>
            <td style={{ padding: '10px' }}>
              <Button type="primary" onClick={this.onSaveProcess}>
                프로세스 등록
              </Button>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default ProcessInput;
