import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';

import request from 'utils/request';

class WorkSelectorModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isOpenModal: false,
    };
  }

  componentDidMount() {
    const { preview } = this.props;
    if (!preview) {
      const { loadWorkSeq } = this.props;
      this.getData(loadWorkSeq).then(({ data }) => {
        this.setState({ list: data });
      });
    }
  }

  getData = async workSeq => {
    const url = `/api/builder/v1/work/taskList/${workSeq}`;
    const { response, error } = await request({
      url,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'GET',
    });
    const { list } = response;
    return { data: list || [] };
  };

  // onChangeValue = value => {
  //   const { saveTempContents, name, contSeq } = this.props;
  //   // 임시저장
  //   // saveTempContents(value, name, 'work-selector', contSeq);
  // };

  render() {
    const { list, isOpenModal } = this.state;
    const { workKey, workValue, defaultValue } = this.props;
    return (
      <div style={{ width: 500 }}>
        <Button type="link">{defaultValue || '선택하기'}</Button>
        <Modal title={null} visible={isOpenModal} footer={null}></Modal>
      </div>
    );
  }
}

WorkSelectorModal.propTypes = {
  loadWorkSeq: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  preview: PropTypes.bool,
};

WorkSelectorModal.defaultProsp = {
  loadWorkSeq: -1,
  defaultValue: '',
  preview: false,
};

export default WorkSelectorModal;
