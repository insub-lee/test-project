import React, { Component } from 'react';
import { Table, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import Footer from './footer';

class List extends Component {
  constructor(props) {
    super(props);
    this.callListApi = this.callListApi.bind(this);
  }

  state = {
    searchText: '',
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  };

  getColumnSearchProps = (dataIndex, titles) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`${titles} 검색`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  callListApi = () => {
    const { id } = this.props;
    const apiArr = [
      {
        key: 'Favorite',
        url: '/api/mdcs/v1/common/Favorite',
        type: 'POST',
        params: {},
      },
    ];
    this.props.getExtraApiData(id, apiArr);
  }

  componentDidMount() {
    this.props.favoriteListComp(this);

    const { id } = this.props;
    const apiArr = [
      {
        key: 'Favorite',
        url: '/api/mdcs/v1/common/Favorite',
        type: 'POST',
        params: {},
      },
    ];
    this.props.getExtraApiData(id, apiArr);
  }

  componentWillUnmount() {
    this.props.favoriteListComp(null);
  }

  delFavorite = (data) => {
    const { id } = this.props;
    const url = '/api/mdcs/v1/common/FavoriteDelete';
    const params = { favList: this.state.selectedRowKeys };
    const apiArr = [
      {
        key: 'Favorite',
        url: '/api/mdcs/v1/common/Favorite',
        type: 'POST',
        params: {},
      },
    ];
    this.props.deleteExtraTask(id, url, params, apiArr);
  };

  viewFavorite = (data) =>{
    const { onChangeMovePageHandler } = this.props;
    onChangeMovePageHandler('VIEW', data.WORK_SEQ, data.TASK_SEQ, data.FAV_SEQ);
  }
  
  render() {
    /*
    A.FAV_SEQ AS "key", A.FAV_SEQ, A.WORK_SEQ, A.WORK_ID, A.TASK_SEQ,
            B.TITLE, B.STATUS, B.VERSION, B.SP_ID, B.SP_REV,
            C.NAME_KOR,
            D.NAME_KOR AS DETP_NAME
    구분, 문서번호, Rev, (구)문서번호, (구)Rev, 제목, 적용일자, 기안부서, 기안자
    */
    const columns = [
      {
        title: '문서번호',
        dataIndex: 'SP_ID',
        key: 'SP_ID',
        sorter: (a, b) => a.SP_ID - b.SP_ID,
      },
      {
        title: 'Rev',
        dataIndex: 'SP_REV',
        key: 'SP_REV',
        sorter: (a, b) => a.SP_REV - b.SP_REV,
      },
      {
        title: '제목',
        dataIndex: 'TITLES',
        key: 'TITLES',
        sorter: (a, b) => {
          // return a.TITLES.localeCompare(b.TITLES);
          return +(a.TITLES > b.TITLES) || +(a.TITLES === b.TITLES) - 1;
        },
        ...this.getColumnSearchProps('TITLES', '제목'),
        render: (text, record) => {
          return (
          <a
            onClick={() => {
              this.viewFavorite(record);
            }}
          >
            {text}
          </a>
          );
        },
      },
      {
        title: '기안부서',
        dataIndex: 'DETP_NAME',
        key: 'DETP_NAME',
        sorter: (a, b) => +(a.DETP_NAME > b.DETP_NAME) || +(a.DETP_NAME === b.DETP_NAME) - 1,
      },
      {
        title: '기안자',
        dataIndex: 'NAME_KOR',
        key: 'NAME_KOR',
        sorter: (a, b) => +(a.NAME_KOR > b.NAME_KOR) || +(a.NAME_KOR === b.NAME_KOR) - 1,
        ...this.getColumnSearchProps('NAME_KOR', '기안자'),
      },
    ];
    const {
      extraApiData: { Favorite, FavoriteView },
    } = this.props;
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    
    return (
      <div>
        <Table
          rowSelection={rowSelection}
          dataSource={Favorite ? Favorite.list : []}
          columns={columns}
          footer={() => <Footer delFavorite={ this.delFavorite } />}
        />
        {/* <FavoriteModal
          visible={visible}
          data={FavoriteView}
          onCancel={() => { this.setState({ visible: false }); }}
        /> */}
      </div>
    );
  }
}

export default List;
