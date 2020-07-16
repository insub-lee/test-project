import * as PropTypes from 'prop-types';
import React from 'react';
import { Input, Modal, Select, Table } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import request from 'utils/request';

const AntdModal = StyledContentsModal(Modal);
const AntdSearch = StyledSearchInput(Input.Search);
const AntdSelect = StyledSelect(Select);
const AntdTable = StyledAntdTable(Table);
const { Option } = Select;

class TextComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      fabTree: {},
      selectedGongNo: '',
      keyNoList: [],
    };
  }

  componentDidMount() {
    const { value, site } = this.props;
    request({
      method: 'GET',
      url: `/api/gcs/v1/common/chemiacal/manage?type=fabList&site=${site}`,
    }).then(({ response }) => {
      if (response?.list instanceof Array) {
        const fabTree = {};
        let selected = '';
        const list = response.list || [];
        list.forEach(fab => {
          if (!fabTree[fab.GONGNO]) {
            const { GONGNO, PRODNM, GONGAREA, GONGINFO } = fab;
            fabTree[fab.GONGNO] = {
              GONGNO,
              PRODNM,
              GONGAREA,
              GONGINFO,
              FABS: [],
            };
          }
          if (value !== '' && fab.FAB_KEYNO === value) selected = fab.FAB_KEYNO;
          fabTree[fab.GONGNO].FABS.push({ FAB_KEYNO: fab.FAB_KEYNO, FAB_PROC: fab.FAB_PROC, FAB_AREA: fab.FAB_AREA });
        });
        this.setState({
          selectedGongNo: selected,
          fabTree: fabTree || {},
        });
      }
    });
  }

  componentWillUpdate(nextProps) {
    const { value, site } = this.props;
    if (value !== nextProps.value || site !== nextProps.site) return true;
    return false;
  }

  onClickFab = value => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') onChange(value);
    this.handleModal(false);
  };

  handleModal = bool => {
    this.setState({
      modalVisible: bool,
    });
  };

  // 공급장치번호 선택
  onChangeGongNo = val => {
    const { fabTree } = this.state;
    const list = fabTree[val].FABS;
    this.setState({
      selectedGongNo: val,
      keyNoList: list || [],
    });
  };

  // /api/gcs/v1/common/chemiacal/manage?type=fabList&site=${site}
  // GONG_NO 옵션 렌더링
  renderOptions = () => {
    const { fabTree } = this.state;
    const fabTreelist = Object.keys(fabTree);
    if (fabTreelist?.length > 0) {
      return fabTreelist.map(key => {
        const gong = fabTree[key];
        return <Option key={gong.GONGNO} value={gong.GONGNO}>{`${gong.GONGNO} [${gong.PRODNM}]`}</Option>;
      });
    }
    return '';
  };

  render() {
    const { value } = this.props;
    const { modalVisible, selectedGongNo, keyNoList } = this.state;
    const columns = [
      {
        title: 'FAB - KEY NO',
        dataIndex: 'FAB_KEYNO',
        key: 'FAB_KEYNO',
        render: (data, record) => (
          <div style={{ width: '100%' }}>
            <span>{`${record.FAB_KEYNO} [${record.FAB_AREA}]`}</span>
            {value === record.FAB_KEYNO && <CheckOutlined style={{ color: '#2a81da', marginLeft: '10px' }} />}
          </div>
        ),
      },
    ];

    return (
      <>
        <AntdSearch
          className="input-search-sm"
          style={{ width: '100%' }}
          placeholder="FAB 선택"
          value={value}
          disable
          onClick={() => this.handleModal(true)}
          onSearch={() => this.handleModal(true)}
        />
        <AntdModal
          className="modal-table-pad"
          title="FAB 선택"
          width="40%"
          visible={modalVisible}
          footer={null}
          destroyOnClose
          onOk={() => this.handleModal(false)}
          onCancel={() => this.handleModal(false)}
        >
          <StyledCustomSearchWrapper>
            <AntdSelect className="select-xs" style={{ width: '100%' }} value={selectedGongNo || ''} onChange={val => this.onChangeGongNo(val)}>
              {this.renderOptions()}
            </AntdSelect>
          </StyledCustomSearchWrapper>
          <div style={{ marginTop: '20px' }}>
            <AntdTable
              pagination={false}
              columns={columns}
              dataSource={keyNoList}
              scroll={{ y: 300 }}
              onRow={record => ({
                onClick: () => this.onClickFab(record.FAB_KEYNO), // click row
              })}
            />
          </div>
        </AntdModal>
      </>
    );
  }
}

TextComp.propTypes = {
  site: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

TextComp.defaultProps = {
  value: '',
};

export default TextComp;
