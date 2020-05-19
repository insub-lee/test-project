import React from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Button, Tag } from 'antd';
import { isJSON } from 'utils/helpers';
import { PlusOutlined } from '@ant-design/icons';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import styled from 'styled-components';

const { Option } = Select;

const Wrapper = styled.div`
  .ant-select {
    margin-top: 2px !important;
    width: 21% !important;
  }
`;

const ListStyle = styled.div`
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  margin: 5px 37px 0px 0px;
  padding: 3px;
`;

/*
    신규추가 
    목적 : ListGroup 내에서 Row를 클릭시 원하는 뷰로 이동할 수 있는 Builder Option (빌더모달 사용시에도 지원)
    create by. JeongHyun
*/
class onRowClickSetting extends React.Component {
  constructor(props) {
    super(props);
    // 추후 옵션값을 추가할때 공통 변경사항이 적용될 수 있도록 state 사용
    this.state = {
      options: ['VIEW', 'MODIFY'],
      listMetaSeq: '',
    };
  }

  onChange = (key, val) => {
    const { info, setChangeValue, optSeq } = this.props;
    const { workInfo } = info;
    const optList = workInfo.OPT_INFO;
    const nOptList = optList.map(opt => {
      if (opt.OPT_SEQ === optSeq) {
        if (isJSON(opt.OPT_VALUE)) {
          const tempVal = JSON.parse(opt.OPT_VALUE);
          tempVal[key] = val;
          return { ...opt, OPT_VALUE: JSON.stringify(tempVal) };
        }
        if (opt.OPT_VALUE !== '') {
          const tempVal = { VIEW: opt.OPT_VALUE, LIST: [] };
          tempVal[key] = val;
          return { ...opt, OPT_VALUE: JSON.stringify(tempVal) };
        }
        const tempVal = { VIEW: 'VIEW', LIST: [] };
        tempVal[key] = val;
        return { ...opt, OPT_VALUE: JSON.stringify(tempVal) };
      }
      return opt;
    });
    setChangeValue('workInfo', 'OPT_INFO', nOptList);
  };

  isNumberic = val => /^\d+$/.test(val);

  addListMetaSeq = () => {
    const { optConfig } = this.props;
    const { listMetaSeq } = this.state;
    const optValue = optConfig && optConfig.OPT_VALUE && optConfig.OPT_VALUE.length > 0 && isJSON(optConfig.OPT_VALUE) ? JSON.parse(optConfig.OPT_VALUE) : {};
    const optPagelist = optValue.LIST || [];
    if (this.isNumberic(listMetaSeq)) {
      if (!optPagelist.includes(listMetaSeq)) {
        const nextOptPagelist = optPagelist.concat(listMetaSeq);
        this.onChange('LIST', nextOptPagelist);
      }
      this.setState({
        listMetaSeq: '',
      });
      return;
    }
    message.info(<MessageContent>숫자만 입력가능합니다.</MessageContent>);
  };

  removeListMeataSeq = metaSeq => {
    const { optConfig } = this.props;
    const optValue = optConfig && optConfig.OPT_VALUE && optConfig.OPT_VALUE.length > 0 && isJSON(optConfig.OPT_VALUE) ? JSON.parse(optConfig.OPT_VALUE) : {};
    const optPagelist = optValue.LIST || [];
    const nextOptPagelist = optPagelist.filter(item => item !== metaSeq);
    this.onChange('LIST', nextOptPagelist);
  };

  render() {
    const { optConfig } = this.props;
    const { options, listMetaSeq } = this.state;
    const optValue =
      optConfig && optConfig.OPT_VALUE && optConfig.OPT_VALUE !== '' && isJSON(optConfig.OPT_VALUE)
        ? JSON.parse(optConfig.OPT_VALUE)
        : { VIEW: optConfig.OPT_VALUE, LIST: [] };
    const optPagelist = optValue.LIST || [];
    return (
      <Wrapper>
        <Input.Group compact>
          <Input style={{ width: '20%', marginTop: '2px' }} readOnly value="뷰 지정" />
          <Select value={optValue.VIEW} onChange={value => this.onChange('VIEW', value)}>
            {options.map(option => (
              <Option value={option} key={option}>
                {option}
              </Option>
            ))}
          </Select>
          <Input style={{ width: '22%', marginTop: '2px' }} readOnly value="listMetaSeq" />
          <Input style={{ width: '20%', marginTop: '2px' }} value={listMetaSeq} onChange={e => this.setState({ listMetaSeq: e.target.value })} />
          <Button style={{ marginTop: '2px' }} onClick={() => this.addListMetaSeq()}>
            <PlusOutlined />
          </Button>
        </Input.Group>
        <ListStyle>
          {optPagelist.length === 0 && <span>지정된 ListMetaSeq가 없습니다.</span>}
          {optPagelist &&
            optPagelist.length > 0 &&
            optPagelist.map(item => (
              <Tag key={`listMetaSeq_${item}`} closable onClose={() => this.removeListMeataSeq(item)}>
                {item}
              </Tag>
            ))}
        </ListStyle>
      </Wrapper>
    );
  }
}

onRowClickSetting.propTypes = {
  info: PropTypes.any,
  setChangeValue: PropTypes.func,
  optSeq: PropTypes.number,
  optConfig: PropTypes.object,
};

export default onRowClickSetting;
