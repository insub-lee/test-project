import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Input, Row, Col, Select, Switch, Icon, Button } from 'antd';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import StyledButton from 'components/BizBuilder/styled/StyledButton';
import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import Wrapper from './Wrapper';
import { OptionInfos } from '../OptionSettings/optconfig';

const { Option } = Select;

class Info extends Component {
  componentDidMount() {
    const { fetchData, id } = this.props;
    fetchData(id);
  }

  onChangeValue = (storage, key, val) => {
    const { setChangeValue } = this.props;
    setChangeValue(storage, key, val);
  };

  onSaveClick = () => {
    const {
      setWorkInfo,
      info: { workInfo },
    } = this.props;
    setWorkInfo(workInfo);
  };

  onOptionChange = (checked, record) => {
    const { id, info, setChangeValue } = this.props;
    const { workInfo } = info;
    const optInfo = workInfo.OPT_INFO;
    if (checked) {
      optInfo.push({ OPT_SEQ: record.OPT_SEQ, ISUSED: checked ? 'Y' : 'N', OPT_VALUE: '' });
    } else {
      optInfo.splice(
        optInfo.findIndex(opt => opt.OPT_SEQ === record.OPT_SEQ),
        1,
      );
    }
    setChangeValue('workInfo', 'OPT_INFO', optInfo);
  };

  render() {
    const {
      info: { workInfo, processList, optList },
      history,
    } = this.props;
    return (
      <Wrapper>
        <div>
          <div className="item">
            <div className="item-title">업무명 (게시판명)</div>
            <div className="item-cont">
              <Input onChange={e => this.onChangeValue('workInfo', 'NAME_KOR', e.target.value)} value={workInfo && workInfo.NAME_KOR} />
            </div>
          </div>

          <div className="item">
            <div className="item-title">등록일</div>
            <div className="item-cont">{workInfo && workInfo.REG_DTTM}</div>
            <div className="item-title">빌더구분</div>
            <div className="item-cont">{workInfo && workInfo.TOTAL_BUILDER_NAME}</div>
            <div className="item-cont cont-textarea">{workInfo && workInfo.DSCR}</div>
          </div>

          <div className="item">
            <div className="item-title">기본 화면 전환 그룹</div>
            <div className="item-cont cont-row-wrapper">
              <Select
                placeholder="화면선택"
                style={{ width: '200px' }}
                onChange={val => this.onChangeValue('workInfo', 'VIEW_CHANGE_PROCESS_SEQ', val)}
                value={workInfo && workInfo.VIEW_CHANGE_PROCESS_SEQ}
              >
                {workInfo &&
                  workInfo.viewChangeProcessList &&
                  workInfo.viewChangeProcessList.map(item => (
                    <Option key={`VCPS_${item.VIEW_CHANGE_PROCESS_SEQ}`} value={item.VIEW_CHANGE_PROCESS_SEQ}>
                      {item.VIEW_CHANGE_PROCESS_NAME}
                    </Option>
                  ))}
              </Select>
            </div>
          </div>

          <div className="item">
            <div className="item-title">옵션</div>
            <div className="item-cont">
              <ul>
                {optList &&
                  optList.map(opt => (
                    <li key={`buiderDetailOption_${opt.OPT_SEQ}`}>
                      <div>
                        <Switch
                          onChange={checked => this.onOptionChange(checked, opt)}
                          checked={!!(workInfo && workInfo.OPT_INFO && workInfo.OPT_INFO.findIndex(idx => idx.OPT_SEQ === opt.OPT_SEQ) !== -1)}
                          checkedChildren={<Icon type="check" />}
                          unCheckedChildren={<Icon type="close" />}
                        />{' '}
                        <span>{opt.OPT_NAME}</span>
                        {workInfo &&
                          workInfo.OPT_INFO &&
                          workInfo.OPT_INFO.findIndex(idx => idx.OPT_SEQ === opt.OPT_SEQ) !== -1 &&
                          OptionInfos[opt.OPT_APP_SETTING_SRC] &&
                          OptionInfos[opt.OPT_APP_SETTING_SRC].renderer({
                            ...this.props,
                            onSaveClick: this.onSaveClick,
                            optSeq: opt.OPT_SEQ,
                            optConfig: workInfo.OPT_INFO.filter(idx => idx.OPT_SEQ === opt.OPT_SEQ)[0],
                          })}
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="button-wrapper">
            <StyledButton className="btn-primary btn-first" onClick={() => this.onSaveClick()}>
              저장하기
            </StyledButton>
            {/* <Link to="/admin/adminmain/workbuilder">
              <StyledButton className="btn-light">목록</StyledButton>
            </Link> */}
          </div>
        </div>
      </Wrapper>
    );
  }
}

Info.propTypes = {
  info: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  fetchData: PropTypes.func,
  isLoading: PropTypes.bool,
  setChangeValue: PropTypes.func,
  history: PropTypes.object,
  setWorkInfo: PropTypes.func,
};

Info.defaultProps = {
  fetchData: () => console.debug('no bind events'),
  isLoading: true,
  setChangeValue: () => false,
  history: {},
};

const mapStateToProps = createStructuredSelector({
  info: selectors.makeSelectInfo(),
  isLoading: selectors.makeSelectIsLoading(),
});

const mapDispatchToProps = dispatch => ({
  fetchData: id => dispatch(actions.fetchData(id)),
  setChangeValue: (storage, key, val) => dispatch(actions.setChangeValue(storage, key, val)),
  setWorkInfo: workInfo => dispatch(actions.setWorkInfo(workInfo)),
});

const withReducer = injectReducer({ key: 'work-builder-detail-info', reducer });
const withSaga = injectSaga({ key: 'work-builder-detail-info', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withReducer, withSaga, withConnect)(Info);
