import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Input, message, Select } from 'antd';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledButton from 'commonStyled/Buttons/StyledButton';

import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledHtmlTable from 'commonStyled/EshsStyled/Table/StyledHtmlTable';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import ImageUploader from './ImageUploader';

const AntdSelect = StyledSelect(Select);
const AntdLineTable = StyledLineTable(Table);

const { Option } = Select;
const { TextArea } = Input;

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: 4014,
      imgBool: false,
    };
  }

  componentDidMount() {
    this.listDataApi();
  }

  onChangeValue = (name, value) => {
    this.setState({ [name]: value });
  };

  listDataApi = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'eshsclean',
        url: '/api/eshs/v1/common/eshsclean',
        type: 'GET',
      },
      {
        key: 'treeSelectData',
        type: 'POST',
        url: '/api/admin/v1/common/categoryMapList',
        params: { PARAM: { NODE_ID: 4013 } },
      },
    ];
    getCallDataHandler(id, apiAry, this.initData);
  };

  initData = () => {
    const {
      result: { treeSelectData },
    } = this.props;
    const nData = treeSelectData && treeSelectData.categoryMapList && treeSelectData.categoryMapList.filter(f => f.PARENT_NODE_ID === 4013);
    this.setState({ nData });
    this.listData();
  };

  listData = () => {
    const {
      result: { treeSelectData, eshsclean },
    } = this.props;
    const { selectedValue } = this.state;
    const selected = eshsclean && eshsclean.list && eshsclean.list.find(f => f.SELECTED_NODE_ID === selectedValue);
    const imgUrl = `http://192.168.251.14:10197/down/file/${selected && selected.FILE_SEQ}`;
    const dataSource = treeSelectData && treeSelectData.categoryMapList && treeSelectData.categoryMapList.filter(f => f.PARENT_NODE_ID === selectedValue);
    this.setState({ dataSource, imgUrl, imgBool: false, fileList: undefined });
  };

  callBack = (id, response) => {
    if (response.result) {
      message.info('등록이 완료되었습니다.');
      this.listDataApi();
    } else {
      message.warning('폐이지에 문제가 있습니다.');
    }
  };

  onChangeData = () => {
    const { selectedValue, dataSource } = this.state;
    const { sagaKey: id, submitHandlerBySaga, result } = this.props;
    const submitData = { PARAM: { DATA_ARRAY: dataSource } };
    if (result.realFile && result.realFile.DETAIL && result.realFile.DETAIL.length) {
      // 사진을 수정했다면
      const fileUploadSubmitData = {
        PARAM: { FILE_SEQ: Number(result.realFile.DETAIL[0].seq), SELECTED_NODE_ID: selectedValue },
      };
      submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsclean', fileUploadSubmitData);
    }
    submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsclean', submitData, this.callBack);
  };

  onChangeSelect = value => {
    this.setState({ selectedValue: value }, this.listData);
  };

  handleUploadFileChange = ({ fileList }) => {
    const responseList = [];
    fileList.map(item => responseList.push(item.response));
    this.setState({ fileList, responseList });
    if (fileList) {
      this.handlePreview(fileList[0]);
    }
  };

  handlePreview = async file => {
    let previewImage = file && file.preview;
    if (file && !file.url && !file.preview) {
      previewImage = await getBase64(file.originFileObj);
    }
    this.setState({ previewImage: (file && file.url) || previewImage, imgBool: true });
  };

  BeforeSaveTask = () => {
    const { responseList, selectedValue } = this.state;
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'realFile',
        type: 'POST',
        url: `/upload/moveFileToReal`,
        params: { PARAM: { DETAIL: responseList } },
      },
    ];
    if (selectedValue) {
      getCallDataHandler(id, apiAry, this.onChangeData);
    } else {
      message.warning('분류가 선택되지 않았습니다.');
    }
  };

  // Input 값 변경
  onChangeContants = (name, text, record, index) => {
    const { dataSource } = this.state;
    const nOtherArr = dataSource;
    if (name === 'NAME_KOR') {
      dataSource.splice(index, 1, { NAME_KOR: text, DESCIPTION: record.DESCIPTION, NODE_ID: record.NODE_ID });
    } else {
      dataSource.splice(index, 1, { NAME_KOR: record.NAME_KOR, DESCIPTION: text, NODE_ID: record.NODE_ID });
    }
    this.setState({ dataSource: nOtherArr });
  };

  render() {
    const { dataSource, nData, fileList, previewImage, imgUrl, imgBool } = this.state;
    const columns = [
      {
        title: '설비',
        align: 'left',
        dataIndex: 'NAME_KOR',
        render: (text, record, index) => (
          <div className="td-input-wrapper">
            <TextArea className="input-sm input-center" value={text} onChange={e => this.onChangeContants('NAME_KOR', e.target.value, record, index)} />
          </div>
        ),
      },
      {
        title: '용도',
        align: 'left',
        dataIndex: 'DESCIPTION',
        render: (text, record, index) => (
          <div className="td-input-wrapper">
            <TextArea className="input-sm input-center" value={text} onChange={e => this.onChangeContants('DESCIPTION', e.target.value, record, index)} />
          </div>
        ),
      },
    ];
    return (
      <ContentsWrapper>
        <div className="selSaveWrapper alignLeft">
          <AntdSelect style={{ width: 200 }} className="mr5" onChange={value => this.onChangeSelect(value)} defaultValue={4014}>
            {nData && nData.map(item => <Option value={item.NODE_ID}>{item.NAME_KOR}</Option>)}
          </AntdSelect>
          <StyledButtonWrapper className="btn-wrap-inline">
            <StyledButton className="btn-primary btn-first" onClick={this.BeforeSaveTask}>
              저장
            </StyledButton>
          </StyledButtonWrapper>
        </div>
        <StyledHtmlTable className="tableWrapper">
          <ImageUploader
            accept="image/jpeg, image/png"
            action="/upload"
            listType="picture"
            handleChange={this.handleUploadFileChange}
            fileList={fileList}
            previewImage={previewImage}
            imgUrl={imgUrl}
            imgBool={imgBool}
          />
        </StyledHtmlTable>
        <AntdLineTable
          className="tableWrapper tableCodeWrapper"
          rowKey={dataSource && dataSource.NODE_ID}
          columns={columns}
          dataSource={dataSource || []}
          pagination={false}
          footer={() => <div style={{ textAlign: 'center' }}>{`${(dataSource && dataSource.length) || 0} 건`}</div>}
        />
      </ContentsWrapper>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  submitHandlerBySaga: PropTypes.func,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.any,
};

List.defaultProps = {
  getCallDataHandler: () => {},
};

export default List;
